// Bewaar het hele gesprek
let conversation = [];

// Verstuur de vraag en haal antwoord op
async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();
    if (!message) return;

    // Voeg het bericht van de gebruiker toe
    addMessage(message, "user");
    input.value = "";

    // Voeg het toe aan de gesprekshistorie
    conversation.push({ role: "user", content: message });

    // Verstuur het gesprek naar Make / AI
    let response = await fetchAI(conversation);

    // Voeg het antwoord van de Hulpbot toe
    addMessage(response, "bot");

    // Voeg AI antwoord ook toe aan de gesprekshistorie
    conversation.push({ role: "bot", content: response });
}

// Voeg bericht toe aan de chat met aparte styling
function addMessage(text, sender) {
    let chat = document.getElementById("chat");

    let div = document.createElement("div");
    div.className = sender; // 'user' of 'bot'

    // Zorg voor aparte regels en witruimte
    div.innerHTML = sender === "user" ? `<b>U:</b> ${text}` : `<b>Hulpbot:</b> ${text}`;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight; // Automatisch scrollen
}

// Haal antwoord op van Make webhook
async function fetchAI(conversation) {
    // Verstuur het hele gesprek
    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation })
    });

    // Plain text ophalen, omdat Make tekst terugstuurt
    let data = await response.text();

    return data;
}

// Knoppen voor snelle vragen
function quickQuestion(text) {
    document.getElementById("userInput").value = text;
    sendMessage();
}
