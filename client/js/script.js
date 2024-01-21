var myArray = ["Remember there are many as good as you but nobody better!",  
"people's faces don't tell their cases",
"Don’t forget who you are and where you came from. Don’t get too emotional over little things. Don’t. Quit until you win the grand prize",
"You can either be crushed by a horrific event and lose your sanity, your family and your life. Or, you can take this pain that was thrust upon you, to propel into greatness. You can make it through this. I know it’s hard.",
"To anyone out there who’s hurting — it’s not a sign of weakness to ask for help. It’s a sign of strength",
"Suicide is the last attempt of re-emergence of the will of life.",
"The option to stop but the decision to keep going.",
"Do not let bitterness take root, lest she strangle you.",
"Though no one can go back and make a brand new start, anyone can start now and make a brand new ending.",
"Suicide is beneath you – avoid past memories and meditate in the present moment."
]

function change_quote() {
    document.querySelector("button").innerHTML = 
    myArray[Math.floor(Math.random()*myArray.length)];
}