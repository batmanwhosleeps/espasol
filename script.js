// ==============================
// HELLO!
// SCRIPT.JS PART 1
// START + LOADING + CHALLENGES
// ==============================


// Greeting

const greeting = document.getElementById("greeting");

if (greeting) {

    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = "Good morning.";
    } else if (hour < 18) {
        greeting.textContent = "Good afternoon.";
    } else {
        greeting.textContent = "Good evening.";
    }

}


// ==============================
// START JOURNEY
// ==============================

function showLoading(){ startJourney(); }

window.onload = function(){ startJourney(); };

function startJourney(){

    document.querySelector(".container").style.maxWidth = "700px";
    document.querySelector(".container").style.width = "95%";

    document.querySelector(".container").innerHTML = `

    <div class="introScreen">

        <div class="loadingIcon">🦌</div>

        <h1 id="introTitle" style="display:none;">
            HELLO!
        </h1>

        <p id="greeting" style="display:none;"></p>

        <p id="introMessage" style="display:none;"></p>

        <button id="beginBtn" onclick="showChallenge()" style="display:none;">
            ♡ Begin Journey
        </button>

    </div>

    `;

    // Greeting based on time
    const hour = new Date().getHours();

    let greeting = "Good evening.";

    if(hour < 12){
        greeting = "Good morning.";
    }
    else if(hour < 18){
        greeting = "Good afternoon.";
    }

    // 1.5s - Show HELLO!
    setTimeout(() => {

        document.getElementById("introTitle").style.display = "block";

    },1500);

    // 2.5s - Show greeting
    setTimeout(() => {

        const greet = document.getElementById("greeting");

        greet.style.display = "block";
        greet.innerHTML = greeting;

    },2500);

    // 4s - First message
    setTimeout(() => {

        const message = document.getElementById("introMessage");

        message.style.display = "block";

        message.innerHTML =
        "I'd like to borrow a few minutes of your time.";

    },4000);

    // 5.5s - Second message
    setTimeout(() => {

        document.getElementById("introMessage").innerHTML +=
        "<br><br>Nothing urgent. No wrong turns. Just tap below when you're ready to see what's next.";

    },5500);

    // 7.5s - Show Begin Journey button
    setTimeout(() => {

        document.getElementById("beginBtn").style.display = "inline-block";

    },7500);

}
// ==============================
// QUESTS
// ==============================

let challengeNumber = 0;

function showChallenge() {

  const quests = [

    {
      title: "⛏️ Quest I",
      subtitle: "The First Step",
      question: "Which of the following is a valid quadratic equation with real solutions?",
      answers: ["x^2 + 4 = 0", "x^2 - 6x + 9 = 0", "0x^2 + 3x - 5 = 0"],
      correct: "x^2 - 6x + 9 = 0"
    },

    {
      title: "🌲 Quest II",
      subtitle: "Lost in the Forest",
      question: "Unscramble this:<br><br><strong>M H Y R T H</strong>",
      answers: ["MYRTHH", "RHYTHM", "THYRHM"],
      correct: "RHYTHM"
    },

    {
      title: "💎 Quest III",
      subtitle: "Hidden Treasure",
      question: "I have cities but no houses.<br>I have rivers but no water.<br><br>What am I?",
      answers: ["Map", "Book", "Dream"],
      correct: "Map"
    }

  ];

  const current = quests[challengeNumber];

  document.querySelector(".container").innerHTML = `

    <div class="questCard">

      <p class="questCount">
        Quest ${challengeNumber + 1} of ${quests.length}
      </p>

      <h1>${current.title}</h1>

      <h3>${current.subtitle}</h3>

      <p class="question">
        ${current.question}
      </p>

      <div id="answers"></div>

      <p id="message" class="message"></p>

    </div>

  `;

  const answerBox = document.getElementById("answers");
  const message = document.getElementById("message");

  current.answers.forEach(answer => {

    const button = document.createElement("button");

    button.className = "answerButton";

    button.innerHTML = answer;

    button.onclick = function () {

      if (answer === current.correct) {

        challengeNumber++;

        if (challengeNumber < quests.length) {

          showChallenge();

        } else {

          showPassword();

        }

      } else {

        message.textContent = "Not quite. Give it another try. 💜";
        message.classList.add("show");

        setTimeout(() => {
          message.classList.remove("show");
        }, 2000);

      }

    };

    answerBox.appendChild(button);

  });

}

