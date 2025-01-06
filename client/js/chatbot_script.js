const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_URL = "/.netlify/functions/chatbot"; // Backend endpoint for the Netlify function

// Function to create chat bubbles
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent =
        className === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Function to generate a response from the chatbot
const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    // Prepare the API request payload
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: userMessage, // Send the user message to the backend
        }),
    };

    // Send the API request
    fetch(API_URL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.choices && data.choices.length > 0) {
                messageElement.textContent = data.choices[0].message.content;
            } else {
                messageElement.textContent =
                    "Sorry, I couldn’t understand that. Can you try rephrasing?";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            messageElement.textContent =
                "Oops! Something went wrong. Please try again.";
        })
        .finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
};

// Function to handle chat input and responses
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Clear input and display user message
    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Add chatbot's "Thinking..." message and generate response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

// Event listeners for chat input and toggler
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () =>
    document.body.classList.toggle("show-chatbot")
);
