let asanas = [];
const list = document.querySelector("ol");
const body = document.querySelector("body");
const added = document.querySelector(".added");
console.log(added);

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

  const btnDel = elements.delete;
  btnDel.addEventListener("click", handleDelete);

  function handleDelete(evt) {
    console.log(id);
    // console.log(asanas.indexOf(asanas.id === id));
    const i = asanas.findIndex((el) => el.id === id);
    console.log(i);
    asanas.splice(i, 1);
    asanas.map((el) => console.log(el));
    added.innerHTML = "";
    const m = asanas
      .map((el) => {
        return `<h3>${el.asanaName}</h3>`;
      })
      .join("");
    added.insertAdjacentHTML("beforeend", m);
    // console.log(evt.target.form);
  }
  // const fields = Array.from(form.children);
  // const deskr = fields[0];
  // console.log(form[0].children[2].textContent);
  const obj = {
    id,
    asanaName,
    asanaImg,
    timeAsana,
    asanaRest,
  };

  asanas.push(obj);
  added.style = "display:block";

  const murkup = `<h3>${asanaName}</h3>`;
  added.insertAdjacentHTML("beforeend", murkup);
}

function startTraining() {
  document.getElementById("myAudio").play();
}
