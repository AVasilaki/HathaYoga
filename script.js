let asanas = [];
let totalTime = 0;
let numberOfAsanas = 0;

const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");

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

  const timeOneAsana = timeAsana + asanaRest;
  totalTime += timeOneAsana;

  const totalPracticeTime = `<p>total time ${totalTime}</p> `;

  murkup(totalPracticeTime);
}

function deleteAsana(i) {
  const deletingAsana = asanas.find((el) => el.index === i);

  const timeofAsana = deletingAsana.timeAsana;
  const restTime = deletingAsana.asanaRest;
  totalTimeAsana = timeofAsana + restTime;

  totalTime -= totalTimeAsana;
  const totalPracticeTime = `<p>total time ${totalTime}</p> `;

  const n = asanas.findIndex((el) => el.index === i);

  asanas.splice(n, 1);

  numberOfAsanas -= 1;
  murkup(totalPracticeTime);
}

function murkup(totalPracticeTime) {
  added.innerHTML = "";
  if (!asanas.length) {
    added.style = "display:none";
  }
  const m = asanas
    .map((el) => {
      const i = el.index;
      return `<div class='addeAasanaContainer'>
      <h3> ${el.asanaName}</h3>
      <button type='button' id='${i}'  onclick='deleteAsana(${i})'>del</button> 
      </div>`;
    })
    .join("");
  const murkup = m + totalPracticeTime;
  added.insertAdjacentHTML("beforeend", murkup);
}

function startTraining() {
  document.getElementById("myAudio").play();
}
