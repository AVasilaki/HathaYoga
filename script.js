let asanas = [];
let totalCount = 0;

const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");
// console.log(added);

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

  // const btnDel = elements.delete;
  // btnDel.addEventListener("click", handleDelete);

  // function handleDelete(evt) {
  //   const i = asanas.findIndex((el) => el.id === id);

  //   asanas.splice(i, 1);

  //   added.innerHTML = "";
  //   const m = asanas
  //     .map((el) => {
  //       return `<h3>${el.asanaName}</h3>`;
  //     })
  //     .join("");
  //   added.insertAdjacentHTML("beforeend", m);
  // }

  const obj = {
    id,
    asanaName,
    asanaImg,
    timeAsana,
    asanaRest,
  };

  asanas.push(obj);
  added.style = "display:block";

  // const murkup = `<h3>${asanaName}</h3>`;
  // added.insertAdjacentHTML("beforeend", murkup);
  added.innerHTML = "";

  const m = asanas
    .map((el) => {
      return `<h3>${el.asanaName}</h3><button type='button' onclick=''>del</button>`;
    })
    .join("");
  added.insertAdjacentHTML("beforeend", m);
  totalCount = totalCount + timeAsana + asanaRest;
  const totalPracticeTime = `<p>total time ${totalCount}</p> `;
  added.insertAdjacentHTML("beforeend", totalPracticeTime);
  console.log(asanas);
}

function startTraining() {
  document.getElementById("myAudio").play();
}