// ==============================
// PART 2
// Favorite Color + Title Reveal
// Letter + Joke
// ==============================


// Favorite Color
function showPassword(){

document.querySelector(".container").innerHTML=`

<h1>One last door remains.</h1>

<p>
It's your favorite color.
</p>

<input id="colorAnswer" 
type="text"
onkeydown="if(event.key==='Enter')
checkColor()">

<br><br>

<button onclick="checkColor()">
Continue
</button>

<p id="message" class="message"></p>

`;

}



function checkColor(){

    const answer = document
        .getElementById("colorAnswer")
        .value
        .trim()
        .toLowerCase();

    if(answer === "purple"){

        titleReveal();

    }else{

        const message = document.getElementById("message");

        message.textContent = "Try again 💜";
        message.classList.add("show");

        setTimeout(() => {
            message.classList.remove("show");
        }, 2000);

    }

}


// ==============================
// Title Reveal
// ==============================

function titleReveal(){

document.querySelector(".container").innerHTML=`

<h1>The Journey Continues</h1>

<p class="revealText">

This was never a test.

<br><br>

It was a little journey carrying pieces of
<br><br>
thought and time.

</p>

<button id="continueBtn" onclick="showJokes()">
    Continue
</button>

`;

}



// ==============================
// LETTER
// ==============================

let letterPages = [];
let currentPage = 0;

function loadLetter(){

    currentPage = 0;

    document.querySelector(".container").innerHTML = `

    <div class="letterCard">

        <div class="flowerLeft">💜</div>
        <div class="flowerRight">🌸</div>

        <h1>She, Unaware.</h1>

        <div class="chapterLine"></div>

        <p class="letterQuote">
            "Some petals are carried farther
            than the flower will ever know."
        </p>

        <button onclick="openLetter()">
            📖 Open the Letter
        </button>

    </div>

    `;

}

function openLetter(){
    
    document.querySelector(".container").style.maxWidth = "1300px";
    document.querySelector(".container").style.width = "95vw";

    const card = document.querySelector(".letterCard");

    card.classList.add("bookOpening");

    setTimeout(()=>{

        fetch("letter.txt")

        .then(response=>response.text())

        .then(text=>{

            letterPages = text.split("===");

            currentPage = 0;

            document.querySelector(".container").innerHTML = `

            <div class="letterBook fadeInBook">

                <div class="letterHeader" id="letterHeader">

                    <span>💜</span>

                    <h2>She, Unaware.</h2>

                    <span>🌸</span>

                </div>

                <div class="chapterLine"></div>

                <div id="letterText" class="letterText" style="text-align:left;"></div>

               <div class="pageFooter" style="display: flex !important; justify-content: space-between !important; align-items: center !important; width: 100% !important; padding: 16px 24px !important; box-sizing: border-box !important;">

                   <button id="prevBtn" onclick="prevPage()" style="visibility:hidden; flex-shrink: 0;">
                       ← Previous
                   </button>

                   <span id="pageNumber" style="flex-shrink: 0; margin: 0 10px; white-space: nowrap;"></span>

                   <button id="nextBtn" onclick="nextPage()" style="flex-shrink: 0;">
                       Turn the Page →
                   </button>

               </div>
            </div>

            `;

            showPage();

        })

        .catch(error=>{

            alert("Couldn't load the letter.");

            console.error(error);

        });

    },500);

}

