const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY = "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"; // Replace with your valid API key
const API_URL = "https://api.openai.com/v1/chat/completions";

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
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "I want you to act as a compassionate and supportive person who is skilled at providing comfort to someone going through a tough time. Your role is to listen actively, validate their feelings, and provide supportive and empathetic responses. Avoid judgment or offering unsolicited advice unless specifically asked. Provide a warm and understanding tone to reassure and encourage them.\n" +
                        "\n" +
                        "Start each response with empathy and make sure to use comforting language. For example:\n" +
                        "\n" +
                        "If they express sadness, acknowledge their feelings and let them know it's okay to feel this way.\n" +
                        "If they share frustration, validate their struggle and provide encouragement to navigate the challenges.\n" +
                        "Here’s a situation to respond to: 'I’ve been feeling so overwhelmed with work and personal responsibilities, and it’s like there’s no way out",
                },
                { role: "user", content: userMessage },
            ],
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
