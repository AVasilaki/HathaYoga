let asanas = [];

// total practice time загальний час практики з перервами
let totalTime = 0;
// кількість доданих вправ
let numberOfAsanas = 0;
let timer;
let title;
let img;
let audio;
let timerId;

const body = document.querySelector("body");

const list = document.querySelector("ol");
// спливаюче вікно для відображення доданих вправ
const added = document.querySelector(".added");
// заголовок який відобраає час практики
const totalPracticeTimeTitle = document.querySelector(".js-time");
// кнопка початок практики
const startBtn = document.querySelector(".js-start");
// вікно з асанами під час практики
const modalWindow = document.querySelector(".modal");
//назва поточної асани під час практики
const currentAsanaName = document.querySelector(".js-modalTitle");
// зображення поточної асани
const currentAsanaImg = document.querySelector(".js-modalImg");
// progress bar
const progressBar = document.getElementById("progressBar");
// а зараз відпочиваємо
const startRestVoice = document.getElementById("myAudio");
//пікалка за десять секунд до завершення
const rest10cekBeep = document.querySelector("#rest10cek");
// console.log(rest10cek);
const scrollLinks = document.querySelector(".scroll-links");

list.addEventListener("submit", handleSubmit);

// функція додавання вибраних асан у масив і відображення на сторінці
function handleSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const elements = form.elements;
  const audio = form.children[0];
  const asanaName = elements[0].children[1].textContent;
  const asanaImg = elements[0].children[3].src;
  const timeAsana = Number(elements.time.value);
  const asanaRest = Number(elements.timeBreake.value);
  const id = form.id;

  const objAsana = {
    id,
    index: Date.now(),
    asanaName,
    asanaImg,
    timeAsana,
    audio,
  };

  const rest = {
    asanaName: "rest",
    asanaImg: "./images/Sriyantra.svg",
    timeAsana: asanaRest,
    audio: startRestVoice,
  };

  asanas.push(objAsana);
  totalTime += timeAsana;
  if (asanaName !== "Шавасана" && asanaName !== "Вход в практику") {
    asanas.push(rest);
    totalTime += asanaRest;
  }

  // console.log(asanas);
  numberOfAsanas += 1;

  added.style = "display:block";
  totalPracticeTimeTitle.style = "display:block";
  startBtn.style = "display:block";

  murkup();
}

function deleteAsana(i) {
  console.log(i, "i");
  const deletingAsana = asanas.find((el) => el.index === i);
  console.log(deletingAsana, "deketing asana");
  const timeofAsana = deletingAsana.timeAsana;

  totalTime -= timeofAsana;

  const n = asanas.findIndex((el) => el.index === i);

  asanas.splice(n, 1);

  numberOfAsanas -= 1;
  murkup();
}

function murkup() {
  added.innerHTML = "";
  if (!asanas.length) {
    added.style = "display:none";
    totalPracticeTimeTitle.style = "display:none";
    startBtn.style = "display:none";
  }
  const murkup = asanas
    .map((el) => {
      const i = el.index;
      return `<div class='addAasanaContainer'>
      <h3> ${el.asanaName}</h3>
      <img src='${el.asanaImg}' width=70/> 
      <button type='button' id='${i}'  onclick='deleteAsana(${i})'>del</button> 
      </div>`;
    })
    .join("");

  totalPracticeTimeTitle.textContent = ` total practice time: ${totalTime} minute`;

  added.insertAdjacentHTML("beforeend", murkup);
}
let index = 0;
let timerBack = null;

function startTraining() {
  modalWindow.style = "display:block";
  startBtn.style = "display;none";
  added.style = "display:none";
  totalPracticeTimeTitle.style = "display:none";
  const closeBtn = document.querySelector(".modalBtn");
  closeBtn.addEventListener("click", closeModal);

  if (index < asanas.length) {
    timer = asanas[index].timeAsana;
    let timeMilisekund = timer * 60000;
    let timeSekund = timeMilisekund / 1000;
    title = asanas[index].asanaName;
    img = asanas[index].asanaImg;
    audio = asanas[index].audio;
    currentAsanaName.textContent = `${title}`;
    currentAsanaImg.src = img;
    audio.play();
    console.log(timer, title, img);
    timerBack = setInterval(() => {
      if (timeSekund >= 0) {
        let progress = (timeSekund / (timer * 60)) * 100;
        console.log(progress);
        progressBar.style.width = progress + "%";
        timeSekund -= 1;
        if (timeSekund === 10) {
          rest10cekBeep.play();
        }
      }
    }, 1000);

    timerId = setTimeout(() => {
      innerHTML = "";
      index += 1;
      startTraining();
    }, timeMilisekund);
  }

  function closeModal() {
    console.log(" close modal window");
    modalWindow.style = "display:none";
    startBtn.style = "display:none";
    asanas = [];
    totalTime = 0;
    clearInterval(timerBack);
    clearTimeout(timerId);
    timer = null;
    img = "";
    title = "";
    audio.pause();
    audio.currentTime = 0;
  }

  if (index === asanas.length) {
    asanas = [];
    index = 0;
    modalWindow.style = "display:none";
  }
}
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollLinks.classList.add("visible");
  } else {
    scrollLinks.classList.remove("visible");
  }
});
