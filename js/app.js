/*
 * Create a list that holds all of your cards
 */
const arr = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let openCardsArr = [];
let moves = 0;
let matchedCards = 0;
let notTicking = true;
let endTimer = false;
let timeFunc;
let seconds;
let stars = 3;
let starElement;
/**
 * @param  {array} a
 * @return {array}
 */
function shuffle(a) {
    "use strict";
    return [...a].sort(() => 0.5 - Math.random());
}
/**
 */
function resetGame() {
    "use strict";
    let i;
    // Make sure all cards are closed
    for (i = 0; i < 16; i += 1) {
        document.querySelectorAll(".card")[i].className = "card";
    }

    // Store the shuffled array in a variable
    const shuffleResult = shuffle(arr);
    // Add the shuffled icons to the page
    shuffleResult.forEach((element, index) => {
        const card = document.querySelectorAll(".card > i")[index];
        card.className = element;
    });

    cardClick();
}

resetGame();
// When the reset button is pressed reload the page
document.querySelector(".restart").addEventListener("click", () => {
    "use strict";
    location.reload(false);
});
// set up event listener for the card
/**
 */
function cardClick() {
    "use strict";
    const deck = document.querySelector(".deck");
    deck.addEventListener("click", displaySymbol);
    // run displaySymbol function when card is clicked
}
/**
 */
function minusStar() {
    "use strict";
    if (stars === 3) {
        starElement = document.querySelectorAll(".stars i")[0];
    }
    if (stars === 2) {
        starElement = document.querySelectorAll(".stars i")[1];
    }
    starElement.className = "";
    starElement.textContent = "_";
    stars -= 1;
}
/**
 */
function moveCounter() {
    "use strict";
    moves += 1;
    let movesStr = String(moves);
    const moveElement = document.querySelector(".moves");
    moveElement.textContent = movesStr.padStart(3, "0");
    if (moves === 32) {
        minusStar();
    }
    if (moves === 64) {
        minusStar();
    }
}
/**
 */
function myTimer() {
    "use strict";
    if (endTimer) {
        clearInterval(timeFunc);
        return;
    }
    if (notTicking) {
        timeFunc = setInterval(myTimer, 1000);
        seconds = -1;
        notTicking = false;
    }
    seconds += 1;
    let secondsStr = String(seconds);
    document.querySelector(".seconds").textContent = secondsStr.padStart(
        3,
        "0"
    );
}

// display the clicked card
/**
 * @param  {object} e
 */
function displaySymbol(e) {
    "use strict";
    if (notTicking) {
        myTimer();
    }
    if (e.target && e.target.className === "card") {
        e.stopPropagation();
        const eventTarget = e.target;
        eventTarget.className = "card open show";
        moveCounter();
        whatSymbol(eventTarget);
    }
}

// Find the symbol that was in the clicked card
/**
 * @param  {object} eventTarget
 */
function whatSymbol(eventTarget) {
    "use strict";
    const findIcon = eventTarget.querySelector("i");
    const icon = findIcon.className;
    // Send symbol and the event.target data for its card to a function
    holdCards(icon, eventTarget);
}
/**
 * @param  {string} icon
 * @param  {object} eventTarget
 */
function holdCards(icon, eventTarget) {
    "use strict";
    openCardsArr.push(icon);
    openCardsArr.push(eventTarget);
    // check to see if cards match
    if (openCardsArr.length !== 4) {
        return;
    }
    if (openCardsArr[0] === openCardsArr[2]) {
        matchCards();
    } else {
        closeCards();
    }
}
/**
 */
function matchCards() {
    "use strict";
    openCardsArr[1].className = "card open match";
    openCardsArr[3].className = "card open match";
    openCardsArr = [];
    matchedCards += 1;
    if (matchedCards === 8) {
        win();
    }
}
/**
 */
function closeCards() {
    "use strict";
    const eventTarget1 = openCardsArr[1];
    const eventTarget2 = openCardsArr[3];
    eventTarget1.id = "incorrect";
    eventTarget2.id = "incorrect";
    // Remove event listener on the deck
    // while unmatched cards are shown briefly before being closed
    const deck = document.querySelector(".deck");
    deck.removeEventListener("click", displaySymbol);
    setTimeout(pause, 200);
    /**
     */
    function pause() {
        eventTarget1.id = "";
        eventTarget2.id = "";
        eventTarget1.className = "card";
        eventTarget2.className = "card";
        openCardsArr = [];
        // Reintroduce the event listener on deck
        // now that the matched cards have been shown
        deck.addEventListener("click", displaySymbol);
    }
}
/** win function Adapted from https://www.w3schools.com/howto/howto_css_modals.asp */
function win() {
    "use strict";
    endTimer = true;
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Get the moves-modal span
    const movesModal = document.querySelector(".moves-modal");

    // Get the second-modal span
    const secondsModal = document.querySelector(".seconds-modal");

    // Get the stars-modal span
    const starsModal = document.querySelector(".stars-modal");

    // Get play again class
    const playAgain = document.querySelector(".play-again");
    movesModal.textContent = moves;
    secondsModal.textContent = seconds;
    starsModal.textContent = stars;

    // Page reloads when user clicks play again button
    playAgain.addEventListener("click", () => {
        location.reload(false);
    });
}
