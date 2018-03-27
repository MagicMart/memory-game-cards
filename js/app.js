/*
 * Create a list that holds all of your cards
 */

const array = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let openCardsArr = [];
let moves = 0;






// Shuffle function from http://stackoverflow.com/a/2450976 - adapted
function shuffle(array) {
    "use strict";
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetGame() {
    "use strict";
    moves = 0;
    // Store the shuffled array in a variable
    let shuffleResult = shuffle(array);
    // Add the shuffled icons to the page
    shuffleResult.forEach(function(element, index) {
        const card = document.querySelectorAll('.card > i')[index];
        card.className = element;
    });
    cardClick();
}
// Call the resetGame function for testing
resetGame();

//set up event listener for the card
function cardClick() {
    "use strict";

    const deck = document.querySelector('.deck');
    deck.addEventListener('click', displaySymbol);
    // run displaySymbol function when card is clicked
    //true - The event handler is executed in the capturing phase

}

function moveCounter() {
    "use strict";
    moves += 1;
    const moveElement = document.querySelector('span');
    moveElement.textContent = moves;
}

// display the clicked card
function displaySymbol(e) {
    "use strict";
    if (e.target && e.target.className === "card") {
        const eventTarget = e.target;
        // eventTarget.removeEventListener('click', displaySymbol);
        eventTarget.className = "card open show";
        whatSymbol(eventTarget);
        // call move counter function
        moveCounter();
    }

}

// Find the symbol that was in the clicked card
function whatSymbol(eventTarget) {
    "use strict";
    let findIcon = eventTarget.querySelector('i');
    let icon = findIcon.className;
    // Send symbol and the event.target data for its card to a function
    holdCards(icon, eventTarget);

}


function holdCards(icon, eventTarget) {
    "use strict";
    openCardsArr.push(icon);
    openCardsArr.push(eventTarget);
    //check to see if cards match
    if (openCardsArr.length !== 4) {
        // openCardsArr[1].eventTarget.removeEventListener('click', displaySymbol, true); // Make sure user can't match by clicking on the same square
        return;
    }
    if (openCardsArr[0] === openCardsArr[2]) {
        matchCards();
    } else {
        // openCardsArr[1].addEventListener('click', displaySymbol, true); // Reintroduce event listener. See above.
        closeCards();
    }

}

function matchCards() {
    // let icon1 = openCardsArr[0];
    let eventTarget1 = openCardsArr[1];
    // let icon2 = openCardsArr[2];
    let eventTarget2 = openCardsArr[3];
    eventTarget1.className = "card open match"
    // eventTarget1.classList.add("match");
    eventTarget2.className = "card open match"
    // eventTarget2.classList.add("match");
    // eventTarget1.removeEventListener('click', displaySymbol);
    // eventTarget2.removeEventListener('click', displaySymbol);
    openCardsArr = [];

}

function closeCards() {

    let eventTarget1 = openCardsArr[1];
    let eventTarget2 = openCardsArr[3];
    eventTarget1.id = "incorrect";
    eventTarget2.id = "incorrect";
    setTimeout(pause, 200);

    function pause() {
        eventTarget1.id = "";
        eventTarget2.id = "";
        eventTarget1.className = "card";
        eventTarget2.className = "card";
        // eventTarget1.addEventListener('click', displaySymbol);
        // eventTarget2.addEventListener('click', displaySymbol);
        openCardsArr = [];

    }

}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */