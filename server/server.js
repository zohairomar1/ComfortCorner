const express = require('express');
const app = express();
const port = 3000; // You can use any port that is free on your system

app.use(express.static('client')); // Serves static files from 'client' directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html'); // Sends the main HTML file
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



const sentences = [
    "This is tough, but so are you!",
    "Keep pushing forward.",
    "You are stronger than you think.",
    // ...add as many sentences as you like
  ];
  
  app.get('/sentence', (req, res) => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];
    res.json({ sentence: sentence });
  });