function showPage(){

    const letter = document.getElementById("letterText");

    letter.innerHTML = letterPages[currentPage];
    letter.style.textAlign = 'left';

    // Restart the fade animation
    letter.classList.remove("fadeIn");
    void letter.offsetWidth;
    letter.classList.add("fadeIn");

    document.getElementById("pageNumber").innerHTML =
    `Page ${currentPage + 1} of ${letterPages.length}`;

    const header = document.getElementById("letterHeader");
    if(header) header.style.display = currentPage === 0 ? "" : "none";

    const prevBtn = document.getElementById("prevBtn");
    if(prevBtn) prevBtn.style.visibility =
        currentPage === 0 ? "hidden" : "visible";

    const nextBtn = document.getElementById("nextBtn");
    if(nextBtn){

        nextBtn.textContent =
            currentPage === letterPages.length - 1
            ? "Finish →"
            : "Turn the Page →";

    }

}

function flipAndShow(direction, callback){
    const text = document.getElementById('letterText');
    if(!text){ callback(); return; }
    text.style.transition = 'opacity 0.25s ease';
    text.style.opacity = '0';
    setTimeout(()=>{
        callback();
        text.style.opacity = '1';
    }, 260);
}

function prevPage(){
    if(currentPage > 0){
        flipAndShow('flipBack', ()=>{
            currentPage--;
            showPage();
        });
    }
}

function nextPage(){
    flipAndShow('flipForward', ()=>{
        currentPage++;
        if(currentPage < letterPages.length){
            showPage();
        } else {
            beforePuzzle();
        }
    });
}


// ==============================
// TRANSITION BEFORE PUZZLE
// ==============================

function beforePuzzle(){

document.querySelector(".container").innerHTML = `

<div class="transitionCard">

    <h1>One Last Little Thing</h1>

    <div class="chapterLine"></div>

    <p class="transitionText">

        Words can be forgotten.

        <br><br>

        Letters can be folded away.

        <br><br>

        But I hoped these would stay with you
        a little longer.

        <br><br>

        These are the words that quietly
        reminded me of you.

        <br><br>

        See if you can find them all.

    </p>

    <button id="continueBtn" onclick="wordPuzzle()">

        🌸 Continue

    </button>

</div>

`;

}


document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowRight") {

        event.preventDefault();

        const nextBtn = document.getElementById("nextBtn");
        if(nextBtn){
            nextBtn.click();
            return;
        }

        const continueBtn =
            document.getElementById("continueBtn");

        if(continueBtn){
            continueBtn.click();
            return;
        }

    }

    if(event.key === "Backspace" ||
       event.key === "ArrowLeft"){

        event.preventDefault();

        if(typeof prevPage === "function"){
            prevPage();
        }

    }

});

// ==============================
// Joke
// ==============================

function showJokes(){

document.querySelector(".container").innerHTML=`

<h1>Almost there...</h1>

<p>

A small joke before we continue.

</p>

<p>

Man, I've been standing in front of my 
locked door for 10 minutes having a full
conversation with it.

</p>

<input id="jokeInput" placeholder="Type anything..." oninput="revealJoke()">

<p id="jokeAnswer"></p>

<button id="jokeContinue" onclick="loadLetter()" style="display:none;">

Continue 

</button>

`;

}



function revealJoke(){

    const answer = document.getElementById("jokeAnswer");
    const btn = document.getElementById("jokeContinue");

    if (answer && !answer.innerHTML) {
        answer.innerHTML = `Because they said communication is key, but so far I'm just getting the silent treatment.<br><br>(I know, it's a terrible joke.)`;

        if (btn) {
            setTimeout(() => {
                btn.style.display = "inline-block";
            }, 800);
        }
    }

}
// ==============================
// PART 3
// WORD SEARCH + LAVENDER ENDING
// ==============================

