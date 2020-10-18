const form = document.querySelector("form");
const input = document.querySelector("input");
const chatbox = document.querySelector("#chatbox");
const button = document.querySelector("button");
const user = ["Me", "Myself", "I"];
let id = 2;
let apiURL = "https://api.chucknorris.io/jokes/random";
form.addEventListener("submit", handleForm);
button.addEventListener("click", chuckJokes);
function handleForm(e) {
  e.preventDefault();
  id++;
  const randomNumber = Math.floor(Math.random() * user.length);
  const newDm = document.createElement("div");
  const timeStamp = new Date().toLocaleTimeString("en-US");
  newDm.className = "message";
  newDm.setAttribute("id", id);
  newDm.innerHTML = `
    <span>${timeStamp}</span>
    <span class="sender">${user[randomNumber]}</span>
    <span>${input.value}</span>
    <span class="delete" onclick="deleteMessage(${id})">❌</span>
  `;
  chatbox.appendChild(newDm);
  input.value = "";
}
function deleteMessage(id) {
  const message = document.getElementById(id);
  message.remove();
}
function chuckJokes() {
  id++;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      let joke = data.value;
      let chuckNorrisMessage = document.createElement("div");
      const timeStamp = new Date().toLocaleTimeString("en-US");
      chuckNorrisMessage.className = "message";
      chuckNorrisMessage.setAttribute("id", id);
      chuckNorrisMessage.innerHTML = `
          <span>${timeStamp}</span>
          <span class="sender">Fact:</span>
          <span>${joke}</span>
          <span class="delete" onclick="deleteMessage(${id})">❌</span>
        `;
      chatbox.appendChild(chuckNorrisMessage);
    });
}
