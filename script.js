/**
 * Digitale Hulp - Enhanced Chat Interface
 * Senior-friendly AI assistant with conversation management
 */

// ===================================
// State Management
// ===================================

// Conversation history
let conversation = [];
let isLoading = false;
let isFirstMessage = true;

// DOM Elements
const elements = {
    chat: document.getElementById('chat'),
    chatContainer: document.getElementById('chatContainer'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    clearChatBtn: document.getElementById('clearChatBtn'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    errorMessage: document.getElementById('errorMessage'),
    charCount: document.getElementById('charCount'),
    lastUpdated: document.getElementById('lastUpdated'),
    messageForm: document.getElementById('messageForm')
};

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load conversation from localStorage
    loadConversation();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update last updated timestamp
    updateLastUpdated();
    
    // Auto-focus input
    elements.userInput.focus();
    
    // Show empty state if no conversation
    if (conversation.length === 0) {
        showEmptyState();
    }
}

function setupEventListeners() {
    // Form submission
    elements.messageForm.addEventListener('submit', handleSubmit);
    
    // Input events
    elements.userInput.addEventListener('input', handleInputChange);
    elements.userInput.addEventListener('keydown', handleKeyDown);
    
    // Clear chat button
    elements.clearChatBtn.addEventListener('click', clearChat);
    
    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
}

// ===================================
// Event Handlers
// ===================================

function handleSubmit(event) {
    event.preventDefault();
    
    if (isLoading) {
        return;
    }
    
    const message = elements.userInput.value.trim();
    
    if (!message) {
        showError('Voer alstublieft een vraag in.');
        return;
    }
    
    if (message.length > 500) {
        showError('Uw vraag is te lang. Maximum 500 tekens.');
        return;
    }
    
    // Prevent duplicate consecutive messages
    if (conversation.length > 0) {
        const lastMessage = conversation[conversation.length - 1];
        if (lastMessage.role === 'user' && lastMessage.content === message) {
            showError('Deze vraag is al verzonden.');
            return;
        }
    }
    
    sendMessage(message);
}

function handleInputChange() {
    const length = elements.userInput.value.length;
    updateCharCount(length);
}

function handleKeyDown(event) {
    // Enter to send (Shift+Enter for new line)
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        elements.messageForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear input
    if (event.key === 'Escape') {
        elements.userInput.value = '';
        handleInputChange();
        elements.userInput.focus();
    }
}

// ===================================
// Message Sending & Receiving
// ===================================

async function sendMessage(message) {
    // Add user message to UI and history
    addMessage(message, 'user');
    conversation.push({ role: 'user', content: message });
    
    // Clear input and update character count
    elements.userInput.value = '';
    updateCharCount(0);
    
    // Hide error if visible
    hideError();
    
    // Show loading state
    showLoading();
    
    try {
        // Fetch response from AI
        const response = await fetchAI(conversation);
        
        // Hide loading
        hideLoading();
        
        // Add bot response to UI and history
        addMessage(response, 'bot');
        conversation.push({ role: 'bot', content: response });
        
        // Save conversation
        saveConversation();
        
        // Scroll to bottom
        scrollToBottom();
        
    } catch (error) {
        console.error('Error fetching response:', error);
        hideLoading();
        
        // Remove the last user message from conversation if failed
        if (conversation.length > 0 && conversation[conversation.length - 1].role === 'user') {
            conversation.pop();
        }
        
        // Show error message
        const errorMsg = error.message || 'Er is iets misgegaan. Probeer het later opnieuw.';
        showError(errorMsg);
        
        // Restore user input
        elements.userInput.value = message;
        updateCharCount(message.length);
    }
}

// ===================================
// UI Updates
// ===================================

function addMessage(text, sender) {
    // Remove empty state if present
    removeEmptyState();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    
    const now = new Date();
    const timeString = formatTime(now);
    
    messageDiv.innerHTML = `
        <b>${sender === 'user' ? 'U' : 'Hulpbot'}:</b>
        ${escapeHtml(text)}
        <span class="message-time">${timeString}</span>
    `;
    
    elements.chat.appendChild(messageDiv);
    scrollToBottom();
}

function showLoading() {
    isLoading = true;
    elements.loadingIndicator.classList.remove('hidden');
    elements.sendBtn.disabled = true;
    scrollToBottom();
}

function hideLoading() {
    isLoading = false;
    elements.loadingIndicator.classList.add('hidden');
    elements.sendBtn.disabled = false;
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    elements.errorMessage.classList.add('hidden');
}

function updateCharCount(length) {
    elements.charCount.textContent = `${length} / 500`;
    
    // Update color based on length
    elements.charCount.classList.remove('warning', 'limit-reached');
    
    if (length >= 450) {
        elements.charCount.classList.add('limit-reached');
    } else if (length >= 400) {
        elements.charCount.classList.add('warning');
    }
}

function updateLastUpdated() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    elements.lastUpdated.textContent = `Laatst bijgewerkt: ${now.toLocaleDateString('nl-NL', options)}`;
}

function scrollToBottom() {
    setTimeout(() => {
        elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    }, 100);
}

function showEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.id = 'emptyState';
    emptyState.innerHTML = `
        <div class="icon">💬</div>
        <p>Welkom bij Digitale Hulp!</p>
        <p>Stel een vraag over DigiD, MijnOverheid of uw telefoon.</p>
        <p>Of gebruik een van de snelle vraag-knoppen hierboven.</p>
    `;
    elements.chat.appendChild(emptyState);
}

function removeEmptyState() {
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.remove();
    }
}

// ===================================
// API Communication
// ===================================

async function fetchAI(conversation) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation })
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Server error: ${response.status}. Probeer het later opnieuw.`);
    }
    
    const data = await response.text();
    return data.trim();
}

// ===================================
// Utility Functions
// ===================================

function quickQuestion(text) {
    elements.userInput.value = text;
    handleSubmit(new Event('submit'));
}

function clearChat() {
    if (conversation.length === 0) {
        return;
    }
    
    // Confirm with user
    if (!confirm('Weet u zeker dat u het gesprek wilt wissen?')) {
        return;
    }
    
    // Clear conversation
    conversation = [];
    elements.chat.innerHTML = '';
    
    // Clear localStorage
    localStorage.removeItem('digiHulpConversation');
    
    // Show empty state
    showEmptyState();
    
    // Focus input
    elements.userInput.focus();
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// LocalStorage Management
// ===================================

function saveConversation() {
    try {
        localStorage.setItem('digiHulpConversation', JSON.stringify(conversation));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadConversation() {
    try {
        const saved = localStorage.getItem('digiHulpConversation');
        if (saved) {
            conversation = JSON.parse(saved);
            
            // Restore chat
            if (conversation.length > 0) {
                removeEmptyState();
                
                conversation.forEach((msg) => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = msg.role;
                    
                    const now = new Date(msg.timestamp || Date.now());
                    const timeString = formatTime(now);
                    
                    messageDiv.innerHTML = `
                        <b>${msg.role === 'user' ? 'U' : 'Hulpbot'}:</b>
                        ${escapeHtml(msg.content)}
                        <span class="message-time">${timeString}</span>
                    `;
                    
                    elements.chat.appendChild(messageDiv);
                });
                
                scrollToBottom();
            }
        }
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        conversation = [];
    }
}

// ===================================
// Accessibility Enhancements
// ===================================

// Announce changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===================================
// Export for testing
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatTime,
        escapeHtml,
        quickQuestion,
        clearChat
    };
}
