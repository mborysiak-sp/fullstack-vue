window.addEventListener("DOMContentLoaded", () => {
    newGame();
});

function guess() {

    let guess = document.getElementById("guess").value;

    let newGuess = document.createElement("div");

    let newGuessLeft = document.createElement("div");

    let newGuessRight = document.createElement("div");

    let hLeft = document.createElement("h2");

    let hRight = document.createElement("h3");

    let remaining = parseInt(document.getElementById("unrated").innerHTML);

    axios
        .patch("/game", {
            guess: guess,
        })
        .then((resp) => {
            let black = resp.data.blackCount;

            let white = resp.data.whiteCount;

            hRight.innerHTML = "Black: " + black + " &emsp; White: " + white;

            if (remaining === 0) {
                document.getElementById("guess").style.visibility = "hidden";

                document.getElementById("guess-btn").style.visibility = "hidden";
            }
        });

    hLeft.innerHTML = "Guess: " + guess;

    newGuess.className = "log-item";

    newGuessRight.appendChild(hRight);

    newGuessLeft.appendChild(hLeft);

    newGuess.appendChild(newGuessLeft);

    newGuess.appendChild(newGuessRight);

    document.getElementById("log").prepend(newGuess);

    let triesLeft = document.getElementById("tries-left").innerHTML;

    if (isNaN(triesLeft)) {
        return;
    }

    document.getElementById("tries-left").innerHTML = triesLeft - 1;

    if (triesLeft - 1 !== 0) {
        return;
    }

    document.getElementById("guess").style.visibility = "hidden";
    document.getElementById("guess-btn").style.visibility = "hidden";
}

function newGame() {
    document.getElementById("log").innerHTML = "";

    let size = parseInt(document.getElementById("size").value);

    let dim = parseInt(document.getElementById("dim").value);

    let max = parseInt(document.getElementById("max").value);

    let maxguess = dim;

    for (let i = 1; i < size; i++) {
        maxguess *= 10;

        maxguess += dim;
    }

    document.getElementById("guess").setAttribute("max", maxguess);

    document.getElementById("guess").style.visibility = "visible";

    document.getElementById("guess-btn").style.visibility = "visible";

    axios
        .post("/game", {
            size: size,
            dim: dim,
            max: max,
        })
        .then((resp) => {
            console.log("Odpowiedź serwera na POST /game:");
            console.dir(resp.data);
        });

    if (max === 0) {
        max = "&infin;";
    }

    document.getElementById("black-score").innerHTML = 0;

    document.getElementById("white-score").innerHTML = 0;

    document.getElementById("unrated").innerHTML = size;

    document.getElementById("tries-left").innerHTML = max;
}