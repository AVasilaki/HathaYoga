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
  console.log(asanaImg);
  const timeAsana = Number(elements.time.value);
  const asanaRest = Number(elements.timeBreake.value);
  // const fields = Array.from(form.children);
  // const deskr = fields[0];
  // console.log(form[0].children[2].textContent);
  const obj = {
    asanaName,
    asanaImg,
    timeAsana,
    asanaRest,
  };

  asanas.push(obj);
  added.style = "display:block";
  const murkup = `<h2>added asanas</h2><h3>${asanaName}</h3>`;
  added.insertAdjacentHTML("beforeend", murkup);
}
console.log(asanas);
function startTraining() {
  document.getElementById("myAudio").play();
}
