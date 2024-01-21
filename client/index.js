async function fetchMotivationalQuote() {
    try {
        const response = await fetch('/get-motivational-quote');
        const data = await response.json();

        const quoteText = document.getElementById('quote-text');
        quoteText.classList.remove('fade-in-left'); // Reset animation
        quoteText.style.opacity = 0; // Make element invisible for a moment

        setTimeout(() => {
            quoteText.innerText = data.quote;
            quoteText.classList.add('fade-in-left');
            quoteText.style.opacity = 1; // Make element visible again
        }, 100); // Short timeout to allow CSS reset
    } catch (error) {
        console.error('Error fetching motivational quote:', error);
    }
}

// Initial call
fetchMotivationalQuote();

// Update the quote every 6 seconds
setInterval(fetchMotivationalQuote(), 6000);

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/get-motivational-quote', async (req, res) => {
    // You'll need to have your OpenAI API key
    const openAIResponse = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer $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`
        },
        body: JSON.stringify({
            prompt: "Provide a motivational quote",
            max_tokens: 60
        })
    });

    const result = await openAIResponse.json();
    res.json({ quote: result.choices[0].text.trim() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

