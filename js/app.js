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
    // Store the shuffled array in a variable
    let shuffleResult = shuffle(array);
    // Add the shuffled icons to the page
    shuffleResult.forEach(function (element, index) {
        const card = document.querySelectorAll('.card > i')[index];
        card.className = element;
        cardClick();
    });
}
// Call the resetGame function for testing
resetGame();

//set up event listener for the card
function cardClick() {
    "use strict";
    let i;
    for (i = 0; i < 16; i += 1) {
        const card = document.querySelectorAll('.card')[i];
        card.addEventListener('click', displaySymbol); // run displaySymbol function when card is clicked
    }
}

// display the clicked card
function displaySymbol(event) {
    "use strict";
    event.target.classList.add("open", "show");
    cardArray(event);
}

function cardArray(event) {
	   "use strict";
    let findIcon = event.target.querySelector('i');
    let icon = findIcon.className;
    openCards(icon);

}

function openCards(icon) {

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