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

//document.getElementById("submitPlayers").onclick = () => {
    // can't have more than one of each hero
    let continueGame = true;
    for (let i = 0; i < document.getElementsByClassName("playerHero").length - 1; i++) {
        if (document.getElementsByClassName("playerHero")[i].value) {
            for (let j = i + 1; j < document.getElementsByClassName("playerHero").length; j++) {
                if (document.getElementsByClassName("playerHero")[i].value === document.getElementsByClassName("playerHero")[j].value) {
                    continueGame = false;
                }
            }
        }
    }

    // display game
    if (continueGame) {
        document.getElementsByTagName("MAIN")[0].style.display = "flex";
        let activeGame = document.getElementById("game").value;
        const attackToken = "<img src=\"./images/attackToken.png\" alt=\"Choose Attack Token\" style=\"width: 50%;\">";
        const influenceToken = "<img src=\"./images/influenceToken.png\" alt=\"Choose Influece Token\" style=\"width: 50%;\">";
        const healthToken = "<img src=\"images/healthTracker.png\" alt=\"Choose Health Token\" style=\"width: 50%;\">";
        const hogwartsCardBack = "<img src=\"./images/hogwartsCardBack.png\" alt=\"Draw card\" style=\"width: 50%;\">";

        // convert card name to src
        const src = name => {
            return `${name[0].toLowerCase()}${name.substring(1).replaceAll(" ", "").replaceAll("'", "").replaceAll("-", "")}.png`;
        };

        // some cards give the players a choice of action
        // TO-DO: add description of choice (i.e. choose a card to discard)
        const playerChoice = (choices, iterations, populateFunction) => {
            // queue playerChoices in case there are multiple
            if (document.getElementById("playerChoice")) {
                document.getElementById("playerChoice").addEventListener("click", () => {playerChoice(choices, iterations, populateFunction);}); // TO-DO: choices does not update from multiple discard events, like petrification causing a stun, leaving an empty choice for the first stun discard
            }
            else {
                // create playerChoice element
                const playerChoiceElement = document.createElement("div");
                playerChoiceElement.id = "playerChoice";
                playerChoiceElement.className = iterations;

                // add columns to playerChoice
                let gridTemplateColumns = "";
                for (let i = 1; i <= choices; i++) {
                    gridTemplateColumns += ` ${100 / choices}%`;
                    const choice = document.createElement("div");
                    choice.className = "choice";
                    playerChoiceElement.appendChild(choice);
                }
                playerChoiceElement.style.gridTemplateColumns = gridTemplateColumns.substring(1);

                playerChoiceElement.onclick = () => {
                    // remove playerChoice when clicked
                    playerChoiceElement.remove();

                    // increment and display a new playerChoice for multiple iterations
                    if (--iterations > 0) {
                        playerChoice(--choices, iterations, populateFunction);
                    }
                }

                // add playerChoice to main
                document.getElementsByTagName("MAIN")[0].appendChild(playerChoiceElement);
                populateFunction();
            }
        }

        // shuffles cards in a random order
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        const shuffle = array => {
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
            constructor(name, game, type, cost, effect, passive) {
                this._name = name;
                this._img = document.createElement("img");
                this._img.src = `./images/${game}/${src(name)}`;
                this._img.className = "card";
                this._img.alt = name;
                this._effect = effect;
                this.generateOnClick();
                this._type = type;
                this._cost = cost;
                this._passive = passive;
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

                    // Every Flavour Beans effect
                    if (activePlayer.passives.includes(everyFlavourBeans) && this.type === "ally") {
                        activePlayer.attack++;
                    }

                    activePlayer.discardAt(activePlayer.hand.indexOf(this));
                }
            }
            get passive() {
                return this._passive;
            }
        }

        // Harry starting cards
        const alohomoraEffect = () => {activePlayer.influence++;};
        const startingAllyEffect = () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++}; document.getElementsByClassName("choice")[1].innerHTML = `${healthToken + healthToken}`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.health += 2};})};
        const alohomoraHarry1 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry2 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry3 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry4 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry5 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry6 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHarry7 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false);
        const firebolt = new Card("Firebolt", "Game 1", "item", 0, () => {activePlayer.attack++;}, true);
        const hedwig = new Card("Hedwig", "Game 1", "ally", 0, startingAllyEffect, false);
        const invisibilityCloak = new Card("Invisibility Cloak", "Game 1", "item", 0, () => {activePlayer.influence++;}, true);
        const harryStartingCards = [alohomoraHarry1, alohomoraHarry2, alohomoraHarry3, alohomoraHarry4, alohomoraHarry5, alohomoraHarry6, alohomoraHarry7, firebolt, hedwig, invisibilityCloak];

        // Ron starting cards
        const alohomoraRon1 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon2 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon3 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon4 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon5 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon6 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraRon7 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false);
        const cleansweep11 = new Card("Cleansweep 11", "Game 1", "item", 0, () => {activePlayer.attack++;}, true);
        const everyFlavourBeans = new Card("Every Flavour Beans", "Game 1", "item", 0, () => {activePlayer.influence++;}, true);
        const pigwidgeon = new Card("Pigwidgeon", "Game 1", "ally", 0, startingAllyEffect, false);
        const ronStartingCards = [alohomoraRon1, alohomoraRon2, alohomoraRon3, alohomoraRon4, alohomoraRon5, alohomoraRon6, alohomoraRon7, cleansweep11, everyFlavourBeans, pigwidgeon];

        // Hermione starting cards
        const alohomoraHermione1 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione2 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione3 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione4 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione5 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione6 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraHermione7 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false);
        const crookshanks = new Card("Crookshanks", "Game 1", "ally", 0, startingAllyEffect, false);
        const theTalesOfBeedleTheBard = new Card("The Tales of Beedle the Bard", "Game 1", "item", 0, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = influenceToken + influenceToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `ALL Heroes: ${influenceToken}`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.influence++;});};})}, false);
        const timeTurner = new Card("Time Turner", "Game 1", "item", 0, () => {activePlayer.influence++;}, true);
        const hermioneStartingCards = [alohomoraHermione1, alohomoraHermione2, alohomoraHermione3, alohomoraHermione4, alohomoraHermione5, alohomoraHermione6, alohomoraHermione7, crookshanks, theTalesOfBeedleTheBard, timeTurner];

        // Neville starting cards
        const alohomoraNeville1 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville2 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville3 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville4 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville5 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville6 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const alohomoraNeville7 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false);
        const mandrake = new Card("Mandrake", "Game 1", "item", 0, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++}; document.getElementsByClassName("choice")[1].innerHTML = `Any one Hero${healthToken}${healthToken}`; document.getElementsByClassName("choice")[1].onclick = () => {playerChoice(players.length, 1); for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage); document.getElementsByClassName("choice")[i].onclick = () => {players[i].health += 2;};}};})}, false);
        const remembrall = new Card("Remembrall", "Game 1", "item", 0, () => {activePlayer.influence++;}, false);
        const trevor = new Card("Trevor", "Game 1", "ally", 0, startingAllyEffect, false);
        const nevilleStartingCards = [alohomoraNeville1, alohomoraNeville2, alohomoraNeville3, alohomoraNeville4, alohomoraNeville5, alohomoraNeville6, alohomoraNeville7, mandrake, remembrall, trevor];

        // Hogwarts cards
        const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, () => {players.forEach(player => {player.attack++; player.influence++; player.health++; player.drawCards(1)});}, false);
        const descendo1 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false);
        const descendo2 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false);
        const essenceOfDittany1 = new Card("Essence of Dittany", "Game 1", "item", 2, () => {playerChoice(players.length, 1, () => {for (let i = 0; i < players.length; i++) { const choice = document.getElementsByClassName("choice")[i]; choice.appendChild(players[i].heroImage); choice.onclick = () => {players[i].health += 2;};}})}, false);
        const essenceOfDittany2 = new Card("Essence of Dittany", "Game 1", "item", 2, () => {playerChoice(players.length, 1, () => {for (let i = 0; i < players.length; i++) { const choice = document.getElementsByClassName("choice")[i]; choice.appendChild(players[i].heroImage); choice.onclick = () => {players[i].health += 2;};}})}, false);
        const essenceOfDittany3 = new Card("Essence of Dittany", "Game 1", "item", 2, () => {playerChoice(players.length, 1, () => {for (let i = 0; i < players.length; i++) { const choice = document.getElementsByClassName("choice")[i]; choice.appendChild(players[i].heroImage); choice.onclick = () => {players[i].health += 2;};}})}, false);
        const essenceOfDittany4 = new Card("Essence of Dittany", "Game 1", "item", 2, () => {playerChoice(players.length, 1, () => {for (let i = 0; i < players.length; i++) { const choice = document.getElementsByClassName("choice")[i]; choice.appendChild(players[i].heroImage); choice.onclick = () => {players[i].health += 2;};}})}, false);
        const goldenSnitch = new Card("Golden Snitch", "Game 1", "item", 5, () => {activePlayer.influence += 2; activePlayer.drawCards(1);}, false);
        const incendio1 = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);}, false);
        const incendio2 = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);}, false);
        const incendio3 = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);}, false);
        const incendio4 = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);}, false);
        const lumos1 = new Card("Lumos", "Game 1", "spell", 4, () => {players.forEach(player => {player.drawCards(1);});}, false);
        const lumos2 = new Card("Lumos", "Game 1", "spell", 4, () => {players.forEach(player => {player.drawCards(1);});}, false);
        const oliverWood = new Card("Oliver Wood", "Game 1", "ally", 3, () => {activePlayer.attack++;}, true);
        const quidditchGear1 = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;}, false);
        const quidditchGear2 = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;}, false);
        const quidditchGear3 = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;}, false);
        const quidditchGear4 = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;}, false);
        const reparo1 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const reparo2 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const reparo3 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const reparo4 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const reparo5 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const reparo6 = new Card("Reparo", "Game 1", "spell", 3, () => {playerChoice(2, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}${influenceToken}`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};})}, false);
        const rubeusHagrid = new Card("Rubeus Hagrid", "Game 1", "ally", 4, () => {activeDarkArtsEvent.attack++; players.forEach(player => {player.health++;});}, false);
        const sortingHat = new Card("Sorting Hat", "Game 1", "item", 4, () => {activePlayer.influence += 2;}, true);
        const wingardiumLeviosa1 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);
        const wingardiumLeviosa2 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);
        const wingardiumLeviosa3 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);
        let hogwartsCards = [albusDumbledore, descendo1, descendo2, essenceOfDittany1, essenceOfDittany2, essenceOfDittany3, essenceOfDittany4, goldenSnitch, incendio1, incendio2, incendio3, incendio4, lumos1, lumos2, oliverWood, quidditchGear1, quidditchGear2, quidditchGear3, quidditchGear4, reparo1, reparo2, reparo3, reparo4, reparo5, reparo6, rubeusHagrid, sortingHat, wingardiumLeviosa1, wingardiumLeviosa2, wingardiumLeviosa3];
        // purchase a Hogwarts card
        hogwartsCards.forEach(card => {
            card.img.onclick = () => {
                if (activePlayer.influence >= card.cost) {
                    activePlayer.influence -= card.cost;

                    // Time Turner, Sorting Hat, and Wingardium Leviosa effects
                    if ((activePlayer.passives.includes(timeTurner) && card.type === "spell") || (activePlayer.passives.includes(timeTurner) && card.type === "ally") || ((activePlayer.passives.includes(wingardiumLeviosa1) || activePlayer.passives.includes(wingardiumLeviosa2) || activePlayer.passives.includes(wingardiumLeviosa3)) && card.type === "item")) {
                        playerChoice(2, 1, () => {
                            document.getElementsByClassName("choice")[0].innerHTML = "Top of deck";
                            document.getElementsByClassName("choice")[0].appendChild(card.img.cloneNode());
                            document.getElementsByClassName("choice")[0].onclick = () => {
                                activePlayer.draw.unshift(card);
                            };
                            document.getElementsByClassName("choice")[1].innerHTML = "Discard";
                            document.getElementsByClassName("choice")[1].appendChild(card.img.cloneNode());
                            document.getElementsByClassName("choice")[1].onclick = () => {
                                activePlayer.discard.push(card);
                            };
                        });
                    }
                    else {
                        activePlayer.discard.push(card);
                    }
                    card.generateOnClick();

                    // replaces previous card with next card in store
                    document.getElementsByClassName("shop")[activeShops.indexOf(card)].getElementsByTagName("IMG")[0].remove();
                    hogwartsCards.splice(hogwartsCards.indexOf(activeShops[activeShops.indexOf(card)]), 1);
                    activeShops[activeShops.indexOf(card)] = hogwartsCards[5];
                    activeShops.sort((a, b) => {return a.cost - b.cost}); // sorts store by cost
                    populateShop();
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
                this._passives = [];
                if (hero === "Harry Potter") this._discard = harryStartingCards;
                else if (hero === "Ron Weasley") this._discard = ronStartingCards;
                else if (hero === "Hermione Granger") this._discard = hermioneStartingCards;
                else if (hero === "Neville Longbottom") this._discard = nevilleStartingCards;
                // TO-DO: add other heroes
                this._petrified = false;
                this._stunned = false;
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
                if (!this.stunned) {
                    // Invisibility Cloak effect
                    if (this.passives.includes(invisibilityCloak) && health < this.health) {
                        health = this.health - 1;
                    }

                    // sets health
                    this._health = health;
                    if (this.health <= 0) {
                        this._health = 0;
                        this.stun();
                    }
                    else if (this.health > 10) {
                        this._health = 10;
                    }

                    // adjusts health trackers
                    const healthTracker = document.getElementById("healthTracker");
                    healthTracker.style.left = `${10.3 + 8.3 * (9 - activePlayer.health)}%`;
                    if (activePlayer.health % 2 === 1) {
                        healthTracker.style.top = "33%";
                    }
                    else {
                        healthTracker.style.top = "12%";
                    }
                }
            }
            get attack() {
                return this._attack;
            }
            set attack(attack) {
                if (!this.stunned) {
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
            }
            get influence() {
                return this._influence;
            }
            set influence(influence) {
                if (!this.stunned) {
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
            }
            get draw() {
                return this._draw;
            }
            get hand() {
                return this._hand;
            }
            set hand(hand) {
                this_hand = hand;
            }
            get discard() {
                return this._discard;
            }
            get passives() {
                return this._passives;
            }
            get petrified() {
                return this._petrified;
            }
            set petrified(petrified) {
                this._petrified = petrified;
            }
            get stunned() {
                return this._stunned;
            }
            set stunned(stunned) {
                this._stunned = stunned;
            }

            discardAt(index) {
                this._discard.push(this.hand[index]);
                document.getElementById("playerHand").removeChild(this.hand[index].img);
                this._hand.splice(index, 1);
            }
            forcedDiscardAt(index) {
                // Remembrall effect
                if (this.hand[index] === remembrall) {
                    activePlayer.influence += 2;
                }

                // Crabbe and Goyle effect
                if (activeVillains.includes(crabbeAndGoyle)) {
                    this.health--;
                }

                this.discardAt(index);
            }
            shuffle() {
                // shuffle discard pile
                shuffle(this._discard)

                // add discard pile to draw pile
                this._draw = this._draw.concat(this.discard);
                this._discard = [];
            }
            populateHand() {
                document.getElementById("playerHand").innerHTML = "";
                this.hand.forEach(card => {
                    document.getElementById("playerHand").appendChild(card.img);
                });
            }
            drawCards(numberOfCards) {
                if (!this.petrified) {
                    for (let i = 0; i < numberOfCards; i++) {
                        // moves a card from the draw pile to your hand
                        if (this.draw.length > 0) {
                            this.draw[0].generateOnClick();
                            this._hand.push(this.draw[0]);
                            if (this.draw[0].passive) {
                                this._passives.push(this.draw[0]);
                            }
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
            endTurn() {
                this.petrified = false;
                this.heroImage.remove();
                this.proficiencyImage.remove();
                while (this.hand.length) this.discardAt(0);
                this.attack = 0;
                this.influence = 0;
                this._passives = [];
                this.drawCards(5);
            }
            stun() {
                this.stunned = true;
                this._attack = 0;
                this._influence = 0;
                let iterations = Math.floor(this.hand.length / 2);
                playerChoice(this.hand.length, iterations, () => {
                    for (let i = 0; i < this.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML += `<img src="${this.hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            this.forcedDiscardAt(i);
                        }
                    }
                });
                // TO-DO: account for multiple stuns
            }
        }
        const player1 = new Player(document.getElementById("player1Hero").value, document.getElementById("player1Proficiency").value);
        const player2 = new Player(document.getElementById("player2Hero").value, document.getElementById("player2Proficiency").value);
        const players = [player1, player2];
        if (document.getElementById("player3Hero").value) players.push(new Player(document.getElementById("player3Hero").value, document.getElementById("player3Proficiency").value));
        if (document.getElementById("player4Hero").value) players.push(new Player(document.getElementById("player4Hero").value, document.getElementById("player4Proficiency").value));
        let activePlayer = players[players.length - 1]; // sets to last hero because turn starts with next hero

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
                const locationToken = document.createElement("img");
                locationToken.src = "./images/locationToken.png";
                locationToken.alt = "Location token";
                locationToken.className = "locationToken";
                locationToken.style.top = this.added % 2 === 0 ? "78%" : "82%";
                locationToken.style.left = `${15 + (this.added * 11)}%`;
                document.getElementById("locations").appendChild(locationToken);
                if (this.added > this.spaces) {
                    // Game Over
                    if (this.number === locations.length) {
                        alert("Game Over");
                        // TO-DO: Game Over
                    }
                    // new location
                    else {
                        while (document.getElementsByClassName("locationToken")[0]) document.getElementsByClassName("locationToken")[0].remove();
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
                        document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1].remove();
                    }
                }
                else {
                    // new location
                    if (this.added === 0) {
                        while (document.getElementsByClassName("locationToken")[0]) document.getElementsByClassName("locationToken")[0].remove();
                        activeLocation = locations[this.number - 2];
                        document.getElementById(`location${this.number - 1}`).style.display = "initial";
                    }
                    else {
                        this.added--;
                        document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1].remove();
                    }
                }
            }
        }
        const diagonAlley = new Location("Diagon Alley", 1, 4, 1);
        const mirrorOfErised = new Location("Mirror of Erised", 2, 4, 1);
        //const castleGates = new Location("Castle Gates", 1, 5, 1);
        //const hagridsHut = new Location("Hagrid's Hut", 2, 6, 2);
        //const greatHall = new Location("Great Hall", 3, 7, 3);
        let locations = [diagonAlley, mirrorOfErised];
        let activeLocation = locations[0];

        // dark arts events
        class DarkArtsEvent {
            constructor(name, effect) {
                this._name = name;
                this._effect = effect;
                this.generateImg();
            }
            get name() {
                return this._name;
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
        const expulso1 = new DarkArtsEvent("Expulso", () => {activePlayer.health -= 2;});
        const expulso2 = new DarkArtsEvent("Expulso", () => {activePlayer.health -= 2;});
        const expulso3 = new DarkArtsEvent("Expulso", () => {activePlayer.health -= 2;});
        const flipendo1 = new DarkArtsEvent("Flipendo", () => {playerChoice(activePlayer.hand.length, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.passives.includes(activePlayer.hand[i])) activePlayer.passives.splice(activePlayer.hand[i], 1); activePlayer.forcedDiscardAt(i);};}}); activePlayer.health--;});
        const flipendo2 = new DarkArtsEvent("Flipendo", () => {playerChoice(activePlayer.hand.length, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.passives.includes(activePlayer.hand[i])) activePlayer.passives.splice(activePlayer.hand[i], 1); activePlayer.forcedDiscardAt(i);};}}); activePlayer.health--;});
        const heWhoMustNotBeNamed1 = new DarkArtsEvent("He Who Must Not Be Named", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed2 = new DarkArtsEvent("He Who Must Not Be Named", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed3 = new DarkArtsEvent("He Who Must Not Be Named", () => {activeLocation.addToLocation()});
        const petrification1 = new DarkArtsEvent("Petrification", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        const petrification2 = new DarkArtsEvent("Petrification", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        //const menacingGrowl = new DarkArtsEvent("Menacing Growl", () => {players.forEach(player => {let lostHealth = 0; player.hand.forEach(card => {if (card.cost === 3) lostHealth++; player.health -= lostHealth;});});});
        let darkArtsEvents = [expulso1, expulso2, expulso3, flipendo1, flipendo2, heWhoMustNotBeNamed1, heWhoMustNotBeNamed2, heWhoMustNotBeNamed3, petrification1, petrification2];
        shuffle(darkArtsEvents);
        let activeDarkArtsEvent = darkArtsEvents[0];

        // villains
        class Villain {
            constructor(name, type, health, healthType, effect, reward) {
                this._img = document.createElement("img");
                this._img.className = "villain";
                this._img.src = `./images/${activeGame}/${src(name)}`;
                this._img.alt = name;
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
                    // remove villain
                    this.reward();
                    this.img.remove();
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                    document.getElementById("villainDiscard").appendChild(this.img);

                    // Firebolt and Cleansweep 11 effects
                    if (activePlayer.passives.includes(firebolt) || activePlayer.passives.includes(cleansweep11)) {
                        activePlayer.influence++;
                    }
                    // Oliver Wood effect
                    if (activePlayer.passives.includes(oliverWood)) {
                        playerChoice(players.length, 1, () => {
                            for (let i = 0; i < players.length; i++) {
                                document.getElementsByClassName("choice")[i].onclick = () => {
                                    players[i].health += 2;
                                };
                            }                            
                        });
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
        const crabbeAndGoyle = new Villain("Crabbe and Goyle", "villain", 5, "health", () => {}, () => {players.forEach(player => {player.drawCards(1);});});
        const dracoMalfoy = new Villain("Draco Malfoy", "villain", 6, "health", () => {}, () => {activeLocation.removeFromLocation();});
        const quirinusQuirrell = new Villain("Quirinus Quirrell", "villain", 6, "health", () => {activePlayer.health--;}, () => {players.forEach(player => {player.influence++; player.health++;});});
        //const troll = new Villain("Troll", "creature", 7, "health", () => {}, () => {}); // TO-DO: add effect and reward
        let villains = [crabbeAndGoyle, dracoMalfoy, quirinusQuirrell];
        shuffle(villains);
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
            <div id="villainDiscard"></div>
            <div class="activeVillain" id="villain1"></div>
            <div class="activeVillain" id="villain2"></div>
            <div class="activeVillain" id="villain3"></div>
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
            <input type="button" id="endTurn" value="End Turn">
        </div>`;

        // add villains to board
        document.getElementById("villain1").appendChild(activeVillains[0].img);
        if (activeVillains.length > 1) document.getElementById("villain2").appendChild(activeVillains[1].img);
        if (activeVillains.length > 2) document.getElementById("villain3").appendChild(activeVillains[2].img);

        // deal damage by clicking on a villain or villain's damage area
        for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
            const dealDamage = () => {
                if (activePlayer.attack > 0 && document.getElementsByClassName("activeVillain")[i].getElementsByClassName("villain")[0]) {
                    activePlayer.attack--;
                    document.getElementsByClassName("villainDamage")[i].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                    activeVillains[i].health--;
                }
            }
            document.getElementsByClassName("activeVillain")[i].onclick = dealDamage;
            document.getElementsByClassName("villainDamage")[i].onclick = dealDamage;
        }

        // populate shop
        const populateShop = () => {
            if (hogwartsCards.length > 0) {
                document.getElementById("shop1").appendChild(activeShops[0].img);
                if (hogwartsCards.length > 1) {
                    document.getElementById("shop2").appendChild(activeShops[1].img);
                    if (hogwartsCards.length > 2) {
                        document.getElementById("shop3").appendChild(activeShops[2].img);
                        if (hogwartsCards.length > 3) {
                            document.getElementById("shop4").appendChild(activeShops[3].img);
                            if (hogwartsCards.length > 4) {
                                document.getElementById("shop5").appendChild(activeShops[4].img);
                                if (hogwartsCards.length > 5) {
                                    document.getElementById("shop6").appendChild(activeShops[5].img);
                                }
                            }
                        }
                    }
                }
            }
        }
        populateShop();

        // start a new turn
        let lastCardImg = null;
        let firstTurn = true;
        const startTurn = () => {
            // new active player
            activePlayer = players.indexOf(activePlayer) < players.length - 1 ? players[players.indexOf(activePlayer) + 1] : players[0];
            if (firstTurn) {
                players.forEach(player => {player.drawCards(5);});
                firstTurn = false;
            }
            activePlayer.populateHand();
            document.getElementById("heroImage").appendChild(activePlayer.heroImage);
            document.getElementById("heroImage").appendChild(activePlayer.proficiencyImage);
            //activePlayer.influence = 100; // DEBUG
            //activePlayer.attack = 6; // DEBUG
            //players.forEach(player => {player.health = 1;}); // DEBUG

            // reveal Dark Arts Event
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

            // villain effects
            activeVillains.forEach(villain => {
                villain.effect();
            });
        };
        document.getElementById("gameBoard").onload = startTurn;

        // end turn
        document.getElementById("endTurn").onclick = () => {
            // unpetrify and unstun everyone
            players.forEach(player => {
                player.petrified = false;
                if (player.stunned) {
                    player.stunned = false;
                    player.health = 10;
                }
            });

            // player resets for next turn
            activePlayer.endTurn();

            // replace with new villain
            for (let i = 0; i < activeVillains.length; i++) {
                if (activeVillains[i].health <= 0) {
                    if (villains.indexOf(activeVillains[i]) + 1 < villains.length) {
                        activeVillains[i] = villains[villains.indexOf(activeVillains[i]) + 1];
                        document.getElementsByClassName("activeVillain")[i].appendChild(activeVillains[i].img);
                    }
                }
            }

            // check if all villains are defeated
            let villainsDefeated = true;
            for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
                if (document.getElementsByClassName("activeVillain")[i].getElementsByClassName("villain")[0]) villainsDefeated = false;
            }
            if (villainsDefeated) alert("Victory!");

            // updates activeDarkArtsEvent
            if (darkArtsEvents.indexOf(activeDarkArtsEvent) < darkArtsEvents.length - 1) {
                activeDarkArtsEvent = darkArtsEvents[darkArtsEvents.indexOf(activeDarkArtsEvent) + 1];
            }
            else {
                lastCardImg = darkArtsEvents[darkArtsEvents.length - 1].img;
                darkArtsEvents.forEach(darkArtsEvent => {darkArtsEvent.generateImg();});
                shuffle(darkArtsEvents);
                activeDarkArtsEvent = darkArtsEvents[0];
            }

            // start new turn
            startTurn();
        }
    }
    else {
        alert("Can't have more than one of each hero.");
    }
//}