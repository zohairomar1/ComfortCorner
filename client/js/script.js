var myArray = ["Remember there are many as good as you but nobody better!",
"people's faces don't tell their cases",
"To anyone out there who’s hurting — it’s not a sign of weakness to ask for help. It’s a sign of strength",
"Suicide is the last attempt of re-emergence of the will of life.",
"The option to stop but the decision to keep going.",
"Do not let bitterness take root, lest she strangle you.",
"Though no one can go back and make a brand new start, anyone can start now and make a brand new ending.",
"Suicide is beneath you – avoid past memories and meditate in the present moment.","Embrace your journey, even the detours, for every step shapes your story.",
"Believe in your inner strength; it's quieter than fear but much more powerful.",
"Storms don't last forever. Hold on; brighter days are on their way.",
"Your mind is a garden, your thoughts are the seeds. You can grow flowers or you can grow weeds.",
"Be gentle with yourself; you're doing the best you can.",
"Let your dreams be bigger than your fears and your actions louder than your words.",
"The only limits that exist are the ones you place on yourself.",
"Remember, self-care isn't selfish. It's essential.",
"Every day is a new beginning. Take a deep breath, smile, and start again.",
"Your worth is not measured by productivity. Take time to rest and recharge.",
] 

function change_quote() {
    document.querySelector("button").innerHTML = random_quote();
    
}

document.getElementById("showQuote").textContent = random_quote();

function random_quote() {
    let quote = myArray[Math.floor(Math.random()*myArray.length)];
    return quote;
}