function wordPuzzle(){

document.querySelector(".container").innerHTML = `

<div class="puzzleCard">

    <div class="titleDecor">

        <span class="flower">🌸</span>

        <div class="titleCenter">

            <h1>A Few Words About You</h1>

            <p class="puzzleQuote">
                "Some words are easier to find than they are to say."
            </p>

            <p>
                These are the words that reminded me of you.
                <br>
                Find them all.
            </p>

        </div>

        <span class="heart">💜</span>

    </div>

    <div id="wordGrid"></div>

    <br>

    <div id="checklist"></div>

    <p id="foundMessage"></p>

    <button onclick="clearSelection()">
        Clear Selection
    </button>

</div>

`;

createGrid();

}
const puzzle = [
  ["K","L","W","B","P","Q","Z","X","D"],
  ["M","O","D","I","S","H","J","P","A"],
  ["T","V","X","N","Q","B","Z","E","U"],
  ["F","W","H","Y","K","M","J","N","N"],
  ["B","X","Q","Z","L","T","P","S","T"],
  ["W","N","K","V","F","B","R","I","I"],
  ["R","A","D","I","A","N","T","V","N"],
  ["X","Z","Q","F","Y","K","M","E","G"],
  ["H","J","B","W","T","P","L","V","Q"]
];

const words = [

"MODISH",

"DAUNTING",

"RADIANT",

"PENSIVE"

];

let selected = "";
let selectedBoxes = [];
let found = [];
let dragging = false;

function createGrid(){

let grid = document.getElementById("wordGrid");

grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(9,44px)";
grid.style.gap = "5px";

document.addEventListener("mouseup", ()=>{
  dragging = false;
  clearSelection();
});

for(let r=0;r<puzzle.length;r++){
for(let c=0;c<puzzle[r].length;c++){

let box = document.createElement("button");
box.innerHTML = puzzle[r][c];
box.className = "letterBox";

box.onmousedown = function(e){
  e.preventDefault();
  if(box.classList.contains("found")) return;
  dragging = true;
  clearSelection();
  addToSelection(box);
};

box.onmouseenter = function(){
  if(!dragging) return;
  if(box.classList.contains("found")) return;
  addToSelection(box);
};

grid.appendChild(box);
}
}

}

function addToSelection(box){
  if(selectedBoxes.includes(box)) return;
  box.classList.add("selecting");
  selectedBoxes.push(box);
  selected += box.innerHTML;
  checkWord();
}

function clearSelection(){
  selectedBoxes.forEach(b => b.classList.remove("selecting"));
  selectedBoxes = [];
  selected = "";
}

function checkWord(){

words.forEach(word=>{

if(selected.includes(word)
&& !found.includes(word)){

found.push(word);

// Mark the boxes for this word purple permanently
selectedBoxes.forEach(b => {
  b.classList.remove("selecting");
  b.classList.add("found");
});
selectedBoxes = [];
selected = "";

document.getElementById("checklist").innerHTML +=
"✔ " + word + "<br>";

document.getElementById("foundMessage").innerHTML =
"✨ You found " + word + "! ✨";

setTimeout(()=>{
document.getElementById("foundMessage").innerHTML = "";
},2000);

}

});

if(found.length === words.length){

setTimeout(()=>{
transitionBloom();
},2000);

}

  }

// ==============================
// BOUQUET ENDING
// ==============================

function transitionBloom(){

document.querySelector(".container").innerHTML = `

<div class="transitionPage">

    <h1>✨</h1>

    <h2>You found every word.</h2>

    <p>

        Some things are easier to discover...

        <br><br>

        than they are to say.

        <br><br>

        The journey isn't over yet.

    </p>

</div>

`;

setTimeout(()=>{

    endingSequence();

},3500);

}




// ==============================
// PART 1
// LAVENDER FIELD
// ==============================

function endingSequence(){

document.querySelector(".container").innerHTML = `

<div class="lavenderPage">

    <div class="sky"></div>

    <div class="field" id="field"></div>

    <div class="lavenderContent">

        <h1>For a Moment.</h1>

        <p>

            I don't have anything extraordinary to give.

            <br><br>

            Only a few quiet moments,

            gathered here for you.

        </p>

        <button onclick="flowerRain()">

            Continue 

        </button>

    </div>

</div>

`;

createLavender();

}


