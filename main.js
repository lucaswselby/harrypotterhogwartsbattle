// display player proficiecy choice
const displayProficiencyChoice = playerNumber => {
    if (document.getElementById(`player${playerNumber}Character`).value) {
        document.getElementById(`player${playerNumber}Proficiency`).style.display = "initial";
    }
    else {
        document.getElementById(`player${playerNumber}Proficiency`).style.display = "none";
    }
}
document.getElementById("player3Character").onchange = () => {
    displayProficiencyChoice(3);
}
document.getElementById("player4Character").onchange = () => {
    displayProficiencyChoice(4);
}

// display game
//document.getElementById("submitPlayers").onclick = () => {
    document.getElementsByTagName("MAIN")[0].style.display = "flex";

    class Player {
        constructor(character, proficiency) {
            this._character = character;
            this._characterImage = `<img id="playerCharacter" src="./images/${character[0].toLowerCase() + character.replaceAll(" ", "").substring(1)}.png" alt="${character}">`;
            this._proficiency = proficiency;
            this._proficiencyImage = `<img id="playerCharacter" src="./images/${proficiency[0].toLowerCase() + proficiency.replaceAll(" ", "").substring(1)}.png" alt="${proficiency}">`
            this._health = 10;
        }
        get character() {
            return this._character;
        }
        get characterImage() {
            return this._characterImage;
        }
        get proficiency() {
            return this._proficiency;
        }
        get proficiencyImage() {
            return this._proficiencyImage;
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
    const player1 = new Player(document.getElementById("player1Character").value, document.getElementById("player1Proficiency").value);
    const player2 = new Player(document.getElementById("player2Character").value, document.getElementById("player2Proficiency").value);
    const players = [player1, player2];
    if (document.getElementById("player3Character").value) players.push(new Player(document.getElementById("player3Character").value, document.getElementById("player3Proficiency").value));
    if (document.getElementById("player4Character").value) players.push(new Player(document.getElementById("player4Character").value, document.getElementById("player4Proficiency").value));
    let activePlayer = players[0];

    document.getElementsByTagName("MAIN")[0].innerHTML = `<div id="gameBoardContainer">
        <img id="gameBoard" src="./images/board.png" alt="game board">
    </div>
    <div id=playerContainer>
        <div style="display: flex">
            <!-- ${activePlayer.characterImage} -->
            <!-- ${activePlayer.proficiencyImage} -->
        </div>
        <div id="playerBoardContainer">
            <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
            <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
        </div>
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