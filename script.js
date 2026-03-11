
async function sendMessage(){

let input = document.getElementById("userInput");
let message = input.value;

addMessage("U: " + message);

input.value = "";

let response = await fetchAI(message);

addMessage("Hulpbot: " + response);

}

function addMessage(text){

let chat = document.getElementById("chat");

let div = document.createElement("div");

div.innerText = text;

chat.appendChild(div);

}

function quickQuestion(text){

document.getElementById("userInput").value = text;

sendMessage();

}

async function fetchAI(question){

let response = await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question:question
})
});

let data = await response.json();

return data.answer;

}
