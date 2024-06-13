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
    const attackToken = "<img src=\"./images/attackToken.png\" alt=\"Choose Attack Token\" style=\"width: 50%;\">";
    const influenceToken = "<img src=\"./images/influenceToken.png\" alt=\"Choose Influece Token\" style=\"width: 50%;\">";
    const healthToken = "<img src=\"images/healthTracker.png\" alt=\"Choose Health Token\" style=\"width: 50%;\">";
    const hogwartsCardBack = "<img src=\"./images/hogwartsCardBack.png\" alt=\"Draw card\" style=\"width: 50%;\">";

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
            const choice = document.createElement("div");
            choice.className = "choice";
            choice.id = `choice${i}`;
            playerChoiceElement.appendChild(choice);
        }
        playerChoiceElement.style.gridTemplateColumns = gridTemplateColumns.substring(1);
        playerChoiceElement.onclick = () => {
            playerChoiceElement.style.display = "none";
            for (let i = 1; i <= choices; i++) {
                document.getElementById(`choice${i}`).remove();
            }
        }
    }

    // shuffles cards in a random order
    const shuffle = array => {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
    }

    // cards
    class Card {
        constructor(name, game, type, cost, effect) {
            this._img = document.createElement("img");
            this._img.src = `./images/${game}/${src(name)}`;
            this._img.className = "card";
            this._img.alt = name;
            this._effect = effect;
            this.generateOnClick();
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
        generateOnClick() {
            this._img.onclick = () => {
                this._effect();
                activePlayer.discardAt(activePlayer.hand.indexOf(this));
            }
        }
    }

    // Harry starting cards
    const alohomoraEffect = () => {activePlayer.influence++;};
    const alohomoraHarry1 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry2 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry3 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry4 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry5 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry6 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const alohomoraHarry7 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect);
    const firebolt = new Card("Firebolt", "Game 1", "item", 0, () => {activePlayer.attack++;});
    const hedwig = new Card("Hedwig", "Game 1", "ally", 0, () => {playerChoice(2); document.getElementById("choice1").innerHTML = attackToken; document.getElementById("choice1").onclick = () => {activePlayer.attack++}; document.getElementById("choice2").innerHTML = `${healthToken + healthToken}`; document.getElementById("choice2").onclick = () => {activePlayer.health += 2};});
    const invisibilityCloak = new Card("Invisibility Cloak", "Game 1", "item", 0, () => {activePlayer.influence++;});
    const harryStartingCards = [alohomoraHarry1, alohomoraHarry2, alohomoraHarry3, alohomoraHarry4, alohomoraHarry5, alohomoraHarry6, alohomoraHarry7, firebolt, hedwig, invisibilityCloak];

    // Hogwarts cards
    const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, () => {players.forEach(player => {player.attack++; player.influence++; player.health++; player.drawCards(1)});});
    const descendo = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;});
    const essenceOfDittany = new Card("Essence of Dittany", "Game 1", "item", 2, () => {playerChoice(players.length); for (let i = 0; i < players.length; i++) { const choice = document.getElementsByClassName("choice")[i]; choice.appendChild(players[i].heroImage); choice.onclick = () => {players[i].health += 2;};}});
    const goldenSnitch = new Card("Golden Snitch", "Game 1", "item", 5, () => {activePlayer.influence += 2; activePlayer.drawCards(1);});
    const incendio = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);});
    const lumos = new Card("Lumos", "Game 1", "spell", 4, () => {players.forEach(player => {player.drawCards(1);});});
    const oliverWood = new Card("Oliver Wood", "Game 1", "ally", 3, () => {activePlayer.attack++;});
    const quidditchGear = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;});
    const reparo = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2); document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});
    const rubeusHagrid = new Card("Rubeus Hagrid", "Game 1", "ally", 4, () => {activeDarkArtsEvent.attack++; players.forEach(player => {player.health++;});});
    let hogwartsCards = [albusDumbledore, descendo, essenceOfDittany, goldenSnitch, incendio, lumos, oliverWood, quidditchGear, reparo, rubeusHagrid];
    // purchase a Hogwarts card
    hogwartsCards.forEach(card => {
        card.img.onclick = () => {
            if (activePlayer.influence >= card.cost) {
                activePlayer.influence -= card.cost;
                activePlayer.discard.push(card);
                card.generateOnClick();
                hogwartsCards.splice(hogwartsCards.indexOf(activeShops[activeShops.indexOf(card)]), 1);
                document.getElementsByClassName("shop")[activeShops.indexOf(card)].getElementsByTagName("IMG")[0].remove();
                //activePlayer.drawCards(5); // DEBUG
            }
        }
    });
    shuffle(hogwartsCards);
    let activeShops = [hogwartsCards[0], hogwartsCards[1], hogwartsCards[2], hogwartsCards[3], hogwartsCards[4], hogwartsCards[5]];
    activeShops = activeShops.sort((a, b) => {return a.cost - b.cost;}); // sorts store by cost

    // players
    class Player {
        constructor(hero, proficiency) {
            this._hero = hero;
            this._heroImage = document.createElement("img");
            this._heroImage.id = "playerHero";
            this._heroImage.src = `./images/${parseInt(activeGame[activeGame.length - 1]) < 3 ? "Game 1" : (parseInt(activeGame[activeGame.length - 1]) < 7 ? "Game 3" : "Game 7")}/${src(hero)}`;
            this._heroImage.alt = hero;
            this._proficiency = proficiency;
            this._proficiencyImage = document.createElement("img");
            this._proficiencyImage.id = "playerProficiency";
            this._proficiencyImage.src = `./images/Game 6/${src(proficiency)}`;
            this._proficiencyImage.alt = proficiency;
            this._health = 10;
            this._attack = 0;
            this._influence = 0;
            this._draw = [];
            this._hand = [];
            this._discard = [];
            if (hero === "Harry Potter") this._discard = harryStartingCards;
            // TO-DO: add other heroes
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
            // Invisibility Cloak effect
            if (this.hand.includes(invisibilityCloak) && health < this.health) {
                health = this.health - 1;
            }

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
            healthTracker.style.left = `${10.3 + 8.3 * (9 - activePlayer.health)}%`; // TO-DO: fix I think
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

        discardAt(index) {
            this._discard.push(this.hand[index]);
            document.getElementById("playerHand").removeChild(this.hand[index].img);
            this._hand.splice(index, 1);
        }
        shuffle() {
            // shuffle discard pile
            shuffle(this._discard)

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
        constructor(name, number, spaces, darkArtsEventDraws) {
            this._name = name;
            this._img = `<img id="location${number}" class="location" src="./images/${activeGame}/${name[0].toLowerCase() + name.substring(1).replaceAll(" ", "").replaceAll("'", "")}.png" alt="${name}">`;
            this._number = number;
            this._spaces = spaces;
            this._darkArtsEventDraws = darkArtsEventDraws;
            this._game = activeGame;
            this._added = 0;
        }
        get img() {
            return this._img;
        }
        get number() {
            return this._number;
        }
        get spaces() {
            return this._spaces;
        }
        get game() {
            return this._game;
        }
        get added() {
            return this._added;
        }
        set added(added) {
            this._added = added;
        }
        addToLocation() {
            this.added++;
            if (this.added > this.spaces) {
                // Game Over
                if (this.number === locations.length) {
                    alert("Game Over");
                    // TO-DO: Game Over
                }
                // new location
                else {
                    activeLocation = locations[this.number];
                    document.getElementById(`location${this.number}`).style.display = "none";
                }
            }

            // Draco Malfoy effect
            if (activeVillains.includes(dracoMalfoy)) {
                activePlayer.health -= 2;
            }
        }
        removeFromLocation() {
            if (this === locations[0]) {
                if (this.added > 0) {
                    this.added--;
                }
            }
            else {
                if (this.added === 0) {
                    activeLocation = locations[this.number - 2];
                    document.getElementById(`location${this.number - 1}`).style.display = "initial";
                }
                else {
                    this.added--;
                }
            }
        }
    }
    const diagonAlley = new Location("Diagon Alley", 1, 4, 1);
    const mirrorOfErised = new Location("Mirror of Erised", 2, 4, 1);
    const castleGates = new Location("Castle Gates", 1, 5, 1);
    const hagridsHut = new Location("Hagrid's Hut", 2, 6, 2);
    const greatHall = new Location("Great Hall", 3, 7, 3);
    let locations = [diagonAlley, mirrorOfErised];
    let activeLocation = locations[0];

    // dark arts events
    class DarkArtsEvent {
        constructor(name, effect) {
            this._name = name;
            this._effect = effect;
            this.generateImg();
        }
        get img() {
            return this._img;
        }
        generateImg() {
            this._img = document.createElement("img");
            this._img.src = `./images/${activeGame}/${src(this._name)}`;
            this._img.className = "darkArtsEvent";
            this._img.alt = this._name;
        }
        effect() {
            this._effect();
        }
    }
    const expulso = new DarkArtsEvent("Expulso", () => {activePlayer.health -= 2;});
    const flipendo = new DarkArtsEvent("Flipendo", () => {activePlayer.health--; playerChoice(activePlayer.hand.length); for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementById(`choice${i + 1}`).innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementById(`choice${i + 1}`).onclick = () => {activePlayer.discardAt(i);};}});
    const heWhoMustNotBeNamed = new DarkArtsEvent("He Who Must Not Be Named", () => {activeLocation.addToLocation()});
    const petrification = new DarkArtsEvent("Petrification", () => {players.forEach(player => {player.health--;});}); // TO-DO: no drawn cards this turn
    //const menacingGrowl = new DarkArtsEvent("Menacing Growl", () => {}); // TO-DO: add effect
    let darkArtsEvents = [expulso, flipendo, heWhoMustNotBeNamed, petrification];
    let activeDarkArtsEvent = darkArtsEvents[0];

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
            if (this.health <= 0) {
                this.reward();

                // Firebolt effect
                if (activePlayer.hand.includes(firebolt)) {
                    activePlayer.influence++;
                }
                // Oliver Wood effect
                if (activePlayer.hand.includes(oliverWood)) {
                    playerChoice(players.length);
                    for (let i = 0; i < players.length; i++) {
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            players[i].health += 2;
                        };
                    }
                }
            }
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
    const dracoMalfoy = new Villain("Draco Malfoy", "villain", 6, "health", () => {}, () => {}); // TO-DO: add reward
    const troll = new Villain("Troll", "creature", 7, "health", () => {}, () => {}); // TO-DO: add effect and reward
    let villains = [dracoMalfoy];
    let activeVillains = [villains[0]];

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
    let activeEvent = events[0];

    // display cards in order
    const stackCards = array => {
        return array.reduce((prev, curr) => {return prev.concat(curr.img);}, array[0].img);
    }

    // display game
    document.getElementsByTagName("MAIN")[0].innerHTML = `<div id="gameBoardContainer">
        <img id="gameBoard" src="./images/board.png" alt="game board">
        <div id="locations">
            ${stackCards(locations.toReversed())}
        </div>
        <div id="darkArtsEvents">
            <img id="darkArtsEventBack" src="./images/darkArtsEventBack.png" alt="Back of Dark Arts Event card">
        </div>
        <div id="villainDraw">
            <img class="villain" src="./images/villainBack.png" alt="Back of villain card">
        </div>
        <div id="events">
            ${game === "Game 7" ? stackCards(events) : ""}   
        </div>
        <div id="villainDiscard">
            ${stackCards(villains)}
        </div>
        <div class="activeVillain" id="villain1">
            ${activeVillains[0].img}
        </div>
        <div class="activeVillain" id="villain2">
            ${activeVillains.length > 1 ? activeVillains[1].img : ""}
        </div>
        <div class="activeVillain" id="villain3">
            ${activeVillains.length > 2 ? activeVillains[2].img : ""}
        </div>
        <div class="villainDamage" id="villain1Damage"></div>
        <div class="villainDamage" id="villain2Damage"></div>
        <div class="villainDamage" id="villain3Damage"></div>
        <div id="hogwartsCardBack">
            <img src="./images/hogwartsCardBack.png" alt="Back of Hogwarts card">
        </div>
        <div class="shop" id="shop1"></div>
        <div class="shop" id="shop2"></div>
        <div class="shop" id="shop3"></div>
        <div class="shop" id="shop4"></div>
        <div class="shop" id="shop5"></div>
        <div class="shop" id="shop6"></div>
    </div>
    <div id=playerContainer>
        <div id="heroImage" style="display: flex"></div>
        <div id="playerBoardContainer">
            <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
            <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
            <div id="attackTokens"></div>
            <div id="influenceTokens"></div>
        </div>
        <div id="playerHand"></div>
    </div>
    <div id="playerChoice"></div>`;
    document.getElementById("heroImage").appendChild(activePlayer.heroImage);
    document.getElementById("heroImage").appendChild(activePlayer.proficiencyImage);
    activePlayer.drawCards(5);
    document.getElementById("healthTracker").onclick = () => {
        activePlayer.health--;
    }

    // click locations to add to location
    for (let i = 0; i < document.getElementsByClassName("location").length; i++) {
        document.getElementsByClassName("location")[i].onclick = () => {
            activeLocation.addToLocation();
        }
    }

    // click dark arts event to flip it over
    let lastCardImg = null;
    document.getElementById("darkArtsEvents").onclick = () => {
        document.getElementById("darkArtsEventBack").style.display = "initial";
        const darkArtsEventsElement = document.getElementById("darkArtsEvents");
        darkArtsEventsElement.appendChild(activeDarkArtsEvent.img);
        activeDarkArtsEvent.img.classList.toggle("flipped");
        activeDarkArtsEvent.effect();

        // remove previous dark arts card
        if (darkArtsEventsElement.contains(lastCardImg) && darkArtsEventsElement.contains(darkArtsEvents[0].img)) {
            darkArtsEventsElement.removeChild(lastCardImg);
        }
        else if (darkArtsEvents.indexOf(activeDarkArtsEvent) > 0) {
            darkArtsEventsElement.removeChild(darkArtsEvents[darkArtsEvents.indexOf(activeDarkArtsEvent) - 1].img);
        }

        // updates activeDarkArtsEvent
        if (darkArtsEvents.indexOf(activeDarkArtsEvent) < darkArtsEvents.length - 1) {
            activeDarkArtsEvent = darkArtsEvents[darkArtsEvents.indexOf(activeDarkArtsEvent) + 1];
        }
        else {
            document.getElementById("darkArtsEventBack").style.display = "none";
            lastCardImg = darkArtsEvents[darkArtsEvents.length - 1].img;
            darkArtsEvents.forEach(darkArtsEvent => {darkArtsEvent.generateImg();});
            // TO-DO: shuffle dark arts events
            activeDarkArtsEvent = darkArtsEvents[0];
        }
    }

    // deal damage by clicking on a villain or villain's damage area
    for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
        const dealDamage = () => {
            if (activePlayer.attack > 0 && document.getElementById(`villain${i + 1}`).getElementsByClassName("villain")[0]) {
                activePlayer.attack--;
                document.getElementsByClassName("villainDamage")[i].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
            }
        }
        document.getElementsByClassName("activeVillain")[i].onclick = dealDamage;
        document.getElementsByClassName("villainDamage")[i].onclick = dealDamage;
    }

    // populate shop
    document.getElementById("shop1").appendChild(activeShops[0].img);
    document.getElementById("shop2").appendChild(activeShops[1].img);
    document.getElementById("shop3").appendChild(activeShops[2].img);
    document.getElementById("shop4").appendChild(activeShops[3].img);
    document.getElementById("shop5").appendChild(activeShops[4].img);
    document.getElementById("shop6").appendChild(activeShops[5].img);
//}
//activePlayer.influence = 8; // DEBUG