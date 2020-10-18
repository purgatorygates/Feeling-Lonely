const form = document.querySelector("form");
const input = document.querySelector("input");
const chatbox = document.querySelector("#chatbox");
const lonelyButton = document.querySelector("button");
const me = ["Me", "Myself", "I"];
let id = 2;
let apiURL = "https://api.chucknorris.io/jokes/random";
form.addEventListener("submit", handleForm);
lonelyButton.addEventListener("click", handleChuck);
function handleForm(e) {
  e.preventDefault();
  id++;
  const randomNumber = Math.floor(Math.random() * me.length);
  const newMessage = document.createElement("div");
  const timeStamp = new Date().toLocaleTimeString("en-US");
  newMessage.className = "message";
  newMessage.setAttribute("id", id);
  newMessage.innerHTML = `
    <span>${timeStamp}</span>
    <span class="sender">${me[randomNumber]}</span>
    <span>${input.value}</span>
    <span class="delete" onclick="deleteMessage(${id})">❌</span>
  `;
  chatbox.appendChild(newMessage);
  input.value = "";
}
function deleteMessage(id) {
  const message = document.getElementById(id);
  message.remove();
}
function handleChuck() {
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
