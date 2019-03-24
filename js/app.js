(function() {
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
    let heldCards = [];
    let moves = 0;
    let matchedCards = 0;
    let notTicking = true;
    let endTimer = false;
    let timeFunc;
    let seconds;
    let stars = 3;
    /**
     * @param  {array} arr
     * @return {array}
     */
    function shuffle(arr) {
        const shuffledArr = [...arr];
        shuffledArr.sort(() => 0.5 - Math.random());
        return shuffledArr;
    }
    /**
     */
    function setCards() {
        heldCards = [];
        moves = 0;
        matchedCards = 0;
        notTicking = true;
        endTimer = false;
        timeFunc && clearInterval(timeFunc);
        seconds = 0;
        stars = 3;
        document.querySelector(".moves").textContent = "000";
        document.querySelector(".seconds").textContent = "000";
        let i;
        // Make sure all cards are closed
        for (i = 0; i < 16; i += 1) {
            document.querySelectorAll(".card")[i].className = "card";
        }
        const starsEl = document.querySelectorAll(".stars i");
        starsEl.forEach((star) => (star.style.color = "gold"));

        // Add the shuffled icons to the page
        shuffle(arr).forEach(function(element, index) {
            const card = document.querySelectorAll(".card > i")[index];
            card.className = element;
        });
        document.querySelector(".deck").addEventListener("click", control);
        document
            .querySelector(".restart")
            .addEventListener("click", setCards, {once: true});
    }

    /**
     */
    function minusStar() {
        let starElement;
        if (stars === 3) {
            starElement = document.querySelectorAll(".stars i")[0];
        }
        if (stars === 2) {
            starElement = document.querySelectorAll(".stars i")[1];
        }
        starElement.style.color = "black";
        stars -= 1;
    }
    /**
     */
    function moveCounter() {
        moves += 1;
        let movesStr = String(moves);
        const moveElement = document.querySelector(".moves");
        moveElement.textContent = movesStr.padStart(3, "0");
    }
    /**
     */
    function myTimer() {
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
    /**
     *
     * @param {object} e
     */
    function openCard(e) {
        e.stopPropagation();
        const eventTarget = e.target;
        eventTarget.className = "card open show";
    }

    // Find the symbol that was in the clicked card
    /**
     * @param  {object} eventTarget
     * @return {string} icon
     */
    function getSymbol(eventTarget) {
        const findIcon = eventTarget.querySelector("i");
        const icon = findIcon.className;
        return icon;
    }
    /**
     * @return{boolean}
     */
    function checkCards() {
        return heldCards[0] === heldCards[2];
    }

    /**
     * @param  {string} icon
     * @param  {object} eventTarget
     */
    function holdCards(icon, eventTarget) {
        heldCards.push(icon);
        heldCards.push(eventTarget);
    }
    /**
     */
    function matchCards() {
        heldCards[1].className = "card open match";
        heldCards[3].className = "card open match";
        heldCards = [];
        matchedCards += 1;
    }
    /**
     */
    function closeCards() {
        const eventTarget1 = heldCards[1];
        const eventTarget2 = heldCards[3];
        eventTarget1.id = "incorrect";
        eventTarget2.id = "incorrect";
        /** */
        function pause() {
            eventTarget1.id = "";
            eventTarget2.id = "";
            eventTarget1.className = "card";
            eventTarget2.className = "card";
            heldCards = [];
        }
        setTimeout(pause, 200);
    }
    /** */
    function win() {
        document.querySelector(".deck").removeEventListener("click", control);
        endTimer = true;
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
        window.addEventListener("click", (e) => windowClick(e), {once: true});

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
        if (notTicking) {
            myTimer();
        }
        if (heldCards.length === 4) {
            return;
        }
        if (e.target && e.target.className === "card") {
            openCard(e);
        } else {
            return;
        }
        const icon = getSymbol(eventTarget);
        holdCards(icon, eventTarget);
        if (heldCards.length === 2) {
            return;
        }
        moveCounter();
        if (moves === 16) {
            minusStar();
        }
        if (moves === 32) {
            minusStar();
        }
        const match = checkCards();
        if (match) {
            matchCards();
        } else {
            closeCards();
            return;
        }
        if (matchedCards === 8) {
            win();
        }
    }

    setCards();
})();
