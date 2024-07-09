// display player proficiecy choice
const displayProficiencyChoice = playerNumber => {
    if (document.getElementById(`player${playerNumber}Hero`).value && (document.getElementById("game").value === "Game 6" || document.getElementById("game").value === "Game 7")) {
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
document.getElementById("game").onchange = () => {
    for (let i = 1; i <= document.getElementsByClassName("playerProficiency").length; i++) {
        displayProficiencyChoice(i);
    }
}

document.getElementById("submitPlayers").onclick = () => {
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

        // creates a list of cards you can choose within a playerChoice so you know what you're discarding if you choose to discard
        const choiceScroll = array => {
            return `<div style="display: flex; align-items: center;">${array.reduce((prev, curr) => {return prev + `OR<img src="${curr.img.src}" style="height: 40vh;">`;}, "").substring(2)}</div>`;
        };

        // some cards give the players a choice of action
        const playerChoice = (description, choices, iterations, populateFunction) => {
            if (choices()) {
                // queue playerChoices in case there are multiple
                if (document.getElementById("playerChoice")) {
                    document.getElementById("playerChoice").addEventListener("click", () => {playerChoice(description, choices, iterations, populateFunction);});
                }
                else {
                    // create playerChoice element
                    const playerChoiceElement = document.createElement("div");
                    playerChoiceElement.id = "playerChoice";
                    playerChoiceElement.className = iterations;

                    // create playerChoice label
                    const playerChoiceLabel = document.createElement("h1");
                    playerChoiceLabel.id = "playerChoiceLabel";
                    playerChoiceLabel.innerHTML = description;

                    // add columns to playerChoice
                    let gridTemplateColumns = "";
                    for (let i = 1; i <= choices(); i++) {
                        gridTemplateColumns += ` ${100 / choices()}%`;
                        const choice = document.createElement("div");
                        choice.className = "choice";
                        playerChoiceElement.appendChild(choice);
                    }
                    playerChoiceElement.style.gridTemplateColumns = gridTemplateColumns.substring(1);

                    playerChoiceElement.onclick = () => {
                        // remove playerChoice when clicked
                        playerChoiceElement.remove();
                        playerChoiceLabel.remove();

                        // increment and display a new playerChoice for multiple iterations
                        if (--iterations > 0) {
                            playerChoice(description, choices, iterations, populateFunction);
                        }
                    }

                    // add playerChoice to main
                    document.getElementsByTagName("MAIN")[0].appendChild(playerChoiceElement);
                    playerChoiceLabel.style.width = `${playerChoiceElement.offsetWidth + 10 * (choices() - 1)}px`;
                    document.getElementsByTagName("MAIN")[0].appendChild(playerChoiceLabel);
                    populateFunction();
                }
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
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
        }

        // Hogwarts die
        const rollHouseDie = (color, evil) => {
            let sides = ["influence", "draw", "attack", "health"];
            if (color === "red") sides.push("influence", "influence", "influence");
            else if (color === "green") sides.push("attack", "attack", "attack");
            else if (color === "yellow") sides.push("health", "health", "health");
            else if (color === "blue") sides.push("draw", "draw", "draw");
            else alert(`${color} is not a Hogwarts die color.`);
            const result = sides[Math.floor(Math.random() * sides.length)];
            if (evil) {
                if (result === "influence") activeLocation.addToLocation();
                else if (result === "draw") players.forEach(player => {
                    playerChoice("Discard:", () => {return player.hand.length;}, 1, () => {
                        for (let i = 0; i < player.hand; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i]}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, true);};
                        }
                    });
                });
                else if (result === "attack") players.forEach(player => {player.health--;});
                else if (result === "health") activeVillains.forEach(villain => {villain.health++;});
                else alert(`But seriously, ${color} is not a Hogwarts die color.`);
            }
            else {
                if (result === "influence") activePlayer.influence++;
                else if (result === "draw") activePlayer.drawCards(1);
                else if (result === "attack") activePlayer.attack++;
                else if (result === "health") activePlayer.health++;
                else alert(`But seriously, ${color} is not a Hogwarts die color.`);
            }
        };

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
                    activePlayer.discardAt(activePlayer.hand.indexOf(this));
                    this._effect();

                    // Every-Flavour Beans effect
                    if (activePlayer.passives.includes(everyFlavourBeans) && this.type === "ally") {
                        activePlayer.attack++;
                    }
                    // Fleur Delacour effect
                    if (activePlayer.passives.includes(fleurDelacour) && this.type === "ally") {
                        activePlayer.health += 2;
                        activePlayer.passives.splice(activePlayer.passives.indexOf(fleurDelacour), 1);
                    }

                    if (this.type === "spell") activePlayer.spellsCast++;
                }
            }
            get passive() {
                return this._passive;
            }
            effect() {
                this._effect();
            }
        }

        // Harry starting cards
        const alohomoraEffect = () => {activePlayer.influence++;};
        const startingAllyEffect = () => {if (activePlayer.health >= 10) activePlayer.attack++; else {playerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++}; document.getElementsByClassName("choice")[1].innerHTML = `<div>${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.health += 2};});}};
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
        const everyFlavourBeans = new Card("Every-Flavour Beans", "Game 1", "item", 0, () => {activePlayer.influence++;}, true);
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
        const theTalesOfBeedleTheBard = new Card("The Tales Of Beedle The Bard", "Game 1", "item", 0, () => {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `ALL Heroes: ${influenceToken}`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.influence++;});};})}, false);
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
        const mandrake = new Card("Mandrake", "Game 1", "item", 0, () => {const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>Any one Hero</p><div>${healthToken + healthToken}</div><div>${hurtPlayers.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<div>Health: ${hurtPlayers[i].health}</div>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;};});} else activePlayer.attack++;}, false);
        const remembrall = new Card("Remembrall", "Game 1", "item", 0, () => {activePlayer.influence++;}, false);
        const trevor = new Card("Trevor", "Game 1", "ally", 0, startingAllyEffect, false);
        const nevilleStartingCards = [alohomoraNeville1, alohomoraNeville2, alohomoraNeville3, alohomoraNeville4, alohomoraNeville5, alohomoraNeville6, alohomoraNeville7, mandrake, remembrall, trevor];

        // Hogwarts cards
        // Game 1
        const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, () => {players.forEach(player => {player.attack++; player.influence++; player.health++; player.drawCards(1)});}, false);
        const descendo1 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false);
        const descendo2 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false);
        const essenceOfDittany1 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false);
        const essenceOfDittany2 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false);
        const essenceOfDittany3 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false);
        const essenceOfDittany4 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false);
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
        const reparo1 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const reparo2 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const reparo3 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const reparo4 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const reparo5 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const reparo6 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false);
        const rubeusHagrid = new Card("Rubeus Hagrid", "Game 1", "ally", 4, () => {activePlayer.attack++; players.forEach(player => {player.health++;});}, false);
        const sortingHat = new Card("Sorting Hat", "Game 1", "item", 4, () => {activePlayer.influence += 2;}, true);
        const wingardiumLeviosa1 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);
        const wingardiumLeviosa2 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);
        const wingardiumLeviosa3 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true);

        // Game 2
        const arthurWeasley = new Card("Arthur Weasley", "Game 2", "ally", 6, () => {players.forEach(player => {player.influence += 2;});}, false);
        const dobbyTheHouseElf = new Card("Dobby The House-Elf", "Game 2", "ally", 4, () => {activeLocation.removeFromLocation(); activePlayer.drawCards(1);}, false);
        const expelliarmus1 = new Card("Expelliarmus", "Game 2", "spell", 6, () => {activePlayer.attack += 2; activePlayer.drawCards(1);}, false);
        const expelliarmus2 = new Card("Expelliarmus", "Game 2", "spell", 6, () => {activePlayer.attack += 2; activePlayer.drawCards(1);}, false);
        const fawkesThePhoenix = new Card("Fawkes The Phoenix", "Game 2", "ally", 5, () => {if (players.filter(player => {return player.health < 10;}).length) {playerChoice("Pick one:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>ALL Heroes:</p><div>${healthToken + healthToken}</div><div>${players.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.health += 2;});};});} else activePlayer.attack += 2;}, false);
        const finite1 = new Card("Finite", "Game 2", "spell", 3, () => {activeLocation.removeFromLocation();}, false);
        const finite2 = new Card("Finite", "Game 2", "spell", 3, () => {activeLocation.removeFromLocation();}, false);
        const gilderoyLockhart = new Card("Gilderoy Lockhart", "Game 2", "ally", 2, () => {if (!activePlayer.petrified) {activePlayer.drawCards(1); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);}}});}}, false);
        const ginnyWeasley = new Card("Ginny Weasley", "Game 2", "ally", 4, () => {activePlayer.attack++; activePlayer.influence++;}, false);
        const mollyWeasley = new Card("Molly Weasley", "Game 2", "ally", 6, () => {players.forEach(player => {player.influence++; player.health += 2;});}, false);
        const nimbusTwoThousandAndOne1 = new Card("Nimbus Two Thousand And One", "Game 2", "item", 5, () => {activePlayer.attack += 2;}, true);
        const nimbusTwoThousandAndOne2 = new Card("Nimbus Two Thousand And One", "Game 2", "item", 5, () => {activePlayer.attack += 2;}, true);
        const polyjuicePotion1 = new Card("Polyjuice Potion", "Game 2", "item", 3, () => {const allies = activePlayer.hand.filter(card => {return card.type === "ally";}); playerChoice("Pick an ally to copy:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {allies[i].effect(); if (allies[i].passive) activePlayer.passives.push(allies[i]);};}});}, false);
        const polyjuicePotion2 = new Card("Polyjuice Potion", "Game 2", "item", 3, () => {const allies = activePlayer.hand.filter(card => {return card.type === "ally";}); playerChoice("Pick an ally to copy:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {allies[i].effect(); if (allies[i].passive) activePlayer.passives.push(allies[i]);};}});}, false);

        // Game 3
        const butterbeer1 = new Card("Butterbeer", "Game 3", "item", 3, () => {if (players.length > 2) {playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false);
        const butterbeer2 = new Card("Butterbeer", "Game 3", "item", 3, () => {if (players.length > 2) {playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false);
        const butterbeer3 = new Card("Butterbeer", "Game 3", "item", 3, () => {if (players.length > 2) {playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false);
        const chocolateFrog1 = new Card("Chocolate Frog", "Game 3", "item", 2, () => {playerChoice(`Give 1 influence and 1 health to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++;};}});}, false);
        const chocolateFrog2 = new Card("Chocolate Frog", "Game 3", "item", 2, () => {playerChoice(`Give 1 influence and 1 health to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++;};}});}, false);
        const chocolateFrog3 = new Card("Chocolate Frog", "Game 3", "item", 2, () => {playerChoice(`Give 1 influence and 1 health to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++;};}});}, false);
        const crystalBall1 = new Card("Crystal Ball", "Game 3", "item", 3, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});}}, false);
        const crystalBall2 = new Card("Crystal Ball", "Game 3", "item", 3, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});}}, false);
        const expectoPatronum1 = new Card("Expecto Patronum", "Game 3", "spell", 5, () => {activePlayer.attack++; activeLocation.removeFromLocation();}, false);
        const expectoPatronum2 = new Card("Expecto Patronum", "Game 3", "spell", 5, () => {activePlayer.attack++; activeLocation.removeFromLocation();}, false);
        const maraudersMap = new Card("Marauder's Map", "Game 3", "item", 5, () => {activePlayer.drawCards(2);}, false);
        const petrificusTotalus1 = new Card("Petrificus Totalus", "Game 3", "spell", 6, () => {activePlayer.attack++; const unpetrifiedVillains = activeVillains.filter(villain => {return !villain.petrifiedBy && villain.health > 0;}); if (unpetrifiedVillains.length) {if (unpetrifiedVillains.length > 1) {playerChoice("Petrify:", () => {return unpetrifiedVillains.length;}, 1, () => {for (let i = 0; i < unpetrifiedVillains.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedVillains[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedVillains[i].petrifiedBy = activePlayer;};}});} else unpetrifiedVillains[0].petrifiedBy = activePlayer;}}, false);
        const petrificusTotalus2 = new Card("Petrificus Totalus", "Game 3", "spell", 6, () => {activePlayer.attack++; const unpetrifiedVillains = activeVillains.filter(villain => {return !villain.petrifiedBy && villain.health > 0;}); if (unpetrifiedVillains.length) {if (unpetrifiedVillains.length > 1) {playerChoice("Petrify:", () => {return unpetrifiedVillains.length;}, 1, () => {for (let i = 0; i < unpetrifiedVillains.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedVillains[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedVillains[i].petrifiedBy = activePlayer;};}});} else unpetrifiedVillains[0].petrifiedBy = activePlayer;}}, false);
        const remusLupin = new Card("Remus Lupin", "Game 3", "ally", 4, () => {activePlayer.attack++; const hurtPlayers = players.filter(player => {return player.health < 10;}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;}}, false);
        const siriusBlack = new Card("Sirius Black", "Game 3", "ally", 6, () => {activePlayer.attack += 2; activePlayer.influence++;}, false);
        const sybillTrelawney = new Card("Sybill Trelawney", "Game 3", "ally", 4, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); playerChoice("Discard", () => {return activePlayer.hand.length}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.hand[i].type === "spell") activePlayer.influence += 2; activePlayer.forcedDiscardAt(i, false);};}});}}, false);

        // Game 4
        const accio1 = new Card("Accio", "Game 4", "spell", 4, () => {const items = activePlayer.discard.filter(card => {return card.type === "item";}); if (items.length) {playerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = influenceToken + influenceToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[1].onclick = () => {const discardToHand = index => {const tempPetrified = activePlayer.petrified; activePlayer.petrified = false; activePlayer.draw.unshift(activePlayer.discard[index]); activePlayer.discard.splice(index, 1); activePlayer.drawCards(1); activePlayer.petrified = tempPetrified;}; if (items.length === 1) discardToHand(0); else {playerChoice("Move from Discard to Hand:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i);};}});}};});} else activePlayer.influence += 2;}, false);
        const accio2 = new Card("Accio", "Game 4", "spell", 4, () => {const items = activePlayer.discard.filter(card => {return card.type === "item";}); if (items.length) {playerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = influenceToken + influenceToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[1].onclick = () => {const discardToHand = index => {const tempPetrified = activePlayer.petrified; activePlayer.petrified = false; activePlayer.draw.unshift(activePlayer.discard[index]); activePlayer.discard.splice(index, 1); activePlayer.drawCards(1); activePlayer.petrified = tempPetrified;}; if (items.length === 1) discardToHand(0); else {playerChoice("Move from Discard to Hand:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i);};}});}};});} else activePlayer.influence += 2;}, false);
        const alastorMadEyeMoody = new Card("Alastor Mad-Eye Moody", "Game 4", "ally", 6, () => {activePlayer.influence += 2; activeLocation.removeFromLocation();}, false);
        const cedricDiggory = new Card("Cedric Diggory", "Game 4", "ally", 4, () => {activePlayer.attack++; rollHouseDie("yellow", false);}, false);
        const filiusFlitwick = new Card("Filius Flitwick", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.drawCards(1); rollHouseDie("blue", false);}, false);
        const fleurDelacour = new Card("Fleur Delacour", "Game 4", "ally", 4, () => {activePlayer.influence += 2;}, true);
        const hogwartsAHistory1 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const hogwartsAHistory2 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const hogwartsAHistory3 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const hogwartsAHistory4 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const hogwartsAHistory5 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const hogwartsAHistory6 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false);};});}, false);
        const minervaMcgonagall = new Card("Minerva Mcgonagall", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.attack++; rollHouseDie("red");}, false);

        // hogwartsCard array
        let hogwartsCards = [albusDumbledore, descendo1, descendo2, essenceOfDittany1, essenceOfDittany2, essenceOfDittany3, essenceOfDittany4, goldenSnitch, incendio1, incendio2, incendio3, incendio4, lumos1, lumos2, oliverWood, quidditchGear1, quidditchGear2, quidditchGear3, quidditchGear4, reparo1, reparo2, reparo3, reparo4, reparo5, reparo6, rubeusHagrid, sortingHat, wingardiumLeviosa1, wingardiumLeviosa2, wingardiumLeviosa3];
        // TO-DO: add other games' Hogwarts cards to hogwartsCards based on the selected game
        if (activeGame !== "Game 1") {
            hogwartsCards.push(arthurWeasley, dobbyTheHouseElf, expelliarmus1, expelliarmus2, fawkesThePhoenix, finite1, finite2, gilderoyLockhart, ginnyWeasley, mollyWeasley, nimbusTwoThousandAndOne1, nimbusTwoThousandAndOne2, polyjuicePotion1, polyjuicePotion2);
            if (activeGame !== "Game 2") {
                hogwartsCards.push(butterbeer1, butterbeer2, butterbeer3, chocolateFrog1, chocolateFrog2, chocolateFrog3, crystalBall1, crystalBall2, expectoPatronum1, expectoPatronum2, maraudersMap, petrificusTotalus1, petrificusTotalus2, remusLupin, siriusBlack, sybillTrelawney);
                if (activeGame !== "Game 3") {
                    hogwartsCards.push(accio1, accio2, alastorMadEyeMoody, cedricDiggory, filiusFlitwick, fleurDelacour, hogwartsAHistory1, hogwartsAHistory2, hogwartsAHistory3, hogwartsAHistory4, hogwartsAHistory5, hogwartsAHistory6, minervaMcgonagall);
                }
            }
        }

        // purchase a Hogwarts card
        hogwartsCards.forEach(card => {
            card.img.onclick = () => {
                if (activePlayer.influence >= card.cost) {
                    activePlayer.influence -= card.cost;

                    // Time Turner, Sorting Hat, and Wingardium Leviosa effects
                    if ((activePlayer.passives.includes(timeTurner) && card.type === "spell") || (activePlayer.passives.includes(sortingHat) && card.type === "ally") || ((activePlayer.passives.includes(wingardiumLeviosa1) || activePlayer.passives.includes(wingardiumLeviosa2) || activePlayer.passives.includes(wingardiumLeviosa3)) && card.type === "item")) {
                        playerChoice("Choose 1:", () => {return 2;}, 1, () => {
                            document.getElementsByClassName("choice")[0].innerHTML = "<p>Top of deck</p>";
                            document.getElementsByClassName("choice")[0].appendChild(card.img.cloneNode());
                            document.getElementsByClassName("choice")[0].onclick = () => {
                                activePlayer.draw.unshift(card);
                            };
                            document.getElementsByClassName("choice")[1].innerHTML = "<p>Discard</p>";
                            document.getElementsByClassName("choice")[1].appendChild(card.img.cloneNode());
                            document.getElementsByClassName("choice")[1].onclick = () => {
                                activePlayer.discard.push(card);
                            };
                        });
                    }
                    // add card to discard
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
                this._proficiency = "";
                this._proficiencyImage = document.createElement("div");
                if (activeGame === "Game 6" || activeGame === "Game 7") {
                    this._proficiency = proficiency;
                    this._proficiencyImage = document.createElement("img");
                    this._proficiencyImage.id = "playerProficiency";
                    this._proficiencyImage.src = `./images/Game 6/${src(proficiency)}`;
                    this._proficiencyImage.alt = proficiency;
                }
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
                this._spellsCast = 0;
                this._gainedHealth = false;
                this._attacks = 0;
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

                    // Neville Longbottom special
                    if (this.health < health && !this.gainedHealth) {
                        let nevilleSpecial = 0;
                        if (activePlayer.hero === "Neville Longbottom" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                            nevilleSpecial++;
                        }
                        this.gainedHealth = true;
                        health += nevilleSpecial;
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
            displayAttack() {
                if (activePlayer === this) {
                    document.getElementById("attackTokens").innerHTML = "";
                    for (let i = 0; i < this.attack; i++) {
                        document.getElementById("attackTokens").innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                    }
                }                
            }
            set attack(attack) {
                if (!this.stunned || activePlayer === this) {
                    // sets attack
                    this._attack = attack;
                    if (this._attack < 0) {
                        this._attack = 0;
                    }
                    this.displayAttack();
                }
            }
            get influence() {
                return this._influence;
            }
            displayInfluence() {
                if (activePlayer === this) {
                    document.getElementById("influenceTokens").innerHTML = "";
                    for (let i = 0; i < this.influence; i++) {
                        document.getElementById("influenceTokens").innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
                    }
                }
            }
            set influence(influence) {
                if (!this.stunned || activePlayer === this) {
                    // sets influence
                    this._influence = influence;
                    if (this.influence < 0) {
                        this._influence = 0;
                    }
                    this.displayInfluence();
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
            set discard(discard) {
                this._discard = discard;
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
            get spellsCast() {
                return this._spellsCast;
            }
            set spellsCast(spellsCast) {
                this._spellsCast = spellsCast;

                // Hermione Granger special
                if (this.spellsCast === 4 && this.hero === "Hermione Granger" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    playerChoice(`Gain 1 influence:`, () => {return players.length;}, 1, () => {
                        for (let i = 0; i < players.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p>`;
                            document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++;};
                        }
                    });
                }
            }
            get gainedHealth() {
                return this._gainedHealth;
            }
            set gainedHealth(gainedHealth) {
                this._gainedHealth = gainedHealth;
            }
            get attacks() {
                return this._attacks;
            }
            set attacks(attacks) {
                this._attacks = attacks;

                // Ron Weasley special
                if (this.attacks === 3 && this.hero === "Ron Weasley" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    const hurtPlayers = players.filter(player => {return player.health < 10;});
                    if (hurtPlayers.length) {
                        if (hurtPlayers.length > 1) {
                            playerChoice(`Gain 2 health:`, () => {return hurtPlayers.length;}, 1, () => {
                                for (let i = 0; i < hurtPlayers.length; i++) {
                                    document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                    document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                }
                            });
                        }
                        else hurtPlayers[0].health += 2;
                    }
                }
            }

            discardAt(index) {
                this._discard.push(this.hand[index]);
                if (document.getElementById("playerHand").contains(this.hand[index].img)) document.getElementById("playerHand").removeChild(this.hand[index].img);
                this._hand.splice(index, 1);
            }
            forcedDiscardAt(index, evil) {
                // Remembrall effect
                if (this.hand[index] === remembrall) {
                    this.influence += 2;
                }
                // Gilderoy Lockhart effect
                else if (this.hand[index] === gilderoyLockhart) {
                    this.drawCards(1);
                }
                // Chocolate Frog effect
                else if (this.hand[index] === chocolateFrog1 || this.hand[index] === chocolateFrog2 || this.hand[index] === chocolateFrog3) {
                    this.influence++;
                    this.health++;
                }
                // Marauder's Map effect
                else if (this.hand[index] === maraudersMap) {
                    players.forEach(player => {player.drawCards(1);});
                }

                setTimeout(() => {
                    // Crabbe and Goyle effect
                    if (activeVillains.includes(crabbeAndGoyle) && !crabbeAndGoyle.petrifiedBy && evil) {
                        this.health--;
                    }
                }, 1000);

                this._passives.splice(this.passives.indexOf(this.hand[index]), 1);
                this.discardAt(index);
            }
            populateHand() {
                document.getElementById("playerHand").innerHTML = "";
                this.hand.forEach(card => {
                    document.getElementById("playerHand").appendChild(card.img);
                });
            }
            shuffle() {
                // shuffle discard pile
                shuffle(this._discard);

                // add discard pile to draw pile
                this._draw = this.draw.concat(this.discard);
                this._discard = [];
            }
            drawCards(numberOfCards) {
                if (!this.petrified) {
                    for (let i = 0; i < numberOfCards; i++) {
                        // moves a card from the draw pile to your hand
                        if (this.draw.length > 0) {
                            this.draw[0].generateOnClick();
                            this.hand.push(this.draw[0]);
                            if (this.draw[0].passive) {
                                this._passives.push(this.draw[0]);
                            }
                            this._draw.shift();
                            if (this === activePlayer) {
                                document.getElementById("playerHand").appendChild(this.hand[this.hand.length - 1].img);
                            }
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
                this.spellsCast = 0;
                this.gainedHealth = false;
                this.attacks = 0;
                this.drawCards(5);
            }
            stun() {
                this.stunned = true;
                this._attack = 0;
                this._influence = 0;
                activeLocation.addToLocation();
                let iterations = Math.floor(this.hand.length / 2);
                playerChoice("Discard:", () => {return this.hand.length;}, iterations, () => {
                    for (let i = 0; i < this.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML += `<img src="${this.hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            this.forcedDiscardAt(i, true);
                        }
                    }
                });
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
            constructor(name, game, number, spaces, darkArtsEventDraws) {
                this._name = name;
                this._img = `<img id="location${number}" class="location" src="./images/${game}/${name[0].toLowerCase() + name.substring(1).replaceAll(" ", "").replaceAll("'", "")}.png" alt="${name}">`;
                this._number = number;
                this._spaces = spaces;
                this._darkArtsEventDraws = darkArtsEventDraws;
                this._game = game;
                this._added = 0;
                this._removed = false;
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
            get darkArtsEventDraws() {
                return this._darkArtsEventDraws;
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
            get removed() {
                return this._removed;
            }
            set removed(removed) {
                this._removed = removed;
            }
            addToLocation() {
                this.added++;
                const locationToken = document.createElement("img");
                locationToken.src = "./images/locationToken.png";
                locationToken.alt = "Location token";
                locationToken.className = "locationToken";
                if ((this.spaces - 1) % 3 === 0) locationToken.style.top = this.added % 2 === 0 ? "78%" : "82%";
                else locationToken.style.top = this.added % 2 === 0 ? "82%" : "78%";
                locationToken.style.left = `${39 + this.added * 11 - this.spaces * 6}%`;
                locationToken.classList.toggle("adding");
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

                setTimeout(() => {
                    // Draco Malfoy effect
                    if (activeVillains.includes(dracoMalfoy) && !dracoMalfoy.petrifiedBy) {
                        activePlayer.health -= 2;
                    }
                    // Lucius Malfoy effect
                    if (activeVillains.includes(luciusMalfoy) && !luciusMalfoy.petrifiedBy) {
                        activeVillains.forEach(villain => {villain.health++;});
                    }
                }, 1000);
            }
            removeFromLocation() {
                // Harry Potter special
                if (!this.removed && players.filter(player => {return player.hero === "Harry Potter";}).length && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    playerChoice(`Gain 1 attack:`, () => {return players.length;}, 1, () => {
                        for (let i = 0; i < players.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].onclick = () => {players[i].attack++;};
                        }
                    });
                }

                this.removed = true;
                if (this === locations[0]) {
                    if (this.added > 0) {
                        this.added--;
                        const locationToken = document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1];
                        locationToken.classList.toggle("adding");
                        locationToken.classList.toggle("removing");
                        setTimeout(() => {locationToken.remove();}, 1000);
                    }
                }
                else {
                    // new location
                    if (this.added === 0) {
                        while (document.getElementsByClassName("locationToken")[0]) document.getElementsByClassName("locationToken")[0].remove();
                        activeLocation = locations[this.number - 2];
                        activeLocation.added = activeLocation.spaces;
                        for (let i = 0; i < activeLocation.added; i++) {
                            const locationToken = document.createElement("img");
                            locationToken.src = "./images/locationToken.png";
                            locationToken.alt = "Location token";
                            locationToken.className = "locationToken";
                            locationToken.style.top = i % 2 === 1 ? "78%" : "82%";
                            locationToken.style.left = `${27 + (i * 11)}%`;
                            document.getElementById("locations").appendChild(locationToken);
                        }
                        document.getElementById(`location${this.number - 1}`).style.display = "initial";
                    }
                    else {
                        this.added--;
                        const locationToken = document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1];
                        locationToken.classList.toggle("adding");
                        locationToken.classList.toggle("removing");
                        setTimeout(() => {locationToken.remove();}, 1000);
                    }
                }
            }
        }
        const diagonAlley = new Location("Diagon Alley", "Game 1", 1, 4, 1);
        const mirrorOfErised = new Location("Mirror Of Erised", "Game 1", 2, 4, 1);
        const forbiddenForest = new Location("Forbidden Forest", "Game 2", 1, 4, 1);
        const quidditchPitch = new Location("Quidditch Pitch", "Game 2", 2, 4, 1);
        const chamberOfSecrets = new Location("Chamber Of Secrets", "Game 2", 3, 5, 2);
        const hogwartsExpress = new Location("Hogwarts Express", "Game 3", 1, 5, 1);
        const hogsmeadeVillage = new Location("Hogsmeade Village", "Game 3", 2, 6, 2);
        const shriekingShack = new Location("Shrieking Shack", "Game 3", 3, 6, 2);
        const quidditchWorldCup = new Location("Quidditch World Cup", "Game 4", 1, 6, 1);
        const triwizardTournament = new Location("Triwizard Tournament", "Game 4", 2, 6, 2);
        const graveyard = new Location("Graveyard", "Game 4", 3, 7, 2);
        const azkaban = new Location("Azkaban", "Game 5", 1, 7, 1);
        const hallOfProphecy = new Location("Hall Of Prophecy", "Game 5", 2, 7, 2);
        const ministryOfMagic = new Location("Ministry Of Magic", "Game 5", 3, 7, 2);
        const knockturnAlley = new Location("Knockturn Alley", "Game 6", 1, 7, 1);
        const theBurrow = new Location("The Burrow", "Game 6", 2, 7, 2);
        const astronomyTower = new Location("Astronomy Tower", "Game 6", 3, 8, 3);
        const godricsHollow = new Location("Godric's Hollow", "Game 7", 1, 6, 1);
        const gringotts = new Location("Gringotts", "Game 7", 2, 6, 2);
        const roomOfRequirement = new Location("Room Of Requirement", "Game 7", 3, 7, 2);
        const hogwartsCastle = new Location("Hogwarts Castle", "Game 7", 4, 8, 3);
        const castleGates = new Location("Castle Gates", "Box 1", 1, 5, 1);
        const hagridsHut = new Location("Hagrid's Hut", "Box 1", 2, 6, 2);
        const greatHallBox = new Location("Great Hall", "Box 1", 3, 7, 3);
        const dADAClassroom = new Location("DADA Classroom", "Box 2", 1, 6, 1);
        const castleHallways = new Location("Castle Hallways", "Box 2", 2, 6, 2);
        const whompingWillow = new Location("Whomping Willow", "Box 2", 3, 7, 3);
        const unicornHollow = new Location("Unicorn Hollow", "Box 3", 1, 5, 1);
        const aragogsLair = new Location("Aragog's Lair", "Box 3", 2, 6, 2);
        const giantClearing = new Location("Giat Clearing", "Box 3", 3, 7, 3);
        const selectionOfChampions = new Location("Selection Of Champions", "Box 4", 1, 5, 1);
        const dragonArena = new Location("Dragon Arena", "Box 4", 2, 6, 2);
        const mermaidVillage = new Location("Mermaid Village", "Box 4", 3, 6, 2);
        const triwizardMaze = new Location("Triwizard Maze", "Box 4", 4, 7, 3);
        const theBlackLake = new Location("The Black Lake", "Pack 1", 1, 5, 1);
        const theHospitalWing = new Location("The Hospital Wing", "Pack 1", 2, 7, 2);
        const theHogwartsLibrary = new Location("The Hogwarts Library", "Pack 1", 3, 7, 3);
        const ministryOfMagicAtrium = new Location("Ministry Of Magic Atrium", "Pack 2", 1, 6, 1);
        const ministryCourtroom = new Location("Ministry Courtroom", "Pack 2", 2, 6, 2);
        const ministryLift = new Location("Ministry Lift", "Pack 2", 3, 7, 3);
        const malfoyManor = new Location("Malfoy Manor", "Pack 3", 1, 5, 1);
        const cave = new Location("Cave", "Pack 3", 2, 6, 2);
        const atopTheTower = new Location("Atop The Tower", "Pack 3", 3, 6, 3);
        const greatHallPack = new Location("Great Hall", "Pack 4", 1, 6, 1);
        const forestClearing = new Location("Forest Clearing", "Pack 4", 2, 6, 2);
        const castleCourtyard = new Location("Castle Courtyard", "Pack 4", 3, 7, 3);
        let locations = [diagonAlley, mirrorOfErised, forbiddenForest, quidditchPitch, chamberOfSecrets, hogwartsExpress, hogsmeadeVillage, shriekingShack, quidditchWorldCup, triwizardTournament, graveyard, azkaban, hallOfProphecy, ministryOfMagic, knockturnAlley, theBurrow, astronomyTower, godricsHollow, gringotts, roomOfRequirement, hogwartsCastle, castleGates, hagridsHut, greatHallBox, dADAClassroom, castleHallways, whompingWillow, unicornHollow, aragogsLair, giantClearing, selectionOfChampions, dragonArena, mermaidVillage, triwizardMaze, theBlackLake, theHospitalWing, theHogwartsLibrary, ministryOfMagicAtrium, ministryCourtroom, ministryLift, malfoyManor, cave, atopTheTower, greatHallPack, forestClearing, castleCourtyard].filter(loc => {return loc.game === activeGame});
        let activeLocation = locations[0];

        // dark arts events
        class DarkArtsEvent {
            constructor(name, game, effect) {
                this._name = name;
                this._game = game;
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
                this._img.src = `./images/${this._game}/${src(this._name)}`;
                this._img.className = "darkArtsEvent";
                this._img.alt = this._name;
            }
            effect() {
                this._effect();
            }
        }
        const expulso1 = new DarkArtsEvent("Expulso", "Game 1", () => {activePlayer.health -= 2;});
        const expulso2 = new DarkArtsEvent("Expulso", "Game 1", () => {activePlayer.health -= 2;});
        const expulso3 = new DarkArtsEvent("Expulso", "Game 1", () => {activePlayer.health -= 2;});
        const flipendo1 = new DarkArtsEvent("Flipendo", "Game 1", () => {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}}); activePlayer.health--;});
        const flipendo2 = new DarkArtsEvent("Flipendo", "Game 1", () => {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}}); activePlayer.health--;});
        const heWhoMustNotBeNamed1 = new DarkArtsEvent("He Who Must Not Be Named", "Game 1", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed2 = new DarkArtsEvent("He Who Must Not Be Named", "Game 1", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed3 = new DarkArtsEvent("He Who Must Not Be Named", "Game 1", () => {activeLocation.addToLocation()});
        const petrification1 = new DarkArtsEvent("Petrification", "Game 1", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        const petrification2 = new DarkArtsEvent("Petrification", "Game 1", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        const handOfGlory1 = new DarkArtsEvent("Hand Of Glory", "Game 2", () => {activePlayer.health--; activeLocation.addToLocation();});
        const handOfGlory2 = new DarkArtsEvent("Hand Of Glory", "Game 2", () => {activePlayer.health--; activeLocation.addToLocation();});
        const obliviate = new DarkArtsEvent("Obliviate", "Game 2", () => {players.forEach(player => {const spells = player.hand.filter(card => {return card.type === "spell";}); if (spells.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(spells); document.getElementsByClassName("choice")[0].onclick = () => {if (spells.length > 1) {playerChoice(`${player.hero} discards:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(spells[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div>${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const poison = new DarkArtsEvent("Poison", "Game 2", () => {players.forEach(player => {const allies = player.hand.filter(card => {return card.type === "ally";}); if (allies.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(allies); document.getElementsByClassName("choice")[0].onclick = () => {if (allies.length > 1) {playerChoice(`${player.hero} discards:`, () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(allies[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(allies[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div>${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const relashio = new DarkArtsEvent("Relashio", "Game 2", () => {players.forEach(player => {const items = player.hand.filter(card => {return card.type === "item";}); if (items.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[0].onclick = () => {if (items.length > 1) {playerChoice(`${player.hero} discards:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(items[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div>${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const dementorsKiss1 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); activePlayer.health--;});
        const dementorsKiss2 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); activePlayer.health--;});
        const oppugno = new DarkArtsEvent("Oppugno", "Game 3", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].cost) {player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.health -= 2;}});});
        const tarantallegra = new DarkArtsEvent("Tarantallegra", "Game 3", () => {activePlayer.health--;});
        //const menacingGrowl = new DarkArtsEvent("Menacing Growl", "Box 1", () => {players.forEach(player => {let lostHealth = 0; player.hand.forEach(card => {if (card.cost === 3) lostHealth++; player.health -= lostHealth;});});});
        let darkArtsEvents = [expulso1, expulso2, expulso3, flipendo1, flipendo2, heWhoMustNotBeNamed1, heWhoMustNotBeNamed2, heWhoMustNotBeNamed3, petrification1, petrification2];
        if (activeGame !== "Game 1") {
            darkArtsEvents.push(handOfGlory1, handOfGlory2, obliviate, poison, relashio);
            if (activeGame !== "Game 2") {
                darkArtsEvents.push(dementorsKiss1, dementorsKiss2, oppugno, tarantallegra);
                // TO-DO: add future games' DAEs to darkArtsEvents if selected
            }
        }
        shuffle(darkArtsEvents);
        let activeDarkArtsEvent = darkArtsEvents[0];

        // villains
        class Villain {
            constructor(name, game, type, health, healthType, effect, reward) {
                this._img = document.createElement("img");
                this._img.className = "villain";
                this._img.src = `./images/${game}/${src(name)}`;
                this._img.alt = name;
                this._type = type;
                this._maxHealth = health;
                this._health = health;
                this._takenDamage = false;
                this._healthType = healthType;
                this._effect = effect;
                this._reward = reward;
                this._petrifiedBy = null;
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
            displayDamage() {
                document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                for (let i = 0; i < this._maxHealth - this.health; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                }
            }
            set health(health) {
                if (health > this._maxHealth) health = this._maxHealth;
                this._health = health;
                this.displayDamage();
                if (this.health <= 0) {
                    // check for victory
                    if (activeVillains.length === 1 && !inactiveVillains.length) {
                        alert("Victory!");
                    }

                    // remove villain
                    this.img.classList.toggle("defeating");
                    const petrifiedToken = this.petrifiedBy ? document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].getElementsByClassName("petrifiedToken")[0] : null;
                    if (this.petrifiedBy) petrifiedToken.classList.toggle("defeating");
                    setTimeout(() => {
                        document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].innerHTML = "";
                        document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                        if (document.getElementById("villainDiscard").getElementsByTagName("IMG")[0]) setTimeout(() => {document.getElementById("villainDiscard").getElementsByTagName("IMG")[0].remove();}, 1000);
                        document.getElementById("villainDiscard").appendChild(this.img);
                        this.img.classList.toggle("defeating");
                        this.img.classList.toggle("defeated");
                        this.reward();
                    }, 1000);

                    // Firebolt and Cleansweep 11 effects
                    if (activePlayer.passives.includes(firebolt) || activePlayer.passives.includes(cleansweep11)) {
                        activePlayer.influence++;
                    }
                    // Nimbus Two Thousand and One effect
                    if (activePlayer.passives.includes(nimbusTwoThousandAndOne1) || activePlayer.passives.includes(nimbusTwoThousandAndOne2)) {
                        activePlayer.influence += 2;
                    }
                    // Oliver Wood effect
                    if (activePlayer.passives.includes(oliverWood)) {
                        const hurtPlayers = players.filter(player => {return player.health < 10});
                        if (hurtPlayers.length) {
                            if (hurtPlayers.length > 1) {
                                playerChoice("Pick a hero to heal:", () => {return hurtPlayers.length;}, 1, () => {
                                    for (let i = 0; i < hurtPlayers.length; i++) {
                                        document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                        document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                    }                            
                                });
                            }
                            else hurtPlayers[0].health += 2;
                        }
                    }
                }
            }
            get takenDamage() {
                return this._takenDamage;
            }
            set takenDamage(takenDamage) {
                this._takenDamage = takenDamage;
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
            get petrifiedBy() {
                return this._petrifiedBy;
            }
            set petrifiedBy(petrifiedBy) {
                this._petrifiedBy = petrifiedBy;
                const activeVillainElement = document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)];
                if (this.petrifiedBy) {
                    activeVillainElement.innerHTML += `<img src="./images/petrifiedToken.png" class="petrifiedToken">`;
                }
                else {
                    activeVillainElement.getElementsByClassName("petrifiedToken")[0].remove();
                }
            }
        }
        const crabbeAndGoyle = new Villain("Crabbe And Goyle", "Game 1", "villain", 5, "health", () => {}, () => {players.forEach(player => {player.drawCards(1);});});
        const dracoMalfoy = new Villain("Draco Malfoy", "Game 1", "villain", 6, "health", () => {}, () => {activeLocation.removeFromLocation();});
        const quirinusQuirrell = new Villain("Quirinus Quirrell", "Game 1", "villain", 6, "health", () => {activePlayer.health--;}, () => {players.forEach(player => {player.influence++; player.health++;});});
        const basilisk = new Villain("Basilisk", "Game 2", "villain", 8, "health", () => {players.forEach(player => {player.petrified = true;});}, () => {players.forEach(player => {player.petrified = false; player.drawCards(1);}); activeLocation.removeFromLocation();});
        const luciusMalfoy = new Villain("Lucius Malfoy", "Game 2", "villain", 7, "health", () => {}, () => {players.forEach(player => {player.influence++;}); activeLocation.removeFromLocation();});
        const tomRiddle = new Villain("Tom Riddle", "Game 2", "villain", 6, "health", () => {let allies = activePlayer.hand.filter(card => {return card.type === "ally";}); const tomRiddleEffect = () => {const loseHealthOrDiscard = index => {playerChoice("Lose:", () => {allies = allies.filter(card => {return activePlayer.hand.includes(card);}); if (allies.length) return 2; return 0;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health -= 2; tomRiddleEffect();}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(activePlayer.hand); document.getElementsByClassName("choice")[1].onclick = () => {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let j = 0; j < activePlayer.hand.length; j++) {document.getElementsByClassName("choice")[j].innerHTML = `<img src="${activePlayer.hand[j].img.src}">`; document.getElementsByClassName("choice")[j].onclick = () => {if (allies.includes(activePlayer.hand[j])) allies.splice(allies.indexOf(activePlayer.hand[j]), 1); activePlayer.forcedDiscardAt(j, true); tomRiddleEffect();};}});}; allies.splice(allies.indexOf(allies[index]), 1);});}; if (allies.length === 1) loseHealthOrDiscard(0); else {playerChoice("Choose an ally to lose 2 health or discard a card:", () => {allies = allies.filter(card => {return activePlayer.hand.includes(card);}); return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {loseHealthOrDiscard(i)};}});}}; tomRiddleEffect();}, () => {players.forEach(player => {const allies = player.discard.filter(card => {return card.type === "ally"}); const drawAllyFromDiscard = () => {const putAllyInHand = index => {const tempPetrified = player.petrified; player.petrified = false; player.draw.unshift(allies[index]); player.drawCards(1); player.discard.splice(player.discard.indexOf(allies[index]), 1); player.petrified = tempPetrified;}; if (allies.length === 1) putAllyInHand(0); else {playerChoice("Add to hand:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {putAllyInHand(i)};}});}}; if (allies.length && player.health < 10) {playerChoice(`Choose for ${player.hero}:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div>${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[0].onclick = () => {player.health += 2;}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(allies); document.getElementsByClassName("choice")[1].onclick = drawAllyFromDiscard;});} else if (allies.length) drawAllyFromDiscard(); else player.health += 2;});});
        const dementor = new Villain("Dementor", "Game 3", "villain", 8, "health", () => {activePlayer.health -= 2;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();});
        const peterPettigrew = new Villain("Peter Pettigrew", "Game 3", "villain", 7, "health", () => {if (!activePlayer.draw.length) activePlayer.shuffle(); if (activePlayer.draw[0].cost) {activePlayer.drawCards(1); activePlayer.forcedDiscardAt(activePlayer.hand.length - 1, true); activeLocation.addToLocation();}}, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell";}); if (spells.length) {const discardToHand = index => {player.discard.splice(player.discard.indexOf(spells[index]), 1); player.draw.unshift(spells[index]); const tempPetrified = player.petrified; player.petrified = false; player.drawCards(1); player.petrified = tempPetrified;}; if (spells.length === 1) discardToHand(0); else {playerChoice("Move from Discard to Hand:", () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});}}}); activeLocation.removeFromLocation();});
        // TO-DO: add other games' villains to villains if selected
        let inactiveVillains = [crabbeAndGoyle, dracoMalfoy, quirinusQuirrell];
        if (activeGame !== "Game 1") {
            inactiveVillains.push(basilisk, luciusMalfoy, tomRiddle);
            if (activeGame !== "Game 2") {
                inactiveVillains.push(dementor, peterPettigrew);
                if (activeGame !== "Game 3") {
                    // TO-DO: add Game 4 villains
                }
            }
        }
        shuffle(inactiveVillains);
        let activeVillains = [inactiveVillains.shift()];
        if (activeGame !== "Game 1" && activeGame !== "Game 2") {
            activeVillains.push(inactiveVillains.shift());
            if (activeGame !== "Game 3" && activeGame !== "Game 4") {
                activeVillains.push(inactiveVillains.shift());
            }
        }

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
        const horcrux1 = new Event("Horcrux 1", () => {}, () => {}); // TO-DO: complete horcruxes
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
                ${game === "Game 7" ? activeEvent.img : ""}
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

        const populateVillains = () => {
            // add villains to board
            document.getElementById("villain1").appendChild(activeVillains[0].img);
            if (activeVillains.length > 1) document.getElementById("villain2").appendChild(activeVillains[1].img);
            if (activeVillains.length > 2) document.getElementById("villain3").appendChild(activeVillains[2].img);

            // remove villain damage from board
            for (let i = 0; i < document.getElementsByClassName("villainDamage").length; i++) {
                document.getElementsByClassName("villainDamage")[i].innerHTML = "";
            }

            // deal damage by clicking on a villain or villain's damage area
            for (let i = 0; i < activeVillains.length; i++) {
                activeVillains[i].health = activeVillains[i].health;
                const dealDamage = () => {
                    if (activeDarkArtsEvent !== tarantallegra || !activeVillains[i].takenDamage) {
                        if (activePlayer.attack > 0 && activeVillains[i].healthType === "health") {
                            activePlayer.attack--;
                            activeVillains[i].health--;
                            activeVillains[i].takenDamage = true;
                            activePlayer.attacks++;
                        }
                        else if (activePlayer.influence > 0 && activeVillains[i].healthType === "influence") {
                            activePlayer.influence--;
                            activeVillains[i].health--;
                            activeVillains[i].takenDamage = true;
                        }
                    }
                }
                document.getElementsByClassName("activeVillain")[i].onclick = dealDamage;
                document.getElementsByClassName("villainDamage")[i].onclick = dealDamage;
            }
        };
        populateVillains();

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
            activePlayer.health = activePlayer.health; // moves health token to correct location
            if (firstTurn) {
                players.forEach(player => {player.drawCards(5);});
                firstTurn = false;
            }
            activePlayer.populateHand();
            document.getElementById("heroImage").appendChild(activePlayer.heroImage);
            document.getElementById("heroImage").appendChild(activePlayer.proficiencyImage);
            activePlayer.displayAttack();
            activePlayer.displayInfluence();

            // unstun everyone
            players.forEach(player => {
                if (player.stunned) {
                    player.stunned = false;
                    player.health = 10;
                }
            });

            // unpetrify villain
            activeVillains.forEach(villain => {if (villain.petrifiedBy === activePlayer) villain.petrifiedBy = null; villain.takenDamage = false;});

            // flip Dark Arts Event(s)
            let villainTimeout = 2000 - activeLocation.darkArtsEventDraws * 1000;
            for (let i = 0; i < activeLocation.darkArtsEventDraws; i++) {
                setTimeout(() => {
                    // updates activeDarkArtsEvent
                    if (darkArtsEvents.indexOf(activeDarkArtsEvent) < darkArtsEvents.length - 1) {
                        activeDarkArtsEvent = darkArtsEvents[darkArtsEvents.indexOf(activeDarkArtsEvent) + 1];
                    }
                    else {
                        lastCardImg = activeDarkArtsEvent.img;
                        darkArtsEvents.forEach(darkArtsEvent => {darkArtsEvent.generateImg();});
                        shuffle(darkArtsEvents);
                        activeDarkArtsEvent = darkArtsEvents[0];
                    }

                    // reveal Dark Arts Event
                    const darkArtsEventsElement = document.getElementById("darkArtsEvents");
                    darkArtsEventsElement.appendChild(activeDarkArtsEvent.img);
                    activeDarkArtsEvent.img.classList.toggle("flipped");
                    setTimeout(() => {
                        activeDarkArtsEvent.effect();

                        // remove previous dark arts card
                        if (lastCardImg && activeDarkArtsEvent === darkArtsEvents[0]) {
                            lastCardImg.remove();
                        }
                        else if (darkArtsEvents.indexOf(activeDarkArtsEvent) > 0) {
                            darkArtsEvents[darkArtsEvents.indexOf(activeDarkArtsEvent) - 1].img.remove();
                        }
                    }, 1000);
                }, i ? ((i * 2000) + 1000) : 1000);
                villainTimeout += i ? 3000 : 2000;
            }
        
            // villain effects
            setTimeout(() => {
                for (let i = 0; i < activeVillains.length; i++) {
                    if (!activeVillains[i].petrifiedBy) setTimeout(() => {activeVillains[i].effect();}, i * 1000);
                }
            }, villainTimeout);
        };
        document.getElementsByTagName("IMG")[document.getElementsByTagName("IMG").length - 1].onload = startTurn;

        // end turn
        document.getElementById("endTurn").onclick = () => {
            // unstun and unpetrify everyone
            players.forEach(player => {
                player.petrified = false;
                if (player.stunned) {
                    player.stunned = false;
                    player.health = 10;
                }
            });

            // player resets for next turn
            activePlayer.endTurn();
            activeLocation.removed = false;

            // replace with new villain
            for (let i = 0; i < activeVillains.length; i++) {
                if (activeVillains[i].health <= 0) {
                    if (inactiveVillains.length) {
                        activeVillains[i] = inactiveVillains.shift();
                        document.getElementsByClassName("activeVillain")[i].appendChild(activeVillains[i].img);

                        // remove villain card back and add Lord Voldemort
                        if (!inactiveVillains.length) {
                            document.getElementById("villainDraw").innerHTML = "";
                            if (activeGame !== "Game 1" && activeGame !== "Game 2" && activeGame !== "Game 3" && activeGame !== "Game 4") {
                                // TO-DO: add Voldemort to villainDraw
                            }
                        }
                    }
                    else {
                        activeVillains.splice(i, 1);
                        populateVillains();
                    }
                }
            }

            // start new turn
            startTurn();
        }
    }
    else {
        alert("Can't have more than one of each hero.");
    }
}
