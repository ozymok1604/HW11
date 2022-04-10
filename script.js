function getData(film_id) {
  const config = "https://swapi.dev/api/films/" + film_id;
  return axios.get(config);
}

let body = document.getElementsByTagName("body");
let form = document.createElement("input");
form.className = "form";
body[0].appendChild(form);
let button = document.createElement("button");
button.className = "button";
button.textContent = "Get Info";
body[0].appendChild(button);

function getRender(res) {
  let parent = document.createElement("div");

  button.addEventListener("click", function getNumber() {
    let input = form.value;
    body[0].removeChild(parent);
    console.log(body);

    getData(input).then((data) => {
      getRender(data);
    });
  });

  const characters = res.data.characters;
  characters.map((actor) => {
    let promise = axios.get(actor);
    let promise2 = promise.then((data) => {
      let human = {
        name: data.data.name,
        birth: data.data.birth_year,
        male: data.data.gender,
      };
      let block = document.createElement("div");
      block.textContent =
        "name:" + human.name + " birth:" + human.birth + " male:" + human.male;

      block.className = "actors";

      parent.appendChild(block);
    });
  });

  body[0].appendChild(parent);
}

getData(1).then((data) => {
  getRender(data);
});
