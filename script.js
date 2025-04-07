let asanas = [];
// console.log("asanas", asanas);
let totalTime = 0;
let numberOfAsanas = 0;
let timer;
let title;
let img;
let audio;
let timerId;

const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");
const practiceTime = document.querySelector(".js-time");
const start = document.querySelector(".js-start");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".js-modalTitle");
const modalImg = document.querySelector(".js-modalImg");
const progressBar = document.getElementById("progressBar");
const restAudio = document.getElementById("myAudio");
// console.log(modalTitle);

list.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  // asanas = [];

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
  console.log(objAsana);
  const rest = {
    asanaName: "rest",
    asanaImg: "./images/Sriyantra.svg",
    timeAsana: asanaRest,
    audio: restAudio,
  };

  asanas.push(objAsana);
  asanas.push(rest);

  numberOfAsanas += 1;

  added.style = "display:block";
  practiceTime.style = "display:block";
  start.style = "display:block";

  const timeOneAsana = timeAsana + asanaRest;
  totalTime += timeOneAsana;
  // practiceTime.textContent = ` total time ${totalTime}`;
  // const totalPracticeTime = `<p class='totalTime'>total practice time ${totalTime}</p> `;

  murkup();
}

function deleteAsana(i) {
  const deletingAsana = asanas.find((el) => el.index === i);

  const timeofAsana = deletingAsana.timeAsana;
  const restTime = deletingAsana.asanaRest;
  totalTimeAsana = timeofAsana + restTime;

  totalTime -= totalTimeAsana;
  // const totalPracticeTime = `<p class='totalTime'>total practice time ${totalTime}</p> `;

  const n = asanas.findIndex((el) => el.index === i);

  asanas.splice(n, 1);

  numberOfAsanas -= 1;
  murkup();
}

function murkup() {
  added.innerHTML = "";
  if (!asanas.length) {
    added.style = "display:none";
    practiceTime.style = "display:none";
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
  // console.log(m);
  practiceTime.textContent = ` total practice time: ${totalTime} minute`;

  added.insertAdjacentHTML("beforeend", murkup);
}
let index = 0;
let timerBack = null;

function startTraining() {
  // document.getElementById("myAudio").play();
  modal.style = "display:block";
  start.style = "display;none";
  added.style = "display:none";
  practiceTime.style = "display:none";
  const closeBtn = document.querySelector(".modalBtn");
  // console.log(closeBtn);

  if (index < asanas.length) {
    // speak("Наступна вправа: " + title); // Озвучення вправи
    timer = asanas[index].timeAsana;
    let timeMilisekund = timer * 60000;
    let timeSekund = timeMilisekund / 1000;
    title = asanas[index].asanaName;
    img = asanas[index].asanaImg;
    audio = asanas[index].audio;
    modalTitle.textContent = `${title}`;
    modalImg.src = img;
    audio.play();
    console.log(timer, title, img);
    timerBack = setInterval(() => {
      if (timeSekund >= 0) {
        let progress = (timeSekund / (timer * 60)) * 100;
        console.log(progress);
        progressBar.style.width = progress + "%";
        timeSekund -= 1;
      }
    }, 1000);

    timerId = setTimeout(() => {
      // console.log(asanas[index]);
      innerHTML = "";
      index += 1;
      startTraining();
    }, timeMilisekund);
  }
  closeBtn.addEventListener("click", closeModal);
  function closeModal() {
    modal.style = "display:none";
    start.style = "display:none";
    clearInterval(timerBack);
    clearTimeout(timerId);
    timer = null;
    img = "";
    title = "";
    audio.pause();
    // modal.innerHTML = "";
    asanas = [];
    startTraining();
  }
  if (index === asanas.length) {
    asanas = [];
    index = 0;
    modal.style = "display:none";
  }
}
// function closeModal() {
//   modal.style = "display:none";
//   start.style = "display:none";
//   clearInterval(timerBack);
//   timer = null;
//   img = "";
//   title = "";
//   // modal.innerHTML = "";
//   asanas = [];
// }

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "uk-UA";
  speechSynthesis.speak(utterance);
}
