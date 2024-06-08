// display player proficiecy choice
const displayProficiencyChoice = playerNumber => {
    if (document.getElementById(`player${playerNumber}Hero`).value) {
        document.getElementById(`player${playerNumber}Proficiency`).style.display = "initial";
    }
    else {
        document.getElementById(`player${playerNumber}Proficiency`).style.display = "none";
    }
}
document.getElementById("player3Hero").onchange = () => {
    displayProficiencyChoice(3);
}
document.getElementById("player4Hero").onchange = () => {
    displayProficiencyChoice(4);
}

// display game
//document.getElementById("submitPlayers").onclick = () => {
    document.getElementsByTagName("MAIN")[0].style.display = "flex";
    let activeGame = document.getElementById("game").value;
    const attackToken = "<img src=\"./images/attackToken.png\" alt=\"attack token\">";
    const healthToken = "<img src=\"images/healthTracker.png\" alt=\"Health Token\">";

    // convert card name to src
    const src = name => {
        return `${name[0].toLowerCase()}${name.substring(1).replaceAll(" ", "").replaceAll("'", "")}.png`;
    };

    // some cards give the players a choice of action
    const playerChoice = choices => {
        const playerChoiceElement = document.getElementById("playerChoice");
        playerChoiceElement.style.display = "grid";
        let gridTemplateColumns = "";
        for (let i = 1; i <= choices; i++) {
            gridTemplateColumns += ` ${100 / choices}%`;
            playerChoiceElement.innerHTML += `<div class="choice" id="choice${i}"></div>`;
        }
        playerChoiceElement.style.gridTemplateColumns = gridTemplateColumns.substring(1);
        playerChoiceElement.onclick = () => {
            playerChoiceElement.style.display = "none";
            for (let i = 1; i < choices; i++) {
                document.getElementById(`choice${i}`).remove();
            }
        }
    }

    // cards
    class Card {
        constructor(name, game, type, cost, effect) {
            this._img = document.createElement("img");
            this._img.src = `./images/${game}/${src(name)}`;
            this._img.className = "card";
            this._img.alt = name;
            this._img.onclick = () => {
                effect();
                this._img.remove();
            }
            this._type = type;
            this._cost = cost;
        }
        get img() {
            return this._img;
        }
        get type() {
            return this._type;
        }
        get cost() {
            return this._cost;
        }
    }
    const alohomoraEffect = () => {activePlayer.influence++;};
    const alohomoraHarry1 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry2 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry3 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry4 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry5 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry6 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry7 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const firebolt = new Card("Firebolt", "Game 1", "item", 0, () => {activePlayer.attack++;}); // TO-DO: add coin if villain defeat
    const hedwig = new Card("Hedwig", "Game 1", "ally", 0, () => {playerChoice(2); document.getElementById("choice1").innerHTML = attackToken; document.getElementById("choice1").onclick = () => {activePlayer.attack++}; document.getElementById("choice2").innerHTML = healthToken + healthToken; document.getElementById("choice2").onclick = () => {activePlayer.health += 2};});
    const harryStartingCards = [alohomoraHarry1, alohomoraHarry2, alohomoraHarry3, alohomoraHarry4, alohomoraHarry5, alohomoraHarry6, alohomoraHarry7, firebolt, hedwig]; // TO-DO: add Harry's starting cards

    // players
    class Player {
        constructor(hero, proficiency) {
            this._hero = hero;
            this._heroImage = `<img id="playerHero" src="./images/${parseInt(activeGame[activeGame.length - 1]) < 3 ? "Game 1" : (parseInt(activeGame[activeGame.length - 1]) < 7 ? "Game 3" : "Game 7")}/${src(hero)}" alt="${hero}">`;
            this._proficiency = proficiency;
            this._proficiencyImage = `<img id="playerHero" src="./images/Game 6/${src(proficiency)}" alt="${proficiency}">`
            this._health = 10;
            this._attack = 0;
            this._influence = 0;
            this._draw = [];
            if (hero === "Harry Potter") this._draw = harryStartingCards;
            // TO-DO: add other heroes
            this._hand = [];
            this._discard = [];
        }
        get hero() {
            return this._hero;
        }
        get heroImage() {
            return this._heroImage;
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
        set health(health) {
            // sets health
            this._health = health;
            if (this._health < 0) {
                this._health = 0;
            }
            else if (this._health > 10) {
                this._health = 10;
            }

            // adjusts health trackers
            const healthTracker = document.getElementById("healthTracker");
            healthTracker.style.left = `${10.3 + 8.3 * (9 - this._health)}%`;
            if (activePlayer.health % 2 === 1) {
                healthTracker.style.top = "33%";
            }
            else {
                healthTracker.style.top = "12%";
            }
        }
        get attack() {
            return this._attack;
        }
        set attack(attack) {
            // sets attack
            this._attack = attack;
            if (this._attack < 0) {
                this._attack = 0;
            }

            // adds attack tokens to board
            document.getElementById("attackTokens").innerHTML = "";
            for (let i = 0; i < attack; i++) {
                document.getElementById("attackTokens").innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
            }
        }
        get influence() {
            return this._influence;
        }
        set influence(influence) {
            // sets influence
            this._influence = influence;
            if (this.influence < 0) {
                this._influence = 0;
            }

            // adds influence tokens to board
            document.getElementById("influenceTokens").innerHTML = "";
            for (let i = 0; i < this.influence; i++) {
                document.getElementById("influenceTokens").innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
            }
        }
        get draw() {
            return this._draw;
        }
        get hand() {
            return this._hand;
        }
        get discard() {
            return this._discard;
        }

        shuffle() {
            // shuffle discard pile
            // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            let array = this._discard;
            let currentIndex = array.length;          
            // While there remain elements to shuffle...
            while (currentIndex != 0) {          
              // Pick a remaining element...
              let randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }

            // add discard pile to draw pile
            for (let i = 0; i < this.discard.length; i++) {
                this._draw.push(this.discard[0]);
                this._discard.shift();
            }
        }
        drawCards(numberOfCards) {
            for (let i = 0; i < numberOfCards; i++) {
                // moves a card from the draw pile to your hand
                if (this.draw.length > 0) {
                    this._hand.push(this.draw[0]);
                    this._draw.shift();
                    document.getElementById("playerHand").appendChild(this.hand[this.hand.length - 1].img);
                }
                // shuffles the discard pile into the draw pile
                else {
                    this.shuffle();
                    i--;
                }
            }
        }
    }
    const player1 = new Player(document.getElementById("player1Hero").value, document.getElementById("player1Proficiency").value);
    const player2 = new Player(document.getElementById("player2Hero").value, document.getElementById("player2Proficiency").value);
    const players = [player1, player2];
    if (document.getElementById("player3Hero").value) players.push(new Player(document.getElementById("player3Hero").value, document.getElementById("player3Proficiency").value));
    if (document.getElementById("player4Hero").value) players.push(new Player(document.getElementById("player4Hero").value, document.getElementById("player4Proficiency").value));
    let activePlayer = players[0];

    // locations
    class Location {
        constructor(name, number, spaces) {
            this._img = `<img id="location${number}" class="location" src="./images/${activeGame}/${name[0].toLowerCase() + name.substring(1).replaceAll(" ", "").replaceAll("'", "")}.png" alt="${name}">`;
            this._spaces = spaces;
            this._game = activeGame;
        }
        get img() {
            return this._img;
        }
        get spaces() {
            return this._spaces;
        }
        get game() {
            return this._game;
        }
    }
    const castleGates = new Location("Castle Gates", 1, 5);
    const hagridsHut = new Location("Hagrid's Hut", 2, 6);
    const greatHall = new Location("Great Hall", 3, 7);
    let locations = [castleGates];

    // dark arts events
    class DarkArtsEvent {
        constructor(name, effect) {
            this._img = `<img class="darkArtsEvent" src="./images/${activeGame}/${src(name)}" alt="${name}">`;
            this._effect = effect;
        }
        get img() {
            return this._img;
        }
        effect() {
            this._effect();
        }
    }
    const menacingGrowl = new DarkArtsEvent("Menacing Growl", () => {}); // TO-DO: add effect
    let darkArtsEvents = [menacingGrowl];

    // villains
    class Villain {
        constructor(name, type, health, healthType, effect, reward) {
            this._img = `<img class="villain" src="./images/${activeGame}/${src(name)}" alt="${name}">`;
            this._type = type;
            this._health = health;
            this._healthType = healthType;
            this._effect = effect;
            this._reward = reward;
        }
        get img() {
            return this._img;
        }
        get type() {
            return this._type;
        }
        get health() {
            return this._health;
        }
        set health(health) {
            this._health = health;
        }
        get healthType() {
            return this._healthType;
        }
        effect() {
            this._effect();
        }
        reward() {
            this._reward();
        }
    }
    const troll = new Villain("Troll", "creature", 7, "health", () => {}, () => {});
    let villains = [troll];

    // events (horcruxes)
    class Event {
        constructor(name, effect, reward) {
            this._img = `<img class="event" src="./images/${activeGame}/${src(name)}" alt="${name}">`;
            this._effect = effect;
            this._reward = reward;
        }
        get img() {
            return this._img;
        }
        effect() {
            this._effect();
        }
        reward() {
            this._reward();
        }
    }
    const horcrux1 = new Event("Horcrux 1", () => {}, () => {});
    let events = [horcrux1];

    // display cards in order
    const stackCards = array => {
        return array.reduce((prev, curr) => {return prev.concat(curr.img);}, array[0].img);
    }

    // display game
    document.getElementsByTagName("MAIN")[0].innerHTML = `<div id="gameBoardContainer">
        <img id="gameBoard" src="./images/board.png" alt="game board">
        <div id="locations">
            ${stackCards(locations)}
        </div>
        <div id="darkArtsEvents">
            ${stackCards(darkArtsEvents)}
        </div>
        <div id="villainDraw">
            ${stackCards(villains)}
        </div>
        <div id="events">
            ${stackCards(events)}   
        </div>
        <div id="villainDiscard">
            ${stackCards(villains)}
        </div>
        <div class="activeVillain" id="villain1">
            ${stackCards(villains)}
        </div>
        <div class="activeVillain" id="villain2">
            ${stackCards(villains)}
        </div>
        <div class="activeVillain" id="villain3">
            ${stackCards(villains)}
        </div>
        <div class="villainDamage" id="villain1Damage"></div>
        <div class="villainDamage" id="villain2Damage"></div>
        <div class="villainDamage" id="villain3Damage"></div>
    </div>
    <div id=playerContainer>
        <div style="display: flex">
            ${activePlayer.heroImage}
            ${activePlayer.proficiencyImage}
        </div>
        <div id="playerBoardContainer">
            <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
            <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
            <div id="attackTokens"></div>
            <div id="influenceTokens"></div>
        </div>
        <div id="playerHand"></div>
    </div>
    <div id="playerChoice"></div>`;
    activePlayer.drawCards(activePlayer.draw.length);
    document.getElementById("healthTracker").onclick = () => {
        activePlayer.health--;
    }

    // click dark arts event to flip it over
    for (let i = 0; i < document.getElementsByClassName("darkArtsEvent").length; i++) {
        const darkArtsEvent = document.getElementsByClassName("darkArtsEvent")[i];
        darkArtsEvent.onclick = () => {
            darkArtsEvent.style.opacity = "1";
            darkArtsEvent.style.transform = "rotateY(0)";
            darkArtsEvent.style.translate = "140%";
        }
    }

    // deal damage by clicking on a villain or villain's damage area
    for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
        const dealDamage = () => {
            activePlayer.attack--;
            document.getElementsByClassName("villainDamage")[i].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
        }
        document.getElementsByClassName("activeVillain")[i].onclick = dealDamage;
        document.getElementsByClassName("villainDamage")[i].onclick = dealDamage;
    }
//}