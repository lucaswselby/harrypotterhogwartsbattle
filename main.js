// prevent page reload
window.onbeforeunload = event => {
    event.preventDefault();
}

// display player proficiecy choice
const displayGameChoices = playerNumber => {
    const game = document.querySelector("input[name=\"game\"]:checked").value;
    const player = document.querySelector(`input[name="player${playerNumber}"]:checked`).value;
    const proficiecyElem = document.getElementById(`player${playerNumber}Proficiency`);
    const charmElem = document.getElementById(`player${playerNumber}Charm`);

    if (game === "Game 7" || game.includes("Box") || game.includes("Pack")) {
        // change player images based on game
        document.querySelector(`label[for="player${playerNumber}Harry"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/harryPotter.png";
        document.querySelector(`label[for="player${playerNumber}Ron"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/ronWeasley.png";
        document.querySelector(`label[for="player${playerNumber}Hermione"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/hermioneGranger.png";
        document.querySelector(`label[for="player${playerNumber}Neville"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/nevilleLongbottom.png";
        if (game.includes("Box") || game.includes("Pack")) {
            for (let i = 0; i < document.getElementsByClassName("boxOnly").length; i++) {
                document.getElementsByClassName("boxOnly")[i].style.display = "initial";
            }
        }
        if (game.includes("Pack")) {
            for (let i = 0; i < document.getElementsByClassName("packOnly").length; i++) {
                document.getElementsByClassName("packOnly")[i].style.display = "initial";
            }            
        }

        // Patronus options
        let patronusDisplay = "none";
        if (game === "Box 3" || game === "Box 4" || game.includes("Pack")) patronusDisplay = "inline";
        else patronusDisplay = "none";
        for (let i = 0; i < document.getElementsByClassName("patronus").length; i++) {
            document.getElementsByClassName("patronus")[i].style.display = patronusDisplay;
        }
    }
    else {
        // change player images based on game
        for (let i = 0; i < document.getElementsByClassName("boxOnly").length; i++) {
            document.getElementsByClassName("boxOnly")[i].style.display = "none";
        }
        for (let i = 0; i < document.getElementsByClassName("packOnly").length; i++) {
            document.getElementsByClassName("packOnly")[i].style.display = "none";
        }
        if (game === "Game 1" || game === "Game 2") {
            document.querySelector(`label[for="player${playerNumber}Harry"]`).getElementsByTagName("IMG")[0].src = "./images/Game 1/harryPotter.png";
            document.querySelector(`label[for="player${playerNumber}Ron"]`).getElementsByTagName("IMG")[0].src = "./images/Game 1/ronWeasley.png";
            document.querySelector(`label[for="player${playerNumber}Hermione"]`).getElementsByTagName("IMG")[0].src = "./images/Game 1/hermioneGranger.png";
            document.querySelector(`label[for="player${playerNumber}Neville"]`).getElementsByTagName("IMG")[0].src = "./images/Game 1/nevilleLongbottom.png";
        }
        else if (game === "Game 3" || game === "Game 4" || game === "Game 5" || game === "Game 6") {
            document.querySelector(`label[for="player${playerNumber}Harry"]`).getElementsByTagName("IMG")[0].src = "./images/Game 3/harryPotter.png";
            document.querySelector(`label[for="player${playerNumber}Ron"]`).getElementsByTagName("IMG")[0].src = "./images/Game 3/ronWeasley.png";
            document.querySelector(`label[for="player${playerNumber}Hermione"]`).getElementsByTagName("IMG")[0].src = "./images/Game 3/hermioneGranger.png";
            document.querySelector(`label[for="player${playerNumber}Neville"]`).getElementsByTagName("IMG")[0].src = "./images/Game 3/nevilleLongbottom.png";
        }
    }

    // display proficiency choice
    if (player && (game === "Game 6" || game === "Game 7" || game.includes("Box") || game.includes("Pack"))) {
        proficiecyElem.style.display = "flex";
        if (game.includes("Pack")) charmElem.style.display = "flex";
        else charmElem.style.display = "none";
    }
    else {
        proficiecyElem.style.display = "none";
        charmElem.style.display = "none";
    }
}
/*document.getElementById("player3Hero").onchange = () => {
    displayGameChoices(3);
}
document.getElementById("player4Hero").onchange = () => {
    displayGameChoices(4);
}
document.getElementById("player5Hero").onchange = () => {
    displayGameChoices(5);
}*/
const gameElems = document.getElementsByName("game");
for (let i = 0; i < gameElems.length; i++) {
    gameElems[i].onclick = () => {
        for (let j = 1; j <= document.getElementsByClassName("playerChoice").length; j++) {
            displayGameChoices(j);
        }
    };
}

// Patronus changes for each player
for (let i = 0; i < document.getElementsByClassName("playerChoice").length; i++) {
    for (let j = 0; j < document.getElementsByClassName("playerChoice")[i].getElementsByClassName(`player${i + 1}`).length; j++) {
        document.getElementsByClassName("playerChoice")[i].getElementsByClassName(`player${i + 1}`)[j].onclick = () => {
            const player = document.querySelector(`input[name="player${i + 1}"]:checked`).value;
            const patronusImage = document.querySelector(`label[for="player${i + 1}Patronus"]`).getElementsByTagName("IMG")[0];
            if (player.includes("Harry Potter")) patronusImage.src = "./images/Box 3/stagPatronus.png";
            else if (player.includes("Ron Weasley")) patronusImage.src = "./images/Box 3/terrierPatronus.png";
            else if (player.includes("Hermione Granger")) patronusImage.src = "./images/Box 3/otterPatronus.png";
            else if (player.includes("Neville Longbottom")) patronusImage.src = "./images/Box 3/nonCorporealPatronus.png";
            else if (player === "Luna Lovegood") patronusImage.src = "./images/Box 3/rabbitPatronus.png";
            else if (player === "Ginny Weasley") patronusImage.src = "./images/Pack 1/horsePatronus.png";
            else alert(`${player} is not a valid Hero.`);
        };
    }
}

// prep for mobile magnify
window.oncontextmenu = event => {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

document.getElementById("submitPlayers").onclick = () => {
    // can't have more than one of each hero or proficiency
    let continueGame = true;
    for (let i = 0; i < document.getElementsByClassName("playerChoice").length - 1; i++) {
        const firstPlayer = document.querySelector(`input[name="player${i + 1}"]:checked`).value;
        if (firstPlayer) {
            for (let j = i + 1; j < document.getElementsByClassName("playerChoice").length; j++) {
                const secondPlayer = document.querySelector(`input[name="player${j + 1}"]:checked`).value;
                if (firstPlayer.includes(secondPlayer) || secondPlayer.includes(firstPlayer)) {
                    continueGame = false;
                }
            }
        }
    }
    for (let i = 0; i < document.getElementsByClassName("proficiencyChoice").length - 1; i++) {
        if (document.getElementsByClassName("proficiencyChoice")[i].style.display === "flex" && document.querySelector(`input[name="player${i + 1}Proficiency"]:checked`).value !== "Patronus") {
            for (let j = i + 1; j < document.getElementsByClassName("proficiencyChoice").length; j++) {
                if (document.getElementsByClassName("proficiencyChoice")[j].style.display === "flex" && document.querySelector(`input[name="player${i + 1}Proficiency"]:checked`).value === document.querySelector(`input[name="player${j + 1}Proficiency"]:checked`).value && document.querySelector(`input[name="player${j + 1}Proficiency"]:checked`).value !== "Patronus") {
                    continueGame = false;
                }
            }
        }
    }
    for (let i = 0; i < document.getElementsByClassName("charmChoice").length - 1; i++) {
        if (document.getElementsByClassName("charmChoice")[i].style.display === "flex") {
            for (let j = i + 1; j < document.getElementsByClassName("charmChoice").length; j++) {
                if (document.getElementsByClassName("charmChoice")[j].style.display === "flex" && document.querySelector(`input[name="player${i + 1}Charm"]:checked`).value === document.querySelector(`input[name="player${j + 1}Charm"]:checked`).value) {
                    continueGame = false;
                }
            }
        }
    }

    // display game
    if (continueGame) {
        document.getElementsByTagName("MAIN")[0].style.display = "flex";
        document.getElementsByTagName("MAIN")[0].style.overflowY = "hidden";
        let activeGame = document.querySelector("input[name=\"game\"]:checked").value;
        const attackToken = "<img src=\"./images/attackToken.png\" alt=\"Choose Attack Token\" style=\"width: 33%;\">";
        const influenceToken = "<img src=\"./images/influenceToken.png\" alt=\"Choose Influece Token\" style=\"width: 33%;\">";
        const healthToken = "<img src=\"images/healthTracker.png\" alt=\"Choose Health Token\" style=\"width: 33%;\">";
        const hogwartsCardBack = "<img src=\"./images/hogwartsCardBack.png\" alt=\"Draw card\" style=\"width: 33%;\">";
        const redDie = "<img src=\"./images/Game 4/redDie.png\" alt=\"Gryffindor die\">";
        const yellowDie = "<img src=\"./images/Game 4/yellowDie.png\" alt=\"Hufflepuff die\">";
        const blueDie = "<img src=\"./images/Game 4/blueDie.png\" alt=\"Ravenclaw die\">";
        const greenDie = "<img src=\"./images/Game 4/greenDie.png\" alt=\"Slytherin die\">";

        // convert card name to src
        const src = name => {
            return `${name[0].toLowerCase()}${name.substring(1).replaceAll(" ", "").replaceAll("'", "").replaceAll("-", "")}.png`;
        };

        // creates a list of cards you can choose within a playerChoice so you know what you're discarding if you choose to discard
        const choiceScrollHeight = "40vh"; // TO-DO: play with height
        const choiceScroll = array => {
            return `<div style="display: flex; align-items: center; height: ${choiceScrollHeight}; max-width: 100%; overflow-x: auto;">${array.reduce((prev, curr) => {return prev + `OR<img src="${curr.img.src}">`;}, "").substring(2)}</div>`;
        };

        // some cards give the players a choice of action
        class PlayerChoice {
            constructor(description, choices, iterations, populateFunction) {
                this._description = description;
                this._choices = choices;
                this._iterations = iterations;
                this._populateFunction = populateFunction;
            }
            get choices() {
                return this._choices;
            }
            display() {
                if (this._choices()) {
                    // create playerChoice label
                    const playerChoiceLabel = document.createElement("h1");
                    playerChoiceLabel.id = "playerChoiceLabel";
                    playerChoiceLabel.innerHTML = this._description;

                    // create playerChoice element
                    const playerChoiceElement = document.createElement("div");
                    playerChoiceElement.id = "playerChoice";
                    playerChoiceElement.className = this._iterations;

                    // create playerChoiceContainer
                    const playerChoiceContainer = document.createElement("div");
                    playerChoiceContainer.id = "playerChoiceContainer";
                    playerChoiceContainer.appendChild(playerChoiceLabel);
                    playerChoiceContainer.appendChild(playerChoiceElement);

                    // create revealBoard button
                    const revealBoard = document.createElement("button");
                    revealBoard.id = "revealBoard";
                    revealBoard.innerHTML = "Reveal Board";
                    revealBoard.onclick = () => {
                        playerChoiceContainer.classList.toggle("revealBoard");
                        revealBoard.innerHTML = revealBoard.innerHTML === "Reveal Board" ? "Hide Board" : "Reveal Board";
                    };
                    document.getElementsByTagName("MAIN")[0].appendChild(revealBoard);

                    // add columns to playerChoice
                    for (let i = 1; i <= this._choices(); i++) {
                        const choice = document.createElement("div");
                        choice.className = "choice";
                        playerChoiceElement.appendChild(choice);
                    }

                    playerChoiceElement.onclick = () => {
                        // remove playerChoice when clicked
                        playerChoiceContainer.remove();
                        revealBoard.remove();

                        // increment and display a new playerChoice for multiple iterations
                        if (--this._iterations > 0) {
                            playerChoices.unshift(new PlayerChoice(this._description, this._choices, this._iterations, this._populateFunction));
                        }
                    }

                    // add playerChoice to main
                    document.getElementsByTagName("MAIN")[0].appendChild(playerChoiceContainer);

                    // sets width and fills choices
                    playerChoiceElement.style.gridTemplateColumns = `repeat(${this._choices()}, calc((100vw - ${getComputedStyle(playerChoiceElement).getPropertyValue("gap")} * ${this._choices() - 1}) / ${this._choices()}))`;
                    this._populateFunction();
                    const minChoiceWidth = 75; // needs to be a multiple plus .5 of the gap size to give the illusion of there being more options off screen
                    if (document.getElementsByClassName("choice")[0].offsetWidth < minChoiceWidth) {
                        playerChoiceElement.style.overflowX = "scroll";
                        playerChoiceElement.style.gridTemplateColumns = `repeat(${this._choices()}, ${minChoiceWidth}px)`;
                    }

                    // queues next player choice
                    document.getElementById("playerChoice").addEventListener("click", () => {
                        playerChoices.splice(playerChoices.indexOf(this), 1);
                        if (playerChoices.length) {
                            if (playerChoices[0].choices()) playerChoices[0].display();
                            else playerChoices.shift();
                        }
                    });
                }
            }
        }
        let playerChoices = [];
        let playerTurn = false;
        const addPlayerChoice = (description, choices, iterations, populateFunction) => {
            const choice = new PlayerChoice(description, choices, iterations, populateFunction);
            if (choices()) {
                playerChoices.push(choice);
                if (playerChoices.length === 1 && playerTurn) playerChoices[0].display(); // display player choice during the player's turn (not evil turn)
            }
        };

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
            return array;
        };

        // replace encounter with next
        const displayNextEncounter = () => {
            if (encounters.length) {
                document.getElementById("encounters").appendChild(encounters[0].img);
                encounters[0].img.oncontextmenu = event => {magnify(event);};
            }
        };

        // Hogwarts die
        const rollHouseDie = (affectedPlayer, color, evil, arithmancyUsed, selfCorrectingInkRoll) => {
            const originalSelfCorrectingInkRoll = selfCorrectingInkRoll;
            const rerollViable = () => {return (affectedPlayer.proficiency === "Arithmancy" || affectedPlayer.horcruxesDestroyed.includes(forbiddenForestEncounter)) && !arithmancyUsed;};
            let sides = ["influence", "draw", "attack", "health"];
            if (color === "phoenix") {
                sides = ["health", "health 2", "location", "attack", "draw", "draw 2"];
                arithmancyUsed = true;
            }
            else if (color === "red") sides.push("influence", "influence");
            else if (color === "green") sides.push("attack", "attack");
            else if (color === "yellow") sides.push("health", "health");
            else if (color === "blue") sides.push("draw", "draw");
            let result = sides[Math.floor(Math.random() * sides.length)];
            const arithmancyCheck = () => {
                const activateEffect = () => {
                    // result based on roll
                    if (evil) {
                        if (result === "influence" || result === "location") activeLocation.addToLocation();
                        else if (result === "draw") {
                            players.forEach(player => {
                                addPlayerChoice("Discard:", () => {return player.hand.length;}, 1, () => {
                                    for (let i = 0; i < player.hand.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, color !== "phoenix");};
                                    }
                                });
                            });
                        }
                        else if (result === "draw 2") {
                            addPlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 2, () => {
                                for (let i = 0; i < affectedPlayer.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {affectedPlayer.forcedDiscardAt(i, false);};
                                }
                            });
                        }
                        else if (result === "attack") players.forEach(player => {player.health--;});
                        else if (result === "health") {
                            if (color === "phoenix") {
                                activeVillains.filter(villain => {return villain.type.includes("creature");}).forEach(creature => {
                                    creature.health++;
                                    creature.influence++;
                                });
                            }
                            else {
                                activeVillains.filter(villain => {return villain.type.includes("villain");}).forEach(villain => {
                                    villain.health++;
                                });
                            }
                        }
                        else if (result === "health 2") {
                            activeVillains.forEach(villain => {
                                villain.health++;
                                villain.influence++;
                            });                    
                        }
                        else alert(`${color} is not a die color.`);
                    }
                    else {
                        if (result === "influence") players.forEach(player => {player.influence++;});
                        else if (result.includes("draw")) players.forEach(player => {player.drawCards(result === "draw" ? 1 : 2);});
                        else if (result === "attack") players.forEach(player => {player.attack++;});
                        else if (result.includes("health")) players.forEach(player => {player.health += result === "health" ? 1 : 2;});
                        else if (result === "location") activeLocation.removeFromLocation();
                        else alert(`${color} is not a die color.`);
                    }

                    // add symbol to encounter
                    if (encounters.length && encounters[0].remaining.length && !evil) encounters[0].addSymbol(result);
                };

                // returns the imge corresponding the to result of the dice roll
                const rewardImg = reward => {;
                    switch (reward) {
                        case "influence": return influenceToken;
                        case "draw": return hogwartsCardBack;
                        case "health": return healthToken;
                        case "attack": return attackToken;
                        default: alert(`${color} is not a die color.`);
                        // TO-DO: add Phoenix die options, then make arithmancyUsed false for phoenix die users like Kreacher and Boggart
                    }
                }

                // check for Self Correcting Ink
                if (selfCorrectingInkRoll && affectedPlayer.influence) {
                    let commonRoll;
                    switch (color) {
                        case "red": commonRoll = "influence";
                            break;
                        case "blue": commonRoll = "draw";
                            break;
                        case "yellow": commonRoll = "health";
                            break;
                        case "green": commonRoll = "attack";
                            break;
                        default: alert(`${color} is not a die color.`);
                        // TO-DO: add Phoenix die options, then make arithmancyUsed false for phoenix die users like Kreacher and Boggart
                    }
                    let otherResults = ["influence", "draw", "attack", "health"].filter(otherResult => {return otherResult !== result});
                    if (result === commonRoll) {
                        otherResults.splice(Math.floor(Math.random() * 3), 1); // remove the side of the die facing down
                    }
                    addPlayerChoice("Choose 1:", () => {return otherResults.length + 1;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `<p>Keep${rerollViable() ? " or reroll" : ""}:</p>${rewardImg(result)}`;
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            selfCorrectingInkRoll = false;
                            arithmancyCheck();
                        };
                        for (let i = 0; i < otherResults.length; i++) {
                            document.getElementsByClassName("choice")[i + 1].innerHTML = `<p>Spend 1 influence:</p>${rewardImg(otherResults[i])}`;
                            document.getElementsByClassName("choice")[i + 1].onclick = () => {
                                affectedPlayer.influence--;
                                result = otherResults[i];
                                arithmancyUsed = true;
                                selfCorrectingInkRoll = false;
                                arithmancyCheck();
                            };
                        }
                    });
                }
                // check for Arithmancy
                else if (rerollViable()) {
                    addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = rewardImg(result);
                        document.getElementsByClassName("choice")[0].onclick = activateEffect;
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Re-roll</p>";
                        document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie(affectedPlayer, color, evil, true, originalSelfCorrectingInkRoll);};
                        if (affectedPlayer.proficiency === "Arithmancy") darken(affectedPlayer.proficiencyImage);
                        if (affectedPlayer.horcruxesDestroyed.includes(forbiddenForestEncounter)) darken(forbiddenForestEncounter.img);
                    });
                }
                else {
                    activateEffect();
                }
            };
            arithmancyCheck();
        };

        // check if Voldemort is in the draw villain spot
        const invulnerableVoldemort = () => {
            if (!inactiveVillains.length) {
                if ((activeGame === "Game 5" || activeGame === "Box 1") && activeVillains[0] !== lordVoldemort1) {
                    return lordVoldemort1;
                }
                else if ((activeGame === "Game 6" || activeGame === "Box 2") && activeVillains[0] !== lordVoldemort2) {
                    return lordVoldemort2;
                }
                else if ((activeGame === "Game 7" || activeGame === "Box 3") && activeVillains[0] !== lordVoldemort3) {
                    return lordVoldemort3;
                }
                else if (activeGame === "Box 4" && activeVillains[0] !== lordVoldemort4) {
                    return lordVoldemort4;
                }
            }
            return null;
        };

        // check if player can heal
        const canHeal = player => {
            let canHeal = player.health < 10 && !player.stunned;
            if (activeDarkArtsEvents.includes(sectumsempra1)) {
                canHeal = false;
                darken(sectumsempra1.img);
            }
            if (activeDarkArtsEvents.includes(sectumsempra2)) {
                canHeal = false;
                darken(sectumsempra2.img);
            }
            if (activeVillains.includes(fenrirGreyback) && !fenrirGreyback.petrifiedBy && fenrirGreyback.health > 0) {
                canHeal = false;
                darken(fenrirGreyback.img);
            }
            if (encounters.length && encounters[0] === horcrux6 && player === players[0]) {
                canHeal = false;
                darken(horcrux6.img);
            }
            return canHeal;
        };

        // darken and brighten image
        const darken = element => {
            element.style.animation = "darken 2s";
            setTimeout(() => {element.style.animation = "none";}, 2000);
        };

        // magnify an image
        const magnify = event => {
            event.preventDefault();
            const magnifyContainer = document.createElement("div");
            magnifyContainer.className = "magnifyContainer";
            magnifyContainer.onclick = () => {
                while(document.getElementsByClassName("magnifyContainer")[0]) document.getElementsByClassName("magnifyContainer")[0].remove();
            };
            magnifyContainer.innerHTML = `<img src="${event.target.src}">`;
            document.getElementsByTagName("MAIN")[0].appendChild(magnifyContainer);
        };

        // Mermaid effect
        const activeMermaid = () => {
            if (activeVillains.includes(mermaid) && !mermaid.petrifiedBy && mermaid.influence > 0) {
                darken(mermaid.img);
                return true;
            }
            return false;
        };

        // return the players before and after the active player
        const getNeighbors = player => {
            let neighbors = [];
            if (players.indexOf(player) === 0) {
                neighbors.push(players[players.length - 1]);
                if (players.length > 2) neighbors.push(players[players.indexOf(player) + 1]);
            }
            else if (players.indexOf(player) === players.length - 1) {
                neighbors.push(players[players.indexOf(player - 1)]);
                if (players.length > 2) neighbors.push(players[0]);
            }
            else {
                neighbors.push(players[players.indexOf(player) - 1], players[players.indexOf(player) + 1])
            }
            return neighbors;
        };

        const rollAnyHouseDie = (affectedPlayer, selfCorrectingInkRoll) => {
            addPlayerChoice("Roll a House Die:", () => {return 4;}, 1, () => {
                document.getElementsByClassName("choice")[0].innerHTML = blueDie; 
                document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie(affectedPlayer, "blue", false, false, selfCorrectingInkRoll);}; 
                document.getElementsByClassName("choice")[1].innerHTML = greenDie; 
                document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie(affectedPlayer, "green", false, false, selfCorrectingInkRoll);}; 
                document.getElementsByClassName("choice")[2].innerHTML = redDie; 
                document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie(affectedPlayer, "red", false, false, selfCorrectingInkRoll);}; 
                document.getElementsByClassName("choice")[3].innerHTML = yellowDie; 
                document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie(affectedPlayer, "yellow", false, false, selfCorrectingInkRoll);};
            });
        };

        // cards
        class Card {
            constructor(name, game, type, cost, effect, passive, houseDie) {
                this._name = name;
                this._game = game;
                this._img = document.createElement("img");
                this._img.src = `./images/${game}/${src(name)}`;
                this._img.className = "card";
                this._img.alt = name;
                this._effect = effect;
                this._type = type;
                this._cost = cost;
                this._passive = passive;
                this._houseDie = houseDie;
            }
            clone() {
                return new Card(this._name, this._game, this._type, this._cost, this._effect, this._passive, this._houseDie);
            }
            get name() {
                return this._name;
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
                    if (!document.getElementById("playerChoice") && players[0].hand.includes(this)) {
                        // Healing Charm
                        if (players[0].charm === "Healing" && this.type === "ally") {
                            if (players[0].health > 7) {
                                const hurtPlayers = players.filter(player => {return canHeal(player);});
                                if (hurtPlayers.length) {
                                    if (hurtPlayers.length > 1) {
                                        addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
                                            for (let i = 0; i < hurtPlayers.length; i++) {
                                                document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                                document.getElementsByClassName("choice")[i].innerHTML += `Health: ${hurtPlayers[i].health}`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                            }
                                        });
                                    }
                                    else hurtPlayers[0].health += 2;
                                }
                            }
                            else if (players[0].health < 4) {
                                players.forEach(player => {player.health += 2;});
                            }
                            else {
                                getNeighbors(players[0]).concat(players[0]).forEach(player => {player.health += 2;});
                            }
                        }
                        // Summoning Charm
                        else if (players[0].charm === "Summoning" && players[0].played.filter(card => {return card.type === "item"}).length && this.type === "ally") {
                            if (players[0].health > 7) players[0].attack++;
                            else if (players[0].health < 4) {
                                const healable = players.filter(player => {return canHeal(player);});
                                if (healable.length) {
                                    if (healable.length > 1) {
                                        addPlayerChoice("Heal for 2:", () => {return healable.length;}, 1, () => {
                                            for (let i = 0; i < healable.length; i++) {
                                                document.getElementsByClassName("choice")[i].appendChild(healable[i].heroImage.cloneNode());
                                                document.getElementsByClassName("choice")[i].innerHTML += `Health: ${healable[i].health}`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {healable[i].health += 2;};
                                            }
                                        });
                                    }
                                    else healable[0].health += 2;
                                }
                            }
                            else players[0].influence++;
                        }

                        // card effect
                        players[0].discardAt(players[0].hand.indexOf(this));
                        this._effect(players[0]);

                        // Every-Flavour Beans effect
                        if (players[0].passives.includes(everyFlavourBeans) && this.type === "ally") {
                            players[0].attack++;
                        }
                        // Fleur Delacour effect
                        if (players[0].passives.includes(fleurDelacour) && this.type === "ally" && this !== fleurDelacour) {
                            players[0].health += 2;
                            players[0].passives.splice(players[0].passives.indexOf(fleurDelacour), 1);
                        }
                        // Luna Lovegood effect
                        if (players[0].passives.includes(lunaLovegood) && this.type === "item") {
                            players[0].attack++;
                            players[0].passives.splice(players[0].passives.indexOf(lunaLovegood), 1);
                        }
                        // OWLS effect
                        if (players[0].passives.includes(owls1) && this.type === "spell") {
                            owlsSpells1++;
                            if (owlsSpells1 === 2) {
                                players[0].attack++;
                                players[0].health++;
                            }
                        }
                        if (players[0].passives.includes(owls2) && this.type === "spell") {
                            owlsSpells2++;
                            if (owlsSpells2 === 2) {
                                players[0].attack++;
                                players[0].health++;
                            }
                        }
                        // Elder Wand effect
                        if (players[0].passives.includes(elderWand) && this.type === "spell") {
                            players[0].attack++;
                            players[0].health++;
                        }
                        // Gillyweed effect
                        if (this.type === "ally") {
                            const gillyweedEffect = () => {
                                const hurtPlayers = players.filter(player => {return canHeal(player);});
                                if (hurtPlayers.length) {
                                    if (hurtPlayers.length > 1) {
                                        addPlayerChoice("Heal for 1:", () => {return hurtPlayers.length;}, 1, () => {
                                            for (let i = 0; i < hurtPlayers.length; i++) {
                                                document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                                document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health++;};
                                            }
                                        });
                                    }
                                    else hurtPlayers[0].health++;
                                }
                            };
                            if (players[0].passives.includes(gillyweed1)) {
                                gillyweedEffect();
                            }
                            if (players[0].passives.includes(gillyweed2)) {
                                gillyweedEffect();
                            }
                        }
                        // Divination proficiency
                        if (players[0].proficiency === "Divination" && this.type === "item") {
                            addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<p>Top of deck</p><img src="${players[0].draw[0].img.src}">`;
                                document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard</p><img src="${players[0].draw[0].img.src}">`;
                                document.getElementsByClassName("choice")[1].onclick = () => {
                                    let tempPetrified = players[0].petrified;
                                    players[0].petrified = false;
                                    players[0].cardsDrawn--;
                                    players[0].drawCards(1);
                                    players[0].forcedDiscardAt(players[0].hand.length - 1, false);
                                    players[0].petrified = tempPetrified;
                                };
                            });
                        }
                        // Horcrux 1 effect
                        if (encounters.length && encounters[0] === horcrux1 && this.type === "ally") {
                            players[0].health--;
                            darken(horcrux1.img);
                        }
                        // Peskipiksi Pesternomi reward
                        if (players[0].horcruxesDestroyed.includes(peskipiksiPesternomi) && this.cost && this.cost % 2 === 0) {
                            const hurtPlayers = players.filter(player => {return canHeal(player);});
                            if (hurtPlayers.length) {
                                if (hurtPlayers.length > 1) {
                                    addPlayerChoice("Heal for 1:", () => {return hurtPlayers.length;}, 1, () => {
                                        for (let i = 0; i < hurtPlayers.length; i++) {
                                            document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); 
                                            document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; 
                                            document.getElementsByClassName("choice")[i].onclick = () => {
                                                hurtPlayers[i].health++;
                                            };
                                        }
                                    });
                                }
                                else hurtPlayers[0].health++;
                                darken(peskipiksiPesternomi.img);
                            }
                        }
                        // Escape effect
                        if (encounters.length && encounters[0] === escape && (this.type === "item" || this.type === "ally")) {
                            players[0].health--;
                            darken(escape.img);
                        }

                        players[0].playedPush(this);
                    }
                }
            }
            get passive() {
                return this._passive;
            }
            get houseDie() {
                return this._houseDie;
            }
            effect(player) {
                this._effect(player);
            }
        }

        // Harry starting cards
        const alohomoraEffect = affectedPlayer => {affectedPlayer.influence++;};
        const startingAllyEffect = affectedPlayer => {
            if (canHeal(affectedPlayer) && !activeMermaid()) {
                addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = attackToken; 
                    document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.attack++}; 
                    document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; 
                    document.getElementsByClassName("choice")[1].onclick = () => {affectedPlayer.health += 2;};
                });
            }
            else if (canHeal(affectedPlayer)) affectedPlayer.health += 2; 
            else if (!activeMermaid()) affectedPlayer.attack++;
        };
        const alohomoraHarry1 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraHarry2 = alohomoraHarry1.clone();
        const alohomoraHarry3 = alohomoraHarry1.clone();
        const alohomoraHarry4 = alohomoraHarry1.clone();
        const alohomoraHarry5 = alohomoraHarry1.clone();
        const alohomoraHarry6 = alohomoraHarry1.clone();
        const alohomoraHarry7 = alohomoraHarry1.clone();
        const firebolt = new Card("Firebolt", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.attack++;}, true, false);
        const hedwig = new Card("Hedwig", "Game 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const invisibilityCloak = new Card("Invisibility Cloak", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.influence++;}, true, false);
        const harryStartingCards = [alohomoraHarry1, alohomoraHarry2, alohomoraHarry3, alohomoraHarry4, alohomoraHarry5, alohomoraHarry6, alohomoraHarry7, firebolt, hedwig, invisibilityCloak];

        // Ron starting cards
        const alohomoraRon1 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraRon2 = alohomoraRon1.clone();
        const alohomoraRon3 = alohomoraRon1.clone();
        const alohomoraRon4 = alohomoraRon1.clone();
        const alohomoraRon5 = alohomoraRon1.clone();
        const alohomoraRon6 = alohomoraRon1.clone();
        const alohomoraRon7 = alohomoraRon1.clone();
        const cleansweep11 = new Card("Cleansweep 11", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.attack++;}, true, false);
        const everyFlavourBeans = new Card("Every-Flavour Beans", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.influence++;}, true, false);
        const pigwidgeon = new Card("Pigwidgeon", "Game 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const ronStartingCards = [alohomoraRon1, alohomoraRon2, alohomoraRon3, alohomoraRon4, alohomoraRon5, alohomoraRon6, alohomoraRon7, cleansweep11, everyFlavourBeans, pigwidgeon];

        // Hermione starting cards
        const alohomoraHermione1 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraHermione2 = alohomoraHermione1.clone();
        const alohomoraHermione3 = alohomoraHermione1.clone();
        const alohomoraHermione4 = alohomoraHermione1.clone();
        const alohomoraHermione5 = alohomoraHermione1.clone();
        const alohomoraHermione6 = alohomoraHermione1.clone();
        const alohomoraHermione7 = alohomoraHermione1.clone();
        const crookshanks = new Card("Crookshanks", "Game 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const theTalesOfBeedleTheBard = new Card("The Tales Of Beedle The Bard", "Game 1", "item", 0, affectedPlayer => {if (encounters[0] === horcrux3) affectedPlayer.influence += 2; else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `ALL Heroes: ${influenceToken}`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.influence++;});};});}}, false, false);
        const timeTurner = new Card("Time Turner", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.influence++;}, true, false);
        const hermioneStartingCards = [alohomoraHermione1, alohomoraHermione2, alohomoraHermione3, alohomoraHermione4, alohomoraHermione5, alohomoraHermione6, alohomoraHermione7, crookshanks, theTalesOfBeedleTheBard, timeTurner];

        // Neville starting cards
        const alohomoraNeville1 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraNeville2 = alohomoraNeville1.clone();
        const alohomoraNeville3 = alohomoraNeville1.clone();
        const alohomoraNeville4 = alohomoraNeville1.clone();
        const alohomoraNeville5 = alohomoraNeville1.clone();
        const alohomoraNeville6 = alohomoraNeville1.clone();
        const alohomoraNeville7 = alohomoraNeville1.clone();
        const mandrake = new Card("Mandrake", "Game 1", "item", 0, affectedPlayer => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.attack++;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>Any one Hero</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${hurtPlayers.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {if (hurtPlayers.length > 1) {addPlayerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<div>Health: ${hurtPlayers[i].health}</div>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;};});} else affectedPlayer.attack++;}, false, false);
        const remembrall = new Card("Remembrall", "Game 1", "item", 0, affectedPlayer => {affectedPlayer.influence++;}, false, false);
        const trevor = new Card("Trevor", "Game 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const nevilleStartingCards = [alohomoraNeville1, alohomoraNeville2, alohomoraNeville3, alohomoraNeville4, alohomoraNeville5, alohomoraNeville6, alohomoraNeville7, mandrake, remembrall, trevor];

        // Luna starting cards
        const alohomoraLuna1 = new Card("Alohomora Luna", "Box 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraLuna2 = alohomoraLuna1.clone();
        const alohomoraLuna3 = alohomoraLuna1.clone();
        const alohomoraLuna4 = alohomoraLuna1.clone();
        const alohomoraLuna5 = alohomoraLuna1.clone();
        const alohomoraLuna6 = alohomoraLuna1.clone();
        const alohomoraLuna7 = alohomoraLuna1.clone();
        const crumpleHornedSnorkack = new Card("Crumple Horned Snorkack", "Box 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const lionHat = new Card("Lion Hat", "Box 1", "item", 0, affectedPlayer => {affectedPlayer.influence++; if (players.filter(player => {return player !== affectedPlayer && (player.hand.includes(quidditchGear1) || player.hand.includes(quidditchGear2) || player.hand.includes(quidditchGear3) || player.hand.includes(quidditchGear4) || player.hand.includes(firebolt) ||  player.hand.includes(cleansweep11) ||  player.hand.includes(nimbusTwoThousandAndOne1) ||  player.hand.includes(nimbusTwoThousandAndOne2) ||  player.hand.includes(nimbus2000));}).length) affectedPlayer.attack++;}, false, false);
        const spectrespecs = new Card("Spectrespecs", "Box 1", "item", 0, affectedPlayer => {affectedPlayer.influence++; if (!darkArtsEvents.length) {shuffle(inactiveDarkArtsEvents); while (inactiveDarkArtsEvents.length) darkArtsEvents.push(inactiveDarkArtsEvents.shift());} addPlayerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Keep</p>`; document.getElementsByClassName("choice")[1].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Discard</p>`; document.getElementsByClassName("choice")[1].onclick = () => {inactiveDarkArtsEvents.push(darkArtsEvents.shift());};});}, false, false);
        const lunaStartingCards = [alohomoraLuna1, alohomoraLuna2, alohomoraLuna3, alohomoraLuna4, alohomoraLuna5, alohomoraLuna6, alohomoraLuna7, crumpleHornedSnorkack, lionHat, spectrespecs];

        // Ginny starting cards
        const alohomoraGinny1 = new Card("Alohomora Ginny", "Pack 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraGinny2 = alohomoraGinny1.clone();
        const alohomoraGinny3 = alohomoraGinny1.clone();
        const alohomoraGinny4 = alohomoraGinny1.clone();
        const alohomoraGinny5 = alohomoraGinny1.clone();
        const alohomoraGinny6 = alohomoraGinny1.clone();
        const alohomoraGinny7 = alohomoraGinny1.clone();
        const arnold = new Card("Arnold", "Pack 1", "ally", 0, affectedPlayer => {startingAllyEffect(affectedPlayer);}, false, false);
        const batBogeyHex = new Card("Bat Bogey Hex", "Pack 1", "spell", 0, affectedPlayer => {
            const healable = players.filter(player => {return canHeal(player);});
            if (healable.length) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                    document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.attack++;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>ALL Heroes:</p>${healthToken + healable.reduce((prev, curr) => {return prev + `<p>${curr.hero}: ${curr.health}</p>`}, "")}`;
                    document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.health++;});};
                });
            }
            else affectedPlayer.attack++;
        }, false, false);
        const nimbus2000 = new Card("Nimbus 2000", "Pack 1", "item", 0, affectedPlayer => {affectedPlayer.attack++;}, true, false);
        const ginnyStartingCards = [alohomoraGinny1, alohomoraGinny2, alohomoraGinny3, alohomoraGinny4, alohomoraGinny5, alohomoraGinny6, alohomoraGinny7, arnold, batBogeyHex, nimbus2000];

        // players
        class Player {
            constructor(hero, proficiency, charm) {
                this._hero = hero;
                this._heroImage = document.createElement("img");
                this._heroImage.className = "playerHero";
                this._heroImage.src = "./images/";
                if (hero.includes("Box") || hero === "Luna Lovegood") this._heroImage.src += "Box 1";
                else if (hero === "Ginny Weasley") this._heroImage.src += "Pack 1";
                else if (activeGame.includes("Box") || activeGame.includes("Pack") || activeGame === "Game 7") this._heroImage.src += "Game 7";
                else this._heroImage.src += parseInt(activeGame[activeGame.length - 1]) < 3 ? "Game 1" : "Game 3";
                this._heroImage.src += `/${src(hero.includes("Box") ? hero.substring(0, hero.indexOf(" Box")) : hero)}`;
                this._heroImage.alt = hero;
                this._proficiency = "";
                this._proficiencyImage = document.createElement("div");
                let proficiencyGame = "Game 6";
                this._charm = "";
                this._charmImage = document.createElement("div");
                this._charmUsed = false;
                if (activeGame === "Game 6" || activeGame === "Game 7" || activeGame.includes("Box") || activeGame.includes("Pack")) {
                    if (proficiency === "Patronus") {
                        proficiencyGame = "Box 3";
                        if (hero.includes("Harry Potter")) proficiency = "Stag Patronus";
                        else if (hero.includes("Ron Weasley")) proficiency = "Terrier Patronus";
                        else if (hero.includes("Hermione Granger")) proficiency = "Otter Patronus";
                        else if (hero.includes("Neville Longbottom")) proficiency = "Non-Corporeal Patronus";
                        else if (hero === "Luna Lovegood") proficiency = "Rabbit Patronus";
                        else if (hero === "Ginny Weasley") {
                            proficiencyGame = "Pack 1";
                            proficiency = "Horse Patronus";
                        }
                        else alert(`${hero} is not a valid Hero.`);
                    }
                    this._proficiency = proficiency;
                    this._proficiencyImage.remove();
                    this._proficiencyImage = document.createElement("img");
                    this._proficiencyImage.className = "playerProficiency";
                    this._proficiencyImage.src = `./images/${proficiencyGame}/${src(proficiency)}`;
                    this._proficiencyImage.alt = proficiency;

                    if (activeGame.includes("Pack")) {
                        this._charm = charm;
                        this._charmImage.remove();
                        this._charmImage = document.createElement("IMG");
                        this._charmImage.className = "playerCharm";
                        this._charmImage.src = `./images/Pack 1/${src(charm + " Charm")}`;
                        this._charmImage.alt = `${charm} Charm`;
                    }
                }
                this._health = 10;
                this._attack = 0;
                this._influence = 0;
                this._draw = [];
                this._hand = [];
                this._discard = []; 
                this._passives = [];
                if (hero.includes("Harry Potter")) this._discard = harryStartingCards;
                else if (hero.includes("Ron Weasley")) this._discard = ronStartingCards;
                else if (hero.includes("Hermione Granger")) this._discard = hermioneStartingCards;
                else if (hero.includes("Neville Longbottom")) this._discard = nevilleStartingCards;
                else if (hero === "Luna Lovegood") this._discard = lunaStartingCards;
                else if (hero === "Ginny Weasley") this._discard = ginnyStartingCards;
                else alert(`${hero} is not a valid Hero.`);
                this._petrified = false;
                this._stunned = false;
                this._played = [];
                this._hermioneSpecialUsed = false;
                this._potionsProficiencyUsed = false;
                this._gainedHealth = false;
                this._attacks = 0;
                this._influences = 0;
                this._influenceGained = 0;
                this._healthGained = 0;
                this._healthLost = 0;
                this._horcruxesDestroyed = [];
                this._cardsDrawn = -5; // start game by drawing 5 cards
                this._horcrux1Used = false;
                this._invulnerable = false;
                this._bought = [];
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
            get charm() {
                return this._charm;
            }
            get charmImage() {
                return this._charmImage;
            }
            get charmUsed() {
                return this._charmUsed;
            }
            get health() {
                return this._health;
            }
            displayHealth() {
                const healthTracker = document.getElementsByClassName("healthTracker")[players.indexOf(this)];
                healthTracker.style.left = `${10.3 + 8.3 * (9 - this.health)}%`;
                if (this.health % 2 === 1) {
                    healthTracker.style.top = "33%";
                }
                else {
                    healthTracker.style.top = "12%";
                }
            }
            set health(health) {
                // can't heal if stunned
                if (!this.stunned) {
                    // invulnerability
                    if (health < this.health && this._invulnerable) {
                        health = this.health;
                    }
                    // taking damage
                    else if (health < this.health) {
                        // Invisibility Cloak effect
                        if (this.passives.includes(invisibilityCloak)) {
                            health = this.health - 1;
                        }

                        this._healthLost += this.health - health;
                        
                        // Werewolf effect
                        if (activeVillains.includes(werewolf) && !werewolf.petrifiedBy && werewolf.health + werewolf.influence > 0 && !werewolf.activated && this.healthLost >= 4) {
                            activeLocation.addToLocation();
                            werewolf.activated = true;
                        }
                        // Pansy Parkinson effect
                        if (activeVillains.includes(pansyParkinson) && !pansyParkinson.activated && this.healthLost >= 3) {
                            if (players[0].hand.length) {
                                addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {
                                    for (let i = 0; i < players[0].hand.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, true)};
                                    }
                                });
                            }
                            pansyParkinson.activated = true;
                        }
                    }
                    // healing
                    else if (this.health < health) {
                        if (!canHeal(this)) {
                            health = this.health;
                        }
                        else {
                            // Neville Longbottom special
                            if (players[0].hero === "Neville Longbottom" && ((!this.gainedHealth && (activeGame === "Game 3" || activeGame === "Game 4" || activeGame === "Game 5" || activeGame === "Game 6")) || (activeGame === "Game 7" || activeGame.includes("Box") || activeGame.includes("Pack")))) {
                                health++;
                            }
                            // Neville Longbottom Box expansion special
                            else if (players[0].hero === "Neville Longbottom Box") {
                                if (!this.gainedHealth) {
                                    if (health < 10) {
                                        addPlayerChoice(`Pick one for ${this.hero}:`, () => {return 2;}, 1, () => {
                                            document.getElementsByClassName("choice")[0].innerHTML = `${healthToken}<p>Health: ${health}</p>`;
                                            document.getElementsByClassName("choice")[0].onclick = () => {this.health++;};
                                            document.getElementsByClassName("choice")[1].innerHTML = `${influenceToken}<p>Influence: ${this.influence}</p>`;
                                            document.getElementsByClassName("choice")[1].onclick = () => {this.influence++;};
                                        });
                                    }
                                    else this.influence++;
                                }
                            }
                            // Apparition Charm
                            if (this.charm === "Apparition" && !this.gainedHealth) {
                                // TO-DO: highlight Apparition Charm
                                document.getElementsByClassName("playerCharm")[players.indexOf(this)].onclick = () => {
                                    if (this.health > 7) {
                                        const cheapCards = this.played.filter(card => {return card.cost <= 3;});
                                        if (cheapCards.length) {
                                            addPlayerChoice("Affect another Hero with:", () => {return cheapCards.length + 1;}, 1, () => {
                                                for (let i = 0; i < cheapCards.length; i++) {
                                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${cheapCards[i].img.src}">`;
                                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                                        const remainingPlayers = players.filter(player => {return player !== this});
                                                        const gainBenefit = player => {
                                                            cheapCards[i].effect(player);
                                                            document.getElementsByClassName("playerCharm")[players.indexOf(this)].onclick = () => {};
                                                        };
                                                        if (remainingPlayers.length > 1) {
                                                            playerChoices.unshift(new PlayerChoice("Affect:", () => {return remainingPlayers.length;}, 1, () => {
                                                                for (let j = 0; j < remainingPlayers.length; j++) {
                                                                    document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode());
                                                                    document.getElementsByClassName("choice")[j].onclick = () => {gainBenefit(remainingPlayers[j]);};
                                                                }
                                                            }));
                                                        }
                                                        else gainBenefit(remainingPlayers[0]);
                                                    };
                                                }
                                                document.getElementsByClassName("choie")[cheapCards.length].innerHTML = "Nothing";
                                            });
                                        }
                                    }
                                    else if (this.health < 4) {
                                        rollHouseDie(this, "yellow", false, false, false);
                                        document.getElementsByClassName("playerCharm")[players.indexOf(this)].onclick = () => {};
                                    }
                                    else {
                                        const items = this.discard.filter(card => {return card.type === "item";});
                                        if (items.length) {
                                            addPlayerChoice("Move to hand:", () => {return items.length;}, 1, () => {
                                                for (let i = 0; i < items.length; i++) {
                                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`;
                                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                                        this.addToHand(this.discard.splice(this.discard.indexOf(items[i]), 1)[0]);
                                                        document.getElementsByClassName("playerCharm")[players.indexOf(this)].onclick = () => {};
                                                    };
                                                }
                                            });
                                        }
                                    }
                                };
                            }
                            this.gainedHealth = true;

                            this._healthGained += health - this.health;
                            if (this.healthGained >= 3) {
                                // Herbology proficiency
                                if (players[0].proficiency === "Herbology") {
                                    this.drawCards(1);
                                    this._healthGained = -99;
                                }
                                // Non-Corporeal Patronus
                                else if (players[0].proficiency === "Non-Corporeal Patronus") {
                                    this.attack++;
                                    this._healthGained = -99;
                                }
                            }
                        }
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
                    this.displayHealth();
                }
            }
            get attack() {
                return this._attack;
            }
            set attack(attack) {
                if ((!this.stunned && (!encounters.length || encounters[0] !== horcrux3)) || players[0] === this) {
                    // sets attack
                    this._attack = attack;
                    if (this._attack < 0) {
                        this._attack = 0;
                    }

                    // display attack icons
                    document.getElementsByClassName("attackTokens")[players.indexOf(this)].innerHTML = "";
                    for (let i = 0; i < this.attack; i++) {
                        document.getElementsByClassName("attackTokens")[players.indexOf(this)].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                    }
                }
            }
            get influence() {
                return this._influence;
            }
            set influence(influence) {
                if ((!this.stunned && (!encounters.length || encounters[0] !== horcrux3)) || players[0] === this) {
                    // sets influenceGained
                    if (influence > this.influence) this._influenceGained += influence - this.influence;

                    // sets influence
                    this._influence = influence;
                    if (this.influence < 0) {
                        this._influence = 0;
                    }
                    
                    // display influence icons
                    document.getElementsByClassName("influenceTokens")[players.indexOf(this)].innerHTML = "";
                    for (let i = 0; i < this.influence; i++) {
                        document.getElementsByClassName("influenceTokens")[players.indexOf(this)].innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
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
            set discard(discard) {
                this._discard = discard;
            }
            get passives() {
                return this._passives;
            }
            get petrified() {
                if (this._petrified) {
                    if (petrification1.img) darken(petrification1.img);
                    if (petrification2.img) darken(petrification2.img);
                    if (activeVillains.includes(basilisk) && !basilisk.petrifiedBy && basilisk.health > 0) darken(basilisk.img);
                }
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
            get played() {
                return this._played;
            }
            playedPush(card) {
                this._played.push(card);

                // check for spells cast
                let spellsCast = this.played.filter(card => {return card.type === "spell"}).length;

                // Hermione Granger special
                if (!this._hermioneSpecialUsed && spellsCast === 4 && this.hero.includes("Hermione Granger") && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    this._hermioneSpecialUsed = true;
                    if (this.hero === "Hermione Granger") {
                        if (activeGame.includes("Box") || activeGame.includes("Pack") || activeGame === "Game 7") {
                            players.forEach(player => {player.influence++;});
                        }
                        else {
                            addPlayerChoice("Gain 1 influence:", () => {return players.length;}, 1, () => {
                                for (let i = 0; i < players.length; i++) {
                                    document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode());
                                    document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p>`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++;};
                                }
                            });
                        }
                    }
                    // Hermione Granger Box expansion special
                    else {
                        let remainingPlayers = players.filter(player => {return !player.stunned;});
                        if (remainingPlayers.length) {
                            if (remainingPlayers.length > 2) {
                                addPlayerChoice("Gain 1 attack:", () => {return remainingPlayers.length;}, 2, () => {
                                    for (let i = 0; i < remainingPlayers.length; i++) {
                                        document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                                        document.getElementsByClassName("choice")[i].innerHTML += `<p>Attack: ${remainingPlayers[i].attack}</p>`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {remainingPlayers[i].attack++;};
                                    }                                
                                });
                            }
                            else {
                                remainingPlayers[0].attack++;
                                if (remainingPlayers.length > 1) remainingPlayers[1].attack++;
                            }
                        }
                    }
                }

                // Cheering Charm
                if (this.charm === "Cheering" && spellsCast === 3 && !this.charmUsed) {
                    if (this.health > 7) this.influence += 2;
                    else if (this.health < 4) rollHouseDie(this, "red", false, false, false);
                    else this.drawCards(1);
                    this._charmUsed = true;
                }

                // check for items cast
                let itemsCast = this.played.filter(card => {return card.type === "item";}).length;

                // check for allies cast
                let alliesCast = this.played.filter(card => {return card.type === "ally";}).length;

                // Horcrux 1 reward
                if (this.horcruxesDestroyed.includes(horcrux1) && alliesCast === 2 && ! this._horcrux1Used) {
                    const hurtPlayers = players.filter(player => {return canHeal(player);});
                    if (hurtPlayers.length) {
                        if (hurtPlayers.length > 1) {
                            addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
                                for (let i = 0; i < hurtPlayers.length; i++) {
                                    document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                    document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                }
                            });
                        }
                        else {
                            hurtPlayers[0].health += 2;
                            darken(horcrux1.img);
                        }
                    }
                    this._horcrux1Used = true;
                }

                // Potions Proficiency effect
                if (this.proficiency === "Potions" && spellsCast > 0 && itemsCast > 0 && alliesCast > 0 && !this._potionsProficiencyUsed) {
                    addPlayerChoice("Heal for 1 and gain 1 attack:", () => {return players.length;}, 1, () => {
                        for (let i = 0; i < players.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].heroImage.src}"><p>Health: ${players[i].health}</p><p>Attack: ${players[i].attack}</p>`;
                            document.getElementsByClassName("choice")[i].onclick = () => {players[i].health++; players[i].attack++;};
                        }
                    });
                    this._potionsProficiencyUsed = true;
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
                if (this.attacks + this.influences === 3 && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    if (this.hero === "Ron Weasley") {
                        if (activeGame === "Game 7") {
                            players.forEach(player => {player.health += 2;});
                        }
                        else {
                            const hurtPlayers = players.filter(player => {return canHeal(player);});
                            if (hurtPlayers.length) {
                                if (hurtPlayers.length > 1) {
                                    addPlayerChoice(`Gain 2 health:`, () => {return hurtPlayers.length;}, 1, () => {
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
                    // Ron Weasley Box expansion special
                    else if (this.hero === "Ron Weasley Box") {
                        players.forEach(player => {player.health++;});
                    }
                }
            }
            get influences() {
                return this._influences;
            }
            set influences(influences) {
                this._influences = influences;

                // Ron Weasley Box expansion special
                if (this.attacks + this.influences === 3 && this.hero === "Ron Weasley Box") {
                    players.forEach(player => {player.health++;});
                }
            }
            get healthGained() {
                return this._healthGained;
            }
            get healthLost() {
                return this._healthLost;
            }
            get horcruxesDestroyed() {
                return this._horcruxesDestroyed;
            }
            addDestroyedHorcrux(destroyedHorcrux) {
                document.getElementById("encounters").innerHTML = "";
                this._horcruxesDestroyed.push(destroyedHorcrux);
                destroyedHorcrux.img.classList.toggle("event");
                destroyedHorcrux.img.onclick = destroyedHorcrux.reward;
                displayNextEncounter();
            }
            removeDestroyedHorcrux(encounter) {
                this.horcruxesDestroyed.splice(this.horcruxesDestroyed.indexOf(encounter), 1); 
                document.getElementById(encounter.img.id).remove();
            }
            get cardsDrawn() {
                return this._cardsDrawn;
            }
            set cardsDrawn(cardsDrawn) {
                this._cardsDrawn = cardsDrawn;
            }
            get invulnerable() {
                return this._invulnerable;
            }
            get bought() {
                return this._bought;
            }

            banishAt(index) {
                if (document.getElementsByClassName("playerHand")[players.indexOf(this)].contains(this.hand[index].img)) document.getElementsByClassName("playerHand")[players.indexOf(this)].removeChild(this.hand[index].img);
                if (this.passives.includes(this.hand[index])) this._passives.splice(this.passives.indexOf(this.hand[index]), 1);
                this._hand.splice(index, 1);
            }
            discardAt(index) {
                this._discard.push(this.hand[index]);
                const handElem = document.getElementsByClassName("playerHand")[players.indexOf(this)];
                const cardImg = this.hand[index].img;
                if (handElem.contains(cardImg)) handElem.removeChild(cardImg);
                this._hand.splice(index, 1);
            }
            forcedDiscardAt(index, villainOrDAE) {
                // Remembrall and Old Sock effects
                if (this.hand[index] === remembrall || this.hand[index] === oldSock1 || this.hand[index] === oldSock2) {
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
                // Protego effect
                else if (this.hand[index] === protego1 || this.hand[index] === protego2 || this.hand[index] === protego3) {
                    this.attack++;
                    this.health++;
                }
                // Detention effect
                else if (this.hand[index].name === "Detention") {
                    this.health -= 2;
                }
                // Lacewing Flies effect
                else if (this.hand[index] === lacewingFlies1 || this.hand[index] === lacewingFlies2) {
                    this.attack++;
                }
                // Arresto Momentum effect
                else if ((this.hand[index] === arrestoMomentum1 || this.hand[index] === arrestoMomentum2) && activeDarkArtsEvents.length) {
                    activeDarkArtsEvents[activeDarkArtsEvents.length - 1].img.remove();
                    activeDarkArtsEvents.splice(activeDarkArtsEvents.length - 1);
                    // TO-DO: undo passive effects of top DAE like Petrified?
                }
                // Barn Owl effect
                else if (this.hand[index] === barnOwl1 || this.hand[index] === barnOwl2 || this.hand[index] === barnOwl3) {
                    players.forEach(player => {player.health += 2;});
                }
                // Errol effect
                else if (this.hand[index] === errol) {
                    players.forEach(player => {player.drawCards(1);});
                }
                // Screech Owl effect
                else if (this.hand[index] === screechOwl1 || this.hand[index] === screechOwl2) {
                    let remainingPlayers = players.filter(player => {return !activeMermaid() || canHeal(player);});
                    if (remainingPlayers.length) {
                        if (remainingPlayers.length > 2) {
                            addPlayerChoice(`Give ${activeMermaid() ? "" : "1 attack, 1 influence, and "}1 health to:`, () => {return remainingPlayers.length;}, 2, () => {
                                for (let i = 0; i < remainingPlayers.length; i++) {
                                    document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                                    document.getElementsByClassName("choice")[i].innerHTML += `${activeMermaid() ? "" : `<p>Attack: ${remainingPlayers[i].attack}</p><p>Influence: ${remainingPlayers[i].influence}</p>`}<p>Health: ${remainingPlayers[i].health}</p>`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        if (!activeMermaid()) {
                                            remainingPlayers[i].attack++;
                                            remainingPlayers[i].influence++;
                                        }
                                        remainingPlayers[i].health++;
                                        remainingPlayers.splice(i, 1);
                                    };
                                }
                            });
                        }
                        else {
                            remainingPlayers.forEach(player => {
                                if (!activeMermaid()) {
                                    player.attack++;
                                    player.influence++;
                                }
                                player.health++;
                            });
                        }
                    }                    
                }

                if (villainOrDAE) {
                    // Crabbe and Goyle effect
                    if (activeVillains.includes(crabbeAndGoyle) && !crabbeAndGoyle.petrifiedBy && crabbeAndGoyle.health > 0) {
                        this.health--;
                        darken(crabbeAndGoyle.img);
                    }

                    // Defense Against the Dark Arts proficiency
                    if (this.proficiency === "Defense Against The Dark Arts") {
                        this.attack++;
                        this.health++;
                    }
                }

                if (this.passives.includes(this.hand[index])) this._passives.splice(this.passives.indexOf(this.hand[index]), 1);
                this.discardAt(index);
            }
            populateHand() {
                document.getElementsByClassName("playerHand")[players.indexOf(this)].innerHTML = "";
                this.hand.forEach(card => {
                    document.getElementsByClassName("playerHand")[players.indexOf(this)].appendChild(card.img);
                });
            }
            shuffle() {
                // Students Out of Bed effect
                if (encounters.length && encounters[0] === studentsOutOfBed) this._discard.push(detention.clone());

                // shuffle discard pile
                shuffle(this._discard);

                // add discard pile to draw pile
                this._draw = this.draw.concat(this.discard);
                this._discard = [];
            }
            addToHand(card) {
                this.hand.push(card);
                document.getElementsByClassName("playerHand")[players.indexOf(this)].appendChild(card.img);
                if (this === players[0]) {
                    if (card.passive) {
                        this._passives.push(card);
                    }
                    card.generateOnClick();
                }
            }
            drawCards(numberOfCards) {
                if (!this.petrified) {
                    for (let i = 0; i < numberOfCards; i++) {
                        // moves a card from the draw pile to your hand
                        if (this.draw.length) {
                            this.addToHand(this._draw.shift());
    
                            // Luna Lovegood special
                            this.cardsDrawn++;
                            if (this.hero === "Luna Lovegood" && this.cardsDrawn === 1) {
                                const hurtPlayers = players.filter(player => {return canHeal(player);});
                                if (hurtPlayers.length) {
                                    if (hurtPlayers.length > 1) {
                                        addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
                                            for (let i = 0; i < hurtPlayers.length; i++) {
                                                if (hurtPlayers[i].img) document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode());
                                                else document.getElementsByClassName("choice")[i].innerHTML += `<img src="${hurtPlayers[i].heroImage.src}">`;
                                                document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                            }
                                        });
                                    }
                                    else hurtPlayers[0].health += 2;
                                }
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
                // check for encounter completion
                if (encounters.length && (
                    (encounters[0].destroys.length && !encounters[0].remaining.length) ||
                    (encounters[0] === peskipiksiPesternomi && this.played.filter(card => {return card.cost && card.cost % 2 === 0;}).length === 2) || // Peskipiksi Pesternomi completion
                    (encounters[0] === thirdFloorCorridor && this.played.filter(card => {card.type === "spell"}).length >= 2 && this.played.filter(card => {card.type === "item"}).length >= 2 && this.played.filter(card => {card.type === "ally"}).length >= 2) || // Third Floor Corridor completion
                    (encounters[0] === unregisteredAnimagus && (this.attacks === 5 || (!inactiveVillains.length && !activeVillains.filter(villain => {return villain.health || villain.influence;}).length))) || // Unregistered Animagus completion
                    (encounters[0] === fullMoonRises && !activeVillains.filter(villain => {return villain.health || villain.influence;}).length) || // Full Moon Rises completion
                    (encounters[0] === filthyHalfBreed && this.played.map(card => {return card.cost;}).filter((cost, ind, arr) => {return cost > 0 && arr.indexOf(cost) === ind;}).length >= 3) || // Filthy Half-Breed completion
                    (encounters[0] === escape && this.played.filter(card => {card.type === "spell"}).length >= 6) || // Escape completion
                    (encounters[0] === theFirstTask && ( // The First Task completion
                        this.bought.filter(card => {return card.type === "item";}).reduce((prev, curr) => {return prev + curr.cost}, 0) >= 7 || 
                        !hogwartsCards.filter(card => {return card.type === "item"}).length // catch for no more items in the shop
                    )) ||
                    (encounters[0] === theSecondTask && ( // The Second Task completion
                        this.bought.filter(card => {return card.type === "ally"}).length >= 2 ||
                        !hogwartsCards.filter(card => {return card.type === "ally"}).length // catch for no more allies in the shop
                    )) ||
                    (encounters[0] === sneakingInTheHalls && this.played.filter(card => {return card.type === "item"}).length >= 4) || // Sneaking in the Halls completion
                    (encounters[0] === theMinistryIsMeddling && this._influenceGained >= 8) || // The Ministry is Meddling completion
                    (encounters[0] === detentionWithDolores && this.played.map(card => {return card.cost;}).filter(cost => {return cost >= 4;}).length >= 3) // Detention with Dolores completion
                )) this.addDestroyedHorcrux(encounters.shift());

                this.petrified = false;
                while (this.hand.length) this.discardAt(0);
                if (this.charm !== "Permanent Sticking" || this.health > 7) this.attack = 0;
                if (this.charm !== "Permanent Sticking") this.influence = 0;
                this._passives = [];
                this._played = [];
                this._hermioneSpecialUsed = false;
                this._potionsProficiencyUsed = false;
                this.gainedHealth = false;
                this.attacks = 0;
                this.influences = 0;
                this._influenceGained = 0;
                owlsSpells1 = 0;
                owlsSpells2 = 0;
                this._healthGained = 0;
                this._healthLost = 0;
                players.forEach(player => {player._invulnerable = false;});
                this._horcrux1Used = false;
                this._bought = [];
                this._charmUsed = false;
                this.proficiencyImage.onclick = () => {};
                this.charmImage.onclick = () => {};
                playerTurn = false;
                
                // Peskipiksi Pesternomi effect
                if (encounters.length && encounters[0] === peskipiksiPesternomi && this.health < 5) {
                    this.cardsDrawn = -4;
                    this.drawCards(4);
                }
                else {
                    this.cardsDrawn = -5;
                    this.drawCards(5);
                }
            }
            stun() {
                if (!this.stunned) {
                    this.stunned = true;
                    const stunForReal = () => {
                        this.attack = 0;
                        this.influence = 0;
                        activeLocation.addToLocation();
                        let iterations = Math.floor(this.hand.length / 2);
                        if (this.hand.length && iterations) {
                            if (this.hand.length > 1) {
                                addPlayerChoice(`${this.hero} discard:`, () => {return this.hand.length;}, iterations, () => {
                                    for (let i = 0; i < this.hand.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML += `<img src="${this.hand[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {
                                            this.forcedDiscardAt(i, false);
                                        }
                                    }
                                });
                            }
                            else this.forcedDiscardAt(0, false);
                        }

                        // Avada Kedavra effect
                        if (avadaKill) {
                            avadaKill = false;
                            activeLocation.addToLocation();
                        }

                        // Box 4 Lord Voldemort effect                        
                        if ((invulnerableVoldemort() === lordVoldemort4 || activeVillains.includes(lordVoldemort4)) && !lordVoldemort4.petrifiedBy) {
                            setTimeout(() => {
                                activeLocation.addToLocation();
                                darken(lordVoldemort4.img);
                            }, 1000);
                        }
                    };

                    // Stag Patronus
                    const stagPlayer = players.filter(player => {return player !== this && player.proficiency === "Stag Patronus" && player.health >= 2;}).concat([null])[0];
                    const getStagSpells = () => {return stagPlayer ? stagPlayer.hand.filter(card => {return card.type === "spell"}) : [];};
                    if (getStagSpells().length) {
                        addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                            if (getStagSpells().length) {
                                document.getElementsByClassName("choice")[0].innerHTML = `<p>Harry Potter loses:</p>${choiceScroll(getStagSpells())}<div class="choiceContainer" style="height: calc(100% - 6em - ${choiceScrollHeight})">${healthToken + healthToken}</div><p>Health: ${stagPlayer.health}</p>`;
                                document.getElementsByClassName("choice")[0].onclick = () => {
                                    if (getStagSpells().length > 1) {
                                        playerChoices.unshift(new PlayerChoice("Discard:", () => {return getStagSpells().length;}, 1, () => {
                                            for (let i = 0; i < getStagSpells().length; i++) {
                                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${getStagSpells()[i].img.src}">`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {stagPlayer.forcedDiscardAt(stagPlayer.hand.indexOf(getStagSpells()[i]), false);};
                                            }
                                        }));
                                    }
                                    else stagPlayer.forcedDiscardAt(stagPlayer.hand.indexOf(getStagSpells()[0]), false);
                                    stagPlayer.health -= 2;
                                    this._invulnerable = true;
                                    this.stunned = false;
                                    this._health = 2; // update the base variable to avoid fenrir and sectumsempra
                                    this.displayHealth();
                                };
                                document.getElementsByClassName("choice")[1].innerHTML = `<p>${this.hero} is stunned.</p>`;
                                document.getElementsByClassName("choice")[1].onclick = () => {
                                    stunForReal();
                                };
                            }
                            else stunForReal();
                        });
                    }
                    else stunForReal();
                }
            }
        }
        const player1 = new Player(document.querySelector("input[name=\"player1\"]:checked").value, document.querySelector("input[name=\"player1Proficiency\"]:checked").value, document.querySelector("input[name=\"player1Charm\"]:checked").value);
        const player2 = new Player(document.querySelector("input[name=\"player2\"]:checked").value, document.querySelector("input[name=\"player2Proficiency\"]:checked").value, document.querySelector("input[name=\"player2Charm\"]:checked").value);
        const players = [player1, player2];
        /*if (document.getElementById("player3Hero").value) players.push(new Player(document.getElementById("player3Hero").value, document.getElementById("player3Proficiency").value), document.getElementById("player3Charm").value));
        if (document.getElementById("player4Hero").value) players.push(new Player(document.getElementById("player4Hero").value, document.getElementById("player4Proficiency").value, document.getElementById("player4Charm").value));
        if (document.getElementById("player5Hero").value) players.push(new Player(document.getElementById("player5Hero").value, document.getElementById("player5Proficiency").value, document.getElementById("player5Charm").value));*/

        // Hogwarts cards
        // Game 1
        const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, affectedPlayer => {players.forEach(player => {if (!activeMermaid()) {player.attack++; player.influence++;} player.health++; player.drawCards(1)});}, false, false);
        const descendo1 = new Card("Descendo", "Game 1", "spell", 5, affectedPlayer => {affectedPlayer.attack += 2;}, false, false);
        const descendo2 = descendo1.clone();
        const essenceOfDittany1 = new Card("Essence Of Dittany", "Game 1", "item", 2, affectedPlayer => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, false);
        const essenceOfDittany2 = essenceOfDittany1.clone();
        const essenceOfDittany3 = essenceOfDittany1.clone();
        const essenceOfDittany4 = essenceOfDittany1.clone();
        const goldenSnitch = new Card("Golden Snitch", "Game 1", "item", 5, affectedPlayer => {affectedPlayer.influence += 2; affectedPlayer.drawCards(1);}, false, false);
        const incendio1 = new Card("Incendio", "Game 1", "spell", 4, affectedPlayer => {affectedPlayer.attack++; affectedPlayer.drawCards(1);}, false, false);
        const incendio2 = incendio1.clone();
        const incendio3 = incendio1.clone();
        const incendio4 = incendio1.clone();
        const lumos1 = new Card("Lumos", "Game 1", "spell", 4, affectedPlayer => {players.forEach(player => {player.drawCards(1);});}, false, false);
        const lumos2 = lumos1.clone();
        const oliverWood = new Card("Oliver Wood", "Game 1", "ally", 3, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++;}, true, false);
        const quidditchGear1 = new Card("Quidditch Gear", "Game 1", "item", 3, affectedPlayer => {affectedPlayer.attack++; affectedPlayer.health++;}, false, false);
        const quidditchGear2 = quidditchGear1.clone();
        const quidditchGear3 = quidditchGear1.clone();
        const quidditchGear4 = quidditchGear1.clone();
        const reparo1 = new Card("Reparo", "Game 1", "spell", 3, affectedPlayer => {if (affectedPlayer.petrified) affectedPlayer.influence += 2; else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {affectedPlayer.drawCards(1)};});}}, false, false);
        const reparo2 = reparo1.clone();
        const reparo3 = reparo1.clone();
        const reparo4 = reparo1.clone();
        const reparo5 = reparo1.clone();
        const reparo6 = reparo1.clone();
        const rubeusHagrid = new Card("Rubeus Hagrid", "Game 1", "ally", 4, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++; players.forEach(player => {player.health++;});}, false, false);
        const sortingHat = new Card("Sorting Hat", "Game 1", "item", 4, affectedPlayer => {affectedPlayer.influence += 2;}, true, false);
        const wingardiumLeviosa1 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, affectedPlayer => {affectedPlayer.influence++;}, true, false);
        const wingardiumLeviosa2 = wingardiumLeviosa1.clone();
        const wingardiumLeviosa3 = wingardiumLeviosa1.clone();

        // Game 2
        const arthurWeasley = new Card("Arthur Weasley", "Game 2", "ally", 6, affectedPlayer => {players.forEach(player => {if (!activeMermaid()) player.influence += 2;});}, false, false);
        const dobbyTheHouseElf = new Card("Dobby The House-Elf", "Game 2", "ally", 4, affectedPlayer => {activeLocation.removeFromLocation(); affectedPlayer.drawCards(1);}, false, false);
        const expelliarmus1 = new Card("Expelliarmus", "Game 2", "spell", 6, affectedPlayer => {affectedPlayer.attack += 2; affectedPlayer.drawCards(1);}, false, false);
        const expelliarmus2 = expelliarmus1.clone();
        const fawkesThePhoenix = new Card("Fawkes The Phoenix", "Game 2", "ally", 5, affectedPlayer => {
            const hurtPlayers = players.filter(player => {return canHeal(player);});
            if (hurtPlayers.length && !activeMermaid()) {
                addPlayerChoice("Pick one:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.attack += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>ALL Heroes:</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${players.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.health += 2;});};});
            } 
            else if (hurtPlayers.length) players.forEach(player => {player.health += 2;});
            else if (!activeMermaid()) affectedPlayer.attack += 2;
        }, false, false);
        const finite1 = new Card("Finite", "Game 2", "spell", 3, affectedPlayer => {activeLocation.removeFromLocation();}, false, false);
        const finite2 = finite1.clone();
        const gilderoyLockhart = new Card("Gilderoy Lockhart", "Game 2", "ally", 2, affectedPlayer => {if (!affectedPlayer.petrified) {affectedPlayer.drawCards(1); if (affectedPlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 1, () => {for (let i = 0; i < affectedPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {affectedPlayer.forcedDiscardAt(i, false);}}});}} else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<p>Discard:</p>${choiceScroll(affectedPlayer.hand)}`; document.getElementsByClassName("choice")[0].onclick = () => {playerChoices.unshift(new PlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 1, () => {for (let i = 0; i < affectedPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {affectedPlayer.forcedDiscardAt(i, false);};}}));}; document.getElementsByClassName("choice")[1].innerHTML = "Nothing";});}}, false, false);
        const ginnyWeasley = new Card("Ginny Weasley", "Game 2", "ally", 4, affectedPlayer => {if (!activeMermaid()) {affectedPlayer.attack++; affectedPlayer.influence++;}}, false, false);
        const mollyWeasley = new Card("Molly Weasley", "Game 2", "ally", 6, affectedPlayer => {players.forEach(player => {if (!activeMermaid()) player.influence++; player.health += 2;});}, false, false);
        const nimbusTwoThousandAndOne1 = new Card("Nimbus Two Thousand And One", "Game 2", "item", 5, affectedPlayer => {affectedPlayer.attack += 2;}, true, false);
        const nimbusTwoThousandAndOne2 = nimbusTwoThousandAndOne1.clone();
        const polyjuicePotion1 = new Card("Polyjuice Potion", "Game 2", "item", 3, affectedPlayer => {
            const allies = affectedPlayer.played.filter(card => {return card.type === "ally";});
            if (allies.length) {
                const polyjuiceAlly = ally => {
                    ally.effect(affectedPlayer);
                    if (ally.passive) affectedPlayer.passives.push(ally);
                };
                if (allies.length > 1) {
                    addPlayerChoice("Pick an ally to copy:", () => {return allies.length;}, 1, () => {
                        for (let i = 0; i < allies.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {polyjuiceAlly(allies[i]);};
                        }
                    });
                }
                else polyjuiceAlly(allies[0]);
            }
        }, false, false);
        const polyjuicePotion2 = polyjuicePotion1.clone();

        // Game 3
        const butterbeer1 = new Card("Butterbeer", "Game 3", "item", 3, affectedPlayer => {if (players.length > 2) {addPlayerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); addPlayerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false, false);
        const butterbeer2 = butterbeer1.clone();
        const butterbeer3 = butterbeer1.clone();
        const chocolateFrog1 = new Card("Chocolate Frog", "Game 3", "item", 2, affectedPlayer => {let unstunnedPlayers = players.filter(player => {return !player.stunned;}); if (unstunnedPlayers.length) {if (unstunnedPlayers.length > 1) {addPlayerChoice(`Give 1 influence and 1 health to:`, () => {return unstunnedPlayers.length;}, 1, () => {for (let i = 0; i < unstunnedPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(unstunnedPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${unstunnedPlayers[i].influence}</p><p>Health: ${unstunnedPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {unstunnedPlayers[i].influence++; unstunnedPlayers[i].health++;};}});} else {unstunnedPlayers[0].influence++; unstunnedPlayers[0].health++;}}}, false, false);
        const chocolateFrog2 = chocolateFrog1.clone();
        const chocolateFrog3 = chocolateFrog1.clone();
        const crystalBall1 = new Card("Crystal Ball", "Game 3", "item", 3, affectedPlayer => {if (!affectedPlayer.petrified) {affectedPlayer.drawCards(2); addPlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 1, () => {for (let i = 0; i < affectedPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {affectedPlayer.forcedDiscardAt(i, false);};}});}}, false, false);
        const crystalBall2 = crystalBall1.clone();
        const expectoPatronum1 = new Card("Expecto Patronum", "Game 3", "spell", 5, affectedPlayer => {affectedPlayer.attack++; activeLocation.removeFromLocation();}, false, false);
        const expectoPatronum2 = expectoPatronum1.clone();
        const maraudersMap = new Card("Marauder's Map", "Game 3", "item", 5, affectedPlayer => {affectedPlayer.drawCards(2);}, false, false);
        const petrificusTotalus1 = new Card("Petrificus Totalus", "Game 3", "spell", 6, affectedPlayer => {
            affectedPlayer.attack++; 
            let unpetrifiedVillains = activeVillains.concat(invulnerableVoldemort() ? invulnerableVoldemort() : []).filter(villain => {return !villain.petrifiedBy && villain.health + villain.influence > 0 && villain.type.includes("villain");}); 
            if (unpetrifiedVillains.length) {
                if (unpetrifiedVillains.length > 1) {
                    addPlayerChoice("Petrify:", () => {return unpetrifiedVillains.length;}, 1, () => {
                        for (let i = 0; i < unpetrifiedVillains.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedVillains[i].img.src}">`; 
                            document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedVillains[i].petrifiedBy = affectedPlayer;};
                        }
                    });
                }
                else unpetrifiedVillains[0].petrifiedBy = affectedPlayer;
            }
        }, false, false);
        const petrificusTotalus2 = petrificusTotalus1.clone();
        const remusLupin = new Card("Remus Lupin", "Game 3", "ally", 4, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++; const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;}}, false, false);
        const siriusBlack = new Card("Sirius Black", "Game 3", "ally", 6, affectedPlayer => {if (!activeMermaid()) {affectedPlayer.attack += 2; affectedPlayer.influence++;}}, false, false);
        const sybillTrelawney = new Card("Sybill Trelawney", "Game 3", "ally", 4, affectedPlayer => {
            affectedPlayer.drawCards(2);
            addPlayerChoice("Discard", () => {return affectedPlayer.hand.length + (affectedPlayer.petrified ? 1 : 0);}, 1, () => {
                for (let i = 0; i < affectedPlayer.hand.length; i++) {
                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`;
                    document.getElementsByClassName("choice")[i].onclick = () => {
                        if (affectedPlayer.hand[i].type === "spell" && !activeMermaid()) affectedPlayer.influence += 2;
                        affectedPlayer.forcedDiscardAt(i, false);
                    };
                }
                if (affectedPlayer.petrified) document.getElementsByClassName("choice")[affectedPlayer.hand.length].innerHTML = "<p>Nothing</p>";
            });
        }, false, false);

        // Game 4
        const accio1 = new Card("Accio", "Game 4", "spell", 4, affectedPlayer => {const items = affectedPlayer.discard.filter(card => {return card.type === "item";}); if (items.length) {addPlayerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.influence += 2}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[1].onclick = () => {const discardToHand = index => {affectedPlayer.discard.splice(affectedPlayer.discard.indexOf(items[index]), 1); affectedPlayer.addToHand(items[index]);}; if (items.length === 1) discardToHand(0); else {addPlayerChoice("Move from Discard to Hand:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i);};}});}};});} else affectedPlayer.influence += 2;}, false, false);
        const accio2 = accio1.clone();
        const alastorMadEyeMoody = new Card("Alastor Mad-Eye Moody", "Game 4", "ally", 6, affectedPlayer => {if (!activeMermaid()) affectedPlayer.influence += 2; activeLocation.removeFromLocation();}, false, false);
        const cedricDiggory = new Card("Cedric Diggory", "Game 4", "ally", 4, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++; rollHouseDie(affectedPlayer, "yellow", false, false, false);}, false, true);
        const filiusFlitwick = new Card("Filius Flitwick", "Game 4", "ally", 6, affectedPlayer => {if (!activeMermaid()) affectedPlayer.influence++; affectedPlayer.drawCards(1); rollHouseDie(affectedPlayer, "blue", false, false, false);}, false, true);
        const fleurDelacour = new Card("Fleur Delacour", "Game 4", "ally", 4, affectedPlayer => {if (!activeMermaid()) affectedPlayer.influence += 2;}, true, false);
        const hogwartsAHistory1 = new Card("Hogwarts A History", "Game 4", "item", 4, affectedPlayer => {rollAnyHouseDie(affectedPlayer, false);}, false, true);
        const hogwartsAHistory2 = hogwartsAHistory1.clone();
        const hogwartsAHistory3 = hogwartsAHistory1.clone();
        const hogwartsAHistory4 = hogwartsAHistory1.clone();
        const hogwartsAHistory5 = hogwartsAHistory1.clone();
        const hogwartsAHistory6 = hogwartsAHistory1.clone();
        const minervaMcgonagall = new Card("Minerva Mcgonagall", "Game 4", "ally", 6, affectedPlayer => {if (!activeMermaid()) {affectedPlayer.influence++; affectedPlayer.attack++;} rollHouseDie(affectedPlayer, "red", false, false, false);}, false, true);
        const pensieve = new Card("Pensieve", "Game 4", "item", 5, affectedPlayer => {const pensieveEffect = player => {player.influence++; player.drawCards(1);}; if (players.length > 2) {addPlayerChoice("+1 influence and draw a card:", () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {pensieveEffect(players[i])};}});} else players.forEach(player => {pensieveEffect(player);});}, false, false);
        const pomonaSprout = new Card("Pomona Sprout", "Game 4", "ally", 6, affectedPlayer => {if (!activeMermaid()) affectedPlayer.influence++; rollHouseDie(affectedPlayer, "yellow", false, false, false); const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, true);
        const protego1 = new Card("Protego", "Game 4", "spell", 5, affectedPlayer => {affectedPlayer.attack++; affectedPlayer.health++;}, false, false);
        const protego2 = protego1.clone();
        const protego3 = protego1.clone();
        const severusSnape = new Card("Severus Snape", "Game 4", "ally", 6, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++; affectedPlayer.health += 2; rollHouseDie(affectedPlayer, "green", false, false, false);}, false, true);
        const triwizardCup = new Card("Triwizard Cup", "Game 4", "item", 5, affectedPlayer => {affectedPlayer.attack++; affectedPlayer.influence++; affectedPlayer.health++;}, false, false);
        const viktorKrum = new Card("Viktor Krum", "Game 4", "ally", 5, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack += 2;}, true, false);

        // Game 5
        const choChang = new Card("Cho Chang", "Game 5", "ally", 4, affectedPlayer => {rollHouseDie(affectedPlayer, "blue", false, false, false); if (!affectedPlayer.petrified) {affectedPlayer.drawCards(3); addPlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 2, () => {for (let i = 0; i < affectedPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {affectedPlayer.forcedDiscardAt(i, false)};}});}}, false, true);
        const fredWeasley = new Card("Fred Weasley", "Game 5", "ally", 4, affectedPlayer => {if (!activeMermaid()) {affectedPlayer.attack++; if (players.filter(player => {return player !== affectedPlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.influence++;});} rollHouseDie(affectedPlayer, "red");}, false, true);
        const georgeWeasley = new Card("George Weasley", "Game 5", "ally", 4, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack++; if (players.filter(player => {return player !== affectedPlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.health++;}); rollHouseDie(affectedPlayer, "red");}, false, true);
        const kingsleyShacklebolt = new Card("Kingsley Shacklebolt", "Game 5", "ally", 7, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack += 2; affectedPlayer.health++; activeLocation.removeFromLocation();}, false, false);
        const lunaLovegood = new Card("Luna Lovegood", "Game 5", "ally", 5, affectedPlayer => {if (!activeMermaid()) affectedPlayer.influence++; rollHouseDie(affectedPlayer, "blue");}, true, true);
        const nymphadoraTonks = new Card("Nymphadora Tonks", "Game 5", "ally", 5, affectedPlayer => {
            const unremovable = (activeVillains.includes(bartyCrouchJr) && bartyCrouchJr.health > 0 && !bartyCrouchJr.petrifiedBy) || (activeLocation.number === 1 && activeLocation.added === 0)
            if (!activeMermaid()) {
                addPlayerChoice("Choose:", () => {return unremovable ? 2 : 3;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken + influenceToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.influence += 3;}; 
                    document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; 
                    document.getElementsByClassName("choice")[1].onclick = () => {affectedPlayer.attack += 2;}; 
                    if (!unremovable) {
                        document.getElementsByClassName("choice")[2].innerHTML = "<img src=\"./images/locationToken.png\">"; 
                        document.getElementsByClassName("choice")[2].onclick = () => {activeLocation.removeFromLocation();};
                    }
                });
            }
            else activeLocation.removeFromLocation();
        }, false, true);
        const owls1 = new Card("OWLS", "Game 5", "item", 4, affectedPlayer => {affectedPlayer.influence += 2;}, true, false); let owlsSpells1 = 0;
        const owls2 = owls1.clone(); let owlsSpells2 = 0;
        const stupefy1 = new Card("Stupefy", "Game 5", "spell", 6, affectedPlayer => {affectedPlayer.attack++; activeLocation.removeFromLocation(); affectedPlayer.drawCards(1);}, false, false);
        const stupefy2 = stupefy1.clone();

        // Game 6
        const advancedPotionMaking = new Card("Advanced Potion-Making", "Game 6", "item", 6, affectedPlayer => {players.forEach(player => {player.health += 2; if (player.health === 10) {player.attack++; player.drawCards(1);}});}, false, false);
        const bezoar1 = new Card("Bezoar", "Game 6", "item", 4, affectedPlayer => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;} affectedPlayer.drawCards(1);}, false, false);
        const bezoar2 = bezoar1.clone();
        const confundus1 = new Card("Confundus", "Game 6", "spell", 3, affectedPlayer => {affectedPlayer.attack++;}, true, false);
        const confundus2 = confundus1.clone();
        const deluminator = new Card("Deluminator", "Game 6", "item", 6, affectedPlayer => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, false, false);
        const elderWand = new Card("Elder Wand", "Game 6", "item", 7, affectedPlayer => {}, true, false);
        const felixFelicis = new Card("Felix Felicis", "Game 6", "item", 7, affectedPlayer => {
            let felixFelicisOptions = ["attack", "influence"]; 
            if (canHeal(affectedPlayer)) felixFelicisOptions.push("health"); 
            if (!affectedPlayer.petrified) felixFelicisOptions.push("draw"); 
            if (felixFelicisOptions.length > 2) {
                addPlayerChoice("Choose two:", () => {return felixFelicisOptions.length;}, 1, () => {
                    const displayFelixFelicisOptions = () => {
                        let choiceIndex = 0; 
                        if (felixFelicisOptions.includes("attack")) {
                            document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; 
                            document.getElementsByClassName("choice")[choiceIndex].onclick = () => {
                                affectedPlayer.attack += 2; 
                                felixFelicisOptions.splice(felixFelicisOptions.indexOf("attack"), 1); 
                                addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {
                                    displayFelixFelicisOptions(); 
                                    felixFelicisOptions = [];
                                });
                            }; 
                            choiceIndex++;
                        } 
                        if (felixFelicisOptions.includes("influence")) {
                            document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div`; 
                            document.getElementsByClassName("choice")[choiceIndex].onclick = () => {
                                affectedPlayer.influence += 2; 
                                felixFelicisOptions.splice(felixFelicisOptions.indexOf("influence"), 1); 
                                addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {
                                    displayFelixFelicisOptions(); 
                                    felixFelicisOptions = [];
                                });
                            }; 
                            choiceIndex++;
                        } 
                        if (felixFelicisOptions.includes("health")) {
                            document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; 
                            document.getElementsByClassName("choice")[choiceIndex].onclick = () => {
                                affectedPlayer.health += 2; 
                                felixFelicisOptions.splice(felixFelicisOptions.indexOf("health"), 1); 
                                addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {
                                    displayFelixFelicisOptions(); 
                                    felixFelicisOptions = [];
                                });
                            }; 
                            choiceIndex++;
                        } 
                        if (felixFelicisOptions.includes("draw")) {
                            document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${hogwartsCardBack + hogwartsCardBack}</div>`; 
                            document.getElementsByClassName("choice")[choiceIndex].onclick = () => {
                                affectedPlayer.drawCards(2); 
                                felixFelicisOptions.splice(felixFelicisOptions.indexOf("draw"), 1); 
                                addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {
                                    displayFelixFelicisOptions(); 
                                    felixFelicisOptions = [];
                                });
                            };
                        }
                    }; 
                    displayFelixFelicisOptions();
                });
            } 
            else {
                affectedPlayer.attack += 2; 
                affectedPlayer.influence += 2;
            }
        }, false, false);
        const horaceSlughorn = new Card("Horace Slughorn", "Game 6", "ally", 6, affectedPlayer => {
            players.forEach(player => {
                if (canHeal(player) && !activeMermaid()) {
                    addPlayerChoice(`${player.hero} choose 1`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`; document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;}; document.getElementsByClassName("choice")[1].innerHTML = `${healthToken}<p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health++;};});
                } 
                else if (!activeMermaid()) player.influence++;
                else if (canHeal(player)) player.health++;
            }); 
            rollHouseDie(affectedPlayer, "green", false, false, false);
        }, false, true);

        // Game 7
        const swordOfGryffindor = new Card("Sword Of Gryffindor", "Game 7", "item", 7, affectedPlayer => {affectedPlayer.attack += 2; rollHouseDie(affectedPlayer, "red", false, false, false); rollHouseDie(affectedPlayer, "red");}, false, true);

        // Box 1
        const detention = new Card("Detention", "Box 1", "item", 0, affectedPlayer => {}, false, false);
        const argusFilchAndMrsNorris = new Card("Argus Filch And Mrs Norris", "Box 1", "ally", 4, affectedPlayer => {
            affectedPlayer.drawCards(2); 
            addPlayerChoice("Choose a card to discard or banish:", () => {return affectedPlayer.hand.length + (affectedPlayer.petrified ? 1 : 0);}, 1, () => {
                for (let i = 0; i < affectedPlayer.hand.length; i++) {
                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {playerChoices.unshift(new PlayerChoice("Discard or banish:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}"><p>Discard</p>`; document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.forcedDiscardAt(i, false)}; document.getElementsByClassName("choice")[1].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}"><p>Banish</p>`; document.getElementsByClassName("choice")[1].onclick = () => {affectedPlayer.banishAt(i)};}));};
                }
                if (affectedPlayer.petrified) document.getElementsByClassName("choice")[affectedPlayer.hand.length].innerHTML = "<p>Nothing</p>";
            });
        }, false, false);
        const fang = new Card("Fang", "Box 1", "ally", 3, affectedPlayer => {addPlayerChoice(`Give 1 influence and 2 health to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health += 2;};}});}, false, false);
        const finiteIncantatem1 = new Card("Finite Incantatem", "Box 1", "spell", 6, affectedPlayer => {activeLocation.removeFromLocation();}, true, false);
        const finiteIncantatem2 = finiteIncantatem1.clone();
        const harp = new Card("Harp", "Box 1", "item", 6, affectedPlayer => {affectedPlayer.attack++; let unpetrifiedCreatures = activeVillains.filter(villain => {return !villain.petrifiedBy && (villain.health > 0 || villain.influence > 0) && villain.type.includes("creature");}); if (unpetrifiedCreatures.length) {if (unpetrifiedCreatures.length > 1) {addPlayerChoice("Petrify:", () => {return unpetrifiedCreatures.length;}, 1, () => {for (let i = 0; i < unpetrifiedCreatures.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedCreatures[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedCreatures[i].petrifiedBy = affectedPlayer;};}});} else unpetrifiedCreatures[0].petrifiedBy = affectedPlayer;}}, false, false);
        const oldSock1 = new Card("Old Sock", "Box 1", "item", 1, affectedPlayer => {affectedPlayer.influence++; if (players.filter(player => {return player !== affectedPlayer && (player.hand.includes(dobbyTheHouseElf) || player.hand.includes(kreacherTheHouseElf))}).length) affectedPlayer.attack += 2;}, false, false);
        const oldSock2 = oldSock1.clone();
        const tergeo1 = new Card("Tergeo", "Box 1", "spell", 2, affectedPlayer => {
            affectedPlayer.influence++; 
            if (affectedPlayer.hand.length) {
                addPlayerChoice("Do you want to banish a card?", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(affectedPlayer.hand); 
                    document.getElementsByClassName("choice")[0].onclick = () => {
                        if (affectedPlayer.hand.length > 1) {
                            addPlayerChoice("Banish:", () => {return affectedPlayer.hand.length;}, 1, () => {
                                for (let i = 0; i < affectedPlayer.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`; 
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        if (affectedPlayer.hand[i].type === "item") affectedPlayer.drawCards(1); 
                                        affectedPlayer.banishAt(i);
                                    };
                                }
                            });
                        }
                        else affectedPlayer.banishAt(0);
                    }; 
                    document.getElementsByClassName("choice")[1].innerHTML = "<p>No</p>";
                });
            }
        }, false, false);
        const tergeo2 = tergeo1.clone();
        const tergeo3 = tergeo1.clone();
        const tergeo4 = tergeo1.clone();
        const tergeo5 = tergeo1.clone();
        const tergeo6 = tergeo1.clone();

        // Box 2
        const buckbeak = new Card("Buckbeak", "Box 2", "ally", 4, affectedPlayer => {
            affectedPlayer.drawCards(2);
            addPlayerChoice("Discard 1:", () => {return affectedPlayer.hand.length + (affectedPlayer.petrified ? 1 : 0);}, 1, () => {
                for (let i = 0; i < affectedPlayer.hand.length; i++) {
                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`;
                    document.getElementsByClassName("choice")[i].onclick = () => {
                        if (affectedPlayer.hand[i].type === "ally" && !activeMermaid()) affectedPlayer.attack += 2;
                        affectedPlayer.forcedDiscardAt(i, false);
                    };
                    if (affectedPlayer.petrified) document.getElementsByClassName("choice")[affectedPlayer.hand.length].innerHTML = "<p>None</p>";
                }
            });
        }, false, false);
        const depulso1 = new Card("Depulso", "Box 2", "spell", 3, affectedPlayer => {
            const handItems = affectedPlayer.hand.filter(card => {return card.type === "item"});
            const discardItems = affectedPlayer.discard.filter(card => {return card.type === "item"});
            if (handItems.length || discardItems.length) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {affectedPlayer.influence += 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>Banish:</p>${choiceScroll(handItems.concat(discardItems))}`;
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        if (handItems.length + discardItems.length > 1) {
                            addPlayerChoice("Banish:", () => {return handItems.length + discardItems.length;}, 1, () => {
                                for (let i = 0; i < handItems.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[affectedPlayer.hand.indexOf(handItems[i])].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        affectedPlayer.banishAt(affectedPlayer.hand.indexOf(handItems[i]));
                                    };
                                }
                                for (let i = 0; i < discardItems.length; i++) {
                                    document.getElementsByClassName("choice")[handItems.length + i].innerHTML = `<img src="${affectedPlayer.discard[affectedPlayer.discard.indexOf(discardItems[i])].img.src}">`;
                                    document.getElementsByClassName("choice")[handItems.length + i].onclick = () => {
                                        affectedPlayer.hand.unshift(affectedPlayer.discard.splice(affectedPlayer.discard.indexOf(discardItems[i]), 1)[0]);
                                        affectedPlayer.banishAt(0);
                                    };
                                }
                            });
                        }
                        else if (handItems.length) affectedPlayer.banishAt(affectedPlayer.hand.indexOf(handItems[0]));
                        else {
                            affectedPlayer.hand.unshift(affectedPlayer.discard.splice(affectedPlayer.discard.indexOf(discardItems[0]), 1)[0]);
                            affectedPlayer.banishAt(0);
                        }
                    };
                });
            }
            else affectedPlayer.influence += 2;
        }, false, false);
        const depulso2 = depulso1.clone();
        const immobulus1 = new Card("Immobulus", "Box 2", "spell", 3, affectedPlayer => {affectedPlayer.attack++;}, true, false);
        const immobulus2 = immobulus1.clone();
        const immobulus3 = immobulus1.clone();
        const monsterBookOfMonsters1 = new Card("Monster Book Of Monsters", "Box 2", "item", 5, affectedPlayer => {affectedPlayer.attack++; rollHouseDie(affectedPlayer, "phoenix", false, false, false);}, false, true);
        const monsterBookOfMonsters2 = monsterBookOfMonsters1.clone();
        const monsterBookOfMonsters3 = monsterBookOfMonsters1.clone();

        // Box 3
        const erumpentHorn = new Card("Erumpent Horn", "Box 3", "item", 5, affectedPlayer => {affectedPlayer.health -= 2; affectedPlayer.attack += 3;}, false, false);
        const griphook = new Card("Griphook", "Box 3", "ally", 6, affectedPlayer => {
            if (!affectedPlayer.petrified) {
                affectedPlayer.drawCards(3);
                addPlayerChoice("Discard:", () => {return affectedPlayer.hand.length;}, 2, () => {
                    for (let i = 0; i < affectedPlayer.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            if (affectedPlayer.hand[i].type === "item" && !activeMermaid()) affectedPlayer.influence += 2;
                            affectedPlayer.forcedDiscardAt(i, false);
                        };
                    }
                });
            }
        }, false, false);
        const kreacherTheHouseElf = new Card("Kreacher The House Elf", "Box 3", "ally", 5, affectedPlayer => {
            rollHouseDie(affectedPlayer, "phoenix", false, true, false);
            const playersWithCards = players.filter(player => {return player.hand.length || player.discard.length;});
            if (playersWithCards.length) {
                addPlayerChoice("Choose a player to banish 1:", () => {return playersWithCards.length + 1;}, 1, () => {
                    for (let i = 0; i < playersWithCards.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<p>${playersWithCards[i].hero}:</p>${choiceScroll(playersWithCards[i].hand.concat(playersWithCards[i].discard))}`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            playerChoices.unshift(new PlayerChoice("Banish:", () => {return playersWithCards[i].hand.length + playersWithCards[i].discard.length + 1;}, 1, () => {
                                for (let j = 0; j < playersWithCards[i].hand.length; j++) {
                                    document.getElementsByClassName("choice")[j].innerHTML = `<img src="${playersWithCards[i].hand[j].img.src}">`;
                                    document.getElementsByClassName("choice")[j].onclick = () => {playersWithCards[i].banishAt(j);};
                                }
                                for (let j = 0; j < playersWithCards[i].discard.length; j++) {
                                    document.getElementsByClassName("choice")[j + playersWithCards[i].hand.length].innerHTML = `<img src="${playersWithCards[i].discard[j].img.src}">`;
                                    document.getElementsByClassName("choice")[j + playersWithCards[i].hand.length].onclick = () => {
                                        playersWithCards[i].hand.unshift(playersWithCards[i].discard.splice(j, 1)[0]);
                                        playersWithCards[i].banishAt(0);
                                    };
                                }
                                document.getElementsByClassName("choice")[playersWithCards[i].hand.length + playersWithCards[i].discard.length].innerHTML = "<p>Nothing</p>";
                            }));
                        };
                    }
                    document.getElementsByClassName("choice")[playersWithCards.length].innerHTML = "<p>None</p>";
                });
            }
        }, false, false);
        const lacewingFlies1 = new Card("Lacewing Flies", "Box 3", "item", 2, affectedPlayer => {
            const unpetrifiedPlayers = players.filter(player => {return !player.petrified;});
            if (unpetrifiedPlayers.length) {
                if (unpetrifiedPlayers.length > 1) {
                    addPlayerChoice("Draw 1 for:", () => {return unpetrifiedPlayers.length;}, 1, () => {
                        for (let i = 0; i < unpetrifiedPlayers.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedPlayers[i].heroImage.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedPlayers[i].drawCards(1);};
                        }
                    });
                }
                else unpetrifiedPlayers[0].drawCards(1);
            }
        }, false, false);
        const lacewingFlies2 = lacewingFlies1.clone();
        const nox1 = new Card("Nox", "Box 3", "spell", 6, affectedPlayer => {
            affectedPlayer.attack++;
            players.forEach(player => {
                if (player.hand.length || player.discard.length) {
                    addPlayerChoice(`Banish for ${player.hero}:`, () => {return player.hand.length + player.discard.length + 1;}, 1, () => {
                        for (let i = 0; i < player.hand.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {
                                player.banishAt(i);
                            };
                        }
                        for (let i = 0; i < player.discard.length; i++) {
                            document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                            document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {
                                player.hand.unshift(player.discard.splice(i, 1)[0]);
                                player.banishAt(0);
                            };
                        }
                        document.getElementsByClassName("choice")[player.hand.length + player.discard.length].innerHTML = "<p>Nothing</p>";
                    });
                }
            });
        }, false, false);
        const nox2 = nox1.clone();
        const thestral = new Card("Thestral", "Box 3", "ally", 4, affectedPlayer => {
            players.forEach(player => {
                if (canHeal(player) && !activeMermaid()) {
                    addPlayerChoice(`Choose for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`;
                        document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;};
                        document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`;
                        document.getElementsByClassName("choice")[1].onclick = () => {player.health += 2;};
                    });
                }
                else if (!activeMermaid()) player.influence++;
                else if (canHeal(player)) player.health += 2;
            });
        }, false, false);

        // Box 4
        const dragonsBlood = new Card("Dragon's Blood", "Box 4", "item", 6, affectedPlayer => {players.forEach(player => {player.health += 3;});}, true, false);
        const gillyweed1 = new Card("Gillyweed", "Box 4", "item", 1, affectedPlayer => {affectedPlayer.health++;}, true, false);
        const gillyweed2 = gillyweed1.clone();
        const goldenEgg = new Card("Golden Egg", "Box 4", "item", 7, affectedPlayer => {affectedPlayer.attack += 2; affectedPlayer.influence++; affectedPlayer.drawCards(1);}, false, false);
        const igorKarkaroff = new Card("Igor Karkaroff", "Box 4", "ally", 5, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack += 2;}, true, false);
        const madameMaxime = new Card("Madame Maxime", "Box 4", "ally", 7, affectedPlayer => {if (!activeMermaid()) affectedPlayer.attack += 2; players.forEach(player => {player.health += 2;});}, false, false);
        const prioriIncantatem1 = new Card("Priori Incantatem", "Box 4", "spell", 3, affectedPlayer => {
            const spells = affectedPlayer.played.filter(card => {return card.type === "spell";});
            if (spells.length) {
                if (spells.length > 1) {
                    addPlayerChoice("Copy effects of:", () => {return spells.length;}, 1, () => {
                        for (let i = 0; i < spells.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {spells[i].effect(affectedPlayer);}; // no spells have passive effects
                        }
                    });
                }
                else spells[0].effect(affectedPlayer);
            }
        }, false, false);
        const prioriIncantatem2 = prioriIncantatem1.clone();

        // Pack 1
        const arrestoMomentum1 = new Card("Arresto Momentum", "Pack 1", "spell", 4, affectedPlayer => {
            activeLocation.removeFromLocation();
            if (affectedPlayer.discard.length) {
                addPlayerChoice("Banish:", () => {return affectedPlayer.discard.length + 1;}, 1, () => {
                    for (let i = 0; i < affectedPlayer.discard.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.discard[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            affectedPlayer.hand.unshift(affectedPlayer.discard.splice(i, 1)[0]);
                            affectedPlayer.banishAt(0);
                        };
                    }
                    document.getElementsByClassName("choice")[affectedPlayer.discard.length].innerHTML = "<p>Nothing</p>";
                });
            }
        }, false, false);
        const arrestoMomentum2 = arrestoMomentum1.clone();
        const ascendio1 = new Card("Ascendio", "Pack 1", "spell", 5, affectedPlayer => {
            affectedPlayer.influence += 2;
            affectedPlayer.drawCards(1);
            getNeighbors(affectedPlayer).forEach(neighbor => {neighbor.drawCards(1);});
        }, false, false);
        const ascendio2 = ascendio1.clone();
        const autoAnswerQuill = new Card("Auto Answer Quill", "Pack 1", "item", 6, affectedPlayer => {affectedPlayer.attack += 2;}, true, false);
        const barnOwl1 = new Card("Barn Owl", "Pack 1", "ally", 4, affectedPlayer => {affectedPlayer.health += 2;}, false, false);
        const barnOwl2 = barnOwl1.clone();
        const barnOwl3 = barnOwl1.clone();
        const deanThomas = new Card("Dean Thomas", "Pack 1", "ally", 3, affectedPlayer => {
            const deanInfluence = () => {
                affectedPlayer.influence++;
                getNeighbors(affectedPlayer).forEach(neighbor => {neighbor.influence++;});
            };
            const deanHealth = () => {
                let healable = players.filter(player => {return canHeal(player);});
                if (healable.length > 2) {
                    addPlayerChoice("Heal for 2:", () => {return healable.length;}, 2, () => {
                        for (let i = 0; i < healable.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(healable.heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].innerHTML += `Health: ${healable[i].health}`;
                            document.getElementsByClassName("choice")[i].onclick = () => {
                                healable[i].health += 2;
                                healable.splice(i, 1);
                            };
                        }
                    });
                }
                else healable.forEach(player => {player.health += 2;});
            };
            if (!activeMermaid() && players.filter(player => {return canHeal(player);}).length) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<p>You${getNeighbors(affectedPlayer).length > 1 ? "," : " and"} ${getNeighbors(affectedPlayer)[0]}${getNeighbors(affectedPlayer).length > 1 ? `, and ${getNeighbors(affectedPlayer)[1]}` : ""} gain</p>${influenceToken}`;
                    document.getElementsByClassName("choice")[0].onclick = deanInfluence;
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>Any two Heroes gain</p><div class="choiceContainer">${healthToken + healthToken}</div>`;
                    document.getElementsByClassName("choic")[1].onclick = deanHealth;
                });
            }
            else if (!activeMermaid()) deanHealth();
            else if (players.filter(player => {return canHeal(player);}).length) deanInfluence();
        }, false, false);
        const errol = new Card("Errol", "Pack 1", "ally", 3, affectedPlayer => {affectedPlayer.drawCards(1);}, false, false);
        const harryPotter = new Card("Harry Potter", "Pack 1", "ally", 6, affectedPlayer => {
            if (!activeMermaid()) {
                if (players.length > 2) {
                    let remainingPlayers = players.filter(player => {return !player.stunned;});
                    addPlayerChoice("Give 1 attack to:", () => {return remainingPlayers.length;}, 2, () => {
                        for (let i = 0; i < remainingPlayers.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].innerHTML += `Attack: ${remainingPlayers[i].attack}`;
                            document.getElementsByClassName("choice")[i].onclick = () => {remainingPlayers.attack++;};
                        }
                    });
                }
                else players.forEach(player => {player.attack++;});
            }
            activeLocation.removeFromLocation();
        }, false, false);
        const hermioneGranger = new Card("Hermione Granger", "Pack 1", "ally", 5, affectedPlayer => {
            if (!activeMermaid()) players.forEach(player => {player.influence++;});
            rollHouseDie(affectedPlayer, "red", false, false, false);
        }, false, true);
        const lavenderBrown = new Card("Lavender Brown", "Pack 1", "ally", 5, affectedPlayer => {
            if (!activeMermaid()) affectedPlayer.influence++;
            affectedPlayer.drawCards(1);
            players.forEach(player => {player.health += 2;});
        }, false, false);
        const locomotor1 = new Card("Locomotor", "Pack 1", "spell", 3, affectedPlayer => {
            affectedPlayer.influence++;
            getNeighbors(affectedPlayer).forEach(neighbor => {neighbor.influence++;});
            if (affectedPlayer.discard.length) {
                addPlayerChoice("Give to another Hero:", () => {return affectedPlayer.discard.length + 1;}, 1, () => {
                    for (let i = 0; i < affectedPlayer.discard.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.discard[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            const transfer = (index, player) => {player.addToHand(affectedPlayer.discard.splice(index, 1)[0]);};
                            const otherPlayers = players.filter(player => {return player !== affectedPlayer;});
                            if (otherPlayers.length > 1) {
                                playerChoices.unshift(new PlayerChoice(`Give ${affectedPlayer.discard[i].name} to:`, () => {return otherPlayers.length;}, 1, () => {
                                    for (let j = 0; j < otherPlayers.length; j++) {
                                        document.getElementsByClassName("choice")[j].appendChild(otherPlayers[j].heroImage.cloneNode());
                                        document.getElementsByClassName("choice")[j].onclick = () => {transfer(i, otherPlayers[j]);};
                                    }
                                }));
                            }
                            else transfer(i, otherPlayers[0]);
                        };
                    }
                    document.getElementsByClassName("choice")[affectedPlayer.discard.length].innerHTML = "<p>Nothing</p>";
                });
            }
        }, false, false);
        const locomotor2 = locomotor1.clone();
        const nevilleLongbottom = new Card("Neville Longbottom", "Pack 1", "ally", 5, affectedPlayer => {
            affectedPlayer.health += 2;
            let healable = players.filter(player => {return canHeal(player);});
            if (healable.length > 2) {
                addPlayerChoice("Heal for 3:", () => {return healable.length;}, 2, () => {
                    for (let i = 0; i < healable.length; i++) {
                        document.getElementsByClassName("choice")[i].appendChild(healable[i].heroImage.cloneNode());
                        document.getElementsByClassName("choice")[i].innerHTML += `Health: ${healable[i].health}`;
                        document.getElementsByClassName("choice").onclick = () => {
                            healable.health += 3;
                            healable.splice(i, 1);
                        };
                    }
                });
            }
            else healable.forEach(player => {player.health += 3;});
        }, false, false);
        const padmaAndParvatiPatil = new Card("Padma And Parvati Patil", "Pack 1", "ally", 6, affectedPlayer => {
            if (!activeMermaid()) {
                let remainingPlayers = players.filter(player => {return !player.stunned;});
                if (remainingPlayers.length > 2) {
                    addPlayerChoice("Give two attack to:", () => {return remainingPlayers.length;}, 2, () => {
                        for (let i = 0; i < remainingPlayers.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].innerHTML += `Attack: ${remainingPlayers[i].attack}`;
                            document.getElementsByClassName("choice")[i].onclick = () => {
                                remainingPlayers[i].attack += 2;
                                remainingPlayers.splice(i, 1);
                            };
                        }
                    });
                }
                else remainingPlayers.forEach(player => {player.attack += 2;});
            }
        }, false, false);
        const ronWeasley = new Card("Ron Weasley", "Pack 1", "ally", 5, affectedPlayer => {affectedPlayer.attack += 2;}, true, false);
        const scourgify1 = new Card("Scourgify", "Pack 1", "spell", 2, affectedPlayer => {
            affectedPlayer.health++;
            const handItems = affectedPlayer.hand.filter(card => {return card.type === "item"});
            const discardItems = affectedPlayer.discard.filter(card => {return card.type === "item"});
            if (handItems.length + discardItems.length > 1) {
                addPlayerChoice("Banish:", () => {return handItems.length + discardItems.length + 1;}, 1, () => {
                    for (let i = 0; i < handItems.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${affectedPlayer.hand[affectedPlayer.hand.indexOf(handItems[i])].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            affectedPlayer.banishAt(affectedPlayer.hand.indexOf(handItems[i]));
                        };
                    }
                    for (let i = 0; i < discardItems.length; i++) {
                        document.getElementsByClassName("choice")[handItems.length + i].innerHTML = `<img src="${affectedPlayer.discard[affectedPlayer.discard.indexOf(discardItems[i])].img.src}">`;
                        document.getElementsByClassName("choice")[handItems.length + i].onclick = () => {
                            affectedPlayer.hand.unshift(affectedPlayer.discard.splice(affectedPlayer.discard.indexOf(discardItems[i]), 1)[0]);
                            affectedPlayer.banishAt(0);
                        };
                    }
                    document.getElementsByClassName("choice")[handItems.length + discardItems.length].innerHTML = "<p>Nothing</p>";
                });
            }
        }, false, false);
        const scourgify2 = scourgify1.clone();
        const scourgify3 = scourgify1.clone();
        const scourgify4 = scourgify1.clone();
        const scourgify5 = scourgify1.clone();
        const scourgify6 = scourgify1.clone();
        const screechOwl1 = new Card("Screech Owl", "Pack 1", "ally", 4, affectedPlayer => {
            let remainingPlayers = players.filter(player => {return !activeMermaid() || canHeal(player);});
            if (remainingPlayers.length) {
                if (remainingPlayers.length > 2) {
                    addPlayerChoice(`Give ${activeMermaid() ? "" : "1 influence and "}1 health to:`, () => {return remainingPlayers.length;}, 2, () => {
                        for (let i = 0; i < remainingPlayers.length; i++) {
                            document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                            document.getElementsByClassName("choice")[i].innerHTML += `${activeMermaid() ? "" : `<p>Influence: ${remainingPlayers[i].influence}</p>`}<p>Health: ${remainingPlayers[i].health}</p>`;
                            document.getElementsByClassName("choice")[i].onclick = () => {
                                if (!activeMermaid()) remainingPlayers[i].influence++;
                                remainingPlayers[i].health++;
                                remainingPlayers.splice(i, 1);
                            };
                        }
                    });
                }
                else {
                    remainingPlayers.forEach(player => {
                        if (!activeMermaid()) player.influence++;
                        player.health++;
                    });
                }
            }
        }, false, false);
        const screechOwl2 = screechOwl1.clone();
        const selfCorrectingInk1 = new Card("Self Correcting Ink", "Pack 1", "item", 5, affectedPlayer => {rollAnyHouseDie(affectedPlayer, true);}, false, true);
        const selfCorrectingInk2 = selfCorrectingInk1.clone();
        const selfCorrectingInk3 = selfCorrectingInk1.clone();

        // hogwartsCard array
        let hogwartsCards = [albusDumbledore, descendo1, descendo2, essenceOfDittany1, essenceOfDittany2, essenceOfDittany3, essenceOfDittany4, goldenSnitch, incendio1, incendio2, incendio3, incendio4, lumos1, lumos2, oliverWood, quidditchGear1, quidditchGear2, quidditchGear3, quidditchGear4, reparo1, reparo2, reparo3, reparo4, reparo5, reparo6, rubeusHagrid, sortingHat, wingardiumLeviosa1, wingardiumLeviosa2, wingardiumLeviosa3];
        if (activeGame !== "Game 1") {
            hogwartsCards.push(arthurWeasley, dobbyTheHouseElf, expelliarmus1, expelliarmus2, fawkesThePhoenix, finite1, finite2, gilderoyLockhart, mollyWeasley, nimbusTwoThousandAndOne1, nimbusTwoThousandAndOne2, polyjuicePotion1, polyjuicePotion2);
            if (!players.reduce((prev, curr) => {return prev + curr;}, "").includes("Ginny Weasley")) hogwartsCards.push(ginnyWeasley); // remove Hogwarts cards for current players
            if (activeGame !== "Game 2") {
                hogwartsCards.push(butterbeer1, butterbeer2, butterbeer3, chocolateFrog1, chocolateFrog2, chocolateFrog3, crystalBall1, crystalBall2, expectoPatronum1, expectoPatronum2, maraudersMap, petrificusTotalus1, petrificusTotalus2, remusLupin, siriusBlack, sybillTrelawney);
                if (activeGame !== "Game 3") {
                    hogwartsCards.push(accio1, accio2, alastorMadEyeMoody, cedricDiggory, filiusFlitwick, fleurDelacour, hogwartsAHistory1, hogwartsAHistory2, hogwartsAHistory3, hogwartsAHistory4, hogwartsAHistory5, hogwartsAHistory6, minervaMcgonagall, pensieve, pomonaSprout, protego1, protego2, protego3, severusSnape, triwizardCup, viktorKrum);
                    if (activeGame !== "Game 4") {
                        hogwartsCards.push(choChang, fredWeasley, georgeWeasley, kingsleyShacklebolt, nymphadoraTonks, owls1, owls2, stupefy1, stupefy2);
                        if (!players.reduce((prev, curr) => {return prev + curr;}, "").includes("Luna Lovegood")) hogwartsCards.push(lunaLovegood); // remove Hogwarts cards for current players
                        if (activeGame !== "Game 5") {
                            hogwartsCards.push(advancedPotionMaking, bezoar1, bezoar2, confundus1, confundus2, deluminator, elderWand, felixFelicis, horaceSlughorn);
                            if (activeGame !== "Game 6") {
                                hogwartsCards.push(swordOfGryffindor);
                            }
                        }
                    }
                }
            }
        }
        // adds Box expansion Hogwarts Cards
        if (activeGame.includes("Box") || activeGame.includes("Pack")) {
            hogwartsCards.push(argusFilchAndMrsNorris, fang, finiteIncantatem1, finiteIncantatem2, harp, oldSock1, oldSock2, tergeo1, tergeo2, tergeo3, tergeo4, tergeo5, tergeo6);
            if (activeGame !== "Box 1") {
                hogwartsCards.push(buckbeak, depulso1, depulso2, immobulus1, immobulus2, immobulus3, monsterBookOfMonsters1, monsterBookOfMonsters2, monsterBookOfMonsters3);
                if (activeGame !== "Box 2") {
                    hogwartsCards.push(erumpentHorn, griphook, kreacherTheHouseElf, lacewingFlies1, lacewingFlies2, nox1, nox2, thestral);
                    if (activeGame !== "Box 3") {
                        hogwartsCards.push(dragonsBlood, gillyweed1, gillyweed2, goldenEgg, igorKarkaroff, madameMaxime, prioriIncantatem1, prioriIncantatem2);
                    }
                }
            }

            // add Pack expansion Hogwarts Cards
            if (activeGame.includes("Pack")) {
                hogwartsCards.push(arrestoMomentum1, arrestoMomentum2, ascendio1, ascendio2, autoAnswerQuill, barnOwl1, barnOwl2, barnOwl3, deanThomas, errol, lavenderBrown, locomotor1, locomotor2, padmaAndParvatiPatil, scourgify1, scourgify2, scourgify3, scourgify4, scourgify5, scourgify6, screechOwl1, screechOwl2, selfCorrectingInk1, selfCorrectingInk2, selfCorrectingInk3);

                // remove Hogwarts cards for current players
                const heroesStr = players.reduce((prev, curr) => {return prev + curr.hero;}, "");
                if (!heroesStr.includes("Harry Potter")) hogwartsCards.push(harryPotter);
                if (!heroesStr.includes("Hermione Granger")) hogwartsCards.push(hermioneGranger);
                if (!heroesStr.includes("Neville Longbottom")) hogwartsCards.push(nevilleLongbottom);
                if (!heroesStr.includes("Ron Weasley")) hogwartsCards.push(ronWeasley);
            }
        }

        // purchase a Hogwarts card
        hogwartsCards.forEach(card => {
            card.img.onclick = () => {
                if (!document.getElementById("playerChoice")) {
                    const cost = card.cost - (players[0].proficiency === "Arithmancy" && card.houseDie ? 1 : 0);
                    if (players[0].influence >= cost) {
                        players[0].influence -= cost;

                        // History of Magic proficiency
                        if (players[0].proficiency === "History Of Magic" && card.type === "spell") {
                            addPlayerChoice("Give 1 influence to:", () => {return players.length;}, 1, () => {
                                for (let i = 0; i < players.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].heroImage.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++;};
                                }
                            });
                        }

                        // Time Turner, Sorting Hat, and Wingardium Leviosa effects
                        if ((players[0].passives.includes(timeTurner) && card.type === "spell") || (players[0].passives.includes(sortingHat) && card.type === "ally") || ((players[0].passives.includes(wingardiumLeviosa1) || players[0].passives.includes(wingardiumLeviosa2) || players[0].passives.includes(wingardiumLeviosa3)) && card.type === "item")) {
                            addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<p>Top of deck</p><img src="${card.img.src}">`;
                                document.getElementsByClassName("choice")[0].onclick = () => {
                                    players[0].draw.unshift(card);
                                };
                                document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard</p><img src="${card.img.src}">`;
                                document.getElementsByClassName("choice")[1].onclick = () => {
                                    players[0].discard.push(card);
                                };
                            });
                        }
                        // add card to discard
                        else {
                            players[0].discard.push(card);
                        }

                        // Dolores Umbridge effect
                        if (activeVillains.includes(doloresUmbridge) && card.cost >= 4 && !doloresUmbridge.petrifiedBy && doloresUmbridge.health > 0) {
                            players[0].health--;
                            darken(doloresUmbridge.img);
                        }

                        // adds card to player's bought array
                        players[0].bought.push(card);

                        // replaces previous card with next card in store
                        document.getElementsByClassName("shop")[activeShops.indexOf(card)].getElementsByTagName("IMG")[0].remove();
                        hogwartsCards.splice(hogwartsCards.indexOf(activeShops[activeShops.indexOf(card)]), 1);
                        activeShops[activeShops.indexOf(card)] = hogwartsCards[5];
                        activeShops.sort((a, b) => {return a.cost - b.cost}); // sorts store by cost
                        populateShop();
                    }
                }
            }
        });
        shuffle(hogwartsCards);
        let activeShops = [hogwartsCards[0], hogwartsCards[1], hogwartsCards[2], hogwartsCards[3], hogwartsCards[4], hogwartsCards[5]];
        activeShops = activeShops.sort((a, b) => {return a.cost - b.cost;}); // sorts store by cost

        // locations
        class Location {
            constructor(name, game, number, spaces, darkArtsEventDraws, revealEffect) {
                this._name = name;
                this._img = document.createElement("IMG");
                this._img.id = `location${number}`;
                this._img.className = "location";
                this._img.src = `./images/${game}/${src(name)}`;
                this._img.alt = name;
                this._number = number;
                this._spaces = spaces;
                this._darkArtsEventDraws = darkArtsEventDraws;
                this._revealEffect = revealEffect;
                this._game = game;
                this._added = 0;
                this._removed = false;
            }
            get name() {
                return this._name;
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
                if (Math.ceil(this.spaces / 2) === 3) locationToken.style.top = this.added % 2 === 0 ? "82%" : "78%";
                else locationToken.style.top = this.added % 2 === 0 ? "78%" : "82%";
                locationToken.style.left = `${40 + this.added * 11 - this.spaces * 6}%`;
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
                        this._revealEffect();
                        while (document.getElementsByClassName("locationToken")[0]) document.getElementsByClassName("locationToken")[0].remove();
                        activeLocation = locations[this.number];
                        document.getElementById(`location${this.number}`).style.display = "none";
                    }
                }

                // Draco Malfoy effect
                if (activeVillains.includes(dracoMalfoy) && !dracoMalfoy.petrifiedBy && dracoMalfoy.health > 0) {
                    players[0].health -= 2;
                    darken(dracoMalfoy.img);
                }
                // Lucius Malfoy effect
                if (activeVillains.includes(luciusMalfoy) && !luciusMalfoy.petrifiedBy && luciusMalfoy.health > 0) {
                    activeVillains.filter(villain => {return villain.type.includes("villain")}).forEach(villain => {villain.health++;});
                    darken(luciusMalfoy.img);
                }
                // Full Moon Rises effect
                if (encounters.length && encounters[0] === fullMoonRises) {
                    players[0].addToHand(detention.clone());
                    darken(fullMoonRises.img);
                }
            }
            removeFromLocation() {
                // Barty Crouch Jr and Defensive Training effect
                let defensiveTrainingEffect = encounters.length && encounters[0] === defensiveTraining;
                if ((!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) && !defensiveTrainingEffect) {
                    // Harry Potter special
                    if (!this.removed && players.filter(player => {return player.hero === "Harry Potter";}).length && activeGame !== "Game 1" && activeGame !== "Game 2") {
                        addPlayerChoice(`Gain 1 attack:`, () => {return players.length;}, activeGame === "Game 7" ? 2 : 1, () => {
                            for (let i = 0; i < players.length; i++) {
                                document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode());
                                document.getElementsByClassName("choice")[i].onclick = () => {players[i].attack++;};
                            }
                        });
                    }
                    // Harry Potter Box expansion special
                    else if (players.filter(player => {return player.hero === "Harry Potter Box";}).length) {
                        players.forEach(player => {player.health++;});
                    }

                    // Lord Voldemort Game 7 or Box 3
                    if ((invulnerableVoldemort() === lordVoldemort3 || activeVillains.includes(lordVoldemort3)) && !lordVoldemort3.petrifiedBy) {
                        players.forEach(player => {player.health--;});
                    }

                    // removes location token
                    this.removed = true;
                    if (this === locations[0]) {
                        if (this.added > 0) {
                            this.added--;
                            const locationToken = document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1];
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
                                if (Math.ceil(activeLocation.spaces / 2) === 3) locationToken.style.top = (i + 1) % 2 === 0 ? "82%" : "78%";
                                else locationToken.style.top = (i + 1) % 2 === 0 ? "78%" : "82%";
                                locationToken.style.left = `${56 + i * 11 - this.spaces * 6}%`;
                                document.getElementById("locations").appendChild(locationToken);
                            }
                            document.getElementById(`location${this.number - 1}`).style.display = "initial";
                        }
                        else {
                            this.added--;
                            const locationToken = document.getElementsByClassName("locationToken")[document.getElementsByClassName("locationToken").length - 1];
                            locationToken.classList.toggle("removing");
                            setTimeout(() => {locationToken.remove();}, 1000);
                        }
                    }
                }
                if (bartyCrouchJr.img && !bartyCrouchJr.petrifiedBy && bartyCrouchJr.health > 0) darken(bartyCrouchJr.img);
                if (encounters.length && encounters[0] === defensiveTraining) darken(defensiveTraining.img);
            }
        }
        const diagonAlley = new Location("Diagon Alley", "Game 1", 1, 4, 1, () => {});
        const mirrorOfErised = new Location("Mirror Of Erised", "Game 1", 2, 4, 1, () => {});
        const forbiddenForest = new Location("Forbidden Forest", "Game 2", 1, 4, 1, () => {});
        const quidditchPitch = new Location("Quidditch Pitch", "Game 2", 2, 4, 1, () => {});
        const chamberOfSecrets = new Location("Chamber Of Secrets", "Game 2", 3, 5, 2, () => {});
        const hogwartsExpress = new Location("Hogwarts Express", "Game 3", 1, 5, 1, () => {});
        const hogsmeadeVillage = new Location("Hogsmeade Village", "Game 3", 2, 6, 2, () => {});
        const shriekingShack = new Location("Shrieking Shack", "Game 3", 3, 6, 2, () => {});
        const quidditchWorldCup = new Location("Quidditch World Cup", "Game 4", 1, 6, 1, () => {});
        const triwizardTournament = new Location("Triwizard Tournament", "Game 4", 2, 6, 2, () => {});
        const graveyard = new Location("Graveyard", "Game 4", 3, 7, 2, () => {players.forEach(player => {const allies = player.hand.filter(card => {return card.type === "ally"}); if (allies.length) {if (allies.length > 1) {addPlayerChoice("Discard:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(allies[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(allies[0]), false);}});});
        const azkaban = new Location("Azkaban", "Game 5", 1, 7, 1, () => {});
        const hallOfProphecy = new Location("Hall Of Prophecy", "Game 5", 2, 7, 2, () => {});
        const ministryOfMagic = new Location("Ministry Of Magic", "Game 5", 3, 7, 2, () => {players.forEach(player => {const spells = player.hand.filter(card => {return card.type === "spell"}); if (spells.length) {if (spells.length > 1) {addPlayerChoice("Discard:", () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(spells[0]), false);}});});
        const knockturnAlley = new Location("Knockturn Alley", "Game 6", 1, 7, 1, () => {});
        const theBurrow = new Location("The Burrow", "Game 6", 2, 7, 2, () => {});
        const astronomyTower = new Location("Astronomy Tower", "Game 6", 3, 8, 3, () => {players.forEach(player => {const items = player.hand.filter(card => {return card.type === "item"}); if (items.length) {if (items.length > 1) {addPlayerChoice("Discard:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(items[0]), false);}});});
        const godricsHollow = new Location("Godric's Hollow", "Game 7", 1, 6, 1, () => {});
        const gringotts = new Location("Gringotts", "Game 7", 2, 6, 2, () => {});
        const roomOfRequirement = new Location("Room Of Requirement", "Game 7", 3, 7, 2, () => {});
        const hogwartsCastle = new Location("Hogwarts Castle", "Game 7", 4, 8, 3, () => {players.forEach(player => {player.health -= 2;});});
        const castleGates = new Location("Castle Gates", "Box 1", 1, 5, 1, () => {});
        const hagridsHut = new Location("Hagrid's Hut", "Box 1", 2, 6, 2, () => {});
        const greatHallBox = new Location("Great Hall", "Box 1", 3, 7, 3, () => {});
        const dADAClassroom = new Location("DADA Classroom", "Box 2", 1, 6, 1, () => {});
        const castleHallways = new Location("Castle Hallways", "Box 2", 2, 6, 2, () => {});
        const whompingWillow = new Location("Whomping Willow", "Box 2", 3, 7, 3, () => {});
        const unicornHallow = new Location("Unicorn Hallow", "Box 3", 1, 5, 1, () => {});
        const aragogsLair = new Location("Aragog's Lair", "Box 3", 2, 6, 2, () => {});
        const giantClearing = new Location("Giant Clearing", "Box 3", 3, 7, 3, () => {});
        const selectionOfChampions = new Location("Selection Of Champions", "Box 4", 1, 5, 1, () => {});
        const dragonArena = new Location("Dragon Arena", "Box 4", 2, 6, 2, () => {});
        const mermaidVillage = new Location("Mermaid Village", "Box 4", 3, 6, 2, () => {});
        const triwizardMaze = new Location("Triwizard Maze", "Box 4", 4, 7, 3, () => {activeVillains.filter(villain => {return villain.type.includes("creature");}).forEach(creature => {creature.health++; creature.influence++;});});
        const theBlackLake23 = new Location("The Black Lake 23", "Pack 1", 1, 5, 1, () => {});
        const theBlackLake45 = new Location("The Black Lake 45", "Pack 1", 1, 5, 1, () => {});
        const theHospitalWing23 = new Location("The Hospital Wing 23", "Pack 1", 2, 6, 2, () => {});
        const theHospitalWing45 = new Location("The Hospital Wing 45", "Pack 1", 2, 7, 2, () => {});
        const theHogwartsLibrary23 = new Location("The Hogwarts Library 23", "Pack 1", 3, 7, 3, () => {});
        const theHogwartsLibrary45 = new Location("The Hogwarts Library 45", "Pack 1", 3, 7, 3, () => {});
        const ministryOfMagicAtrium23 = new Location("Ministry Of Magic Atrium 23", "Pack 2", 1, 5, 1, () => {});
        const ministryOfMagicAtrium45 = new Location("Ministry Of Magic Atrium 45", "Pack 2", 1, 6, 1, () => {});
        const ministryCourtroom23 = new Location("Ministry Courtroom 23", "Pack 2", 2, 6, 2, () => {});
        const ministryCourtroom45 = new Location("Ministry Courtroom 45", "Pack 2", 2, 7, 2, () => {});
        const ministryLift23 = new Location("Ministry Lift 45", "Pack 2", 3, 7, 3, () => {});
        const ministryLift45 = new Location("Ministry Lift 45", "Pack 2", 3, 7, 3, () => {});
        const malfoyManor23 = new Location("Malfoy Manor 23", "Pack 3", 1, 5, 1, () => {});
        const malfoyManor45 = new Location("Malfoy Manor 45", "Pack 3", 1, 5, 1, () => {});
        const cave23 = new Location("Cave 23", "Pack 3", 2, 5, 2, () => {});
        const cave45 = new Location("Cave 45", "Pack 3", 2, 6, 2, () => {});
        const atopTheTower23 = new Location("Atop The Tower 23", "Pack 3", 3, 6, 3, () => {});
        const atopTheTower45 = new Location("Atop The Tower 45", "Pack 3", 3, 7, 3, () => {});
        const greatHall23 = new Location("Great Hall 23", "Pack 4", 1, 6, 1, () => {});
        const greatHall45 = new Location("Great Hall 45", "Pack 4", 1, 7, 1, () => {});
        const forestClearing23 = new Location("Forest Clearing 23", "Pack 4", 2, 6, 2, () => {});
        const forestClearing45 = new Location("Forest Clearing 45", "Pack 4", 2, 7, 2, () => {});
        const castleCourtyard23 = new Location("Castle Courtyard 23", "Pack 4", 3, 7, 3, () => {});
        const castleCourtyard45 = new Location("Castle Courtyard 45", "Pack 4", 3, 8, 3, () => {});
        let locations = [diagonAlley, mirrorOfErised, forbiddenForest, quidditchPitch, chamberOfSecrets, hogwartsExpress, hogsmeadeVillage, shriekingShack, quidditchWorldCup, triwizardTournament, graveyard, azkaban, hallOfProphecy, ministryOfMagic, knockturnAlley, theBurrow, astronomyTower, godricsHollow, gringotts, roomOfRequirement, hogwartsCastle, castleGates, hagridsHut, greatHallBox, dADAClassroom, castleHallways, whompingWillow, unicornHallow, aragogsLair, giantClearing, selectionOfChampions, dragonArena, mermaidVillage, triwizardMaze, theBlackLake23, theBlackLake45, theHospitalWing23, theHospitalWing45, theHogwartsLibrary23, theHogwartsLibrary45, ministryOfMagicAtrium23, ministryOfMagicAtrium45, ministryCourtroom23, ministryCourtroom45, ministryLift23, ministryLift45, malfoyManor23, malfoyManor45, cave23, cave45, atopTheTower23, atopTheTower45, greatHall23, greatHall45, forestClearing23, forestClearing45, castleCourtyard23, castleCourtyard45].filter(loc => {return loc.game === activeGame});
        if (activeGame.includes("Pack")) locations = locations.filter(location => {
            if (players.length < 4) return location.name.includes("23");
            else return location.name.includes("45");
        });
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
            clone() {
                return new DarkArtsEvent(this._name, this._game, this._effect);
            }
        }
        const expulso1 = new DarkArtsEvent("Expulso", "Game 1", () => {players[0].health -= 2;});
        const expulso2 = expulso1.clone();
        const expulso3 = expulso1.clone();
        const flipendo1 = new DarkArtsEvent("Flipendo", "Game 1", () => {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, true);};}}); players[0].health--;});
        const flipendo2 = flipendo1.clone();
        const heWhoMustNotBeNamed1 = new DarkArtsEvent("He Who Must Not Be Named", "Game 1", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed2 = heWhoMustNotBeNamed1.clone();
        const heWhoMustNotBeNamed3 = heWhoMustNotBeNamed1.clone();
        const petrification1 = new DarkArtsEvent("Petrification", "Game 1", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        const petrification2 = petrification1.clone();
        const handOfGlory1 = new DarkArtsEvent("Hand Of Glory", "Game 2", () => {players[0].health--; activeLocation.addToLocation();});
        const handOfGlory2 = handOfGlory1.clone();
        const obliviate = new DarkArtsEvent("Obliviate", "Game 2", () => {players.forEach(player => {const spells = () => {return player.hand.filter(card => {return card.type === "spell";});}; if (spells().length && player.health > 0) {addPlayerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(spells()); document.getElementsByClassName("choice")[0].onclick = () => {if (spells().length > 1) {playerChoices.unshift(new PlayerChoice(`${player.hero} discards:`, () => {return spells().length;}, 1, () => {for (let i = 0; i < spells().length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells()[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells()[i]), true);};}}));} else player.forcedDiscardAt(player.hand.indexOf(spells()[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else if (player.health > 0) player.health -= 2;});});
        const poison = new DarkArtsEvent("Poison", "Game 2", () => {
            players.forEach(player => {
                const allies = () => {return player.hand.filter(card => {return card.type === "ally";});}; 
                if (allies().length && player.health > 0) {
                    addPlayerChoice(`${player.hero} loses:`, () => {return allies().length ? 2 : 0;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(allies()); 
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            if (allies().length > 1) {
                                playerChoices.unshift(new PlayerChoice(`${player.hero} discards:`, () => {return allies().length;}, 1, () => {
                                    for (let i = 0; i < allies().length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies()[i].img.src}">`; 
                                        document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(allies()[i]), true);};
                                    }
                                }));
                            } 
                            else player.forcedDiscardAt(player.hand.indexOf(allies()[0]), true);
                        }; 
                        document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; 
                        document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};
                    });
                } 
                else if (player.health > 0) player.health -= 2;
            });
        });
        const relashio = new DarkArtsEvent("Relashio", "Game 2", () => {players.forEach(player => {const items = () => {return player.hand.filter(card => {return card.type === "item";});}; if (items().length) {addPlayerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(items()); document.getElementsByClassName("choice")[0].onclick = () => {if (items().length > 1) {playerChoices.unshift(new PlayerChoice(`${player.hero} discards:`, () => {return items().length;}, 1, () => {for (let i = 0; i < items().length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items()[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items()[i]), true);};}}));} else player.forcedDiscardAt(player.hand.indexOf(items()[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>${player.invulnerable ? "Nothing" : `Health: ${player.health}`}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const dementorsKiss1 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); players[0].health--;});
        const dementorsKiss2 = dementorsKiss1.clone();
        const oppugno = new DarkArtsEvent("Oppugno", "Game 3", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].cost) {const tempPetrified = player.petrified; player.petrified = false; players[0].cardsDrawn--; player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.petrified = tempPetrified; player.health -= 2;}});});
        const tarantallegra = new DarkArtsEvent("Tarantallegra", "Game 3", () => {players[0].health--;});
        let avadaKill = false;
        const avadaKedavra1 = new DarkArtsEvent("Avada Kedavra", "Game 4", () => {players[0].health -= 3; if (players[0].stunned) avadaKill = true;});
        const crucio1 = new DarkArtsEvent("Crucio", "Game 4", () => {players[0].health--;});
        const heirOfSlytherin1 = new DarkArtsEvent("Heir Of Slytherin", "Game 4", () => {rollHouseDie(players[0],"green", true, false, false);});
        const heirOfSlytherin2 = heirOfSlytherin1.clone();
        const imperio1 = new DarkArtsEvent("Imperio", "Game 4", () => {const otherPlayers = players.filter(player => {return player !== players[0];}); if (otherPlayers.length) {if (otherPlayers.length > 1) {addPlayerChoice("Choose to lose 2 health:", () => {return otherPlayers.length;}, 1, () => {for (let i = 0; i < otherPlayers.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${otherPlayers[i].img.src}"><p>Health: ${otherPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {otherPlayers[i].health -= 2;};}});} else otherPlayers[0].health -= 2;}});
        const morsmordre1 = new DarkArtsEvent("Morsmordre", "Game 4", () => {
            players.forEach(player => {player.health--;});
            activeLocation.addToLocation(); 
            if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); 
            if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});
            if (activeVillains.includes(corneliusFudge) && !corneliusFudge.petrifiedBy) players.forEach(player => {player.draw.splice(0, 1);});
        });
        const morsmordre2 = morsmordre1.clone();
        const regeneration = new DarkArtsEvent("Regeneration", "Game 4", () => {activeVillains.filter(villain => {return villain.type.includes("villain")}).forEach(villain => {villain.health += 2;})});
        const avadaKedavra2 = avadaKedavra1.clone();
        const crucio2 = crucio1.clone();
        const educationalDecree1 = new DarkArtsEvent("Educational Decree", "Game 5", () => {players[0].hand.forEach(card => {if (card.cost - (players[0].proficiency === "Arithmancy" && card.houseDie) ? 1 : 0 >= 4) players[0].health--;});});
        const educationalDecree2 = educationalDecree1.clone();
        const imperio2 = imperio1.clone();
        const legilimency = new DarkArtsEvent("Legilimency", "Game 5", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].type === "spell") {let tempPetrified = player.petrified; player.petrified = false; player.cardsDrawn--; player.drawCards(1); player.petrified = tempPetrified; player.forcedDiscardAt(player.hand.length - 1, true); player.health -= 2;}});});
        const morsmordre3 = morsmordre1.clone();
        const morsmordre4 = morsmordre1.clone();
        const sectumsempra1 = new DarkArtsEvent("Sectumsempra", "Game 6", () => {players.forEach(player => {player.health -= 2;});});
        const sectumsempra2 = sectumsempra1.clone();
        const avadaKedavra3 = avadaKedavra1.clone();
        const crucio3 = crucio1.clone();
        const fiendfyre = new DarkArtsEvent("Fiendfyre", "Game 7", () => {players.forEach(player => {player.health -= 3;});});
        const imperio3 = imperio1.clone();
        let darkArtsEvents = [expulso1, expulso2, expulso3, flipendo1, flipendo2, heWhoMustNotBeNamed1, heWhoMustNotBeNamed2, heWhoMustNotBeNamed3, petrification1, petrification2];
        if (activeGame !== "Game 1") {
            darkArtsEvents.push(handOfGlory1, handOfGlory2, obliviate, poison, relashio);
            if (activeGame !== "Game 2") {
                darkArtsEvents.push(dementorsKiss1, dementorsKiss2, oppugno, tarantallegra);
                if (activeGame !== "Game 3") {
                    darkArtsEvents.push(avadaKedavra1, crucio1, heirOfSlytherin1, heirOfSlytherin2, imperio1, morsmordre1, morsmordre2, regeneration);
                    if (activeGame !== "Game 4") {
                        darkArtsEvents.push(avadaKedavra2, crucio2, educationalDecree1, educationalDecree2, imperio2, legilimency, morsmordre3);
                        if (activeGame !== "Game 5" && activeGame !== "Box 1") {
                            darkArtsEvents.push(morsmordre4, sectumsempra1, sectumsempra2);
                            if (activeGame !== "Game 6" && activeGame !== "Box 2")
                                darkArtsEvents.push(avadaKedavra3, crucio3, fiendfyre, imperio3);
                        }
                    }
                }
            }
        }
        // Box expansion Dark Arts Events
        const blastEnded = new DarkArtsEvent("Blast Ended", "Box 1", () => {let hurtPlayer = 0 ? players[0 - 1] : players[players.length - 1]; hurtPlayer.health--; if (hurtPlayer.hand.length) {if (hurtPlayer.hand.length > 1) {addPlayerChoice(`Discard for ${hurtPlayer.hero}:`, () => {return hurtPlayer.hand.length;}, 1, () => {for (let i = 0; i < hurtPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${hurtPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayer.forcedDiscardAt(i, true);};}});} else hurtPlayer.forcedDiscardAt(0, true);}});
        const inquisitorialSquad1 = new DarkArtsEvent("Inquisitorial Squad", "Box 1", () => {players[0].addToHand(detention.clone()); players.forEach(player => {player.health -= player.hand.filter(card => {return card.name === "Detention"}).length});});
        const inquisitorialSquad2 = inquisitorialSquad1.clone();
        const menacingGrowl1 = new DarkArtsEvent("Menacing Growl", "Box 1", () => {players.forEach(player => {player.health -= player.hand.filter(card => {return card.cost === 3}).length;});});
        const menacingGrowl2 = menacingGrowl1.clone();
        const ragingTroll1 = new DarkArtsEvent("Raging Troll", "Box 1", () => {players[0 === players.length - 1 ? 0 : 0 + 1].health -= 2; activeLocation.addToLocation();});
        const ragingTroll2 = ragingTroll1.clone();
        const slugulusEructo = new DarkArtsEvent("Slugulus Eructo", "Box 1", () => {players.forEach(player => {player.health -= activeVillains.filter(villain => {return villain.type.includes("creature");}).length});});
        const bombarda1 = new DarkArtsEvent("Bombarda", "Box 2", () => {players.forEach(player => {player.discard.push(detention.clone());});});
        const bombarda2 = bombarda1.clone();
        const theGrim = new DarkArtsEvent("The Grim", "Box 2", () => {if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, true);};}});} else players[0].forcedDiscardAt(0, true);} activeLocation.addToLocation();});
        const transformed1 = new DarkArtsEvent("Transformed", "Box 2", () => {if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, true);};}});} else players[0].forcedDiscardAt(0, true); players[0].addToHand(detention.clone());}});
        const transformed2 = transformed1.clone();
        const viciousBite1 = new DarkArtsEvent("Vicious Bite", "Box 2", () => {players.filter(player => {return player.health === players.map(player => {return player.health;}).sort((a, b) => {return a - b;})[0];}).forEach(player => {player.health -= 2; if (player.stunned) setTimeout(() => {activeLocation.addToLocation()}, 1000);});});
        const viciousBite2 = viciousBite1.clone();
        const acromantulaAttack1 = new DarkArtsEvent("Acromantula Attack", "Box 3", () => {
            players.forEach(player => {
                if (!player.draw.length) player.shuffle();
                if (!player.draw[0].cost) {
                    const tempPatrified = player.petrified;
                    player.petrified = false;
                    player.cardsDrawn--;
                    player.drawCards(1);
                    player.forcedDiscardAt(player.hand.length - 1, true);
                    player.petrified = tempPatrified;
                    player.health--;
                }
            });
        });
        const acromantulaAttack2 = acromantulaAttack1.clone();
        const bombarda3 = bombarda1.clone();
        const centaurAttack1 = new DarkArtsEvent("Centaur Attack", "Box 3", () => {players.forEach(player => {if (player.hand.filter(card => {return card.type === "spell"}).length >= 3) player.health--;});});
        const centaurAttack2 = centaurAttack1.clone();
        const fightAndFlight = new DarkArtsEvent("Fight And Flight", "Box 3", () => {activeLocation.addToLocation(); setTimeout(() => {activeLocation.addToLocation();}, 1000);});
        const seriouslyMisunderstoodCreatures1 = new DarkArtsEvent("Seriously Misunderstood Creatures", "Box 3", () => {rollHouseDie(players[0],"phoenix", true, true, false);}); // TO-DO: not same as Boggart
        const seriouslyMisunderstoodCreatures2 = seriouslyMisunderstoodCreatures1.clone();
        const dragonsBreath = new DarkArtsEvent("Dragon's Breath", "Box 4", () => {
            players[0].health--;
            const items = () => {return players[0].hand.filter(card => {return card.type === "item";});};
            while (items().length) players[0].forcedDiscardAt(players[0].hand.indexOf(items()[0]), true);
        });
        const inquisitorialSquad3 = inquisitorialSquad1.clone();
        const lephrechaunGold1 = new DarkArtsEvent("Leprechaun Gold", "Box 4", () => {players[0].attack = 0; players[0].influence = 0;});
        const lephrechaunGold2 = lephrechaunGold1.clone();
        const lephrechaunGold3 = lephrechaunGold1.clone();
        // Pack expansion Dark Arts Events
        const caughtAtADAMeeting1 = new DarkArtsEvent("Caught At A D A Meeting", "Pack 1", () => {
            getNeighbors(players[0]).concat([players[0]]).forEach(player => {
                if (!player.draw.length) player.shuffle(); 
                if (player.draw[0].type === "ally") {
                    const tempPetrified = player.petrified; 
                    player.petrified = false; 
                    players[0].cardsDrawn--; 
                    player.drawCards(1); 
                    player.forcedDiscardAt(player.hand.length - 1, true); 
                    player.petrified = tempPetrified; 
                    player.health -= 2;
                }
            });            
        });
        const caughtAtADAMeeting2 = caughtAtADAMeeting1.clone();
        const howlers = new DarkArtsEvent("Howlers", "Pack 1", () => {
            getNeighbors(players[0]).concat([players[0]]).filter(player => {return player.health > 0 && player.hand.filter(card => {return card.type === "item";}).length;}).forEach(player => {
                const items = () => {return player.hand.filter(card => {return card.type === "item";});};
                if (items().length) {
                    addPlayerChoice("Lose:", () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken + healthToken}</div>`;
                        document.getElementsByClassName("choice")[0].onclick = () => {player.health -= 3;};
                        document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer" height="40vh" style="overfow-x: auto;">${items().reduce((prev, curr) => {return prev + `<img src="${curr.img.src}">`}, "")}</div>`;
                        document.getElementsByClassName("choice")[1].onclick = () => {
                            while (items().length) player.forcedDiscardAt(player.hand.indexOf(items()[0]), true);
                        };
                    });
                }
            });
        });
        const weasleyIsOurKing1 = new DarkArtsEvent("Weasley Is Our King", "Pack 1", () => {
            getNeighbors(players[0]).concat(players[0]).filter(player => {return player.hand.length;}).forEach(player => {
                if (player.hand.length > 1) {
                    addPlayerChoice("Discard:", () => {return player.hand.length;}, 1, () => {
                        for (let i = 0; i < player.hand.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, true);};
                        }
                    });
                }
                else player.forcedDiscardAt(0, true);
            });
            activeLocation.addToLocation();
        });
        const weasleyIsOurKing2 = weasleyIsOurKing1.clone();

        // add Box DAEs to game
        if (activeGame.includes("Box") || activeGame.includes("Pack")) {
            darkArtsEvents.push(blastEnded, inquisitorialSquad1, inquisitorialSquad2, menacingGrowl1, menacingGrowl2, ragingTroll1, ragingTroll2, slugulusEructo);
            if (activeGame !== "Box 1") {
                darkArtsEvents.push(bombarda1, bombarda2, theGrim, transformed1, transformed2, viciousBite1, viciousBite2);
                if (activeGame !== "Box 2") {
                    darkArtsEvents.push(acromantulaAttack1, acromantulaAttack2, bombarda3, centaurAttack1, centaurAttack2, fightAndFlight, seriouslyMisunderstoodCreatures1, seriouslyMisunderstoodCreatures2);
                    if (activeGame !== "Box 3") {
                        darkArtsEvents.push(dragonsBreath, inquisitorialSquad3, lephrechaunGold1, lephrechaunGold2, lephrechaunGold3);
                    }
                }
            }

            // add Pack DAEs to game
            if (activeGame.includes("Pack")) {
                darkArtsEvents.push(caughtAtADAMeeting1, caughtAtADAMeeting2, howlers, weasleyIsOurKing1, weasleyIsOurKing2);
            }
        }
        shuffle(darkArtsEvents);
        let activeDarkArtsEvents = []; // displayed events
        let inactiveDarkArtsEvents = []; // events to be shuffled back in

        // villains
        class Villain {
            constructor(name, game, type, health, influence, effect, reward, passive) {
                this._name = name;
                this._img = document.createElement("img");
                this._img.className = "villain";
                this._img.src = `./images/${(activeGame.includes("Box") || activeGame.includes("Pack")) && (name === "Basilisk" || name === "Dementor") ? "Box 1" : game}/${src(name)}`;
                this._img.alt = name;
                this._type = type;
                this._maxHealth = health;
                this._health = health;
                this._maxInfluence = influence;
                this._influence = influence;
                this._attackDamageTaken = 0;
                this._influenceDamageTaken = 0;
                this._effect = effect;
                this._reward = reward;
                this._passive = passive;
                this._petrifiedBy = null;
                this._activated = false;
                this._ginnyUsed = false;
            }
            get name() {
                return this._name;
            }
            get img() {
                return this._img;
            }
            get type() {
                return this._type;
            }
            get maxHealth() {
                return this._maxHealth;
            }
            get health() {
                return this._health;
            }
            get influence() {
                return this._influence;
            }
            displayDamage() {
                document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                for (let i = 0; i < this.maxHealth - this.health; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                }
                for (let i = 0; i < this._maxInfluence - this.influence; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
                }
            }
            setHealth(health, healthType) {
                // set up for correct healthType
                let thisHealth = this.health;
                let thisMaxHealth = this.maxHealth;
                if (healthType === "influence") {
                    thisHealth = this.influence;
                    thisMaxHealth = this._maxInfluence;
                }

                if (health > thisMaxHealth) health = thisMaxHealth;
                else if (health < thisHealth) {
                    if (healthType === "influence") this.influenceDamageTaken++;
                    else this.attackDamageTaken++;

                    // Confundus effect
                    if (activeVillains.filter(villain => {return villain.type.includes("villain") && villain.attackDamageTaken;}).length === activeVillains.filter(villain => {return villain.type.includes("villain");}).length && (players[0].passives.includes(confundus1) || players[0].passives.includes(confundus2))) {
                        if (players[0].passives.includes(confundus1)) {
                            players[0].passives.splice(players[0].passives.indexOf(confundus1), 1);
                            activeLocation.removeFromLocation();
                        }
                        if (players[0].passives.includes(confundus2)) {
                            players[0].passives.splice(players[0].passives.indexOf(confundus2), 1);
                            activeLocation.removeFromLocation();
                        }
                    }

                    // Ginny Weasley special
                    if (!this.ginnyUsed && players[0].hero === "Ginny Weasley" && activeVillains.filter(villain => {return villain.attackDamageTaken || villain.influenceDamageTaken;}).length >= 2) {
                        players.forEach(player => {player.influence++;});
                        this.ginnyUsed = true;
                    }

                    // Care of Magical Creatures proficiency
                    if (thisHealth === thisMaxHealth && players[0].proficiency === "Care Of Magical Creatures" && this.type.includes("creature")) {
                        const hurtPlayers = players.filter(player => {return canHeal(player);});
                        if (hurtPlayers.length) {
                            if (hurtPlayers.length > 1) {
                                addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
                                    for (let i = 0; i < hurtPlayers.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${hurtPlayers[i].heroImage.src}"><p>Health: ${hurtPlayers[i].health}</p>`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                    }
                                });
                            }
                            else hurtPlayers[0].health += 2;
                        }
                    }

                    // Horcrux 2 and The First Task effects
                    if (encounters.length && (encounters[0] === horcrux2 || encounters[0] === theFirstTask) && this.attackDamageTaken === 2) {
                        players[0].health -= 2;
                        if (horcrux2.img) darken(horcrux2.img);
                        if (theFirstTask.img) darken(theFirstTask.img);
                    }
                }
                if (healthType === "health") this._health = health;
                else this._influence = health;
                this.displayDamage();
                if (this.health <= 0 && this.influence <= 0) {

                    // remove villain
                    this.img.classList.toggle("defeating");
                    const petrifiedToken = this.petrifiedBy ? document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].getElementsByClassName("petrifiedToken")[0] : null;
                    if (this.petrifiedBy) petrifiedToken.classList.toggle("defeating");
                    document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].onclick = () => {};
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].onclick = () => {};
                    setTimeout(() => {
                        if (activeVillains.includes(this)) {
                            document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].innerHTML = "";
                            document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                        }
                        if (document.getElementById("villainDiscard").getElementsByTagName("IMG")[0]) setTimeout(() => {document.getElementById("villainDiscard").getElementsByTagName("IMG")[0].remove();}, 1000);
                        document.getElementById("villainDiscard").appendChild(this.img);
                        this.img.classList.toggle("defeating");
                        this.img.classList.toggle("defeated");

                        defeatedVillains.push(this);

                        // reward players for villain defeat
                        setTimeout(() => {
                            this.reward();

                            if (this.type.includes("villain")) { // some rewards are specific to villains
                                // Firebolt, Cleansweep 11, and Nimbus 2000 effects
                                if (players[0].passives.includes(firebolt) || players[0].passives.includes(cleansweep11) || players[0].passives.includes(nimbus2000)) {
                                    players[0].influence++;
                                }
                                // Nimbus Two Thousand and One effect
                                if (players[0].passives.includes(nimbusTwoThousandAndOne1) || players[0].passives.includes(nimbusTwoThousandAndOne2)) {
                                    players[0].influence += 2;
                                }
                                // Oliver Wood effect
                                if (players[0].passives.includes(oliverWood)) {
                                    const hurtPlayers = players.filter(player => {return canHeal(player);});
                                    if (hurtPlayers.length) {
                                        if (hurtPlayers.length > 1) {
                                            addPlayerChoice("Pick a hero to heal:", () => {return hurtPlayers.length;}, 1, () => {
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
                                // Viktor Krum effect
                                if (players[0].passives.includes(viktorKrum)) {
                                    if (!activeMermaid()) players[0].influence++;
                                    players[0].health++;
                                }
                                // Igor Karkaroff effect
                                if (players[0].passives.includes(igorKarkaroff) && !activeMermaid()) {
                                    players[0].attack++;
                                    players[0].influence++;
                                }
                                // Auto Answer Quill effect
                                if (players[0].passives.includes(autoAnswerQuill)) {
                                    activeLocation.removeFromLocation();
                                }
                                if (players[0].passives.includes(ronWeasley)) {
                                    players.forEach(player => {player.health++;});
                                }
                            }
                            if (this.type.includes("creature")) { // some rewards are specific to creatures
                                // Immobulus effect
                                if (players[0].passives.includes(immobulus1)) activeLocation.removeFromLocation();
                                if (players[0].passives.includes(immobulus2)) activeLocation.removeFromLocation();
                                if (players[0].passives.includes(immobulus3)) activeLocation.removeFromLocation();
                                // Care of Magical Creatures proficiency
                                if (players[0].proficiency === "Care Of Magical Creatures") {
                                    setTimeout(() => {
                                        activeLocation.removeFromLocation();
                                        darken(document.getElementsByClassName("playerProficiency")[0]);
                                    }, 1000);
                                }
                            }

                            // check for victory
                            if (!activeVillains.filter(villain => {return villain.health || villain.influence}).length && !inactiveVillains.length) {
                                activeVillains = [];
                                // Voldemort
                                if ((activeGame === "Game 5" || activeGame === "Box 1") && this !== lordVoldemort1) {
                                    activeVillains.push(lordVoldemort1);
                                }
                                else if ((activeGame === "Game 6" || activeGame === "Box 2") && this !== lordVoldemort2) {
                                    activeVillains.push(lordVoldemort2);
                                }
                                else if ((activeGame === "Game 7" || activeGame === "Box 3") && this !== lordVoldemort3) {
                                    activeVillains.push(lordVoldemort3);
                                }
                                else if (activeGame === "Box 4" && this !== lordVoldemort4) {
                                    activeVillains.push(lordVoldemort4);
                                }
                                else alert("Victory!");
                                populateVillains();
                                document.getElementById("villainDraw").innerHTML = "";
                            }
                        }, 1000);
                    }, 1000);
                }
            }
            set health(health) {
                this.setHealth(health, "health");
            }
            set influence(influence) {
                this.setHealth(influence, "influence");
            }
            get attackDamageTaken() {
                return this._attackDamageTaken;
            }
            set attackDamageTaken(attackDamageTaken) {
                this._attackDamageTaken = attackDamageTaken;
            }
            get influenceDamageTaken() {
                return this._influenceDamageTaken;
            }
            set influenceDamageTaken(influenceDamageTaken) {
                this._influenceDamageTaken = influenceDamageTaken;
            }
            effect() {
                darken(this.img);
                this._effect();
            }
            reward() {
                // Basilisk needs to unpetrify
                if (this === basilisk && !activeDarkArtsEvents.includes(petrification1) && !activeDarkArtsEvents.includes(petrification2)) players.forEach(player => {player.petrified = false;});
                
                const thirdFloorCorridorEffect = encounters.length && encounters[0] === thirdFloorCorridor;
                if (!thirdFloorCorridorEffect) {
                    this._reward();
                }
            }
            get passive() {
                return this._passive;
            }
            get petrifiedBy() {
                return this._petrifiedBy;
            }
            set petrifiedBy(petrifiedBy) {
                // unpetrify basilisk
                if (this.petrifiedBy && !petrifiedBy && this === basilisk) {
                    this.effect();
                }

                this._petrifiedBy = petrifiedBy;
                const activeVillainElement = this === invulnerableVoldemort() ? document.getElementById("villainDraw") : document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)];
                if (this.petrifiedBy) {
                    activeVillainElement.innerHTML += `<img src="./images/${this.type.includes("villain") ? "petrified" : "harp"}Token.png" class="petrifiedToken">`;

                    // petrify the Basilisk
                    if (this === basilisk && !activeDarkArtsEvents.includes(petrification1) && !activeDarkArtsEvents.includes(petrification2)) {
                        players.forEach(player => {player.petrified = false});
                    }
                }
                else if (activeVillainElement.getElementsByClassName("petrifiedToken")[0]) {
                    activeVillainElement.getElementsByClassName("petrifiedToken")[0].remove();
                    setTimeout(() => {populateVillains();}, 1000); // fixes bug where darken doesn't work after petrification
                }
            }
            get activated() {
                return this._activated;
            }
            set activated(activated) {
                this._activated = activated;
            }
            get ginnyUsed() {
                return this._ginnyUsed;
            }
            set ginnyUsed(ginnyUsed) {
                this._ginnyUsed = ginnyUsed;
            }
        }
        const crabbeAndGoyle = new Villain("Crabbe And Goyle", "Game 1", "villain", 5, 0, () => {}, () => {players.forEach(player => {player.drawCards(1);});}, true);
        const dracoMalfoy = new Villain("Draco Malfoy", "Game 1", "villain", 6, 0, () => {}, () => {activeLocation.removeFromLocation();}, true);
        const quirinusQuirrell = new Villain("Quirinus Quirrell", "Game 1", "villain", 6, 0, () => {players[0].health--;}, () => {players.forEach(player => {player.influence++; player.health++;});}, false);
        const basilisk = new Villain("Basilisk", "Game 2", "villain-creature", 8, 0, () => {players.forEach(player => {player.petrified = true});}, () => {players.forEach(player => {player.drawCards(1);}); activeLocation.removeFromLocation();}, false);
        const luciusMalfoy = new Villain("Lucius Malfoy", "Game 2", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.influence++;}); activeLocation.removeFromLocation();}, true);
        const tomRiddle = new Villain("Tom Riddle", "Game 2", "villain", 6, 0, () => {
            let allies = players[0].hand.filter(card => {return card.type === "ally";}); 
            const tomRiddleEffect = () => {
                addPlayerChoice("Lose:", () => {allies = allies.filter(card => {return players[0].hand.includes(card);}); if (allies.length) return 2; return 0;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {players[0].health -= 2; allies.pop(); tomRiddleEffect();}; 
                    document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(players[0].hand); 
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        playerChoices.unshift(new PlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {
                            for (let j = 0; j < players[0].hand.length; j++) {
                                document.getElementsByClassName("choice")[j].innerHTML = `<img src="${players[0].hand[j].img.src}">`; document.getElementsByClassName("choice")[j].onclick = () => {
                                    if (allies.includes(players[0].hand[j])) allies.splice(allies.indexOf(players[0].hand[j]), 1); 
                                    players[0].forcedDiscardAt(j, true); 
                                    allies.pop();
                                    tomRiddleEffect();
                                };
                            }
                        }));
                    };
                });
            }; 
            tomRiddleEffect();
        }, () => {
            players.forEach(player => {
                const allies = player.discard.filter(card => {return card.type === "ally"}); 
                const drawAllyFromDiscard = () => {
                    const putAllyInHand = index => {
                        player.addToHand(allies[index]); 
                        player.discard.splice(player.discard.indexOf(allies[index]), 1);
                    }; 
                    if (allies.length === 1) putAllyInHand(0); 
                    else {
                        addPlayerChoice("Add to hand:", () => {return allies.length;}, 1, () => {
                            for (let i = 0; i < allies.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; 
                                document.getElementsByClassName("choice")[i].onclick = () => {putAllyInHand(i)};
                            }
                        });
                    }
                }; 
                if (allies.length && canHeal(player)) {
                    addPlayerChoice(`Choose for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; 
                        document.getElementsByClassName("choice")[0].onclick = () => {player.health += 2;}; 
                        document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(allies); 
                        document.getElementsByClassName("choice")[1].onclick = drawAllyFromDiscard;
                    });
                } 
                else if (allies.length) drawAllyFromDiscard(); 
                else player.health += 2;
            });
        }, false);
        const dementor = new Villain("Dementor", "Game 3", "villain-creature", 8, 0, () => {players[0].health -= 2;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();}, false);
        const peterPettigrew = new Villain("Peter Pettigrew", "Game 3", "villain", 7, 0, () => {if (!players[0].draw.length) players[0].shuffle(); if (players[0].draw[0].cost) {const tempPetrified = players[0].petrified; players[0].petrified = false; players[0].cardsDrawn--; players[0].drawCards(1); players[0].forcedDiscardAt(players[0].hand.length - 1, true); players[0].petrified = tempPetrified; activeLocation.addToLocation();}}, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell";}); if (spells.length) {const discardToHand = index => {player.discard.splice(player.discard.indexOf(spells[index]), 1); player.addToHand(spells[index]);}; if (spells.length === 1) discardToHand(0); else {addPlayerChoice(`${player.hero} move from Discard to Hand:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});}}}); activeLocation.removeFromLocation();}, false);
        const bartyCrouchJr = new Villain("Barty Crouch Jr", "Game 4", "villain", 7, 0, () => {}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const deathEater1 = new Villain("Death Eater", "Game 4", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();}, true);
        const deathEater2 = new Villain("Death Eater", "Game 5", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();}, true);
        const doloresUmbridge = new Villain("Dolores Umbridge", "Game 5", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.influence++; player.health += 2;});}, true);
        const lordVoldemort1 = new Villain("Lord Voldemort", "Game 5", "villain", 10, 0, () => {players[0].health--; if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, true);};}});} else players[0].forcedDiscardAt(0, true);}}, () => {}, false);
        const bellatrixLestrange = new Villain("Bellatrix Lestrange", "Game 6", "villain", 9, 0, () => {}, () => {players.forEach(player => {const items = player.discard.filter(card => {return card.type === "item"}); if (items.length) {const discardToHand = index => {player.addToHand(items[index]); player.discard.splice(player.discard.indexOf(items[index]), 1);}; if (items.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const fenrirGreyback = new Villain("Fenrir Greyback", "Game 6", "villain", 8, 0, () => {}, () => {players.forEach(player => {player.health += 3;}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const lordVoldemort2 = new Villain("Lord Voldemort", "Game 6", "villain", 15, 0, () => {rollHouseDie(players[0],"green", true, false, false);}, () => {}, false);
        const lordVoldemort3 = new Villain("Lord Voldemort", "Game 7", "villain", 20, 0, () => {activeLocation.addToLocation();}, () => {}, false);
        let inactiveVillains = [crabbeAndGoyle, dracoMalfoy, quirinusQuirrell];
        if (activeGame !== "Game 1") {
            inactiveVillains.push(basilisk, luciusMalfoy, tomRiddle);
            if (activeGame !== "Game 2") {
                inactiveVillains.push(dementor, peterPettigrew);
                if (activeGame !== "Game 3") {
                    inactiveVillains.push(bartyCrouchJr, deathEater1);
                    if (activeGame !== "Game 4") {
                        inactiveVillains.push(deathEater2, doloresUmbridge);
                        if (activeGame !== "Game 5" && activeGame !== "Box 1") {
                            inactiveVillains.push(bellatrixLestrange, fenrirGreyback);
                        }
                    }
                }
            }
        }
        shuffle(inactiveVillains);

        // Box expansion villains
        const cornishPixies = new Villain("Cornish Pixies", "Box 1", "creature", 6, 0, () => {players[0].health -= players[0].hand.filter(card => {return card.cost && card.cost % 2 === 0;}).length * 2}, () => {players.forEach(player => {player.health += 2; player.influence++;});}, false);
        const fluffy = new Villain("Fluffy", "Box 1", "creature", 8, 0, () => {
            let items = players[0].hand.filter(card => {return card.type === "item";});
            const fluffyEffect = () => {
                addPlayerChoice("Lose:", () => {items = items.filter(card => {return players[0].hand.includes(card);}); if (items.length) return 2; return 0;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {players[0].health--; items.pop(); fluffyEffect();}; 
                    document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(players[0].hand); 
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        playerChoices.unshift(new PlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {
                            for (let i = 0; i < players[0].hand.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {
                                    if (items.includes(players[0].hand[i])) items.splice(items.indexOf(players[0].hand[i]), 1); 
                                    players[0].forcedDiscardAt(i, false); 
                                    items.pop();
                                    fluffyEffect();
                                };
                            }
                        }));
                    };
                });
            };
            fluffyEffect();
        }, () => {players.forEach(player => {player.health++; player.drawCards(1);});}, false);
        const norbert = new Villain("Norbert", "Box 1", "creature", 0, 6, () => {players[0].health -= 1 + players[0].hand.filter(card => {return card.name === "Detention";}).length;}, () => {players.forEach(player => {
            addPlayerChoice(`Banish for ${player.hero}:`, () => {return 2;}, 1, () => {
                document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(player.hand.concat(player.discard));
                document.getElementsByClassName("choice")[0].onclick = () => {
                    playerChoices.unshift(new PlayerChoice(`Banish for ${player.hero}:`, () => {return player.hand.concat(player.discard).length;}, 1, () => {
                        for (let i = 0; i < player.hand.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {player.banishAt(i)};
                        }
                        for (let i = 0; i < player.discard.length; i++) {
                            document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                            document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {player.discard.splice(player.discard.indexOf(player.discard[i]), 1)};
                        }
                    }));
                };
                document.getElementsByClassName("choice")[1].innerHTML = "<p>Nothing</p>"
            });
        });}, false);
        const troll = new Villain("Troll", "Box 1", "creature", 7, 0, () => {
            if (players[0].health) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<p>Lose:</p><div class="choiceContainer">${healthToken + healthToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {players[0].health -= 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<img src="./images/Box 1/detention.png"><p>Add to Discard</p>`;
                    document.getElementsByClassName("choice")[1].onclick = () => {players[0].discard.push(detention.clone());};
                });
            }
        }, () => {
            players.forEach(player => {
                player.health++;
                const handItems = player.hand.filter(card => {return card.type === "item"});
                const discardItems = player.discard.filter(card => {return card.type === "item"});
                if (handItems.length || discardItems.length) {
                    addPlayerChoice("Banish:", () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(handItems.concat(discardItems));
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            if (handItems.length + discardItems.length > 1) {
                                playerChoices.unshift(new PlayerChoice("Banish:", () => {return handItems.length + discardItems.length;}, 1, () => {
                                    for (let i = 0; i < handItems.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${handItems[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {player.banishAt(player.hand.indexOf(handItems[i]));};
                                    }
                                    for (let i = 0; i < discardItems.length; i++) {
                                        document.getElementsByClassName("choice")[handItems.length + i].innerHTML = `<img src="${discardItems[i].img.src}">`;
                                        document.getElementsByClassName("choice")[handItems.length + i].onclick = () => {player.discard.splice(player.discard.indexOf(discardItems[i]), 1);};
                                    }
                                }));
                            }
                            else if (handItems.length) player.banishAt(player.hand.indexOf(handItems[0]));
                            else player.discard.splice(player.discard.indexOf(discardItems[0]), 1);
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Nothing</p>"
                    });
                }
            });
        }, false);
        const boggart = new Villain("Boggart", "Box 2", "creature", 5, 3, () => {rollHouseDie(players[0],"phoenix", true, true, false);}, () => {rollHouseDie(players[0],"phoenix", false, true, false)}, false);
        const scabbers = new Villain("Scabbers", "Box 2", "villain-creature", 7, 0, () => {if (!players[0].draw.length) players[0].shuffle(); if (players[0].draw[0].cost) {const tempPetrified = players[0].petrified; players[0].petrified = false; players[0].cardsDrawn--; players[0].drawCards(1); players[0].forcedDiscardAt(players[0].hand.length - 1, true); players[0].petrified = tempPetrified; players[0].health -= 2;}}, () => {players.forEach(player => {const cheapCards = player.discard.filter(card => {return card.cost <= 3;}); if (cheapCards.length) {const discardToHand = index => {player.addToHand(cheapCards[index]); player.discard.splice(player.discard.indexOf(cheapCards[index]), 1);}; if (cheapCards.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return cheapCards.length;}, 1, () => {for (let i = 0; i < cheapCards.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${cheapCards[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation();}, false);
        const werewolf = new Villain("Werewolf", "Box 2", "creature", 5, 4, () => {}, () => {
            activeLocation.removeFromLocation();
            players.forEach(player => {
                if (canHeal(player)) {
                    addPlayerChoice(`Choose 1 for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`;
                        document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;};
                        document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`;
                        document.getElementsByClassName("choice")[1].onclick = () => {player.health += 2;};
                    });
                }
                else player.influence++;
            });
        }, true);
        const aragog = new Villain("Aragog", "Box 3", "creature", 8, 0, () => {players[0].health -= activeVillains.filter(villain => {return villain.type.includes("creature");}).length;}, () => {players.forEach(player => {player.health += 2; player.influence++;}); activeLocation.removeFromLocation();}, false);
        const centaur = new Villain("Centaur", "Box 3", "creature", 0, 7, () => {
            const spells = () => {return players[0].hand.filter(card => {return card.type === "spell";});};
            if (spells().length && players[0].health > 0) {
                addPlayerChoice("Lose:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {players[0].health -= 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard:</p>${choiceScroll(spells())}`;
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        if (spells().length > 1) {
                            playerChoices.unshift(new PlayerChoice("Discard:", () => {return spells().length;}, 1, () => {
                                for (let i = 0; i < spells().length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells()[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(players[0].hand.indexOf(spells()[i]), true);};
                                }
                            }));
                        }
                        else players[0].forcedDiscardAt(players[0].hand.indexOf(spells()[0]), true);
                    };
                });
            }
            else if (players[0].health > 0) players[0].health -= 2;
        }, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell"}); if (spells.length) {const discardToHand = index => {player.addToHand(spells[index]); player.discard.splice(player.discard.indexOf(spells[index]), 1);}; if (spells.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation();}, false);
        const grawp = new Villain("Grawp", "Box 3", "creature", 0, 8, () => {if (players[0].hand.length >= 6) players[0].health -= 2;}, () => {players.forEach(player => {
            if (!player.petrified) {
                player.drawCards(2);
                addPlayerChoice(`Discard for ${player.hero}:`, () => {return player.hand.length;}, 1, () => {
                    for (let i = 0; i < player.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, false);};
                    }
                });
            }
        });}, false);
        const ukrainianIronbelly = new Villain("Ukrainian Ironbelly", "Box 3", "creature", 8, 0, () => {if (players[0].hand.filter(card => {return card.type === "ally";}).length && players[0].hand.filter(card => {return card.type === "item";}).length) players[0].health -= 3;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();}, false);
        const chineseFireball = new Villain("Chinese Fireball", "Box 4", "creature", 0, 6, () => {}, () => {rollHouseDie(players[0],"phoenix", false, true, false); activeLocation.removeFromLocation();}, true);
        const commonWelshGreen = new Villain("Common Welsh Green", "Box 4", "creature", 8, 0, () => {}, () => {players.forEach(player => {player.influence += 2;});}, true);
        const grindylow = new Villain("Grindylow", "Box 4", "creature", 6, 0, () => {if (players[0].hand.filter(card => {return card.type === "ally";}).length >= 2) activeLocation.addToLocation();}, () => {activeLocation.removeFromLocation();}, false);
        const hungarianHorntail = new Villain("Hungarian Horntail", "Box 4", "creature", 10, 0, () => {}, () => {rollHouseDie(players[0],"phoenix", false, true, false); activeLocation.removeFromLocation();}, true);
        const lordVoldemort4 = new Villain("Lord Voldemort", "Box 4", "villain", 25, 7, () => {players[0].health -= 2; activeLocation.addToLocation();}, () => {}, false);
        const mermaid = new Villain("Mermaid", "Box 4", "creature", 0, 5, () => {}, () => {
            players.forEach(player => {
                const allies = player.discard.filter(card => {return card.type === "ally"}); 
                if (allies.length) {
                    const putAllyInHand = index => {
                        player.addToHand(allies[index]); 
                        player.discard.splice(player.discard.indexOf(allies[index]), 1);
                    }; 
                    if (allies.length === 1) putAllyInHand(0); 
                    else {
                        addPlayerChoice("Add to hand:", () => {return allies.length;}, 1, () => {
                            for (let i = 0; i < allies.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; 
                                document.getElementsByClassName("choice")[i].onclick = () => {putAllyInHand(i)};
                            }
                        });
                    }
                }
            });
            activeLocation.removeFromLocation();
        }, true);
        const swedishShortSnout = new Villain("Swedish Short-Snout", "Box 4", "creature", 0, 6, () => {
            let sides = ["influence", "draw", "attack", "health", "health", "health"];
            const result = sides[Math.floor(Math.random() * sides.length)];
            let arithmancyUsed = false;
            const arithmancyCheck = effect => {
                // check for Arithmancy
                if ((players[0].proficiency === "Arithmancy" || players[0].horcruxesDestroyed.includes(forbiddenForestEncounter)) && !arithmancyUsed) {
                    addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                        if (result === "influence") document.getElementsByClassName("choice")[0].innerHTML = influenceToken;
                        else if (result === "draw") document.getElementsByClassName("choice")[0].innerHTML = hogwartsCardBack;
                        else if (result === "attack") document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                        else if (result === "health") document.getElementsByClassName("choice")[0].innerHTML = healthToken;
                        document.getElementsByClassName("choice")[0].onclick = effect;
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Re-roll</p>";
                        document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie(players[0],"yellow", true, true, false);};
                    });
                }
                else effect();
            };
            if (result === "influence") arithmancyCheck(() => {activeVillains.filter(villain => {return villain.type.includes("creature");}).forEach(creature => {creature.influence++;})});
            else if (result === "draw") {arithmancyCheck(() => {players.forEach(player => {player.addToHand(detention.clone());});});}
            else if (result === "attack") arithmancyCheck(() => {players.forEach(player => {player.health--;});});
            else if (result === "health") {
                activeVillains.filter(villain => {return villain.type.includes("creature");}).forEach(creature => {
                    creature.health++;
                });
            }
        }, () => {rollHouseDie(players[0],"yellow", false, false, false); rollHouseDie(players[0],"phoenix", false, true, false);}, false);
        const box1Villains = [basilisk, cornishPixies, dementor, fluffy, norbert, troll];
        const box2Villains = [boggart, scabbers, werewolf];
        const box3Villains = [aragog, centaur, grawp, ukrainianIronbelly];
        const box4Villains = [chineseFireball, commonWelshGreen, grindylow, hungarianHorntail, mermaid, swedishShortSnout];

        // Pack expansion villains
        const corneliusFudge = new Villain("Cornelius Fudge", "Pack 1", "villain", 0, 7, () => {}, () => {players.forEach(player => {player.drawCards(1);});}, true);
        const marcusFlint = new Villain("Marcus Flint", "Pack 1", "villain", 6, 0, () => {
            const items = () => {return players[0].hand.filter(card => {return card.type === "item";});};
            if (items().length) {
                if (items().length > 1) {
                    addPlayerChoice("Discard:", () => {return items().length;}, 1, () => {
                        for (let i = 0; i < items().length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items()[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(players[0].hand.indexOf(items()[i]), true)};
                        }
                    });
                }
                else players[0].forcedDiscardAt(players[0].hand.indexOf(items()[0]), true);
            }
            else players[0].health -= 2;
        }, () => {
            players.forEach(player => {const items = player.discard.filter(card => {return card.type === "item"}); if (items.length) {const discardToHand = index => {player.addToHand(items[index]); player.discard.splice(player.discard.indexOf(items[index]), 1);}; if (items.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}});
        }, false);
        const pansyParkinson = new Villain("Pansy Parkinson", "Pack 1", "villain", 0, 5, () => {}, () => {players.forEach(player => {player.drawCards(1);}); activeLocation.removeFromLocation();}, true);
        const pack1Villains = [corneliusFudge, marcusFlint, pansyParkinson];
        const pack2Villains = [];
        const pack3Villains = [];
        const pack4Villains = [];

        // add Box or Pack villains to inactiveVilains
        switch (activeGame) {
            case "Box 1":
                inactiveVillains.splice(inactiveVillains.indexOf(basilisk), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(dementor), 1);
                inactiveVillains = inactiveVillains.slice(0, 5).concat(box1Villains);
                break;
            case "Box 2":
                inactiveVillains.splice(inactiveVillains.indexOf(peterPettigrew), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(fenrirGreyback), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains)).slice(0, 6).concat(box2Villains, [peterPettigrew, fenrirGreyback]);
                break;
            case "Box 3":
                inactiveVillains.splice(inactiveVillains.indexOf(doloresUmbridge), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains)).slice(0, 7).concat(box3Villains, [doloresUmbridge]);
                break;
            case "Box 4":
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains, box3Villains)).slice(0, 8).concat(box4Villains);
                break;
            case "Pack 1":
                inactiveVillains.splice(inactiveVillains.indexOf(dracoMalfoy), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(crabbeAndGoyle), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(luciusMalfoy), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(doloresUmbridge), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains, box3Villains, box4Villains)).slice(0, 4).concat(pack1Villains, [dracoMalfoy, crabbeAndGoyle, luciusMalfoy, doloresUmbridge]);
                break;
            case "Pack 2":
                inactiveVillains.splice(inactiveVillains.indexOf(doloresUmbridge), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(deathEater1), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(deathEater2), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(luciusMalfoy), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains, box3Villains, box4Villains, pack1Villains)).slice(0, 3).concat(pack2Villains, [doloresUmbridge, deathEater1, deathEater2, luciusMalfoy]);
                break;
            case "Pack 3":
                inactiveVillains.splice(inactiveVillains.indexOf(dracoMalfoy), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(luciusMalfoy), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(tomRiddle), 1);
                inactiveVillains.splice(inactiveVillains.indexOf(bellatrixLestrange), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains, box3Villains, box4Villains, pack1Villains, pack2Villains)).slice(0, 5).concat(pack3Villains, [dracoMalfoy, luciusMalfoy, tomRiddle, bellatrixLestrange]);
                break;
            case "Pack 4":
                inactiveVillains.splice(inactiveVillains.indexOf(bellatrixLestrange), 1);
                inactiveVillains = shuffle(inactiveVillains.concat(box1Villains, box2Villains, box3Villains, box4Villains, pack1Villains, pack2Villains, pack3Villains)).slice(0, 8).concat(pack4Villains, [bellatrixLestrange]);
        }
        shuffle(inactiveVillains);

        // add villains to game
        let activeVillains = [inactiveVillains.shift()];
        if (activeGame !== "Game 1" && activeGame !== "Game 2") {
            activeVillains.push(inactiveVillains.shift());
            if (activeGame !== "Game 3" && activeGame !== "Game 4") {
                activeVillains.push(inactiveVillains.shift());
            }
        }
        let defeatedVillains = [];

        // events (horcruxes)
        class Encounter {
            constructor(name, game, destroys, effect, reward) {
                this._name = name;
                this._img = document.createElement("IMG");
                this._img.id = name;
                this._img.className = "event";
                this._img.src = `./images/${game}/${src(name)}`;
                this._img.alt = name;
                this._destroys = destroys;
                this._remaining = [...destroys];
                this._effect = effect;
                this._reward = reward;
            }
            get img() {
                return this._img;
            }
            get destroys() {
                return this._destroys;
            }
            get remaining() {
                return this._remaining;
            }
            addSymbol(symbol) {
                if (this._destroys.includes(symbol)) {
                    if (this === horcrux1 || this === horcrux2) this._remaining = [];
                    else if (this.remaining.includes(symbol)) this._remaining.splice(this.remaining.indexOf(symbol), 1);

                    // add token img
                    const symbolImg = document.createElement("IMG");
                    symbolImg.className = "symbol";
                    symbolImg.src = `./images/${symbol}Symbol.png`;
                    let symbolIndex = this.destroys.indexOf(symbol);
                    let thatSymbolsInDestroys = this._destroys.filter(destroyer => {return destroyer === symbol;}).length;
                    if (thatSymbolsInDestroys > 1) {
                        let thatSymbolRemaining = this.remaining.filter(remainder => {return remainder === symbol;}).length;
                        while (thatSymbolsInDestroys - thatSymbolRemaining > 1) {
                            symbolIndex += this._destroys.slice(symbolIndex + 1).indexOf(symbol) + 1;
                            thatSymbolRemaining++;
                        }
                    }
                    symbolImg.style.left = `${this === horcrux6 || this === defensiveTraining || this === forbiddenForestEncounter || this === theThirdTask ? (5 + 13 * symbolIndex) : (6 + 20 * symbolIndex)}%`;
                    document.getElementById("encounters").appendChild(symbolImg);
                }
            }
            effect() {
                this._effect();
            }
            get reward() {
                return this._reward;
            }
        }
        const horcrux1 = new Encounter("Horcrux 1", "Game 7", ["health", "draw"], () => {}, () => {});
        const horcrux2 = new Encounter("Horcrux 2", "Game 7", ["attack", "influence"], () => {}, () => {if (players[0].hand.length >= 2 && (!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) && (activeLocation.number > 1 || activeLocation.added)) {if (players[0].hand.length > 2) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 2, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, false);};}});} else {players[0].forcedDiscardAt(0, false); players[0].forcedDiscardAt(0, false);} activeLocation.removeFromLocation(); horcrux2.img.onclick = () => {};}});
        const horcrux3 = new Encounter("Horcrux 3", "Game 7", ["attack", "health"], () => {}, () => {if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, false);};}});} else players[0].forcedDiscardAt(0, false); rollHouseDie(players[0],"green", false, false, false); horcrux3.img.onclick = () => {};}});
        const horcrux4 = new Encounter("Horcrux 4", "Game 7", ["health", "influence"], () => {activeVillains.forEach(villain => {villain.health++;});}, () => {if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, false);};}});} else players[0].forcedDiscardAt(0, false); rollHouseDie(players[0],"yellow", false, false, false); horcrux4.img.onclick = () => {};}});
        const horcrux5 = new Encounter("Horcrux 5", "Game 7", ["draw", "attack"], () => {if (players[0].hand.filter(card => {return card.type === "ally"}).length && players[0].hand.filter(card => {return card.type === "item"}).length && players[0].hand.filter(card => {return card.type === "spell"}).length) players[0].health -= 2;}, () => {if (players[0].hand.length) {if (players[0].hand.length > 1) {addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {for (let i = 0; i < players[0].hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(i, false);};}});} else players[0].forcedDiscardAt(0, false); rollHouseDie(players[0],"blue", false, false, false); horcrux5.img.onclick = () => {};}});
        const horcrux6 = new Encounter("Horcrux 6", "Game 7", ["attack", "draw", "health"], () => {players[0].health--;}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, 1000); players[0].removeDestroyedHorcrux(horcrux6);});
        const peskipiksiPesternomi = new Encounter("Peskipiksi Pesternomi", "Box 1", [], () => {}, () => {});
        const studentsOutOfBed = new Encounter("Students Out Of Bed", "Box 1", ["health", "draw"], () => {}, () => {
            players.forEach(player => {
                if (player.hand.length || player.discard.length) {
                    addPlayerChoice("Banish:", () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(player.hand.concat(player.discard));
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            if (player.hand.length + player.discard.length > 1) {
                                playerChoices.unshift(new PlayerChoice("Banish:", () => {return player.hand.length + player.discard.length;}, 1, () => {
                                    for (let i = 0; i < player.hand.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {player.banishAt(player.hand.indexOf(player.hand[i]));};
                                    }
                                    for (let i = 0; i < player.discard.length; i++) {
                                        document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                                        document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {player.discard.splice(player.discard.indexOf(player.discard[i]), 1);};
                                    }
                                }));
                            }
                            else if (player.hand.length) player.banishAt(player.hand.indexOf(player.hand[0]));
                            else player.discard.splice(player.discard.indexOf(player.discard[i]), 1);
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Nothing</p>"
                    });
                }
            });
            players[0].removeDestroyedHorcrux(studentsOutOfBed);
        });
        const thirdFloorCorridor = new Encounter("Third Floor Corridor", "Box 1", [], () => {}, () => {
            if (defeatedVillains.length) defeatedVillains[defeatedVillains.length - 1].reward();
            players[0].removeDestroyedHorcrux(thirdFloorCorridor);
        });
        const unregisteredAnimagus = new Encounter("Unregistered Animagus", "Box 2", [], () => {if (activeLocation.added >= 2) players[0].health--;}, () => {
            rollHouseDie(players[0],"phoenix", false, true, false); 
            rollHouseDie(players[0],"phoenix", false, true, false); 
            players[0].removeDestroyedHorcrux(unregisteredAnimagus);
        });
        const fullMoonRises = new Encounter("Full Moon Rises", "Box 2", [], () => {}, () => {
            players.forEach(player => {
                player.health += 3;
                const banishable = player.hand.concat(player.discard);
                if (banishable.length) {
                    addPlayerChoice(`Choose 1 for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `<p>Banish:</p>${choiceScroll(banishable)}`;
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            playerChoices.unshift(new PlayerChoice(`Banish for ${player.hero}:`, () => {return banishable.length;}, 1, () => {
                                for (let i = 0; i < player.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        player.banishAt(i);
                                        players[0].removeDestroyedHorcrux(fullMoonRises);
                                    };
                                }
                                for (let i = 0; i < player.discard.length; i++) {
                                    document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                                    document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {
                                        player.hand.unshift(player.discard.splice(i, 1)[0]);
                                        player.banishAt(0);
                                        players[0].removeDestroyedHorcrux(fullMoonRises);
                                    };
                                }
                            }));
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Nothing</p>";
                    });
                }
            });
        });
        const defensiveTraining = new Encounter("Defensive Training", "Box 2", ["attack", "attack", "attack"], () => {}, () => {
            players.forEach(player => {
                player.influence += 2;
                player.health += 2;
            });
            players[0].removeDestroyedHorcrux(defensiveTraining);
        });
        const forbiddenForestEncounter = new Encounter("Forbidden Forest", "Box 3", ["draw", "health", "influence"], () => {if (activeVillains.filter(villain => {return villain.type.includes("creature");}).length >= 2) players[0].health--;}, () => {});
        const filthyHalfBreed = new Encounter("Filthy Half-Breed", "Box 3", [], () => {if (activeShops.filter(card => {return card.type === "spell";}).length >= 2) players[0].health--;}, () => {
            if (players[0].hand.length) {
                players.forEach(player => {
                    player.drawCards(1);
                    addPlayerChoice("Banish:", () => {return player.hand.length + 1;}, 1, () => {
                        for (let i = 0; i < player.hand.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {player.banishAt(i);};
                        }
                        document.getElementsByClassName("choice")[player.hand.length].innerHTML = "<p>Nothing</p>";
                    });
                });
                players[0].removeDestroyedHorcrux(filthyHalfBreed);
            }
        });
        const escape = new Encounter("Escape", "Box 3", [], () => {}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000); players[0].removeDestroyedHorcrux(escape);});
        const theFirstTask = new Encounter("The First Task", "Box 4", [], () => {}, () => {
            let dieOptions = ["blue", "green", "red", "yellow"];
            addPlayerChoice("Roll 2 House Die:", () => {return dieOptions.length;}, 2, () => {
                let choiceIndex = 0;
                if (dieOptions.includes("blue")) {
                    document.getElementsByClassName("choice")[choiceIndex].innerHTML = blueDie; 
                    document.getElementsByClassName("choice")[choiceIndex].onclick = () => {rollHouseDie(players[0],"blue", false, false, false); dieOptions.splice(dieOptions.indexOf("blue"), 1);}; 
                    choiceIndex++;
                }
                if (dieOptions.includes("green")) {
                    document.getElementsByClassName("choice")[choiceIndex].innerHTML = greenDie; 
                    document.getElementsByClassName("choice")[choiceIndex].onclick = () => {rollHouseDie(players[0],"green", false, false, false); dieOptions.splice(dieOptions.indexOf("green"), 1);}; 
                    choiceIndex++;
                }
                if (dieOptions.includes("red")) {
                    document.getElementsByClassName("choice")[choiceIndex].innerHTML = redDie; 
                    document.getElementsByClassName("choice")[choiceIndex].onclick = () => {rollHouseDie(players[0],"red", false, false, false); dieOptions.splice(dieOptions.indexOf("red"), 1);}; 
                    choiceIndex++;
                }
                if (dieOptions.includes("yellow")) {
                    document.getElementsByClassName("choice")[choiceIndex].innerHTML = yellowDie; 
                    document.getElementsByClassName("choice")[choiceIndex].onclick = () => {rollHouseDie(players[0],"yellow", false, false, false); dieOptions.splice(dieOptions.indexOf("yellow"), 1);};
                }
            });
            players[0].removeDestroyedHorcrux(theFirstTask);
        });
        const theSecondTask = new Encounter("The Second Task", "Box 4", [], () => {if (!players[0].hand.filter(card => {return card.type === "ally"}).length) activeLocation.addToLocation();}, () => {
            activeLocation.removeFromLocation(); 
            players.forEach(player => {player.drawCards(1);}); 
            players[0].removeDestroyedHorcrux(theSecondTask);
        });
        const theThirdTask = new Encounter("The Third Task", "Box 4", ["health", "health", "health"], () => {players[0].health -= 2;}, () => {
            if (canHeal(players[0])) {
                players.forEach(player => {player.health = 10;}); 
                players[0].removeDestroyedHorcrux(theThirdTask);
            }
        });
        const sneakingInTheHalls = new Encounter("Sneaking In The Halls", "Pack 1", [], () => {if (players[0].hand.filter(card => {return card.type === "item";}).length >= 3) activeLocation.addToLocation();}, () => {
            players.forEach(player => {
                const banishable = player.hand.concat(player.discard);
                if (banishable.length) {
                    addPlayerChoice(`Choose 1 for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `<p>Banish:</p>${choiceScroll(banishable)}`;
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            playerChoices.unshift(new PlayerChoice(`Banish for ${player.hero}:`, () => {return banishable.length;}, 1, () => {
                                for (let i = 0; i < player.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        player.banishAt(i);
                                        players[0].removeDestroyedHorcrux(sneakingInTheHalls);
                                    };
                                }
                                for (let i = 0; i < player.discard.length; i++) {
                                    document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                                    document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {
                                        player.hand.unshift(player.discard.splice(i, 1)[0]);
                                        player.banishAt(0);
                                        players[0].removeDestroyedHorcrux(sneakingInTheHalls);
                                    };
                                }
                            }));
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Nothing</p>";
                    });
                }
            });
        });
        const theMinistryIsMeddling = new Encounter("The Ministry Is Meddling", "Pack 1", [], () => {
            if (players[0].attack || players[0].influence) {
                players[0].attack = 0;
                players[0].influence = 0;
                players[0].health -= 2;
            }
        }, () => {
            players.forEach(player => {player.influence++;});
            activeLocation.removeFromLocation();
            players[0].removeDestroyedHorcrux(theMinistryIsMeddling);
        });
        const detentionWithDolores = new Encounter("Detention With Dolores", "Pack 1", [], () => {if (players[0].hand.map(card => {return card.cost;}).filter(cost => {return cost >= 4;})) activeLocation.addToLocation();}, () => {
            players.forEach(player => {player.influence += 2;});
            players[0].removeDestroyedHorcrux(detentionWithDolores);
        });
        let encounters = [];
        switch (activeGame) {
            case "Game 7": encounters = [horcrux1, horcrux2, horcrux3, horcrux4, horcrux5, horcrux6];
                break;
            case "Box 1": encounters = [peskipiksiPesternomi, studentsOutOfBed, thirdFloorCorridor];
                break;
            case "Box 2": encounters = [unregisteredAnimagus, fullMoonRises, defensiveTraining];
                break;
            case "Box 3": encounters = [forbiddenForestEncounter, filthyHalfBreed, escape];
                break;
            case "Box 4": encounters = [theFirstTask, theSecondTask, theThirdTask];
                break;
            case "Pack 1": encounters = [sneakingInTheHalls, theMinistryIsMeddling, detentionWithDolores];
                break;
        }

        // display game
        document.getElementsByTagName("MAIN")[0].innerHTML = `<div id="gameBoardContainer">
            <img id="gameBoard" src="./images/board.png" alt="game board">
            <div id="locations"></div>
            <div id="darkArtsEvents">
                <img id="darkArtsEventBack" src="./images/darkArtsEventBack.png" alt="Back of Dark Arts Event card">
            </div>
            <div id="villainDraw">
                <img class="villain" src="./images/villainBack.png" alt="Back of villain card">
            </div>
            <div id="encounters"></div>
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
        ${activeGame.includes("Pack") && activeGame !== "Pack 1" ? `<div id="potionsBoardContainer">
            <img src=\"./images/Pack 2/potionListA.png\" id=\"potionsBoard\" alt=\"Potions Board\">
        </div>` : ""}
        <div id="playersContainer"></div>`;
        const disableScreen = document.createElement("DIV");
        disableScreen.id = "disableScreen";
        document.getElementsByTagName("MAIN")[0].appendChild(disableScreen);

        // add locations and events to board
        locations.toReversed().forEach(location => {document.getElementById("locations").appendChild(location.img);});
        if (encounters.length) document.getElementById("encounters").appendChild(encounters[0].img);

        // Hogwarts Castle special
        if (hogwartsCastle.img) {
            hogwartsCastle.img.onclick = () => {
                if (players[0].attack >= 5 && !document.getElementById("playerChoice")) {
                    hogwartsCastle.removeFromLocation();
                    players[0].attack -= 5;
                }
            };
        }

        // display Dark Arts Events when clicked
        document.getElementById("darkArtsEvents").onclick = () => {
            if (activeDarkArtsEvents.length > 1) {
                document.getElementById("darkArtsEvents").classList.toggle("display");
                activeDarkArtsEvents.forEach(dae => {dae.img.classList.toggle("display");});
            }
        };

        const populateVillains = () => {
            // remove villains and villain damage from board
            for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
                document.getElementsByClassName("activeVillain")[i].innerHTML = "";
                document.getElementsByClassName("villainDamage")[i].innerHTML = "";
                document.getElementsByClassName("villainDamage")[i].onclick = () => {};
            }

            // add villains to board
            document.getElementById("villain1").appendChild(activeVillains[0].img);
            if (activeVillains.length > 1) document.getElementById("villain2").appendChild(activeVillains[1].img);
            if (activeVillains.length > 2) document.getElementById("villain3").appendChild(activeVillains[2].img);

            // repetrify villains
            activeVillains.forEach(villain => {villain.petrifiedBy = villain.petrifiedBy});

            // deal damage by clicking on a villain or villain's damage area
            for (let i = 0; i < activeVillains.length; i++) {
                activeVillains[i].displayDamage();
                const dealDamage = () => {
                    if ((!activeDarkArtsEvents.includes(tarantallegra) || !activeVillains[i].attackDamageTaken) && // Tarantallegra effect
                    (activeVillains[i].name !== "Lord Voldemort" || !encounters.length)) {
                        const damageWithAttack = () => {
                            players[0].attack--;
                            activeVillains[i].health--;
                            players[0].attacks++;
                        };
                        const damageWithInfluence = () => {
                            players[0].influence--;
                            activeVillains[i].influence--;
                            players[0].influences++;
                        };
                        if (players[0].attack > 0 && players[0].influence > 0 && activeVillains[i].health && activeVillains[i].influence &&
                        (!activeVillains.includes(hungarianHorntail) || activeVillains[i] === hungarianHorntail || hungarianHorntail.petrifiedBy || hungarianHorntail.health <= 0) && // Hungarian Horntail effect
                        (!activeVillains[i].influenceDamageTaken || (activeVillains[i].influenceDamageTaken < 2 && players[0].passives.includes(dragonsBlood)))) { // Dragon's Blood passive
                            addPlayerChoice("Damage with:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                                document.getElementsByClassName("choice")[0].onclick = damageWithAttack;
                                document.getElementsByClassName("choice")[1].innerHTML = influenceToken;
                                document.getElementsByClassName("choice")[1].onclick = damageWithInfluence;
                            });
                        }
                        else if (players[0].attack > 0 && activeVillains[i].health &&
                        (!activeVillains.includes(hungarianHorntail) || activeVillains[i] === hungarianHorntail || hungarianHorntail.petrifiedBy || hungarianHorntail.health <= 0)) { // Hungarian Horntail effect
                            damageWithAttack();
                        }
                        else if (players[0].influence > 0 && activeVillains[i].influence && (!activeVillains[i].influenceDamageTaken || (activeVillains[i].influenceDamageTaken < 2 && players[0].passives.includes(dragonsBlood)))) {
                            damageWithInfluence();
                        }
                    }
                }
                document.getElementsByClassName("activeVillain")[i].onclick = () => {if (!document.getElementById("playerChoice")) dealDamage();};
                document.getElementsByClassName("villainDamage")[i].onclick = () => {if (!document.getElementById("playerChoice")) dealDamage();};
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

        // populate players
        const populatePlayers = () => {
            document.getElementById("playersContainer").innerHTML = "";
            for (let i = 0; i < players.length; i++) {
                document.getElementById("playersContainer").innerHTML += `<div class="playerContainer">
                    <div class="heroImage" style="display: flex"></div>
                    <div class="horcruxesDestroyed"></div>
                    <div class="charm"></div>
                    <div class="playerBoardContainer">
                        <img class="playerBoard" src="./images/playerBoard.png" alt="player board">
                        <img class="healthTracker" src="./images/healthTracker.png" alt="health tracker">
                        <div class="attackTokens"></div>
                        <div class="influenceTokens"></div>
                    </div>
                    <div class="playerHand"></div>
                </div>
                ${i ? "" : "<input type=\"button\" id=\"endTurn\" value=\"End Turn\">"}`;
                document.getElementsByClassName("heroImage")[i].appendChild(players[i].heroImage);
                document.getElementsByClassName("heroImage")[i].appendChild(players[i].proficiencyImage);
                players[i].horcruxesDestroyed.forEach(encounter => {
                    document.getElementsByClassName("horcruxesDestroyed")[i].appendChild(encounter.img);
                });
                document.getElementsByClassName("charm")[i].appendChild(players[i].charmImage);
            }

            // Packs 2-4 styling
            if (activeGame.includes("Pack") && activeGame !== "Pack 1") {
                const main = document.getElementsByTagName("MAIN")[0];
                main.style.overflowY = "auto";
                main.style.height = "auto";
                main.style.flexWrap = "wrap";
                const gameBoardContainerWidth = "75.1%";
                document.getElementById("gameBoardContainer").style.width = gameBoardContainerWidth;
                document.getElementById("potionsBoardContainer").style.width = `calc(100% - ${gameBoardContainerWidth})`;
                const playersContainer = document.getElementById("playersContainer");
                const reorientPlayersContainer = () => {
                    if (window.matchMedia("(orientation: portrait)").matches) {
                        playersContainer.style.gridTemplateColumns = "auto";
                    }
                    else {
                        playersContainer.style.gridTemplateColumns = `repeat(${players.length + 1}, auto)`;
                    }
                }
                reorientPlayersContainer();
                window.onresize = reorientPlayersContainer;
            }

            // end turn
            document.getElementById("endTurn").onclick = () => {
                if (!document.getElementById("playerChoice")) {
                    // unstun and unpetrify players
                    players.forEach(player => {
                        player.petrified = false;
                        if (player.stunned) {
                            player.stunned = false;
                            player._health = 10;
                        }
                    });

                    // player resets for next turn
                    players[0].endTurn();
                    activeLocation.removed = false;

                    // reset activeDarkArtsEvents
                    while (activeDarkArtsEvents.length) {
                        inactiveDarkArtsEvents.push(activeDarkArtsEvents.shift());
                        document.getElementsByClassName("darkArtsEvent")[0].classList.toggle("fadeOut");
                        setTimeout(() => {document.getElementsByClassName("darkArtsEvent")[0].remove();}, 1000);
                    };
                    if (document.getElementById("darkArtsEvents").classList.contains("display")) {
                        document.getElementById("darkArtsEvents").classList.toggle("display");
                    }

                    // replace with new villain
                    for (let i = 0; i < activeVillains.length; i++) {
                        activeVillains[i].activated = false;
                        if (activeVillains[i].health <= 0 && activeVillains[i].influence <= 0) {
                            // add new villain
                            if (inactiveVillains.length) {
                                // add new villain
                                activeVillains[i] = inactiveVillains.shift();
                                document.getElementsByClassName("activeVillain")[i].appendChild(activeVillains[i].img);
                                
                                // Death Eater effect
                                if (activeVillains[i].type.includes("villain")) {
                                    if (activeVillains[i] !== deathEater1 && activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy && deathEater1.health > 0) players.forEach(player => {player.health--;});
                                    if (activeVillains[i] !== deathEater2 && activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy && deathEater2.health > 0) players.forEach(player => {player.health--;});
                                    if (activeVillains[i] !== corneliusFudge && activeVillains.includes(corneliusFudge) && !corneliusFudge.petrifiedBy && corneliusFudge.health > 0) players.forEach(player => {player.draw.splice(0, 1);});
                                }
                                // Common Welsh Green effect
                                if (activeVillains[i] !== commonWelshGreen && activeVillains[i].type.includes("creature") && activeVillains.includes(commonWelshGreen) && !commonWelshGreen.petrifiedBy && commonWelshGreen.health > 0) players.forEach(player => {player.health -= 2;});


                                // remove villain card back and add Lord Voldemort
                                if (!inactiveVillains.length) {
                                    document.getElementById("villainDraw").innerHTML = "";
                                    if ((activeGame === "Game 5" || activeGame === "Box 1") && activeVillains[0] !== lordVoldemort1) {
                                        document.getElementById("villainDraw").appendChild(lordVoldemort1.img);
                                    }
                                    else if ((activeGame === "Game 6" || activeGame === "Box 2") && activeVillains[0] !== lordVoldemort2) {
                                        document.getElementById("villainDraw").appendChild(lordVoldemort2.img);
                                    }
                                    else if ((activeGame === "Game 7" || activeGame === "Box 3") && activeVillains[0] !== lordVoldemort3) {
                                        document.getElementById("villainDraw").appendChild(lordVoldemort3.img);
                                    }
                                    else if (activeGame === "Box 4" && activeVillains[0] !== lordVoldemort4) {
                                        document.getElementById("villainDraw").appendChild(lordVoldemort4.img);
                                    }
                                }
                            }
                            // shift remaining villains to the left
                            else {
                                activeVillains.splice(i, 1)[0];
                                i--;
                            }
                            populateVillains();
                        }
                    }

                    // Permanent Sticking Charm activates before starting the next turn
                    if (players[0].charm === "Permanent Sticking" && players[0].health < 4) {
                        const remainingPlayers = players.filter(player => {return player !== players[0]});
                        addPlayerChoice(`Give ${players[0].attack} attacks and ${players[0].influence} influence to:`, () => {return remainingPlayers.length;}, 1, () => {
                            for (let i = 0; i < remainingPlayers.length; i++) {
                                document.getElementsByClassName("choice")[i].appendChild(remainingPlayers[i].heroImage.cloneNode());
                                document.getElementsByClassName("choice")[i].innerHTML += `<p>Attacks: ${remainingPlayers[i].attack}</p><p>Influence: ${remainingPlayers[i].influence}</p>`;
                                document.getElementsByClassName("choice")[i].onclick = () => {
                                    remainingPlayers[i].attack += players[0].attack;
                                    players[0].attack = 0;
                                    remainingPlayers[i].influence += players[0].influence;
                                    players[0].influence = 0;
                                    startTurn();
                                };
                            }
                        });
                    }
                    else startTurn();
                }
            }
        };
        populatePlayers();

        // start a new turn
        let firstTurn = true;
        const startTurn = () => {
            // disable all events
            disableScreen.style.display = "block";
            let root = document.querySelector(":root");
            root.style.setProperty("--playerChoiceDisplay", "none");
            root.style.setProperty("--revealBoardDisplay", "none");

            // new active player
            if (firstTurn) {
                players.forEach(player => {player.drawCards(5);});
                firstTurn = false;
            }
            else players.push(players.shift());
            populatePlayers();
            players[0].hand.forEach(card => {card.generateOnClick();});

            players.forEach(player => {
                // populate players' resources
                player.populateHand();
                player.health = player.health;
                player.attack = player.attack;
                player.influence = player.influence;
                
                // unstun everyone
                if (player.stunned) {
                    player.stunned = false;
                    player.health = 10;
                }
            });

            // Charms proficiency
            if (players[0].proficiency === "Charms" && !players[0].petrified) {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        let spells = players[0].hand.filter(card => {return card.type === "spell";});
                        if (spells.length >= 2) {
                            if (spells.length > 2) {
                                addPlayerChoice("Discard:", () => {spells = spells.filter(spell => {return players[0].hand.includes(spell);}); return spells.length;}, 2, () => {
                                    for (let i = 0; i < spells.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(players[0].hand.indexOf(spells[i]), false)};
                                    }
                                });
                            }
                            else spells.forEach(spell => {players[0].forcedDiscardAt(players[0].hand.indexOf(spell), false);});
                            players.forEach(player => {player.influence++; player.drawCards(1);});
                        }
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                };
            }
            // Flying Lessons proficiency
            else if (players[0].proficiency === "Flying Lessons") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (players[0].influence >= 5 && !document.getElementById("playerChoice")) {
                        players[0].influence -= 5;
                        activeLocation.removeFromLocation();
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                }
            }
            // Transfiguration proficiency
            else if (players[0].proficiency === "Transfiguration") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        const items = players[0].hand.filter(card => {return card.type === "item";});
                        if (items.length) {
                            const transfigure = itemIndex => {
                                players[0].shuffle();
                                const cheapos = players[0].draw.filter(card => {return card.cost <= 5;});
                                if (cheapos.length) {
                                    const drawCheapo = cheapoIndex => {
                                        const drawIndex = players[0].draw.indexOf(cheapos[cheapoIndex]);
                                        const tempCard = players[0].draw[drawIndex];
                                        players[0].draw[drawIndex] = players[0].draw[0];
                                        players[0].draw[0] = tempCard;
                                        players[0].addToHand(players[0].draw.shift());
                                        players[0].forcedDiscardAt(players[0].hand.indexOf(items[itemIndex]), false);
                                        players[0].shuffle();
                                    };
                                    if (cheapos.length > 1) {
                                        addPlayerChoice("Add to hand:", () => {return cheapos.length;}, 1, () => {
                                            for (let i = 0; i < cheapos.length; i++) {
                                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${cheapos[i].img.src}">`;
                                                document.getElementsByClassName("choice")[i].onclick = () => {drawCheapo(i);};
                                            }
                                        });
                                    }
                                    else drawCheapo(0);
                                }
                            };
                            if (items.length > 1) {
                                addPlayerChoice("Discard:", () => {return items.length;}, 1, () => {
                                    for (let i = 0; i < items.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {transfigure(i)};
                                    }
                                });
                            }
                            else transfigure(0);
                            document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                        }
                    }
                };
            }
            // Otter Patronus
            else if (players[0].proficiency === "Otter Patronus") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (players[0].influence >= 1 && !document.getElementById("playerChoice")) {
                        players[0].influence--;
                        if (!players[0].draw.length) players[0].shuffle();
                        if (players[0].draw[0].type === "spell") {
                            players[0].drawCards(1);
                            players[0].attack++;
                        }
                        else addPlayerChoice("Top card:", () => {return 1;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${players[0].draw[0].img.src}">`;});
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                }
            }
            // Rabbit Patronus
            else if (players[0].proficiency === "Rabbit Patronus") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    const spells = players[0].hand.filter(card => {return card.type === "spell";});
                    if (spells.length && !document.getElementById("playerChoice")) {
                        if (spells.length > 1) {
                            addPlayerChoice("Discard:", () => {return spells.length;}, 1, () => {
                                for (let i = 0; i < spells.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {players[0].forcedDiscardAt(players[0].hand.indexOf(spells[i]), false);};
                                }
                            });
                        }
                        else players[0].forcedDiscardAt(players[0].hand.indexOf(spells[0]), false);
                        rollHouseDie(players[0],"blue", false, false, false);
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                }
            }
            // Terrier Patronus
            else if (players[0].proficiency === "Terrier Patronus") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (players[0].attack >= 1 && !document.getElementById("playerChoice")) {
                        players[0].attack--;
                        rollHouseDie(players[0],"red", false, false, false);
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                }
            }
            // Horse Patronus
            else if (players[0].proficiency === "Horse Patronus") {
                document.getElementsByClassName("playerProficiency")[0].onclick = () => {
                    if (players[0].attack >= 1 && players.filter(player => {return !player.petrified;}).length && !document.getElementById("playerChoice")) {
                        players[0].attack--;
                        players.forEach(player => {player.drawCards(1);});
                        document.getElementsByClassName("playerProficiency")[0].onclick = () => {};
                    }
                }
            }

            // Defensive Charm
            if (players[0].charm === "Defensive") {
                document.getElementsByClassName("playerCharm")[0].onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        if (players[0].health > 7) {
                            const hurtVillains = activeVillains.filter(villain => {return villain.health < villain.maxHealth});
                            const hurtableVillains = activeVillains.filter(villain => {return villain.health > 0;});
                            if (hurtVillains.length && hurtableVillains.length && (hurtVillains.length > 1 || hurtableVillains.length > 1 || hurtVillains[0] !== hurtableVillains[0])) {
                                addPlayerChoice("Remove attack from:", () => {return hurtVillains.length + 1;}, 1, () => {
                                    for (let i = 0; i < hurtVillains.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${hurtVillains[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {
                                            if (hurtableVillains.includes(hurtVillains[i])) hurtableVillains.splice(hurtableVillains.indexOf(hurtVillains[i]), 1);
                                            playerChoices.unshift(new PlayerChoice("Add attack to:", () => {return hurtableVillains.length + 1;}, 1, () => {
                                                for (let j = 0; j < hurtableVillains.length; j++) {
                                                    document.getElementsByClassName("choice")[j].innerHTML = `<img src="${hurtableVillains[j].img.src}">`;
                                                    document.getElementsByClassName("choice")[j].onclick = () => {
                                                        hurtVillains[i].health++;
                                                        hurtableVillains[j].health--;
                                                        document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                                                    };
                                                }
                                                document.getElementsByClassName("choice")[hurtableVillains.length].innerHTML = "<p>Nevermind</p>";
                                            }));
                                        };
                                    }
                                    document.getElementsByClassName("choice")[hurtVillains.length].innerHTML = "<p>Nevermind</p>";
                                });
                            }
                        }
                        else if (players[0].health < 4) {
                            if (players[0].hand.length) {
                                if (players[0].hand.length > 1) {
                                    addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {
                                        for (let i = 0; i < players[0].hand.length; i++) {
                                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`;
                                            document.getElementsByClassName("choice")[i].onclick = () => {
                                                players[0].forcedDiscardAt(i, false);
                                                rollHouseDie(players[0], "green", false, false, false);
                                                        document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                                            };
                                        }
                                    });
                                }
                                else {
                                    players[0].forcedDiscardAt(0, false);
                                    rollHouseDie(players[0], "green", false, false, false);
                                    document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                                }
                            }
                        }
                        else {
                            if (!darkArtsEvents.length) {
                                shuffle(inactiveDarkArtsEvents); 
                                while (inactiveDarkArtsEvents.length) darkArtsEvents.push(inactiveDarkArtsEvents.shift());
                            } 
                            addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Keep</p>`; 
                                document.getElementsByClassName("choice")[1].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Banish</p>`; 
                                document.getElementsByClassName("choice")[1].onclick = () => {
                                    darkArtsEvents.splice(0, 1);
                                    document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                                };
                            });
                        }
                    }
                }
            }
            // Hover Charm
            else if (players[0].charm === "Hover") {
                document.getElementsByClassName("playerCharm")[0].onclick = () => {
                    if (players[0].hand.length && !document.getElementById("playerChoice")) {
                        const hoverCharmEffect = () => {
                            if (players[0].health > 7) players[0].influence += 2;
                            else if (players[0].health < 4) {
                                players[0].attack++;
                                const banishable = players.filter(player => {return player.discard.length;});
                                playerChoices.unshift(new PlayerChoice("Banish from:", () => {return banishable.length + 1;}, 1, () => {
                                    for (let i = 0; i < banishable.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = choiceScroll(banishable[i].discard);
                                        document.getElementsByClassName("choice")[i].onclick = () => {
                                            if (banishable[i].discard.length > 1) {
                                                playerChoices.unshift(new PlayerChoice("Banish:", () => {return banishable[i].discard.length;}, 1, () => {
                                                    for (let j = 0; j < banishable[i].discard.length; j++) {
                                                        document.getElementsByClassName("choice")[j].innerHTML = `<img src="${banishable[i].discard[j].img.src}">`;
                                                        document.getElementsByClassName("choice")[j].onclick = () => {
                                                            banishable[i].hand.unshift(banishable[i].discard.splice(i, 1)[0]);
                                                            banishable[i].banishAt(0);
                                                        };
                                                    }
                                                }));
                                            }
                                            else {
                                                banishable[i].hand.unshift(banishable[i].discard.splice(0, 1)[0]);
                                                banishable[i].banishAt(0);
                                            }
                                        };
                                    }
                                    document.getElementsByClassName("choice")[banishable.length].innerHTML = "<p>None</p>";
                                }));
                            }
                            else players[0].drawCards(1);
                        };
                        if (players[0].hand.length > 1) {
                            addPlayerChoice("Discard:", () => {return players[0].hand.length;}, 1, () => {
                                for (let i = 0; i < players[0].hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        players[0].forcedDiscardAt(i, false);
                                        hoverCharmEffect();
                                    };
                                }
                            });
                        }
                        else {
                            players[0].forcedDiscardAt(0, false);
                            hoverCharmEffect();
                        }
                        document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                    }
                }
            }
            // Memory Charm
            else if (players[0].charm === "Memory") {
                document.getElementsByClassName("playerCharm")[0].onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        const cheapCards = players[0].hand.filter(card => {return !card.cost || (card.cost <= 3 && players[0].health < 8) || (card.cost <= 5 && players[0].health < 4);});
                        if (cheapCards.length) {
                            const memoryCloneAt = index => {
                                const cardClone = cheapCards[index].clone();
                                players[0].addToHand(cardClone);
                                cardClone.img.onclick += () => {players[0].discard.splice(players[0].discard.indexOf(cardClone), 1);};
                            };
                            if (cheapCards.length > 1) {
                                addPlayerChoice("Clone:", () => {return cheapCards.length;}, 1, () => {
                                    for (let i = 0; i < cheapCards.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${cheapCards[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {memoryCloneAt(i);};
                                    }
                                });
                            }
                            else memoryCloneAt(0);
                            document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                        }
                    }
                }
            }
            // Undetectable Extension Charm
            else if (players[0].charm === "Undetectable Extension") {
                document.getElementsByClassName("playerCharm")[0].onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        if (!players[0].draw.length) players[0].shuffle();
                        if (players[0].health < 8 && players[0].health > 3 && players[0].draw[0].cost) players[0].drawCards(1);
                        else {
                            addPlayerChoice("Top card:", () => {return 1;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<img src="${players[0].draw[0].img.src}">`;
                                document.getElementsByClassName("choice")[0].onclick = () => {
                                    if (players[0].health > 7 && !players[0].draw[0].cost) players[0].influence += 2;
                                    else if (players[0].health < 4 && players[0].draw[0].cost) rollHouseDie(players[0], "blue", false, false, false);
                                };
                            });
                        }
                        document.getElementsByClassName("playerCharm")[0].onclick = () => {};
                    }
                };
            }

            // horcrux rewards
            if (activeGame === "Game 7") {
                if (players[0].horcruxesDestroyed.includes(horcrux2)) document.getElementById(horcrux2.img.id).onclick = () => {if (!document.getElementById("playerChoice")) horcrux2.reward();};
                if (players[0].horcruxesDestroyed.includes(horcrux3)) document.getElementById(horcrux3.img.id).onclick = () => {if (!document.getElementById("playerChoice")) horcrux3.reward();};
                if (players[0].horcruxesDestroyed.includes(horcrux4)) document.getElementById(horcrux4.img.id).onclick = () => {if (!document.getElementById("playerChoice")) horcrux4.reward();};
                if (players[0].horcruxesDestroyed.includes(horcrux5)) document.getElementById(horcrux5.img.id).onclick = () => {if (!document.getElementById("playerChoice")) horcrux5.reward();};
                if (players[0].horcruxesDestroyed.includes(horcrux6)) document.getElementById(horcrux6.img.id).onclick = () => {if (!document.getElementById("playerChoice")) horcrux6.reward();};
            }
            // encounter rewards
            if (activeGame === "Box 1") {
                if (players[0].horcruxesDestroyed.includes(studentsOutOfBed)) document.getElementById(studentsOutOfBed.img.id).onclick = () => {if (!document.getElementById("playerChoice")) studentsOutOfBed.reward();};
                if (players[0].horcruxesDestroyed.includes(thirdFloorCorridor)) document.getElementById(thirdFloorCorridor.img.id).onclick = () => {if (!document.getElementById("playerChoice")) thirdFloorCorridor.reward();};
            }
            else if (activeGame === "Box 2") {
                if (players[0].horcruxesDestroyed.includes(unregisteredAnimagus)) document.getElementById(unregisteredAnimagus.img.id).onclick = () => {if (!document.getElementById("playerChoice")) unregisteredAnimagus.reward();};
                if (players[0].horcruxesDestroyed.includes(fullMoonRises)) document.getElementById(fullMoonRises.img.id).onclick = () => {if (!document.getElementById("playerChoice")) fullMoonRises.reward();};
                if (players[0].horcruxesDestroyed.includes(defensiveTraining)) document.getElementById(defensiveTraining.img.id).onclick = () => {if (!document.getElementById("playerChoice")) defensiveTraining.reward();};
            }
            else if (activeGame === "Box 3") {
                if (players[0].horcruxesDestroyed.includes(forbiddenForestEncounter)) document.getElementById(forbiddenForestEncounter.img.id).onclick = () => {if (!document.getElementById("playerChoice")) forbiddenForestEncounter.reward();};
                if (players[0].horcruxesDestroyed.includes(filthyHalfBreed)) document.getElementById(filthyHalfBreed.img.id).onclick = () => {if (!document.getElementById("playerChoice")) filthyHalfBreed.reward();};
                if (players[0].horcruxesDestroyed.includes(escape)) document.getElementById(escape.img.id).onclick = () => {if (!document.getElementById("playerChoice")) escape.reward();};
            }
            else if (activeGame === "Box 4") {
                if (players[0].horcruxesDestroyed.includes(theFirstTask)) document.getElementById(theFirstTask.img.id).onclick = () => {if (!document.getElementById("playerChoice")) theFirstTask.reward();};
                if (players[0].horcruxesDestroyed.includes(theSecondTask)) document.getElementById(theSecondTask.img.id).onclick = () => {if (!document.getElementById("playerChoice")) theSecondTask.reward();};
                if (players[0].horcruxesDestroyed.includes(theThirdTask)) document.getElementById(theThirdTask.img.id).onclick = () => {if (!document.getElementById("playerChoice")) theThirdTask.reward();};
            }

            const darkArts = protean => {
                // update activeDarkArtsEvents
                let daeDraws = activeLocation.darkArtsEventDraws;
                if (activeVillains.includes(bellatrixLestrange) && !bellatrixLestrange.petrifiedBy && bellatrixLestrange.health > 0) daeDraws++; // Bellatrix adds 1 draw
                if (activeVillains.includes(chineseFireball) && !chineseFireball.petrifiedBy && chineseFireball.influence > 0) daeDraws++; // Chinese Fireball adds 1 draw
                if (players[0].passives.includes(finiteIncantatem1) || players[0].passives.includes(finiteIncantatem2)) daeDraws = 1; // Finite Incantatem limits draws to 1
                if (protean && daeDraws) daeDraws--; // Protean Charm can reduce daeDraws by 1
                for (let i = 0; i < daeDraws; i++) {
                    if (!darkArtsEvents.length) {
                        shuffle(inactiveDarkArtsEvents);
                        while (inactiveDarkArtsEvents.length) darkArtsEvents.push(inactiveDarkArtsEvents.shift());
                    }
                    darkArtsEvents[0].generateImg();
                    if ((darkArtsEvents[0] === avadaKedavra1 || darkArtsEvents[0] === crucio1 || darkArtsEvents[0] === imperio1 || darkArtsEvents[0] === avadaKedavra2 || darkArtsEvents[0] === crucio2 || darkArtsEvents[0] === imperio2 || darkArtsEvents[0] === avadaKedavra3 || darkArtsEvents[0] === crucio3 || darkArtsEvents[0] === imperio3) && !players[0].passives.includes(finiteIncantatem1) && !players[0].passives.includes(finiteIncantatem2)) i--; // some DAEs draw additional DAEs and Finite Incantatem limits draws to 1
                    activeDarkArtsEvents.push(darkArtsEvents.shift());
                }

                // flip Dark Arts Event(s)
                for (let i = 0; i < activeDarkArtsEvents.length; i++) {
                    setTimeout(() => {
                        // reveal Dark Arts Event
                        const darkArtsEventsElement = document.getElementById("darkArtsEvents");
                        darkArtsEventsElement.appendChild(activeDarkArtsEvents[i].img);
                        activeDarkArtsEvents[i].img.classList.toggle("flipped");
                        setTimeout(() => {
                            activeDarkArtsEvents[i].effect();
            
                            // villain effects
                            if (activeDarkArtsEvents.indexOf(activeDarkArtsEvents[i]) === activeDarkArtsEvents.length - 1) {
                                setTimeout(() => {
                                    const nonPassiveVillains = activeVillains.filter(villain => {return !villain.passive && !villain.petrifiedBy;});
                                    for (let i = 0; i < (nonPassiveVillains.length > 1 ? nonPassiveVillains.length : 1); i++) {
                                        setTimeout(() => {
                                            if (nonPassiveVillains.length && !nonPassiveVillains[i].petrifiedBy) nonPassiveVillains[i].effect();

                                            if (!nonPassiveVillains.length || i === nonPassiveVillains.length - 1) {
                                                // Voldemort
                                                if (invulnerableVoldemort()) {
                                                    setTimeout(() => {
                                                        if (!invulnerableVoldemort().petrifiedBy) invulnerableVoldemort().effect();
                                                        else if (invulnerableVoldemort().petrifiedBy === players[0]) invulnerableVoldemort().petrifiedBy = null;
                                                        // reactivate end turn
                                                        document.getElementById("endTurn").style.display = "initial";
                                                    }, 1000);
                                                }

                                                // Horcrux effects
                                                if (encounters.length) {
                                                    setTimeout(() => {
                                                        encounters[0].effect();
                                                        darken(encounters[0].img);
                                                    }, 1000 + (invulnerableVoldemort() ? 1000 : 0));
                                                }

                                                setTimeout(() => {
                                                    // magnify images
                                                    for (let j = 0; j < document.getElementsByTagName("IMG").length; j++) {
                                                        const img = document.getElementsByTagName("IMG")[j];
                                                        img.oncontextmenu = event => {magnify(event);};
                                                    }

                                                    // reset villains
                                                    activeVillains.forEach(villain => {
                                                        if (villain.petrifiedBy === players[0]) {
                                                            villain.petrifiedBy = null;
                                                        }
                                                        villain.attackDamageTaken = 0;
                                                        villain.influenceDamageTaken = 0;
                                                        villain.ginnyUsed = false;
                                                    });

                                                    // reenable all events
                                                    disableScreen.style.display = "none";
                                                    root.style.setProperty("--playerChoiceDisplay", "flex");
                                                    root.style.setProperty("--revealBoardDisplay", "block");

                                                    // start player choices
                                                    playerTurn = true;
                                                    if (playerChoices.length) playerChoices[0].display(); // display the first player choice from the evil turn
                                                }, 1000 + (invulnerableVoldemort() ? 1000 : 0) + (encounters.length ? 1000 : 0));
                                            }
                                        }, nonPassiveVillains.length ? i * 1000 : 0);
                                    }
                                }, 1000);
                            }
                        }, 1000);
                    }, i * 2000 + 1000);
                }
            }

            // Protean Charm activates before the Dark Arts
            if (players[0].charm === "Protean" && players[0].hand.length) {
                const unpetrifiedVillains = activeVillains.filter(villain => {return villain.type.includes("villain") && !villain.petrifiedBy;});
                addPlayerChoice("Discard to ignore Villain:", () => {return players[0].hand.length + 1;}, 1, () => {
                    for (let i = 0; i < players[0].hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[0].hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            players[0].forcedDiscardAt(i, false);
                            if (players[0].health > 7 || players[0].health < 4) {
                                if (unpetrifiedVillains.length > 1) {
                                    playerChoices.unshift(new PlayerChoice("Ignore:", () => {return unpetrifiedVillains.length;}, 1, () => {
                                        for (let j = 0; j < unpetrifiedVillains.length; j++) {
                                            document.getElementsByClassName("choice")[j].innerHTML = `<img src="${unpetrifiedVillains[j].img.src}">`;
                                            document.getElementsByClassName("choice")[j].onclick = () => {
                                                unpetrifiedVillains[j].petrifiedBy = players[0];
                                                darkArts(players[0].health < 4);
                                            };
                                        }
                                    }));
                                }
                                else {
                                    unpetrifiedVillains[o].petrifiedBy = players[0];
                                    darkArts(players[0].health < 4);
                                }
                            }
                            else darkArts(players[0].health < 8);
                        }
                    }
                    document.getElementsByClassName("choice")[players[0].hand.length].innerHTML = "<p>Nothing</p>";
                });
            }
            else darkArts(false);
        };
        document.getElementsByTagName("IMG")[document.getElementsByTagName("IMG").length - 1].onload = startTurn;
    }
    else {
        alert("Can't have more than one of each hero or proficiency.");
    }
}
