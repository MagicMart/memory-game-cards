// @ts-check

(function() {
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

    let state = {};

    /**
     * Shuffle the card names
     * @param  {Array<string>} arr
     * @return {Array<string>} the shuffled cards
     */
    function shuffle(arr) {
        return [...arr].sort(() => 0.5 - Math.random());
    }

    function setCards() {
        state.heldCards = [];
        state.moves = 0;
        state.matchedCards = 0;
        state.timeFunc && clearInterval(state.timeFunc);
        state.seconds = -1;
        state.stars = 3;
        document.querySelector(".moves").textContent = "000";
        document.querySelector(".seconds").textContent = "000";

        // Make sure all cards are closed
        const cards = document.querySelectorAll(".card");
        Array.from(cards).forEach(card => (card.className = "card"));
        /**@type {NodeList} */
        const starsEl = document.querySelectorAll(".stars i");
        starsEl.forEach(
            /** @param {HTMLElement} star*/
            star => (star.style.color = "gold")
        );

        // setTimeout: make sure freshly shuffled cards aren't
        // briefly revealed before being closed on a restart
        const icons = document.querySelectorAll(".card > i");
        setTimeout(() => {
            shuffle(arr).forEach((element, index) => {
                icons[index].className = element;
            });
            document.querySelector(".deck").addEventListener("click", control);
            document
                .querySelector(".restart")
                .addEventListener("click", setCards, {once: true});
        }, 200);
    }

    function minusStar() {
        let index;
        if (state.stars === 3) {
            index = 0;
        } else if (state.stars === 2) {
            index = 1;
        }
        const starElement = document.querySelectorAll(".stars i")[index];
        // @ts-ignore
        starElement.style.color = "black";
        state.stars -= 1;
    }

    function moveCounter() {
        state.moves += 1;
        let movesStr = String(state.moves);
        const moveElement = document.querySelector(".moves");
        // @ts-ignore
        moveElement.textContent = movesStr.padStart(3, "0");
    }
    /**
     * @param {boolean} tick
     */
    function myTimer(tick = true) {
        if (!tick) {
            clearInterval(state.timeFunc);
            return;
        }
        if (state.seconds === -1) {
            state.timeFunc = setInterval(myTimer, 1000);
        }
        state.seconds += 1;
        let secondsStr = String(state.seconds);
        // @ts-ignore
        document.querySelector(".seconds").textContent = secondsStr.padStart(
            3,
            "0"
        );
    }
    /**
     * @param {object} e
     */
    function openCard(e) {
        e.target.className = "card open show";
    }

    /**
     * Find the symbol that was in the clicked card
     * @param  {object} eventTarget
     * @return {string} icon
     */
    function getSymbol(eventTarget) {
        return eventTarget.querySelector("i").className;
    }

    function checkCards() {
        return state.heldCards[0] === state.heldCards[2];
    }
    /**
     * @param  {string} icon
     * @param  {object} eventTarget
     */
    function holdCards(icon, eventTarget) {
        state.heldCards = [...state.heldCards, icon, eventTarget];
    }

    function matchCards() {
        state.heldCards[1].className = "card open match";
        state.heldCards[3].className = "card open match";
        state.heldCards = [];
        state.matchedCards += 1;
    }

    function closeCards() {
        setTimeout(function pause() {
            state.heldCards[1].className = "card";
            state.heldCards[3].className = "card";
            state.heldCards = [];
        }, 600);
    }

    function win() {
        document.querySelector(".deck").removeEventListener("click", control);
        myTimer(false);
        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
        /** */
        function displayNone() {
            modal.style.display = "none";
        }

        // When the user clicks on <span> (x), close the modal
        span.addEventListener("click", displayNone, {once: true});
        /**
         * @param {object} event
         */
        function windowClick(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", e => windowClick(e), {once: true});

        // Get the moves-modal span
        const movesModal = document.querySelector(".moves-modal");

        // Get the second-modal span
        const secondsModal = document.querySelector(".seconds-modal");

        // Get the stars-modal span
        const starsModal = document.querySelector(".stars-modal");

        // Get play again class
        const playAgain = document.querySelector(".play-again");
        movesModal.textContent = state.moves;
        secondsModal.textContent = state.seconds;
        starsModal.textContent = state.stars;
        /** */
        function restart() {
            modal.style.display = "none";
            setCards();
        }

        // Page reloads when user clicks play again button
        playAgain.addEventListener("click", restart, {once: true});
    }
    /**
     * @param  {object} e
     */
    function control(e) {
        const eventTarget = e.target;
        if (state.seconds === -1) {
            myTimer();
        }
        if (state.heldCards.length === 4) {
            return;
        }
        if (eventTarget && eventTarget.className === "card") {
            openCard(e);
        } else {
            return;
        }
        const icon = getSymbol(eventTarget);
        holdCards(icon, eventTarget);
        if (state.heldCards.length === 2) {
            return;
        }
        moveCounter();
        if (state.moves === 16 || state.moves === 32) {
            minusStar();
        }
        const match = checkCards();
        if (match) {
            matchCards();
        } else {
            closeCards();
            return;
        }
        if (state.matchedCards === 8) {
            win();
        }
    }

    setCards();
})();
