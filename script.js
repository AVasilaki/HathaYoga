let asanas = [];
let totalTime = 0;
let numberOfAsanas = 0;

const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");
const practiceTime = document.querySelector(".js-time");
const start = document.querySelector(".js-start");
const modal = document.querySelector(".modal");
// console.log(modal);

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

  const obj = {
    id,
    index: Date.now(),
    asanaName,
    asanaImg,
    timeAsana,
    asanaRest,
  };

  asanas.push(obj);

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

function startTraining() {
  // document.getElementById("myAudio").play();
  modal.style = "display:block";
  added.style = "display:none";
}
function closeModal() {
  modal.style = "display:none";
}
