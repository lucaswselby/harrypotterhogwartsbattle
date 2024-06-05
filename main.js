//document.getElementById("submitPlayers").onclick = () => {
    document.getElementsByTagName("MAIN")[0].style.display = "flex";

    class Player {
        constructor(character) {
            this._character = character;
            this._health = 10;
        }
        get character() {
            return this._character;
        }
        get health() {
            return this._health;
        }
        loseHealth(health) {
            this._health -= health;
            if (this._health < 0) {
                this._health = 0;
            }
            else if (this._health > 10) {
                this._health = 10;
            }
        }
    }
    const player1 = new Player(document.getElementById("player1Character").value);
    const player2 = new Player(document.getElementById("player2Character").value);
    let activePlayer = player1;

    document.getElementsByTagName("MAIN")[0].innerHTML = `<div id="gameBoardContainer">
        <img id="gameBoard" src="./images/board.png" alt="game board">
    </div>
    <div id="playerBoardContainer">
        <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
        <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
    </div>`;

    const loseHealth = health => {
        activePlayer.loseHealth(health);
        const healthTracker = document.getElementById("healthTracker");
        healthTracker.style.left = `${10.3 + 8.3 * (9 - activePlayer.health)}%`;
        if (activePlayer.health % 2 === 1) {
            healthTracker.style.top = "33%";
        }
        else {
            healthTracker.style.top = "12%";
        }
    }
    const gainHealth = health => {
        loseHealth(-1 * health)
    }
//}