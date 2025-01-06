const fetch = require("node-fetch");

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // API key stored securely in Netlify

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "I want you to act as a compassionate and supportive person who is skilled at providing comfort to someone going through a tough time.",
                    },
                    { role: "user", content: message },
                ],
            }),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "An error occurred while processing your request." }),
        };
    }
};
