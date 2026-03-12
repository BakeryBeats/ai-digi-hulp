// Verstuur de vraag en haal antwoord op
async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();
    if (!message) return;

    addMessage(message, "user"); // U: bericht
    input.value = "";

    // Voorlopig plain text ophalen
    let response = await fetchAI(message);

    addMessage(response, "bot");  // Hulpbot bericht
}

// Voeg bericht toe aan de chat met aparte styling
function addMessage(text, sender) {
    let chat = document.getElementById("chat");

    let div = document.createElement("div");
    div.className = sender; // 'user' of 'bot'
    
    // Zorg dat het op aparte regels komt
    div.innerHTML = sender === "user" ? `<b>U:</b> ${text}` : `<br><b>Hulpbot:</b> ${text}`;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight; // Automatisch scrollen
}

// Haal antwoord op van Make webhook
async function fetchAI(question) {
    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question })
    });

    // Plain text terughalen, omdat Make tekst terugstuurt
    let data = await response.text();
    return data;
}

// Knoppen voor snelle vragen
function quickQuestion(text) {
    document.getElementById("userInput").value = text;
    sendMessage();
}
