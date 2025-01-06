const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {

        const { message } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No message provided in the request body." }),
            };
        }


        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            "I want you to act as a compassionate and supportive person who is skilled at providing comfort to someone going through a tough time. Your role is to listen actively, validate their feelings, and provide supportive and empathetic responses. Avoid judgment or offering unsolicited advice unless specifically asked. Provide a warm and understanding tone to reassure and encourage them.\n\nStart each response with empathy and make sure to use comforting language. For example:\n\nIf they express sadness, acknowledge their feelings and let them know it's okay to feel this way.\nIf they share frustration, validate their struggle and provide encouragement to navigate the challenges.\nHere’s a situation to respond to: 'I’ve been feeling so overwhelmed with work and personal responsibilities, and it’s like there’s no way out.'",
                    },
                    { role: 'user', content: message },
                ],
            }),
        });


        const data = await response.json();

        if (!response.ok) {
            console.error('OpenAI API Error:', data);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || 'Failed to fetch response from OpenAI.' }),
            };
        }


        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'An error occurred while processing your request. Please try again later.',
            }),
        };
    }
};