function createLavender(){

const field =
document.getElementById("field");

for(let i=0;i<55;i++){

const stem =
document.createElement("div");

stem.className="lavender";

stem.style.left=(i*2)+"%";

stem.style.animationDelay=
(Math.random()*2)+"s";

stem.style.height=
(80+Math.random()*70)+"px";

field.appendChild(stem);

}

}

// ==============================
// PART 2
// RAINING FLOWERS
// ==============================

function flowerRain(){

    document.querySelector(".container").innerHTML = `

    <div class="flowerRainPage">

        <div id="flowerRain"></div>

        <div class="flowerRainContent">

            <h1>Even Flowers Fall.</h1>

            <p>

                Some things are easier to notice...

                <br><br>

                when they quietly find their way to you.

            </p>

            <button onclick="lanternPage()">

                Continue 

            </button>

        </div>

    </div>

    `;

    createFlowerRain();

}
function createFlowerRain(){

    const container = document.getElementById("flowerRain");

    if(!container) return;

    const flowers = ["🌸","🌷","💜","🌺","🪻"];

    setInterval(()=>{

        const flower = document.createElement("div");

        flower.className = "fallingFlower";

        flower.innerHTML =
            flowers[Math.floor(Math.random() * flowers.length)];

        flower.style.left =
            Math.random() * 100 + "vw";

        flower.style.animationDuration =
            (4 + Math.random() * 4) + "s";

        flower.style.fontSize =
            (16 + Math.random() * 18) + "px";

        container.appendChild(flower);

        setTimeout(()=>{

            flower.remove();

        },8000);

    },350);

}


// ==============================
// PART 3
// FLOATING LANTERNS
// ==============================

function lanternPage(){

document.querySelector(".container").innerHTML = `

<div class="lanternPage">

    <div id="lanternContainer"></div>

    <div class="lanternContent">

        <h1>Some Things...</h1>

        <p>

            Some words are meant

            <br>

            to be released,

            <br><br>

            not carried forever.

        </p>

        <button onclick="fireflyPage()">

            Continue 

        </button>

    </div>

</div>

`;

createLanterns();

}

function createLanterns(){

const container =
document.getElementById("lanternContainer");

for(let i=0;i<18;i++){

const lantern =
document.createElement("div");

lantern.className="lantern";

lantern.style.left=
Math.random()*100+"%";

lantern.style.animationDelay=
Math.random()*8+"s";

lantern.style.animationDuration=
(12+Math.random()*8)+"s";

container.appendChild(lantern);

}

}

// ==============================
// PART 4
// FIREFLIES
// ==============================

function fireflyPage(){

document.querySelector(".container").innerHTML = `

<div class="fireflyPage">

    <div id="fireflies"></div>

    <div class="fireflyContent">

        <h1>Little Lights.</h1>

        <p>

            Not everything beautiful

            <br><br>

            asks to be seen.

        </p>

        <button onclick="snowPage()">

            Continue 

        </button>

    </div>

</div>

`;

createFireflies();

}

function createFireflies(){

const container =
document.getElementById("fireflies");

for(let i=0;i<80;i++){

const light =
document.createElement("div");

light.className="firefly";

light.style.left=
Math.random()*100+"%";

light.style.top=
Math.random()*100+"%";

light.style.animationDelay=
Math.random()*6+"s";

light.style.animationDuration=
(4+Math.random()*4)+"s";

container.appendChild(light);

}

}

// ==============================
// PART 5
// SNOW
// ==============================

function snowPage(){

document.querySelector(".container").innerHTML = `

<div class="snowPage">

    <div id="snowContainer"></div>

    <div class="snowContent">

        <h1>A Quiet Wish.</h1>

        <p>

            May gentle things

            <br><br>

            always find their way to you.

        </p>

        <button onclick="reindeerPage()">

            Continue 

        </button>

    </div>

</div>

`;

createSnow();

}

