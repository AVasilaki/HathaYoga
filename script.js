let asanas = [];
console.log("asanas", asanas);
let totalTime = 0;
let numberOfAsanas = 0;

const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");
const practiceTime = document.querySelector(".js-time");
const start = document.querySelector(".js-start");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".js-modalTitle");
const modalImg = document.querySelector(".js-modalImg");
const progressBar = document.getElementById("progressBar");
// console.log(modalTitle);

list.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const elements = form.elements;
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
    asanaRest,
  };
  const rest = {
    asanaName: "rest",
    asanaRest,
    asanaImg: "./images/Sriyantra.svg",
    timeAsana: asanaRest,
  };
  asanas.push(objAsana);
  asanas.push(rest);

  numberOfAsanas += 1;

  added.style = "display:block";
  practiceTime.style = "display:block";

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
  added.style = "display:none";
  practiceTime.style = "display:none";
  if (index < asanas.length) {
    const timer = asanas[index].timeAsana;
    const timeMilisekund = timer * 60000;
    let timeSekund = timeMilisekund / 1000;
    const title = asanas[index].asanaName;
    const img = asanas[index].asanaImg;
    modalTitle.textContent = `${title}`;
    modalImg.src = img;
    speak("Наступна вправа: " + title); // Озвучення вправи

    // console.log(timer);
    timerBack = setInterval(() => {
      if (timeSekund >= 0) {
        let progress = (timeSekund / (timer * 60)) * 100;
        console.log(progress);
        progressBar.style.width = progress + "%";
        timeSekund -= 1;
      }
    }, 1000);
    // function handleTimer(m) {
    //   const t = m - 1000;
    //   console.log(t);
    //   return t;
    // }
    setTimeout(() => {
      // console.log(asanas[index]);
      innerHTML = "";
      index += 1;
      startTraining();
    }, timeMilisekund);
  }
  if (index === asanas.length) {
    asanas = [];
    index = 0;
    modal.style = "display:none";
  }
  // else {
  //   asanas = [];
  // }
  // for (let index = 0; index < asanas.length; index++) {
  //   const element = asanas[index];
  //   setTimeout(console.log(element), 10000);
  // }
  // asanas.map((el) => {
  //   c(el);
  //   // console.log(el);
  // });
}
function closeModal() {
  modal.style = "display:none";
  clearInterval(timerBack);
  // modal.innerHTML = "";
  asanas = [];
}
// function c(el) {
//   setTimeout(console.log("el", el), 40000);
// }
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "uk-UA";
  speechSynthesis.speak(utterance);
}
