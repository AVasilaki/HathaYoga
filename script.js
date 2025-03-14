let asanas = [];
let totalCount = 0;
let count = 0;

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
    index: count,
    asanaName,
    asanaImg,
    timeAsana,
    asanaRest,
  };

  asanas.push(obj);
  count += 1;
  console.log(count);
  added.style = "display:block";
  murkup();
  // const murkup = `<h3>${asanaName}</h3>`;
  // added.insertAdjacentHTML("beforeend", murkup);
  // added.innerHTML = "";

  // const m = asanas
  //   .map((el) => {
  //     const i = el.index;
  //     return `<h3>${el.asanaName}</h3>
  //     <button type='button' id='${i}'  onclick='deleteAsana(${i})'>del</button>`;
  //   })
  //   .join("");
  // added.insertAdjacentHTML("beforeend", m);
  totalCount = totalCount + timeAsana + asanaRest;
  const totalPracticeTime = `<p>total time ${totalCount}</p> `;
  added.insertAdjacentHTML("beforeend", totalPracticeTime);
  console.log(asanas);
}

function startTraining() {
  document.getElementById("myAudio").play();
}
function deleteAsana(i) {
  console.log("i", i);
  asanas.splice(i, 1);
  murkup();
  // console.log(asanas);
}
function murkup() {
  added.innerHTML = "";

  const m = asanas
    .map((el) => {
      const i = el.index;
      return `<h3>${el.asanaName}</h3>
      <button type='button' id='${i}'  onclick='deleteAsana(${i})'>del</button>`;
    })
    .join("");
  added.insertAdjacentHTML("beforeend", m);
}