function createSnow(){

const container =
document.getElementById("snowContainer");

for(let i=0;i<90;i++){

const flake =
document.createElement("div");

flake.className="snowflake";

flake.style.left=
Math.random()*100+"%";

flake.style.animationDuration=
(8+Math.random()*8)+"s";

flake.style.animationDelay=
Math.random()*5+"s";

flake.style.opacity=
0.3+Math.random()*0.7;

flake.style.transform=
`scale(${0.5+Math.random()})`;

container.appendChild(flake);

}

}

// ==============================
// PART 6
// REINDEER
// ==============================

function reindeerPage(){

document.querySelector(".container").innerHTML = `

<div class="reindeerPage">

    <div class="moon"></div>

    <div class="ground"></div>

    <div id="reindeer">🦌</div>

    <div class="reindeerContent">

        <h1>Until Then.</h1>

        <p>

            Every journey eventually

            comes to an end.

            <br><br>

            But I hope yours

            leads to beautiful places.

        </p>

    </div>

</div>

`;


setTimeout(()=>{

signaturePage();

},9000);

}

// ==============================
// PART 7
// SIGNATURE
// ==============================

function signaturePage(){

const container = document.querySelector(".container");
container.style.maxWidth = "650px";
container.style.maxHeight = "85vh";
container.style.overflowY = "auto";
container.style.padding = "24px 20px";
container.style.boxSizing = "border-box";

container.innerHTML = `

<div class="signatureCard" style="display: flex; flex-direction: column; align-items: center; text-align: center;">

    <p class="closingQuote" style="margin: 0 0 10px 0; font-style: italic; font-size: 0.9em; opacity: 0.85;">
        "Some meetings are brief, but the kindness they leave behind stays much longer."
    </p>

    <h2 style="margin: 5px 0 10px 0; font-size: 1.8em;">
        Somewhere between the stars. 💜
    </h2>

    <div style="font-size: 0.92em; line-height: 1.4; color: inherit;">
        <p style="margin: 6px 0;">That's all this little website ever wanted to say.</p>
        <p style="margin: 6px 0;">Thank you for taking the time to read my letter.</p>

        <p style="margin: 10px 0;">
            Whether these words stay with you or quietly fade into a memory,<br>
            I'm grateful you gave them a moment of your time.
        </p>

        <p style="margin: 10px 0;">
            Please take care of yourself.<br>
            Don't forget to drink enough water, get enough rest, and be kind to yourself,<br>
            especially on the days that feel a little heavier.
        </p>

        <p style="margin: 10px 0;">
            And if I could wish for one more thing, it would be this.
        </p>

        <p style="margin: 8px 0; font-size: 1.05em;">
            <strong>Continue being you.</strong>
        </p>

        <p style="margin: 10px 0;">
            I hope life gives you countless reasons to smile, beautiful places to explore,<br>
            and people who appreciate you for exactly who you are.
        </p>
    </div>

    <p class="signature" style="margin: 12px 0 16px 0; font-style: italic; opacity: 0.9;">
        — from someone who is grateful you exist.
    </p>

    <button onclick="theEnd()" style="margin-bottom: 10px; flex-shrink: 0; padding: 10px 20px; cursor: pointer;">
        Finish Journey 
    </button>

</div>

`;

}


// ==============================
// PART 8
// END OF JOURNEY
// ==============================

function theEnd(){

document.querySelector(".container").innerHTML = `

<div class="endScreen">

    <div class="endFade">

        <h1>

            Thank you.

        </h1>

        <p class="endHeart">

            💜

        </p>

        <p class="endText">

            Thank you for spending

            a little while here.

        </p>

    </div>

</div>

`;

setTimeout(()=>{

document.querySelector(".endFade").innerHTML = `

<h2>

— End of Journey —

</h2>

<p class="endQuote">

Some moments are never meant to last forever.

They simply become memories

worth carrying.

</p>

`;

},6000);

}