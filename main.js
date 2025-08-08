// display player proficiecy choice
const displayGameChoices = playerNumber => {
    const game = document.querySelector("input[name=\"game\"]:checked").value;
    const player = document.querySelector(`input[name="player${playerNumber}"]:checked`).value;
    const proficiecyElem = document.getElementById(`player${playerNumber}Proficiency`);

    if (game.includes("Box")) {
        // change player images based on game
        document.querySelector(`label[for="player${playerNumber}Harry"]`).getElementsByTagName("IMG")[0].src = "./images/Box 1/harryPotter.png";
        document.querySelector(`label[for="player${playerNumber}Ron"]`).getElementsByTagName("IMG")[0].src = "./images/Box 1/ronWeasley.png";
        document.querySelector(`label[for="player${playerNumber}Hermione"]`).getElementsByTagName("IMG")[0].src = "./images/Box 1/hermioneGranger.png";
        document.querySelector(`label[for="player${playerNumber}Neville"]`).getElementsByTagName("IMG")[0].src = "./images/Box 1/nevilleLongbottom.png";
        for (let i = 0; i < document.getElementsByClassName("boxOnly").length; i++) {
            document.getElementsByClassName("boxOnly")[i].style.display = "initial";
        }

        // Patronus options
        let patronusDisplay = "none";
        if (game === "Box 3" || game === "Box 4") patronusDisplay = "inline";
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
        else if (game === "Game 7") {
            document.querySelector(`label[for="player${playerNumber}Harry"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/harryPotter.png";
            document.querySelector(`label[for="player${playerNumber}Ron"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/ronWeasley.png";
            document.querySelector(`label[for="player${playerNumber}Hermione"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/hermioneGranger.png";
            document.querySelector(`label[for="player${playerNumber}Neville"]`).getElementsByTagName("IMG")[0].src = "./images/Game 7/nevilleLongbottom.png";
        }
    }

    // display proficiency choice
    if (player && (game === "Game 6" || game === "Game 7" || game.includes("Box"))) {
        proficiecyElem.style.display = "flex";
    }
    else {
        proficiecyElem.style.display = "none";
    }
}
/*document.getElementById("player3Hero").onchange = () => {
    displayGameChoices(3);
}
document.getElementById("player4Hero").onchange = () => {
    displayGameChoices(4);
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
            if (player === "Harry Potter") patronusImage.src = "./images/Box 3/stagPatronus.png";
            else if (player === "Ron Weasley") patronusImage.src = "./images/Box 3/terrierPatronus.png";
            else if (player === "Hermione Granger") patronusImage.src = "./images/Box 3/otterPatronus.png";
            else if (player === "Neville Longbottom") patronusImage.src = "./images/Box 3/nonCorporealPatronus.png";
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
                if (firstPlayer === document.querySelector(`input[name="player${j + 1}"]:checked`).value) {
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

    // display game
    if (continueGame) {
        document.getElementsByTagName("MAIN")[0].style.display = "flex";
        document.getElementsByTagName("MAIN")[0].style.overflow = "hidden";
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
            return `<div style="display: flex; align-items: center; height: ${choiceScrollHeight}; overflow-x: auto;">${array.reduce((prev, curr) => {return prev + `OR<img src="${curr.img.src}">`;}, "").substring(2)}</div>`;
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
                    playerChoiceElement.style.gridTemplateColumns = `repeat(${this._choices()}, calc((100vw - ${getComputedStyle(playerChoiceElement).getPropertyValue("gap")} * ${this._choices() - 1}) / ${this._choices()}))`;
                    this._populateFunction();

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
        };

        // replace encounter with next
        const displayNextEncounter = () => {
            if (encounters.length) {
                document.getElementById("encounters").appendChild(encounters[0].img);
                encounters[0].img.oncontextmenu = event => {magnify(event);};
            }
        };

        // Hogwarts die
        const rollHouseDie = (color, evil, arithmancyUsed) => {
            let sides = ["influence", "draw", "attack", "health"];
            if (color === "phoenix") {
                sides = ["health", "health 2", "location", "attack", "draw", "draw 2"];
                arithmancyUsed = true;
            }
            else if (color === "red") sides.push("influence", "influence", "influence");
            else if (color === "green") sides.push("attack", "attack", "attack");
            else if (color === "yellow") sides.push("health", "health", "health");
            else if (color === "blue") sides.push("draw", "draw", "draw");
            const result = sides[Math.floor(Math.random() * sides.length)];
            const arithmancyCheck = effect => {
                // Destroy Horcrux
                const destroyedHorcrux = () => {
                    if (encounters.length && encounters[0].remaining.length && !evil) {
                        encounters[0].addSymbol(result);
                        if (!encounters[0].remaining.length) {
                            document.getElementById("encounters").innerHTML = "";
                            activePlayer.addDestroyedHorcrux(encounters.shift());
                            displayNextEncounter();
                        }
                    }
                };

                // check for Arithmancy
                if ((activePlayer.proficiency === "Arithmancy" || activePlayer.horcruxesDestroyed.includes(forbiddenForestEncounter)) && !arithmancyUsed) {
                    addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                        if (result === "influence") document.getElementsByClassName("choice")[0].innerHTML = influenceToken;
                        else if (result === "draw") document.getElementsByClassName("choice")[0].innerHTML = hogwartsCardBack;
                        else if (result === "attack") document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                        else if (result === "health") document.getElementsByClassName("choice")[0].innerHTML = healthToken;
                        // TO-DO: add Phoenix die options, then make arithmancyUsed false for phoenix die users like Kreacher and Boggart
                        else alert(`${color} is not a die color.`);
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            effect();
                            destroyedHorcrux();
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Re-roll</p>";
                        document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie(color, evil, true);};
                        if (activePlayer.proficiency === "Arithmancy") darken(activePlayer.proficiencyImage);
                        if (activePlayer.horcruxesDestroyed.includes(forbiddenForestEncounter)) darken(forbiddenForestEncounter.img);
                    });
                }
                else {
                    effect();
                    destroyedHorcrux();
                }
            };
            if (evil) {
                if (result === "influence" || result === "location") arithmancyCheck(() => {activeLocation.addToLocation();});
                else if (result === "draw") {
                    arithmancyCheck(() => {
                        players.forEach(player => {
                            addPlayerChoice("Discard:", () => {return player.hand.length;}, 1, () => {
                                for (let i = 0; i < player.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, color !== "phoenix");};
                                }
                            });
                        });
                    });
                }
                else if (result === "draw 2") {
                    arithmancyCheck(() => {
                        addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {
                            for (let i = 0; i < activePlayer.hand.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`;
                                document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};
                            }
                        });
                    });
                }
                else if (result === "attack") arithmancyCheck(() => {players.forEach(player => {player.health--;});});
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
                if (result === "influence") arithmancyCheck(() => {players.forEach(player => {player.influence++;});});
                else if (result.includes("draw")) arithmancyCheck(() => {players.forEach(player => {player.drawCards(result === "draw" ? 1 : 2);});});
                else if (result === "attack") arithmancyCheck(() => {players.forEach(player => {player.attack++;});});
                else if (result.includes("health")) arithmancyCheck(() => {players.forEach(player => {player.health += result === "health" ? 1 : 2;});});
                else if (result === "location") arithmancyCheck(() => {activeLocation.removeFromLocation()});
                else alert(`${color} is not a die color.`);
            }
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
            if (encounters.length && encounters[0] === horcrux6 && player === activePlayer) {
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
            const magnifiedImg = event.target.cloneNode();
            magnifiedImg.classList = [];
            magnifyContainer.appendChild(magnifiedImg);
            document.getElementsByTagName("MAIN")[0].appendChild(magnifyContainer);
        };

        // populate details to show other players' hands
        const populateOtherHands = () => {
            document.getElementById("otherPlayerHands").innerHTML = "";
            players.filter(player => {return player !== activePlayer;}).forEach(player => {
                const otherPlayerHandDetails = document.createElement("details");
                otherPlayerHandDetails.open = true;
                otherPlayerHandDetails.innerHTML = `<summary>${player.hero}'s Hand</summary>`;
                const otherPlayerHand = document.createElement("div");
                player.hand.forEach(card => {
                    const cardImg = card.img.cloneNode(false);
                    cardImg.onclick = () => {};
                    otherPlayerHand.appendChild(cardImg);
                });
                otherPlayerHandDetails.appendChild(otherPlayerHand);
                document.getElementById("otherPlayerHands").appendChild(otherPlayerHandDetails);
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
                this.generateOnClick();
                this._type = type;
                this._cost = cost;
                this._effect = effect;
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
                    if (!document.getElementById("playerChoice")) {
                        activePlayer.discardAt(activePlayer.hand.indexOf(this));
                        this._effect();

                        // Every-Flavour Beans effect
                        if (activePlayer.passives.includes(everyFlavourBeans) && this.type === "ally") {
                            activePlayer.attack++;
                        }
                        // Fleur Delacour effect
                        if (activePlayer.passives.includes(fleurDelacour) && this.type === "ally" && this !== fleurDelacour) {
                            activePlayer.health += 2;
                            activePlayer.passives.splice(activePlayer.passives.indexOf(fleurDelacour), 1);
                        }
                        // Luna Lovegood effect
                        if (activePlayer.passives.includes(lunaLovegood) && this.type === "item") {
                            activePlayer.attack++;
                            activePlayer.passives.splice(activePlayer.passives.indexOf(lunaLovegood), 1);
                        }
                        // OWLS effect
                        if (activePlayer.passives.includes(owls1) && this.type === "spell") {
                            owlsSpells1++;
                            if (owlsSpells1 === 2) {
                                activePlayer.attack++;
                                activePlayer.health++;
                            }
                        }
                        if (activePlayer.passives.includes(owls2) && this.type === "spell") {
                            owlsSpells2++;
                            if (owlsSpells2 === 2) {
                                activePlayer.attack++;
                                activePlayer.health++;
                            }
                        }
                        // Elder Wand effect
                        if (activePlayer.passives.includes(elderWand) && this.type === "spell") {
                            activePlayer.attack++;
                            activePlayer.health++;
                        }
                        // Divination proficiency
                        if (activePlayer.proficiency === "Divination" && this.type === "item") {
                            addPlayerChoice("Choose:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<p>Top of deck</p><img src="${activePlayer.draw[0].img.src}">`;
                                document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard</p><img src="${activePlayer.draw[0].img.src}">`;
                                document.getElementsByClassName("choice")[1].onclick = () => {
                                    let tempPetrified = activePlayer.petrified;
                                    activePlayer.petrified = false;
                                    activePlayer.cardsDrawn--;
                                    activePlayer.drawCards(1);
                                    activePlayer.forcedDiscardAt(activePlayer.hand.length - 1, false);
                                    activePlayer.petrified = tempPetrified;
                                };
                            });
                        }
                        // Horcrux 1 effect
                        if (encounters.length && encounters[0] === horcrux1 && this.type === "ally") {
                            activePlayer.health--;
                            darken(horcrux1.img);
                        }
                        // Peskipiksi Pesternomi reward
                        if (activePlayer.horcruxesDestroyed.includes(peskipiksiPesternomi) && this.cost && this.cost % 2 === 0) {
                            const hurtPlayers = players.filter(player => {return player.health < 10 && canHeal(player);});
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
                            activePlayer.health--;
                            darken(escape.img);
                        }

                        activePlayer.playedPush(this);
                    }
                }
            }
            get passive() {
                return this._passive;
            }
            get houseDie() {
                return this._houseDie;
            }
            effect() {
                this._effect();
            }
        }

        // Harry starting cards
        const alohomoraEffect = () => {activePlayer.influence++;};
        const startingAllyEffect = () => {if (!canHeal(activePlayer)) activePlayer.attack++; else {addPlayerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.health += 2};});}};
        const alohomoraHarry1 = new Card("Alohomora Harry", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraHarry2 = alohomoraHarry1.clone();
        const alohomoraHarry3 = alohomoraHarry1.clone();
        const alohomoraHarry4 = alohomoraHarry1.clone();
        const alohomoraHarry5 = alohomoraHarry1.clone();
        const alohomoraHarry6 = alohomoraHarry1.clone();
        const alohomoraHarry7 = alohomoraHarry1.clone();
        const firebolt = new Card("Firebolt", "Game 1", "item", 0, () => {activePlayer.attack++;}, true, false);
        const hedwig = new Card("Hedwig", "Game 1", "ally", 0, startingAllyEffect, false, false);
        const invisibilityCloak = new Card("Invisibility Cloak", "Game 1", "item", 0, () => {activePlayer.influence++;}, true, false);
        const harryStartingCards = [alohomoraHarry1, alohomoraHarry2, alohomoraHarry3, alohomoraHarry4, alohomoraHarry5, alohomoraHarry6, alohomoraHarry7, firebolt, hedwig, invisibilityCloak];

        // Ron starting cards
        const alohomoraRon1 = new Card("Alohomora Ron", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraRon2 = alohomoraRon1.clone();
        const alohomoraRon3 = alohomoraRon1.clone();
        const alohomoraRon4 = alohomoraRon1.clone();
        const alohomoraRon5 = alohomoraRon1.clone();
        const alohomoraRon6 = alohomoraRon1.clone();
        const alohomoraRon7 = alohomoraRon1.clone();
        const cleansweep11 = new Card("Cleansweep 11", "Game 1", "item", 0, () => {activePlayer.attack++;}, true, false);
        const everyFlavourBeans = new Card("Every-Flavour Beans", "Game 1", "item", 0, () => {activePlayer.influence++;}, true, false);
        const pigwidgeon = new Card("Pigwidgeon", "Game 1", "ally", 0, startingAllyEffect, false, false);
        const ronStartingCards = [alohomoraRon1, alohomoraRon2, alohomoraRon3, alohomoraRon4, alohomoraRon5, alohomoraRon6, alohomoraRon7, cleansweep11, everyFlavourBeans, pigwidgeon];

        // Hermione starting cards
        const alohomoraHermione1 = new Card("Alohomora Hermione", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraHermione2 = alohomoraHermione1.clone();
        const alohomoraHermione3 = alohomoraHermione1.clone();
        const alohomoraHermione4 = alohomoraHermione1.clone();
        const alohomoraHermione5 = alohomoraHermione1.clone();
        const alohomoraHermione6 = alohomoraHermione1.clone();
        const alohomoraHermione7 = alohomoraHermione1.clone();
        const crookshanks = new Card("Crookshanks", "Game 1", "ally", 0, startingAllyEffect, false, false);
        const theTalesOfBeedleTheBard = new Card("The Tales Of Beedle The Bard", "Game 1", "item", 0, () => {if (encounters[0] === horcrux3) activePlayer.influence += 2; else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `ALL Heroes: ${influenceToken}`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.influence++;});};});}}, false, false);
        const timeTurner = new Card("Time Turner", "Game 1", "item", 0, () => {activePlayer.influence++;}, true, false);
        const hermioneStartingCards = [alohomoraHermione1, alohomoraHermione2, alohomoraHermione3, alohomoraHermione4, alohomoraHermione5, alohomoraHermione6, alohomoraHermione7, crookshanks, theTalesOfBeedleTheBard, timeTurner];

        // Neville starting cards
        const alohomoraNeville1 = new Card("Alohomora Neville", "Game 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraNeville2 = alohomoraNeville1.clone();
        const alohomoraNeville3 = alohomoraNeville1.clone();
        const alohomoraNeville4 = alohomoraNeville1.clone();
        const alohomoraNeville5 = alohomoraNeville1.clone();
        const alohomoraNeville6 = alohomoraNeville1.clone();
        const alohomoraNeville7 = alohomoraNeville1.clone();
        const mandrake = new Card("Mandrake", "Game 1", "item", 0, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>Any one Hero</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${hurtPlayers.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {if (hurtPlayers.length > 1) {addPlayerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<div>Health: ${hurtPlayers[i].health}</div>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;};});} else activePlayer.attack++;}, false, false);
        const remembrall = new Card("Remembrall", "Game 1", "item", 0, () => {activePlayer.influence++;}, false, false);
        const trevor = new Card("Trevor", "Game 1", "ally", 0, startingAllyEffect, false, false);
        const nevilleStartingCards = [alohomoraNeville1, alohomoraNeville2, alohomoraNeville3, alohomoraNeville4, alohomoraNeville5, alohomoraNeville6, alohomoraNeville7, mandrake, remembrall, trevor];

        // Luna starting card
        const alohomoraLuna1 = new Card("Alohomora Luna", "Box 1", "spell", 0, alohomoraEffect, false, false);
        const alohomoraLuna2 = alohomoraLuna1.clone();
        const alohomoraLuna3 = alohomoraLuna1.clone();
        const alohomoraLuna4 = alohomoraLuna1.clone();
        const alohomoraLuna5 = alohomoraLuna1.clone();
        const alohomoraLuna6 = alohomoraLuna1.clone();
        const alohomoraLuna7 = alohomoraLuna1.clone();
        const crumpleHornedSnorkack = new Card("Crumple Horned Snorkack", "Box 1", "ally", 0, startingAllyEffect, false, false);
        const lionHat = new Card("Lion Hat", "Box 1", "item", 0, () => {activePlayer.influence++; if (players.filter(player => {return player !== activePlayer && (player.hand.includes(quidditchGear1) || player.hand.includes(quidditchGear2) || player.hand.includes(quidditchGear3) || player.hand.includes(quidditchGear4) || player.hand.includes(firebolt) ||  player.hand.includes(cleansweep11) ||  player.hand.includes(nimbusTwoThousandAndOne1) ||  player.hand.includes(nimbusTwoThousandAndOne2)/* ||  player.hand.includes(ginny's broom)*/);}).length) activePlayer.attack++;}, false, false);
        const spectrespecs = new Card("Spectrespecs", "Box 1", "item", 0, () => {activePlayer.influence++; if (!darkArtsEvents.length) {shuffle(inactiveDarkArtsEvents); while (inactiveDarkArtsEvents.length) darkArtsEvents.push(inactiveDarkArtsEvents.shift());} addPlayerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Keep</p>`; document.getElementsByClassName("choice")[1].innerHTML = `<img src="${darkArtsEvents[0].img.src}"><p>Discard</p>`; document.getElementsByClassName("choice")[1].onclick = () => {inactiveDarkArtsEvents.push(darkArtsEvents.shift());};});}, false, false);
        const lunaStartingCards = [alohomoraLuna1, alohomoraLuna2, alohomoraLuna3, alohomoraLuna4, alohomoraLuna5, alohomoraLuna6, alohomoraLuna7, crumpleHornedSnorkack, lionHat, spectrespecs];

        // Hogwarts cards
        // Game 1
        const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, () => {players.forEach(player => {player.attack++; player.influence++; player.health++; player.drawCards(1)});}, false, false);
        const descendo1 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false, false);
        const descendo2 = descendo1.clone();
        const essenceOfDittany1 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, false);
        const essenceOfDittany2 = essenceOfDittany1.clone();
        const essenceOfDittany3 = essenceOfDittany1.clone();
        const essenceOfDittany4 = essenceOfDittany1.clone();
        const goldenSnitch = new Card("Golden Snitch", "Game 1", "item", 5, () => {activePlayer.influence += 2; activePlayer.drawCards(1);}, false, false);
        const incendio1 = new Card("Incendio", "Game 1", "spell", 4, () => {activePlayer.attack++; activePlayer.drawCards(1);}, false, false);
        const incendio2 = incendio1.clone();
        const incendio3 = incendio1.clone();
        const incendio4 = incendio1.clone();
        const lumos1 = new Card("Lumos", "Game 1", "spell", 4, () => {players.forEach(player => {player.drawCards(1);});}, false, false);
        const lumos2 = lumos1.clone();
        const oliverWood = new Card("Oliver Wood", "Game 1", "ally", 3, () => {activePlayer.attack++;}, true, false);
        const quidditchGear1 = new Card("Quidditch Gear", "Game 1", "item", 3, () => {activePlayer.attack++; activePlayer.health++;}, false, false);
        const quidditchGear2 = quidditchGear1.clone();
        const quidditchGear3 = quidditchGear1.clone();
        const quidditchGear4 = quidditchGear1.clone();
        const reparo1 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false, false);
        const reparo2 = reparo1.clone();
        const reparo3 = reparo1.clone();
        const reparo4 = reparo1.clone();
        const reparo5 = reparo1.clone();
        const reparo6 = reparo1.clone();
        const rubeusHagrid = new Card("Rubeus Hagrid", "Game 1", "ally", 4, () => {activePlayer.attack++; players.forEach(player => {player.health++;});}, false, false);
        const sortingHat = new Card("Sorting Hat", "Game 1", "item", 4, () => {activePlayer.influence += 2;}, true, false);
        const wingardiumLeviosa1 = new Card("Wingardium Leviosa", "Game 1", "spell", 2, () => {activePlayer.influence++;}, true, false);
        const wingardiumLeviosa2 = wingardiumLeviosa1.clone();
        const wingardiumLeviosa3 = wingardiumLeviosa1.clone();

        // Game 2
        const arthurWeasley = new Card("Arthur Weasley", "Game 2", "ally", 6, () => {players.forEach(player => {player.influence += 2;});}, false, false);
        const dobbyTheHouseElf = new Card("Dobby The House-Elf", "Game 2", "ally", 4, () => {activeLocation.removeFromLocation(); activePlayer.drawCards(1);}, false, false);
        const expelliarmus1 = new Card("Expelliarmus", "Game 2", "spell", 6, () => {activePlayer.attack += 2; activePlayer.drawCards(1);}, false, false);
        const expelliarmus2 = expelliarmus1.clone();
        const fawkesThePhoenix = new Card("Fawkes The Phoenix", "Game 2", "ally", 5, () => {if (players.filter(player => {return canHeal(player);}).length) {addPlayerChoice("Pick one:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>ALL Heroes:</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${players.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.health += 2;});};});} else activePlayer.attack += 2;}, false, false);
        const finite1 = new Card("Finite", "Game 2", "spell", 3, () => {activeLocation.removeFromLocation();}, false, false);
        const finite2 = finite1.clone();
        const gilderoyLockhart = new Card("Gilderoy Lockhart", "Game 2", "ally", 2, () => {if (!activePlayer.petrified) {activePlayer.drawCards(1); if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);}}});}} else {addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<p>Discard:</p>${choiceScroll(activePlayer.hand)}`; document.getElementsByClassName("choice")[0].onclick = () => {playerChoices.unshift(new PlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}}));}; document.getElementsByClassName("choice")[1].innerHTML = "Nothing";});}}, false, false);
        const ginnyWeasley = new Card("Ginny Weasley", "Game 2", "ally", 4, () => {activePlayer.attack++; activePlayer.influence++;}, false, false);
        const mollyWeasley = new Card("Molly Weasley", "Game 2", "ally", 6, () => {players.forEach(player => {player.influence++; player.health += 2;});}, false, false);
        const nimbusTwoThousandAndOne1 = new Card("Nimbus Two Thousand And One", "Game 2", "item", 5, () => {activePlayer.attack += 2;}, true, false);
        const nimbusTwoThousandAndOne2 = nimbusTwoThousandAndOne1.clone();
        const polyjuicePotion1 = new Card("Polyjuice Potion", "Game 2", "item", 3, () => {const allies = activePlayer.hand.filter(card => {return card.type === "ally";}); if (allies.length) {const polyjuiceAlly = ally => {ally.effect(); if (ally.passive) activePlayer.passives.push(ally);}; if (allies.length > 1) {addPlayerChoice("Pick an ally to copy:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {polyjuiceAlly(allies[i]);};}});} else polyjuiceAlly(allies[0]);}}, false, false);
        const polyjuicePotion2 = polyjuicePotion1.clone();

        // Game 3
        const butterbeer1 = new Card("Butterbeer", "Game 3", "item", 3, () => {if (players.length > 2) {addPlayerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); addPlayerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false, false);
        const butterbeer2 = butterbeer1.clone();
        const butterbeer3 = butterbeer1.clone();
        const chocolateFrog1 = new Card("Chocolate Frog", "Game 3", "item", 2, () => {let unstunnedPlayers = players.filter(player => {return !player.stunned;}); if (unstunnedPlayers.length) {if (unstunnedPlayers.length > 1) {addPlayerChoice(`Give 1 influence and 1 health to:`, () => {return unstunnedPlayers.length;}, 1, () => {for (let i = 0; i < unstunnedPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(unstunnedPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${unstunnedPlayers[i].influence}</p><p>Health: ${unstunnedPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {unstunnedPlayers[i].influence++; unstunnedPlayers[i].health++;};}});} else {unstunnedPlayers[0].influence++; unstunnedPlayers[0].health++;}}}, false, false);
        const chocolateFrog2 = chocolateFrog1.clone();
        const chocolateFrog3 = chocolateFrog1.clone();
        const crystalBall1 = new Card("Crystal Ball", "Game 3", "item", 3, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});}}, false, false);
        const crystalBall2 = crystalBall1.clone();
        const expectoPatronum1 = new Card("Expecto Patronum", "Game 3", "spell", 5, () => {activePlayer.attack++; activeLocation.removeFromLocation();}, false, false);
        const expectoPatronum2 = expectoPatronum1.clone();
        const maraudersMap = new Card("Marauder's Map", "Game 3", "item", 5, () => {activePlayer.drawCards(2);}, false, false);
        const petrificusTotalus1 = new Card("Petrificus Totalus", "Game 3", "spell", 6, () => {activePlayer.attack++; let unpetrifiedVillains = activeVillains.concat(invulnerableVoldemort() ? invulnerableVoldemort() : []).filter(villain => {return !villain.petrifiedBy && villain.health > 0 && villain.type.includes("villain");}); if (unpetrifiedVillains.length) {if (unpetrifiedVillains.length > 1) {addPlayerChoice("Petrify:", () => {return unpetrifiedVillains.length;}, 1, () => {for (let i = 0; i < unpetrifiedVillains.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedVillains[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedVillains[i].petrifiedBy = activePlayer;};}});} else unpetrifiedVillains[0].petrifiedBy = activePlayer;}}, false, false);
        const petrificusTotalus2 = petrificusTotalus1.clone();
        const remusLupin = new Card("Remus Lupin", "Game 3", "ally", 4, () => {activePlayer.attack++; const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;}}, false, false);
        const siriusBlack = new Card("Sirius Black", "Game 3", "ally", 6, () => {activePlayer.attack += 2; activePlayer.influence++;}, false, false);
        const sybillTrelawney = new Card("Sybill Trelawney", "Game 3", "ally", 4, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); addPlayerChoice("Discard", () => {return activePlayer.hand.length}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.hand[i].type === "spell") activePlayer.influence += 2; activePlayer.forcedDiscardAt(i, false);};}});}}, false, false);

        // Game 4
        const accio1 = new Card("Accio", "Game 4", "spell", 4, () => {const items = activePlayer.discard.filter(card => {return card.type === "item";}); if (items.length) {addPlayerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[1].onclick = () => {const discardToHand = index => {activePlayer.discard.splice(activePlayer.discard.indexOf(items[index]), 1); activePlayer.addToHand(items[index]);}; if (items.length === 1) discardToHand(0); else {addPlayerChoice("Move from Discard to Hand:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i);};}});}};});} else activePlayer.influence += 2;}, false, false);
        const accio2 = accio1.clone();
        const alastorMadEyeMoody = new Card("Alastor Mad-Eye Moody", "Game 4", "ally", 6, () => {activePlayer.influence += 2; activeLocation.removeFromLocation();}, false, false);
        const cedricDiggory = new Card("Cedric Diggory", "Game 4", "ally", 4, () => {activePlayer.attack++; rollHouseDie("yellow", false, false);}, false, true);
        const filiusFlitwick = new Card("Filius Flitwick", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.drawCards(1); rollHouseDie("blue", false, false);}, false, true);
        const fleurDelacour = new Card("Fleur Delacour", "Game 4", "ally", 4, () => {activePlayer.influence += 2;}, true, false);
        const hogwartsAHistory1 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {addPlayerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = blueDie; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false, false);}; document.getElementsByClassName("choice")[1].innerHTML = greenDie; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false, false);}; document.getElementsByClassName("choice")[2].innerHTML = redDie; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false, false);}; document.getElementsByClassName("choice")[3].innerHTML = yellowDie; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false, false);};});}, false, true);
        const hogwartsAHistory2 = hogwartsAHistory1.clone();
        const hogwartsAHistory3 = hogwartsAHistory1.clone();
        const hogwartsAHistory4 = hogwartsAHistory1.clone();
        const hogwartsAHistory5 = hogwartsAHistory1.clone();
        const hogwartsAHistory6 = hogwartsAHistory1.clone();
        const minervaMcgonagall = new Card("Minerva Mcgonagall", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.attack++; rollHouseDie("red", false, false);}, false, true);
        const pensieve = new Card("Pensieve", "Game 4", "item", 5, () => {const pensieveEffect = player => {player.influence++; player.drawCards(1);}; if (players.length > 2) {addPlayerChoice("+1 influence and draw a card:", () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {pensieveEffect(players[i])};}});} else players.forEach(player => {pensieveEffect(player);});}, false, false);
        const pomonaSprout = new Card("Pomona Sprout", "Game 4", "ally", 6, () => {activePlayer.influence++; rollHouseDie("yellow", false, false); const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, true);
        const protego1 = new Card("Protego", "Game 4", "spell", 5, () => {activePlayer.attack++; activePlayer.health++;}, false, false);
        const protego2 = protego1.clone();
        const protego3 = protego1.clone();
        const severusSnape = new Card("Severus Snape", "Game 4", "ally", 6, () => {activePlayer.attack++; activePlayer.health += 2; rollHouseDie("green", false, false);}, false, true);
        const triwizardCup = new Card("Triwizard Cup", "Game 4", "item", 5, () => {activePlayer.attack++; activePlayer.influence++; activePlayer.health++;}, false, false);
        const viktorKrum = new Card("Viktor Krum", "Game 4", "ally", 5, () => {activePlayer.attack += 2;}, true, false);

        // Game 5
        const choChang = new Card("Cho Chang", "Game 5", "ally", 4, () => {rollHouseDie("blue", false, false); if (!activePlayer.petrified) {activePlayer.drawCards(3); addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false)};}});}}, false, true);
        const fredWeasley = new Card("Fred Weasley", "Game 5", "ally", 4, () => {activePlayer.attack++; if (players.filter(player => {return player !== activePlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.influence++;}); rollHouseDie("red");}, false, true);
        const georgeWeasley = new Card("George Weasley", "Game 5", "ally", 4, () => {activePlayer.attack++; if (players.filter(player => {return player !== activePlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.health++;}); rollHouseDie("red");}, false, true);
        const kingsleyShacklebolt = new Card("Kingsley Shacklebolt", "Game 5", "ally", 7, () => {activePlayer.attack += 2; activePlayer.health++; activeLocation.removeFromLocation();}, false, false);
        const lunaLovegood = new Card("Luna Lovegood", "Game 5", "ally", 5, () => {activePlayer.influence++; rollHouseDie("blue");}, true, true);
        const nymphadoraTonks = new Card("Nymphadora Tonks", "Game 5", "ally", 5, () => {let barty = activeVillains.includes(bartyCrouchJr) && bartyCrouchJr.health > 0 && !bartyCrouchJr.petrifiedBy; addPlayerChoice("Choose:", () => {return barty ? 2 : 3;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 3;}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.attack += 2;}; if (!barty) {document.getElementsByClassName("choice")[2].innerHTML = "<img src=\"./images/locationToken.png\">"; document.getElementsByClassName("choice")[2].onclick = () => {activeLocation.removeFromLocation();};}});}, false, true);
        const owls1 = new Card("OWLS", "Game 5", "item", 4, () => {activePlayer.influence += 2;}, true, false); let owlsSpells1 = 0;
        const owls2 = owls1.clone(); let owlsSpells2 = 0;
        const stupefy1 = new Card("Stupefy", "Game 5", "spell", 6, () => {activePlayer.attack++; activeLocation.removeFromLocation(); activePlayer.drawCards(1);}, false, false);
        const stupefy2 = stupefy1.clone();

        // Game 6
        const advancedPotionMaking = new Card("Advanced Potion-Making", "Game 6", "item", 6, () => {players.forEach(player => {player.health += 2; if (player.health === 10) {player.attack++; player.drawCards(1);}});}, false, false);
        const bezoar1 = new Card("Bezoar", "Game 6", "item", 4, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {addPlayerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;} activePlayer.drawCards(1);}, false, false);
        const bezoar2 = bezoar1.clone();
        const confundus1 = new Card("Confundus", "Game 6", "spell", 3, () => {activePlayer.attack++;}, true, false);
        const confundus2 = confundus1.clone();
        const deluminator = new Card("Deluminator", "Game 6", "item", 6, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, false, false);
        const elderWand = new Card("Elder Wand", "Game 6", "item", 7, () => {}, true, false);
        const felixFelicis = new Card("Felix Felicis", "Game 6", "item", 7, () => {let felixFelicisOptions = ["attack", "influence"]; if (canHeal(activePlayer)) felixFelicisOptions.push("health"); if (!activePlayer.petrified) felixFelicisOptions.push("draw"); if (felixFelicisOptions.length > 2) {addPlayerChoice("Choose two:", () => {return felixFelicisOptions.length;}, 1, () => {const displayFelixFelicisOptions = () => {let choiceIndex = 0; if (felixFelicisOptions.includes("attack")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.attack += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("attack"), 1); addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("influence")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.influence += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("influence"), 1); addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("health")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.health += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("health"), 1); addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("draw")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${hogwartsCardBack + hogwartsCardBack}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.drawCards(2); felixFelicisOptions.splice(felixFelicisOptions.indexOf("draw"), 1); addPlayerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});};}}; displayFelixFelicisOptions();});} else {activePlayer.attack += 2; activePlayer.influence += 2;}}, false, false);
        const horaceSlughorn = new Card("Horace Slughorn", "Game 6", "ally", 6, () => {players.forEach(player => {if (canHeal(player)) {addPlayerChoice(`${player.hero} choose 1`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`; document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;}; document.getElementsByClassName("choice")[1].innerHTML = `${healthToken}<p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health++;};});} else player.influence++;}); rollHouseDie("green", false, false);}, false, true);

        // Game 7
        const swordOfGryffindor = new Card("Sword Of Gryffindor", "Game 7", "item", 7, () => {activePlayer.attack += 2; rollHouseDie("red", false, false); rollHouseDie("red");}, false, true);

        // Box 1
        const detention = new Card("Detention", "Box 1", "item", 0, () => {}, false, false);
        const argusFilchAndMrsNorris = new Card("Argus Filch And Mrs Norris", "Box 1", "ally", 4, () => {
            activePlayer.drawCards(2); 
            addPlayerChoice("Choose a card to discard or banish:", () => {return activePlayer.hand.length + (activePlayer.petrified ? 1 : 0);}, 1, () => {
                for (let i = 0; i < activePlayer.hand.length; i++) {
                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {playerChoices.unshift(new PlayerChoice("Discard or banish:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${activePlayer.hand[i].img.src}"><p>Discard</p>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.forcedDiscardAt(i, false)}; document.getElementsByClassName("choice")[1].innerHTML = `<img src="${activePlayer.hand[i].img.src}"><p>Banish</p>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.banishAt(i)};}));};
                }
                if (activePlayer.petrified) document.getElementsByClassName("choice")[activePlayer.hand.length].innerHTML = "<p>Nothing</p>";
            });
        }, false, false);
        const fang = new Card("Fang", "Box 1", "ally", 3, () => {addPlayerChoice(`Give 1 influence and 2 health to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health += 2;};}});}, false, false);
        const finiteIncantatem1 = new Card("Finite Incantatem", "Box 1", "spell", 6, () => {activeLocation.removeFromLocation();}, true, false);
        const finiteIncantatem2 = finiteIncantatem1.clone();
        const harp = new Card("Harp", "Box 1", "item", 6, () => {activePlayer.attack++; let unpetrifiedCreatures = activeVillains.filter(villain => {return !villain.petrifiedBy && (villain.health > 0 || villain.influence > 0) && villain.type.includes("creature");}); if (unpetrifiedCreatures.length) {if (unpetrifiedCreatures.length > 1) {addPlayerChoice("Petrify:", () => {return unpetrifiedCreatures.length;}, 1, () => {for (let i = 0; i < unpetrifiedCreatures.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedCreatures[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedCreatures[i].petrifiedBy = activePlayer;};}});} else unpetrifiedCreatures[0].petrifiedBy = activePlayer;}}, false, false);
        const oldSock1 = new Card("Old Sock", "Box 1", "item", 1, () => {activePlayer.influence++; if (players.filter(player => {return player !== activePlayer && (player.hand.includes(dobbyTheHouseElf) || player.hand.includes(kreacherTheHouseElf))}).length) activePlayer.attack += 2;}, false, false);
        const oldSock2 = oldSock1.clone();
        const tergeo1 = new Card("Tergeo", "Box 1", "spell", 2, () => {
            activePlayer.influence++; 
            if (activePlayer.hand.length) {
                addPlayerChoice("Do you want to banish a card?", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(activePlayer.hand); 
                    document.getElementsByClassName("choice")[0].onclick = () => {
                        if (activePlayer.hand.length > 1) {
                            addPlayerChoice("Banish:", () => {return activePlayer.hand.length;}, 1, () => {
                                for (let i = 0; i < activePlayer.hand.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; 
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        if (activePlayer.hand[i].type === "item") activePlayer.drawCards(1); 
                                        activePlayer.banishAt(i);
                                    };
                                }
                            });
                        }
                        else activePlayer.banishAt(0);
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
        const buckbeak = new Card("Buckbeak", "Box 2", "ally", 4, () => {
            activePlayer.drawCards(2);
            addPlayerChoice("Discard 1:", () => {return activePlayer.hand.length;}, 1, () => {
                for (let i = 0; i < activePlayer.hand.length; i++) {
                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`;
                    document.getElementsByClassName("choice")[i].onclick = () => {
                        if (activePlayer.hand[i].type === "ally") activePlayer.attack += 2;
                        activePlayer.forcedDiscardAt(i, false);
                    };
                }
            });
        }, false, false);
        const depulso1 = new Card("Depulso", "Box 2", "spell", 3, () => {
            const handItems = activePlayer.hand.filter(card => {return card.type === "item"});
            const discardItems = activePlayer.discard.filter(card => {return card.type === "item"});
            if (handItems.length || discardItems.length) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>Banish:</p>${choiceScroll(handItems.concat(discardItems))}`;
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        if (handItems.length + discardItems.length > 1) {
                            addPlayerChoice("Banish:", () => {return handItems.length + discardItems.length;}, 1, () => {
                                for (let i = 0; i < handItems.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[activePlayer.hand.indexOf(handItems[i])].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {
                                        activePlayer.banishAt(activePlayer.hand.indexOf(handItems[i]));
                                    };
                                }
                                for (let i = 0; i < discardItems.length; i++) {
                                    document.getElementsByClassName("choice")[handItems.length + i].innerHTML = `<img src="${activePlayer.discard[activePlayer.discard.indexOf(discardItems[i])].img.src}">`;
                                    document.getElementsByClassName("choice")[handItems.length + i].onclick = () => {
                                        activePlayer.hand.unshift(activePlayer.discard.splice(activePlayer.discard.indexOf(discardItems[i]), 1)[0]);
                                        activePlayer.banishAt(0);
                                    };
                                }
                            });
                        }
                        else if (handItems.length) activePlayer.banishAt(activePlayer.hand.indexOf(handItems[0]));
                        else {
                            activePlayer.hand.unshift(activePlayer.discard.splice(activePlayer.discard.indexOf(discardItems[0]), 1)[0]);
                            activePlayer.banishAt(0);
                        }
                    };
                });
            }
            else activePlayer.influence += 2;
        }, false, false);
        const depulso2 = depulso1.clone();
        const immobulus1 = new Card("Immobulus", "Box 2", "spell", 3, () => {activePlayer.attack++;}, true, false);
        const immobulus2 = immobulus1.clone();
        const immobulus3 = immobulus1.clone();
        const monsterBookOfMonsters1 = new Card("Monster Book Of Monsters", "Box 2", "item", 5, () => {activePlayer.attack++; rollHouseDie("phoenix", false, false);}, false, true);
        const monsterBookOfMonsters2 = monsterBookOfMonsters1.clone();
        const monsterBookOfMonsters3 = monsterBookOfMonsters1.clone();

        // Box 3
        const erumpentHorn = new Card("Erumpent Horn", "Box 3", "item", 5, () => {activePlayer.health -= 2; activePlayer.attack += 3;}, false, false);
        const griphook = new Card("Griphook", "Box 3", "ally", 6, () => {
            if (!activePlayer.petrified) {
                activePlayer.drawCards(3);
                addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {
                    for (let i = 0; i < activePlayer.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`;
                        document.getElementsByClassName("choice")[i].onclick = () => {
                            if (activePlayer.hand[i].type === "item") activePlayer.influence += 2;
                            activePlayer.forcedDiscardAt(i, false);
                        };
                    }
                });
            }
        }, false, false);
        const kreacherTheHouseElf = new Card("Kreacher The House Elf", "Box 3", "ally", 5, () => {
            rollHouseDie("phoenix", false, true);
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
        const lacewingFlies1 = new Card("Lacewing Flies", "Box 3", "item", 2, () => {
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
                unpetrifiedPlayers[0].drawCards(1);
            }
        }, false, false);
        const lacewingFlies2 = lacewingFlies1.clone();
        const nox1 = new Card("Nox", "Box 3", "spell", 6, () => {
            activePlayer.attack++;
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
        const thestral = new Card("Thestral", "Box 3", "ally", 4, () => {
            players.forEach(player => {
                if (canHeal(player)) {
                    addPlayerChoice(`Choose for ${player.hero}:`, () => {return 2;}, 1, () => {
                        document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`;
                        document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;};
                        document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`;
                        document.getElementsByClassName("choice")[1].onclick = () => {player.health += 2;};
                    });
                }
                else player.influence++;
            });
        }, false, false);

        // hogwartsCard array
        let hogwartsCards = [albusDumbledore, descendo1, descendo2, essenceOfDittany1, essenceOfDittany2, essenceOfDittany3, essenceOfDittany4, goldenSnitch, incendio1, incendio2, incendio3, incendio4, lumos1, lumos2, oliverWood, quidditchGear1, quidditchGear2, quidditchGear3, quidditchGear4, reparo1, reparo2, reparo3, reparo4, reparo5, reparo6, rubeusHagrid, sortingHat, wingardiumLeviosa1, wingardiumLeviosa2, wingardiumLeviosa3];
        if (activeGame !== "Game 1") {
            hogwartsCards.push(arthurWeasley, dobbyTheHouseElf, expelliarmus1, expelliarmus2, fawkesThePhoenix, finite1, finite2, gilderoyLockhart, ginnyWeasley, mollyWeasley, nimbusTwoThousandAndOne1, nimbusTwoThousandAndOne2, polyjuicePotion1, polyjuicePotion2);
            if (activeGame !== "Game 2") {
                hogwartsCards.push(butterbeer1, butterbeer2, butterbeer3, chocolateFrog1, chocolateFrog2, chocolateFrog3, crystalBall1, crystalBall2, expectoPatronum1, expectoPatronum2, maraudersMap, petrificusTotalus1, petrificusTotalus2, remusLupin, siriusBlack, sybillTrelawney);
                if (activeGame !== "Game 3") {
                    hogwartsCards.push(accio1, accio2, alastorMadEyeMoody, cedricDiggory, filiusFlitwick, fleurDelacour, hogwartsAHistory1, hogwartsAHistory2, hogwartsAHistory3, hogwartsAHistory4, hogwartsAHistory5, hogwartsAHistory6, minervaMcgonagall, pensieve, pomonaSprout, protego1, protego2, protego3, severusSnape, triwizardCup, viktorKrum);
                    if (activeGame !== "Game 4") {
                        hogwartsCards.push(choChang, fredWeasley, georgeWeasley, kingsleyShacklebolt, lunaLovegood, nymphadoraTonks, owls1, owls2, stupefy1, stupefy2);
                        if (activeGame !== "Game 5" && activeGame !== "Box 1") {
                            hogwartsCards.push(advancedPotionMaking, bezoar1, bezoar2, confundus1, confundus2, deluminator, elderWand, felixFelicis, horaceSlughorn);
                            if (activeGame !== "Game 6" && activeGame !== "Box 2") {
                                hogwartsCards.push(swordOfGryffindor);
                            }
                        }
                    }
                }
            }
        }
        // adds Box expansion Hogwarts Cards
        if (activeGame.includes("Box")) {
            hogwartsCards.push(argusFilchAndMrsNorris, fang, finiteIncantatem1, finiteIncantatem2, harp, oldSock1, oldSock2, tergeo1, tergeo2, tergeo3, tergeo4, tergeo5, tergeo6);
            if (activeGame !== "Box 1") {
                hogwartsCards.push(buckbeak, depulso1, depulso2, immobulus1, immobulus2, immobulus3, monsterBookOfMonsters1, monsterBookOfMonsters2, monsterBookOfMonsters3);
                if (activeGame !== "Box 2") {
                    hogwartsCards.push(erumpentHorn, griphook, kreacherTheHouseElf, lacewingFlies1, lacewingFlies2, nox1, nox2, thestral);
                    if (activeGame !== "Box 3") {
                        // TO-DO: add Box 4 hogwarts cards
                    }
                }
            }
        }

        // purchase a Hogwarts card
        hogwartsCards.forEach(card => {
            card.img.onclick = () => {
                if (!document.getElementById("playerChoice")) {
                    const cost = card.cost - (activePlayer.proficiency === "Arithmancy" && card.houseDie ? 1 : 0);
                    if (activePlayer.influence >= cost) {
                        activePlayer.influence -= cost;

                        // History of Magic proficiency
                        if (activePlayer === "History Of Magic" && card.type === "spell") {
                            addPlayerChoice("Give 1 influence to:", () => {return players.length;}, 1, () => {
                                for (let i = 0; i < players.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].heroImage.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++;};
                                }
                            });
                        }

                        // Time Turner, Sorting Hat, and Wingardium Leviosa effects
                        if ((activePlayer.passives.includes(timeTurner) && card.type === "spell") || (activePlayer.passives.includes(sortingHat) && card.type === "ally") || ((activePlayer.passives.includes(wingardiumLeviosa1) || activePlayer.passives.includes(wingardiumLeviosa2) || activePlayer.passives.includes(wingardiumLeviosa3)) && card.type === "item")) {
                            addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = `<p>Top of deck</p><img src="${card.img.src}">`;
                                document.getElementsByClassName("choice")[0].onclick = () => {
                                    activePlayer.draw.unshift(card);
                                };
                                document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard</p><img src="${card.img.src}">`;
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

                        // Dolores Umbridge effect
                        if (activeVillains.includes(doloresUmbridge) && card.cost >= 4 && !doloresUmbridge.petrifiedBy && doloresUmbridge.health > 0) {
                            activePlayer.health--;
                            darken(doloresUmbridge.img);
                        }

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

        // players
        class Player {
            constructor(hero, proficiency) {
                this._hero = hero;
                this._heroImage = document.createElement("img");
                this._heroImage.id = "playerHero";
                this._heroImage.src = "./images/";
                if (activeGame.includes("Game")) this._heroImage.src += parseInt(activeGame[activeGame.length - 1]) < 3 ? "Game 1" : (parseInt(activeGame[activeGame.length - 1]) < 7 ? "Game 3" : "Game 7");
                else this._heroImage.src += "Box 1";
                this._heroImage.src += `/${src(hero)}`;
                this._heroImage.alt = hero;
                this._proficiency = "";
                this._proficiencyImage = document.createElement("div");
                let proficiencyGame = "Game 6";
                if (activeGame === "Game 6" || activeGame === "Game 7" || activeGame.includes("Box")) {
                    if (proficiency === "Patronus") {
                        proficiencyGame = "Box 3";
                        if (hero === "Harry Potter") proficiency = "Stag Patronus";
                        else if (hero === "Ron Weasley") proficiency = "Terrier Patronus";
                        else if (hero === "Hermione Granger") proficiency = "Otter Patronus";
                        else if (hero === "Neville Longbottom") proficiency = "Non-Corporeal Patronus";
                        else if (hero === "Luna Lovegood") proficiency = "Rabbit Patronus";
                        else if (hero === "Ginny Weasley") {
                            proficiencyGame = "Pack 1";
                            proficiency = "Horse Patronus";
                        }
                        else alert(`${hero} is not a valid Hero.`);
                    }
                    this._proficiency = proficiency;
                    this._proficiencyImage = document.createElement("img");
                    this._proficiencyImage.id = "playerProficiency";
                    this._proficiencyImage.src = `./images/${proficiencyGame}/${src(proficiency)}`;
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
                else if (hero === "Luna Lovegood") this._discard = lunaStartingCards;
                // TO-DO: add Ginny Weasley
                else alert(`${hero} is not a valid Hero.`);
                this._petrified = false;
                this._stunned = false;
                this._played = [];
                this._hermioneSpecialUsed = false;
                this._potionsProficiencyUsed = false;
                this._gainedHealth = false;
                this._attacks = 0;
                this._influences = 0;
                this._healthGained = 0;
                this._healthLost = 0;
                this._horcruxesDestroyed = [];
                this._cardsDrawn = -5;
                this._invulnerable = false;
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
            displayHealth() {
                const healthTracker = document.getElementById("healthTracker");
                healthTracker.style.left = `${10.3 + 8.3 * (9 - activePlayer.health)}%`;
                if (activePlayer.health % 2 === 1) {
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
                        this._healthLost += this.health - health;

                        // Invisibility Cloak effect
                        if (this.passives.includes(invisibilityCloak)) {
                            health = this.health - 1;
                        }
                        
                        // Werewolf effect
                        if (activeVillains.includes(werewolf) && this.healthLost >= 4) {
                            activeLocation.addToLocation();
                            this._healthLost = -99;
                        }
                    }
                    // healing
                    else if (this.health < health) {
                        if (!canHeal(this)) {
                            health = this.health;
                        }
                        else {
                            // Neville Longbottom special
                            if (activePlayer.hero === "Neville Longbottom") {
                                if ((!this.gainedHealth && (activeGame === "Game 3" || activeGame === "Game 4" || activeGame === "Game 5" || activeGame === "Game 6")) || activeGame === "Game 7") {
                                    health++;
                                }
                                // Neville Longbottom Box expansion special
                                else if (activeGame.includes("Box")) {
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
                            }
                            this.gainedHealth = true;

                            this._healthGained += health - this.health;
                            if (this.healthGained >= 3) {
                                // Herbology proficiency
                                if (activePlayer.proficiency === "Herbology") {
                                    this.drawCards(1);
                                    this._healthGained = -99;
                                }
                                // Non-Corporeal Patronus
                                else if (activePlayer.proficiency === "Non-Corporeal Patronus") {
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
                if ((!this.stunned && (!encounters.length || encounters[0] !== horcrux3)) || activePlayer === this) {
                    // sets attack
                    this._attack = attack;
                    if (this._attack < 0) {
                        this._attack = 0;
                    }

                    // display attack icons
                    if (activePlayer === this) {
                        document.getElementById("attackTokens").innerHTML = "";
                        for (let i = 0; i < this.attack; i++) {
                            document.getElementById("attackTokens").innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                        }
                    }
                }
            }
            get influence() {
                return this._influence;
            }
            set influence(influence) {
                if ((!this.stunned && (!encounters.length || encounters[0] !== horcrux3)) || activePlayer === this) {
                    // sets influence
                    this._influence = influence;
                    if (this.influence < 0) {
                        this._influence = 0;
                    }
                    
                    // display influence icons
                    if (activePlayer === this) {
                        document.getElementById("influenceTokens").innerHTML = "";
                        for (let i = 0; i < this.influence; i++) {
                            document.getElementById("influenceTokens").innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
                        }
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
                if (!this._hermioneSpecialUsed && spellsCast === 4 && this.hero === "Hermione Granger" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    this._hermioneSpecialUsed = true;
                    if (activeGame.includes("Game")) {
                        if (activeGame === "Game 7") {
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
                    else if (activeGame.includes("Box")) {
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
                // Escape completion
                if (encounters.length && encounters[0] === escape && spellsCast >= 6) this.addDestroyedHorcrux(encounters.shift());

                // check for items cast
                let itemsCast = this.played.filter(card => {return card.type === "item";}).length;

                // check for allies cast
                let alliesCast = this.played.filter(card => {return card.type === "ally";}).length;

                // Horcrux 1 reward
                if (this.horcruxesDestroyed.includes(horcrux1) && alliesCast === 2) {
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
                    alliesCast = 99;
                }

                // Peskipiksi Pesternomi completion
                if (encounters.length && encounters[0] === peskipiksiPesternomi && this.played.filter(card => {return card.cost && card.cost % 2 === 0;}).length === 2) {
                    this.addDestroyedHorcrux(encounters.shift());
                    displayNextEncounter();
                }
                // Third Floor Corridor completion
                else if (encounters.length && encounters[0] === thirdFloorCorridor && spellsCast >= 2 && itemsCast >= 2 && alliesCast >= 2) {
                    this.addDestroyedHorcrux(encounters.shift());
                }
                // Filthy Half-Breed completion
                else if (encounters.length && encounters[0] === filthyHalfBreed && this.played.map(card => {return card.cost;}).filter((cost, ind, arr) => {return arr.indexOf(cost) === ind;}).length >= 3) {
                    this.addDestroyedHorcrux(encounters.shift());
                    displayNextEncounter();
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
                if (this.attacks + this.influences === 3 && this.hero === "Ron Weasley" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    if (activeGame.includes("Game")) {
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
                    else {
                        players.forEach(player => {player.health++;});
                    }
                }

                // Unregistered Animagus completion
                if (encounters.length && encounters[0] === unregisteredAnimagus && this.attacks === 5) {
                    this.addDestroyedHorcrux(encounters.shift());
                    displayNextEncounter();
                }
            }
            get influences() {
                return this._influences;
            }
            set influences(influences) {
                this._influences = influences;

                // Ron Weasley Box expansion special
                if (this.attacks + this.influences === 3 && this.hero === "Ron Weasley" && activeGame.includes("Box")) {
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
                this._horcruxesDestroyed.push(destroyedHorcrux);
                destroyedHorcrux.img.classList.toggle("event");
                document.getElementById("horcruxesDestroyed").appendChild(destroyedHorcrux.img);
                destroyedHorcrux.img.onclick = destroyedHorcrux.reward;
            }
            get cardsDrawn() {
                return this._cardsDrawn;
            }
            set cardsDrawn(cardsDrawn) {
                this._cardsDrawn = cardsDrawn;
            }

            banishAt(index) {
                if (document.getElementById("playerHand").contains(this.hand[index].img)) document.getElementById("playerHand").removeChild(this.hand[index].img);
                if (this.passives.includes(this.hand[index])) this._passives.splice(this.passives.indexOf(this.hand[index]), 1);
                this._hand.splice(index, 1);
                populateOtherHands();
            }
            discardAt(index) {
                this._discard.push(this.hand[index]);
                if (document.getElementById("playerHand").contains(this.hand[index].img)) document.getElementById("playerHand").removeChild(this.hand[index].img);
                this._hand.splice(index, 1);
                if (this !== activePlayer) populateOtherHands();
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
                else if (this.hand[index] === lacewingFlies1) {
                    this.attack++;
                }

                if (villainOrDAE) {
                    // Crabbe and Goyle effect
                    setTimeout(() => {
                        if (activeVillains.includes(crabbeAndGoyle) && !crabbeAndGoyle.petrifiedBy && crabbeAndGoyle.health > 0) {
                            this.health--;
                        }
                    }, 1000);

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
                document.getElementById("playerHand").innerHTML = "";
                this.hand.forEach(card => {
                    document.getElementById("playerHand").appendChild(card.img);
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
                if (card.passive) {
                    this._passives.push(card);
                }
                if (this === activePlayer) {
                    document.getElementById("playerHand").appendChild(card.img);
                }
                card.generateOnClick();

                if (this !== activePlayer) populateOtherHands();
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
                    this.hand.forEach(card => {card.generateOnClick();});
                }
            }
            endTurn() {
                this.petrified = false;
                this.heroImage.remove();
                this.proficiencyImage.remove();
                document.getElementById("horcruxesDestroyed").innerHTML = "";
                while (this.hand.length) this.discardAt(0);
                this.attack = 0;
                this.influence = 0;
                this._passives = [];
                this._played = [];
                this._hermioneSpecialUsed = false;
                this._potionsProficiencyUsed = false;
                this.gainedHealth = false;
                this.attacks = 0;
                this.influences = 0;
                owlsSpells1 = 0;
                owlsSpells2 = 0;
                this._healthGained = 0;
                this._healthLost = 0;
                players.forEach(player => {player._invulnerable = false;});
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
                        addPlayerChoice(`${this.hero} discard:`, () => {return this.hand.length;}, iterations, () => {
                            for (let i = 0; i < this.hand.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML += `<img src="${this.hand[i].img.src}">`;
                                document.getElementsByClassName("choice")[i].onclick = () => {
                                    this.forcedDiscardAt(i, false);
                                }
                            }
                        });
                    };

                    // Stag Patronus
                    const stagPlayer = players.filter(player => {return player !== this && player.proficiency === "Stag Patronus";}).concat([null])[0];
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
        const player1 = new Player(document.querySelector("input[name=\"player1\"]:checked").value, document.querySelector("input[name=\"player1Proficiency\"]:checked").value);
        const player2 = new Player(document.querySelector("input[name=\"player2\"]:checked").value, document.querySelector("input[name=\"player2Proficiency\"]:checked").value);
        const players = [player1, player2];
        /*if (document.getElementById("player3Hero").value) players.push(new Player(document.getElementById("player3Hero").value, document.getElementById("player3Proficiency").value));
        if (document.getElementById("player4Hero").value) players.push(new Player(document.getElementById("player4Hero").value, document.getElementById("player4Proficiency").value));*/
        let activePlayer = players[players.length - 1]; // sets to last hero because turn starts with next hero

        // remove Hogwarts cards for current players
        if (players.map(player => {return player.hero;}).includes("Luna Lovegood") && hogwartsCards.includes(lunaLovegood)) hogwartsCards.splice(hogwartsCards.indexOf(lunaLovegood), 1);

        // locations
        class Location {
            constructor(name, game, number, spaces, darkArtsEventDraws, revealEffect) {
                this._name = name;
                this._img = document.createElement("IMG");
                this._img.id = `location${number}`;
                this._img.className = "location";
                this._img.src = `./images/${game}/${name[0].toLowerCase() + name.substring(1).replaceAll(" ", "").replaceAll("'", "")}.png`;
                this._img.alt = name;
                this._number = number;
                this._spaces = spaces;
                this._darkArtsEventDraws = darkArtsEventDraws;
                this._revealEffect = revealEffect;
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
                    activePlayer.health -= 2;
                    darken(dracoMalfoy.img);
                }
                // Lucius Malfoy effect
                if (activeVillains.includes(luciusMalfoy) && !luciusMalfoy.petrifiedBy && luciusMalfoy.health > 0) {
                    activeVillains.filter(villain => {return villain.type.includes("villain")}).forEach(villain => {villain.health++;});
                    darken(luciusMalfoy.img);
                }
                // Full Moon Rises effect
                if (encounters.length && encounters[0] === fullMoonRises) {
                    activePlayer.addToHand(detention.clone());
                    darken(fullMoonRises.img);
                }
            }
            removeFromLocation() {
                // Barty Crouch Jr and Defensive Training effect
                let defensiveTrainingEffect = encounters.length && encounters[0] === defensiveTraining;
                if ((!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) && !defensiveTrainingEffect) {
                    // Harry Potter special
                    if (!this.removed && players.filter(player => {return player.hero === "Harry Potter";}).length && activeGame !== "Game 1" && activeGame !== "Game 2" && activeGame.includes("Game")) {
                        addPlayerChoice(`Gain 1 attack:`, () => {return players.length;}, activeGame === "Game 7" ? 2 : 1, () => {
                            for (let i = 0; i < players.length; i++) {
                                document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode());
                                document.getElementsByClassName("choice")[i].onclick = () => {players[i].attack++;};
                            }
                        });
                    }
                    // Harry Potter Box expansion special
                    else if (players.filter(player => {return player.hero === "Harry Potter";}).length && activeGame.includes("Box")) {
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
                else if (bartyCrouchJr.img) darken(bartyCrouchJr.img);
                else if (defensiveTraining.img) darken(defensiveTraining.img);
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
        const triwizardMaze = new Location("Triwizard Maze", "Box 4", 4, 7, 3, () => {});
        const theBlackLake = new Location("The Black Lake", "Pack 1", 1, 5, 1, () => {});
        const theHospitalWing = new Location("The Hospital Wing", "Pack 1", 2, 7, 2, () => {});
        const theHogwartsLibrary = new Location("The Hogwarts Library", "Pack 1", 3, 7, 3, () => {});
        const ministryOfMagicAtrium = new Location("Ministry Of Magic Atrium", "Pack 2", 1, 6, 1, () => {});
        const ministryCourtroom = new Location("Ministry Courtroom", "Pack 2", 2, 6, 2, () => {});
        const ministryLift = new Location("Ministry Lift", "Pack 2", 3, 7, 3, () => {});
        const malfoyManor = new Location("Malfoy Manor", "Pack 3", 1, 5, 1, () => {});
        const cave = new Location("Cave", "Pack 3", 2, 6, 2, () => {});
        const atopTheTower = new Location("Atop The Tower", "Pack 3", 3, 6, 3, () => {});
        const greatHallPack = new Location("Great Hall", "Pack 4", 1, 6, 1, () => {});
        const forestClearing = new Location("Forest Clearing", "Pack 4", 2, 6, 2, () => {});
        const castleCourtyard = new Location("Castle Courtyard", "Pack 4", 3, 7, 3, () => {});
        let locations = [diagonAlley, mirrorOfErised, forbiddenForest, quidditchPitch, chamberOfSecrets, hogwartsExpress, hogsmeadeVillage, shriekingShack, quidditchWorldCup, triwizardTournament, graveyard, azkaban, hallOfProphecy, ministryOfMagic, knockturnAlley, theBurrow, astronomyTower, godricsHollow, gringotts, roomOfRequirement, hogwartsCastle, castleGates, hagridsHut, greatHallBox, dADAClassroom, castleHallways, whompingWillow, unicornHallow, aragogsLair, giantClearing, selectionOfChampions, dragonArena, mermaidVillage, triwizardMaze, theBlackLake, theHospitalWing, theHogwartsLibrary, ministryOfMagicAtrium, ministryCourtroom, ministryLift, malfoyManor, cave, atopTheTower, greatHallPack, forestClearing, castleCourtyard].filter(loc => {return loc.game === activeGame});
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
        const expulso1 = new DarkArtsEvent("Expulso", "Game 1", () => {activePlayer.health -= 2;});
        const expulso2 = expulso1.clone();
        const expulso3 = expulso1.clone();
        const flipendo1 = new DarkArtsEvent("Flipendo", "Game 1", () => {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML += `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}}); activePlayer.health--;});
        const flipendo2 = flipendo1.clone();
        const heWhoMustNotBeNamed1 = new DarkArtsEvent("He Who Must Not Be Named", "Game 1", () => {activeLocation.addToLocation()});
        const heWhoMustNotBeNamed2 = heWhoMustNotBeNamed1.clone();
        const heWhoMustNotBeNamed3 = heWhoMustNotBeNamed1.clone();
        const petrification1 = new DarkArtsEvent("Petrification", "Game 1", () => {players.forEach(player => {player.health--; player.petrified = true;});});
        const petrification2 = petrification1.clone();
        const handOfGlory1 = new DarkArtsEvent("Hand Of Glory", "Game 2", () => {activePlayer.health--; activeLocation.addToLocation();});
        const handOfGlory2 = handOfGlory1.clone();
        const obliviate = new DarkArtsEvent("Obliviate", "Game 2", () => {players.forEach(player => {const spells = () => {return player.hand.filter(card => {return card.type === "spell";});}; if (spells().length && player.health > 0) {addPlayerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(spells()); document.getElementsByClassName("choice")[0].onclick = () => {if (spells().length > 1) {playerChoices.unshift(new PlayerChoice(`${player.hero} discards:`, () => {return spells().length;}, 1, () => {for (let i = 0; i < spells().length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells()[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells()[i]), true);};}}));} else player.forcedDiscardAt(player.hand.indexOf(spells()[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else if (player.health > 0) player.health -= 2;});});
        const poison = new DarkArtsEvent("Poison", "Game 2", () => {
            players.forEach(player => {
                const allies = () => {return player.hand.filter(card => {return card.type === "ally";});}; 
                if (allies().length && player.health > 0) {
                    addPlayerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {
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
        const relashio = new DarkArtsEvent("Relashio", "Game 2", () => {players.forEach(player => {const items = () => {return player.hand.filter(card => {return card.type === "item";});}; if (items().length) {addPlayerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(items()); document.getElementsByClassName("choice")[0].onclick = () => {if (items().length > 1) {playerChoices.unshift(new PlayerChoice(`${player.hero} discards:`, () => {return items().length;}, 1, () => {for (let i = 0; i < items().length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items()[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items()[i]), true);};}}));} else player.forcedDiscardAt(player.hand.indexOf(items()[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const dementorsKiss1 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); activePlayer.health--;});
        const dementorsKiss2 = dementorsKiss1.clone();
        const oppugno = new DarkArtsEvent("Oppugno", "Game 3", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].cost) {const tempPetrified = player.petrified; player.petrified = false; activePlayer.cardsDrawn--; player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.petrified = tempPetrified; player.health -= 2;}});});
        const tarantallegra = new DarkArtsEvent("Tarantallegra", "Game 3", () => {activePlayer.health--;});
        const avadaKedavra1 = new DarkArtsEvent("Avada Kedavra", "Game 4", () => {activePlayer.health -= 3; if (activePlayer.stunned) activeLocation.addToLocation();});
        const crucio1 = new DarkArtsEvent("Crucio", "Game 4", () => {activePlayer.health--;});
        const heirOfSlytherin1 = new DarkArtsEvent("Heir Of Slytherin", "Game 4", () => {rollHouseDie("green", true, false);});
        const heirOfSlytherin2 = heirOfSlytherin1.clone();
        const imperio1 = new DarkArtsEvent("Imperio", "Game 4", () => {const otherPlayers = players.filter(player => {return player !== activePlayer;}); if (otherPlayers.length) {if (otherPlayers.length > 1) {addPlayerChoice("Choose to lose 2 health:", () => {return otherPlayers.length;}, 1, () => {for (let i = 0; i < otherPlayers.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${otherPlayers[i].img.src}"><p>Health: ${otherPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {otherPlayers[i].health -= 2;};}});} else otherPlayers[0].health -= 2;}});
        const morsmordre1 = new DarkArtsEvent("Morsmordre", "Game 4", () => {players.forEach(player => {player.health--;});activeLocation.addToLocation(); if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});});
        const morsmordre2 = morsmordre1.clone();
        const regeneration = new DarkArtsEvent("Regeneration", "Game 4", () => {activeVillains.filter(villain => {return villain.type.includes("villain")}).forEach(villain => {villain.health += 2;})});
        const avadaKedavra2 = avadaKedavra1.clone();
        const crucio2 = crucio1.clone();
        const educationalDecree1 = new DarkArtsEvent("Educational Decree", "Game 5", () => {activePlayer.hand.forEach(card => {if (card.cost - (activePlayer.proficiency === "Arithmancy" && card.houseDie) ? 1 : 0 >= 4) activePlayer.health--;});});
        const educationalDecree2 = educationalDecree1.clone();
        const imperio2 = imperio1.clone();
        const legilimency = new DarkArtsEvent("Legilimency", "Game 5", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].type === "spell") {player.cardsDrawn--; player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.health -= 2;}});});
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
        const blastEnded = new DarkArtsEvent("Blast Ended", "Box 1", () => {let hurtPlayer = players.indexOf(activePlayer) ? players[players.indexOf(activePlayer) - 1] : players[players.length - 1]; hurtPlayer.health--; if (hurtPlayer.hand.length) {if (hurtPlayer.hand.length > 1) {addPlayerChoice(`Discard for ${hurtPlayer.hero}:`, () => {return hurtPlayer.hand.length;}, 1, () => {for (let i = 0; i < hurtPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${hurtPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayer.forcedDiscardAt(i, true);};}});} else hurtPlayer.forcedDiscardAt(0, true);}});
        const inquisitorialSquad1 = new DarkArtsEvent("Inquisitorial Squad", "Box 1", () => {activePlayer.addToHand(detention.clone()); players.forEach(player => {player.health -= player.hand.filter(card => {return card.name === "Detention"}).length});});
        const inquisitorialSquad2 = inquisitorialSquad1.clone();
        const menacingGrowl1 = new DarkArtsEvent("Menacing Growl", "Box 1", () => {players.forEach(player => {player.health -= player.hand.filter(card => {return card.cost === 3}).length;});});
        const menacingGrowl2 = menacingGrowl1.clone();
        const ragingTroll1 = new DarkArtsEvent("Raging Troll", "Box 1", () => {players[players.indexOf(activePlayer) === players.length - 1 ? 0 : players.indexOf(activePlayer) + 1].health -= 2; activeLocation.addToLocation();});
        const ragingTroll2 = ragingTroll1.clone();
        const slugulusEructo = new DarkArtsEvent("Slugulus Eructo", "Box 1", () => {players.forEach(player => {player.health -= activeVillains.filter(villain => {return villain.type.includes("creature");}).length});});
        const bombarda1 = new DarkArtsEvent("Bombarda", "Box 2", () => {players.forEach(player => {player.discard.push(detention.clone());});});
        const bombarda2 = bombarda1.clone();
        const theGrim = new DarkArtsEvent("The Grim", "Box 2", () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}});} else activePlayer.forcedDiscardAt(0, true);} activeLocation.addToLocation();});
        const transformed1 = new DarkArtsEvent("Transformed", "Box 2", () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}});} else activePlayer.forcedDiscardAt(0, true); activePlayer.addToHand(detention.clone());}});
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
        const seriouslyMisunderstoodCreatures1 = new DarkArtsEvent("Seriously Misunderstood Creatures", "Box 3", () => {rollHouseDie("phoenix", true, true);}); // TO-DO: not same as Boggart
        const seriouslyMisunderstoodCreatures2 = seriouslyMisunderstoodCreatures1.clone();
        if (activeGame.includes("Box")) {
            darkArtsEvents.push(blastEnded, inquisitorialSquad1, inquisitorialSquad2, menacingGrowl1, menacingGrowl2, ragingTroll1, ragingTroll2, slugulusEructo);
            if (activeGame !== "Box 1") {
                darkArtsEvents.push(bombarda1, bombarda2, theGrim, transformed1, transformed2, viciousBite1, viciousBite2);
                if (activeGame !== "Box 2") {
                    darkArtsEvents.push(acromantulaAttack1, acromantulaAttack2, bombarda3, centaurAttack1, centaurAttack2, fightAndFlight, seriouslyMisunderstoodCreatures1, seriouslyMisunderstoodCreatures2);
                    if (activeGame !== "Box 3") {
                        // TO-DO: add Box 4 DAEs
                    }
                }
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
                this._img.src = `./images/${activeGame.includes("Box") && (name === "Basilisk" || name === "Dementor") ? "Box 1" : game}/${src(name)}`;
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
            get health() {
                return this._health;
            }
            get influence() {
                return this._influence;
            }
            displayDamage() {
                document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                for (let i = 0; i < this._maxHealth - this.health; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">";
                }
                for (let i = 0; i < this._maxInfluence - this.influence; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
                }
            }
            setHealth(health, healthType) {
                // set up for correct healthType
                let thisHealth = this.health;
                let thisMaxHealth = this._maxHealth;
                if (healthType === "influence") {
                    thisHealth = this.influence;
                    thisMaxHealth = this._maxInfluence;
                }

                if (health > thisMaxHealth) health = thisMaxHealth;
                else if (health < thisHealth) {
                    if (healthType === "influence") this.influenceDamageTaken++;
                    else this.attackDamageTaken++;

                    // Confundus effect
                    if (activeVillains.every(villain => {return villain.attackDamageTaken}) && (activePlayer.passives.includes(confundus1) || activePlayer.passives.includes(confundus2))) {
                        if (activePlayer.passives.includes(confundus1)) activePlayer.passives.splice(activePlayer.passives.indexOf(confundus1), 1);
                        else if (activePlayer.passives.includes(confundus2)) activePlayer.passives.splice(activePlayer.passives.indexOf(confundus2), 1);
                        activeLocation.removeFromLocation();
                    }

                    // Care of Magical Creatures proficiency
                    if (thisHealth === thisMaxHealth && activePlayer.proficiency === "Care Of Magical Creatures" && this.type.includes("creature")) {
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

                    // Horcrux 2 effect
                    if (encounters[0] === horcrux2 && this.attackDamageTaken === 2) {
                        activePlayer.health -= 2;
                        darken(horcrux2.img);
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
                    setTimeout(() => {
                        if (activeVillains.includes(this)) {
                            document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].innerHTML = "";
                            document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                            document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].onclick = () => {};
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
                                if (activePlayer.passives.includes(viktorKrum)) {
                                    activePlayer.influence++;
                                    activePlayer.health++;
                                }
                            }
                            if (this.type.includes("creature")) { // some rewards are specific to creatures
                                // Immobulus effect
                                if (activePlayer.passives.includes(immobulus1)) activeLocation.removeFromLocation();
                                if (activePlayer.passives.includes(immobulus2)) activeLocation.removeFromLocation();
                                if (activePlayer.passives.includes(immobulus3)) activeLocation.removeFromLocation();
                                // Care of Magical Creatures proficiency
                                if (activePlayer.proficiency === "Care Of Magical Creatures") {
                                    setTimeout(() => {
                                        activeLocation.removeFromLocation();
                                        darken(activePlayer.proficiencyImage);
                                    }, 1000);
                                }
                            }
                            if (encounters.length) {
                                let allVillainsDefeated = true;
                                for (let i = 0; i < document.getElementsByClassName("activeVillain").length; i++) {
                                    if (document.getElementsByClassName("activeVillain")[i].innerHTML !== "") allVillainsDefeated = false;
                                }
                                if (allVillainsDefeated) {
                                    // Unregistered Animgaus backup completion
                                    if (encounters[0] === unregisteredAnimagus && !inactiveVillains.length) {
                                        activePlayer.addDestroyedHorcrux(encounters.shift());
                                        displayNextEncounter();
                                    }
                                    // Full Moon Rises completion
                                    if (encounters[0] === fullMoonRises) {
                                        activePlayer.addDestroyedHorcrux(encounters.shift());
                                        displayNextEncounter();
                                    }
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
        }
        const crabbeAndGoyle = new Villain("Crabbe And Goyle", "Game 1", "villain", 5, 0, () => {}, () => {players.forEach(player => {player.drawCards(1);});}, true);
        const dracoMalfoy = new Villain("Draco Malfoy", "Game 1", "villain", 6, 0, () => {}, () => {activeLocation.removeFromLocation();}, true);
        const quirinusQuirrell = new Villain("Quirinus Quirrell", "Game 1", "villain", 6, 0, () => {activePlayer.health--;}, () => {players.forEach(player => {player.influence++; player.health++;});}, false);
        const basilisk = new Villain("Basilisk", "Game 2", "villain-creature", 8, 0, () => {players.forEach(player => {player.petrified = true});}, () => {players.forEach(player => {player.drawCards(1);}); activeLocation.removeFromLocation();}, false);
        const luciusMalfoy = new Villain("Lucius Malfoy", "Game 2", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.influence++;}); activeLocation.removeFromLocation();}, true);
        const tomRiddle = new Villain("Tom Riddle", "Game 2", "villain", 6, 0, () => {
            let allies = activePlayer.hand.filter(card => {return card.type === "ally";}); 
            const tomRiddleEffect = () => {
                addPlayerChoice("Lose:", () => {allies = allies.filter(card => {return activePlayer.hand.includes(card);}); if (allies.length) return 2; return 0;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health -= 2; allies.pop(); tomRiddleEffect();}; 
                    document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(activePlayer.hand); 
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        playerChoices.unshift(new PlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {
                            for (let j = 0; j < activePlayer.hand.length; j++) {
                                document.getElementsByClassName("choice")[j].innerHTML = `<img src="${activePlayer.hand[j].img.src}">`; document.getElementsByClassName("choice")[j].onclick = () => {
                                    if (allies.includes(activePlayer.hand[j])) allies.splice(allies.indexOf(activePlayer.hand[j]), 1); 
                                    activePlayer.forcedDiscardAt(j, true); 
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
                        playerChoices.unshift(new PlayerChoice("Add to hand:", () => {return allies.length;}, 1, () => {
                            for (let i = 0; i < allies.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; 
                                document.getElementsByClassName("choice")[i].onclick = () => {putAllyInHand(i)};
                            }
                        }));
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
        const dementor = new Villain("Dementor", "Game 3", "villain-creature", 8, 0, () => {activePlayer.health -= 2;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();}, false);
        const peterPettigrew = new Villain("Peter Pettigrew", "Game 3", "villain", 7, 0, () => {if (!activePlayer.draw.length) activePlayer.shuffle(); if (activePlayer.draw[0].cost) {const tempPetrified = activePlayer.petrified; activePlayer.petrified = false; activePlayer.cardsDrawn--; activePlayer.drawCards(1); activePlayer.forcedDiscardAt(activePlayer.hand.length - 1, true); activePlayer.petrified = tempPetrified; activeLocation.addToLocation();}}, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell";}); if (spells.length) {const discardToHand = index => {player.discard.splice(player.discard.indexOf(spells[index]), 1); player.addToHand(spells[index]);}; if (spells.length === 1) discardToHand(0); else {addPlayerChoice(`${player.hero} move from Discard to Hand:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});}}}); activeLocation.removeFromLocation();}, false);
        const bartyCrouchJr = new Villain("Barty Crouch Jr", "Game 4", "villain", 7, 0, () => {}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const deathEater1 = new Villain("Death Eater", "Game 4", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();}, true);
        const deathEater2 = new Villain("Death Eater", "Game 5", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();}, true);
        const doloresUmbridge = new Villain("Dolores Umbridge", "Game 5", "villain", 7, 0, () => {}, () => {players.forEach(player => {player.influence++; player.health += 2;});}, true);
        const lordVoldemort1 = new Villain("Lord Voldemort", "Game 5", "villain", 10, 0, () => {activePlayer.health--; if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}});} else activePlayer.forcedDiscardAt(0, true);}}, () => {}, false);
        const bellatrixLestrange = new Villain("Bellatrix Lestrange", "Game 6", "villain", 9, 0, () => {}, () => {players.forEach(player => {const items = player.discard.filter(card => {return card.type === "item"}); if (items.length) {const discardToHand = index => {player.addToHand(items[index]); player.discard.splice(player.discard.indexOf(items[index]), 1);}; if (items.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const fenrirGreyback = new Villain("Fenrir Greyback", "Game 6", "villain", 8, 0, () => {}, () => {players.forEach(player => {player.health += 3;}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, true);
        const lordVoldemort2 = new Villain("Lord Voldemort", "Game 6", "villain", 15, 0, () => {rollHouseDie("green", true, false);}, () => {}, false);
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
        const cornishPixies = new Villain("Cornish Pixies", "Box 1", "creature", 6, 0, () => {activePlayer.health -= activePlayer.hand.filter(card => {return card.cost && card.cost % 2 === 0;}).length * 2}, () => {players.forEach(player => {player.health += 2; player.influence++;});}, false);
        const fluffy = new Villain("Fluffy", "Box 1", "creature", 8, 0, () => {
            let items = activePlayer.hand.filter(card => {return card.type === "item";});
            const fluffyEffect = () => { 
                const fluffyDiscard = () => {
                    for (let i = 0; i < activePlayer.hand.length; i++) {
                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {
                            if (items.includes(activePlayer.hand[i])) items.splice(items.indexOf(activePlayer.hand[i]), 1); 
                            activePlayer.forcedDiscardAt(i, false); 
                            items.pop();
                            fluffyEffect();
                        };
                    }
                };
                addPlayerChoice("Lose:", () => {items = items.filter(card => {return activePlayer.hand.includes(card);}); if (items.length) return 2; return 0;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health--; items.pop(); fluffyEffect();}; 
                    document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(activePlayer.hand); 
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        playerChoices.unshift(new PlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, fluffyDiscard));
                    };
                });
            };
            fluffyEffect();
        }, () => {players.forEach(player => {player.health++; player.drawCards(1);});}, false);
        const norbert = new Villain("Norbert", "Box 1", "creature", 0, 6, () => {activePlayer.health -= 1 + activePlayer.hand.filter(card => {return card.name === "Detention";}).length;}, () => {players.forEach(player => {
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
            if (activePlayer.health) {
                addPlayerChoice("Choose 1:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<p>Lose:</p><div class="choiceContainer">${healthToken + healthToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health -= 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<img src="./images/Box 1/detention.png"><p>Add to Discard</p>`;
                    document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.discard.push(detention.clone());};
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
        const boggart = new Villain("Boggart", "Box 2", "creature", 5, 3, () => {rollHouseDie("phoenix", true, true);}, () => {rollHouseDie("phoenix", false, true)}, false);
        const scabbers = new Villain("Scabbers", "Box 2", "villain-creature", 7, 0, () => {if (!activePlayer.draw.length) activePlayer.shuffle(); if (activePlayer.draw[0].cost) {const tempPetrified = activePlayer.petrified; activePlayer.petrified = false; activePlayer.cardsDrawn--; activePlayer.drawCards(1); activePlayer.forcedDiscardAt(activePlayer.hand.length - 1, true); activePlayer.petrified = tempPetrified; activePlayer.health -= 2;}}, () => {players.forEach(player => {const cheapCards = player.discard.filter(card => {return card.cost <= 3;}); if (cheapCards.length) {const discardToHand = index => {player.addToHand(cheapCards[index]); player.discard.splice(player.discard.indexOf(cheapCards[index]), 1);}; if (cheapCards.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return cheapCards.length;}, 1, () => {for (let i = 0; i < cheapCards.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${cheapCards[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation();}, false);
        const werewolf = new Villain("Werewolf", "Box 2", "creature", 5, 4, () => {}, () => {
            activeLocation.removeFromLocation();
            players.forEach(player => {
                addPlayerChoice(`Choose 1 for ${player.hero}:`, () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`;
                    document.getElementsByClassName("choice")[1].onclick = () => {player.health += 2;};
                });
            });
        }, true);
        const aragog = new Villain("Aragog", "Box 3", "creature", 8, 0, () => {activePlayer.health -= activeVillains.filter(villain => {return villain.type.includes("creature");}).length;}, () => {players.forEach(player => {player.health += 2; player.influence++;}); activeLocation.removeFromLocation();}, false);
        const centaur = new Villain("Centaur", "Box 3", "creature", 0, 7, () => {
            const spells = () => {return activePlayer.hand.filter(card => {return card.type === "spell";});};
            if (spells().length && activePlayer.health > 0) {
                addPlayerChoice("Lose:", () => {return 2;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`;
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health -= 2;};
                    document.getElementsByClassName("choice")[1].innerHTML = `<p>Discard:</p>${choiceScroll(spells())}`;
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        if (spells().length > 1) {
                            playerChoices.unshift(new PlayerChoice("Discard:", () => {return spells().length;}, 1, () => {
                                for (let i = 0; i < spells().length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells()[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spells()[i]), true);};
                                }
                            }));
                        }
                        else activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spells()[0]), true);
                    };
                });
            }
            else if (activePlayer.health > 0) activePlayer.health -= 2;
        }, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell"}); if (spells.length) {const discardToHand = index => {player.addToHand(spells[index]); player.discard.splice(player.discard.indexOf(spells[index]), 1);}; if (spells.length > 1) {addPlayerChoice(`${player.hero} move from discard to hand:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation();}, false);
        const grawp = new Villain("Grawp", "Box 3", "creature", 0, 8, () => {if (activePlayer.hand.length >= 6) activePlayer.health -= 2;}, () => {players.forEach(player => {
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
        const ukrainianIronbelly = new Villain("Ukrainian Ironbelly", "Box 3", "creature", 8, 0, () => {if (activePlayer.hand.filter(card => {return card.type === "ally";}).length && activePlayer.hand.filter(card => {return card.type === "item";}).length) activePlayer.health -= 3;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();}, false);
        if (activeGame.includes("Box")) {
            inactiveVillains.push(cornishPixies, fluffy, norbert, troll);
            if (activeGame !== "Box 1") {
                inactiveVillains.push(boggart, scabbers, werewolf);
                if (activeGame !== "Box 2") {
                    inactiveVillains.push(aragog, centaur, grawp, ukrainianIronbelly);
                    if (activeGame !== "Box 3") {
                        // TO-DO: add Box 4 villains
                    }
                }
            }
            shuffle(inactiveVillains);
        }
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
            get remaining() {
                return this._remaining;
            }
            addSymbol(symbol) {
                if (this._destroys.includes(symbol)) {
                    if (this._name.includes("1") || this._name.includes("2")) this._remaining = [];
                    else if (this.remaining.includes(symbol)) {
                        this._remaining.splice(this.remaining.indexOf(symbol), 1);

                        // add token img
                        if (this._remaining.length) {
                            const symbolImg = document.createElement("IMG");
                            symbolImg.className = "symbol";
                            symbolImg.src = `./images/${symbol}Symbol.png`;
                            let symbolIndex = this._destroys.indexOf(symbol);
                            let thatSymbolsInDestroys = this._destroys.filter(destroyer => {return destroyer === symbol;}).length;
                            if (thatSymbolsInDestroys > 1) {
                                let thatSymbolRemaining = this._remaining.filter(remainder => {return remainder === symbol;}).length;
                                while (thatSymbolsInDestroys - thatSymbolRemaining > 1) {
                                    symbolIndex += this._destroys.slice(symbolIndex + 1).indexOf(symbol) + 1;
                                    thatSymbolRemaining++;
                                }
                            }
                            symbolImg.style.left = `${this === horcrux6 || this === defensiveTraining || this === forbiddenForestEncounter ? (5 + 13 * symbolIndex) : (6 + 20 * symbolIndex)}%`;
                            document.getElementById("encounters").appendChild(symbolImg);
                        }
                    }
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
        const horcrux2 = new Encounter("Horcrux 2", "Game 7", ["attack", "influence"], () => {}, () => {if (activePlayer.hand.length >= 2 && (!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) && (activeLocation.number > 1 || activeLocation.added)) {if (activePlayer.hand.length > 2) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else {activePlayer.forcedDiscardAt(0, false); activePlayer.forcedDiscardAt(0, false);} activeLocation.removeFromLocation(); horcrux2.img.onclick = () => {};}});
        const horcrux3 = new Encounter("Horcrux 3", "Game 7", ["attack", "health"], () => {}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("green", false, false); horcrux3.img.onclick = () => {};}});
        const horcrux4 = new Encounter("Horcrux 4", "Game 7", ["health", "influence"], () => {activeVillains.forEach(villain => {villain.health++;});}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("yellow", false, false); horcrux4.img.onclick = () => {};}});
        const horcrux5 = new Encounter("Horcrux 5", "Game 7", ["draw", "attack"], () => {if (activePlayer.hand.filter(card => {return card.type === "ally"}).length && activePlayer.hand.filter(card => {return card.type === "item"}).length && activePlayer.hand.filter(card => {return card.type === "spell"}).length) activePlayer.health -= 2;}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {addPlayerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("blue", false, false); horcrux5.img.onclick = () => {};}});
        const horcrux6 = new Encounter("Horcrux 6", "Game 7", ["attack", "draw", "health"], () => {activePlayer.health--;}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, 1000); activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(horcrux6), 1); horcrux6.img.remove();});
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
            activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(studentsOutOfBed), 1);
            studentsOutOfBed.img.remove();
        });
        const thirdFloorCorridor = new Encounter("Third Floor Corridor", "Box 1", [], () => {}, () => {
            if (defeatedVillains.length) defeatedVillains[defeatedVillains.length - 1].reward();
            activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(thirdFloorCorridor), 1);
            thirdFloorCorridor.img.remove();
        });
        const unregisteredAnimagus = new Encounter("Unregistered Animagus", "Box 2", [], () => {if (activeLocation.added >= 2) activePlayer.health--;}, () => {rollHouseDie("phoenix", false, true); rollHouseDie("phoenix", false, true); unregisteredAnimagus.img.remove(); activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(unregisteredAnimagus), 1);});
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
                                        activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(fullMoonRises), 1);
                                        fullMoonRises.img.remove();
                                    };
                                }
                                for (let i = 0; i < player.discard.length; i++) {
                                    document.getElementsByClassName("choice")[player.hand.length + i].innerHTML = `<img src="${player.discard[i].img.src}">`;
                                    document.getElementsByClassName("choice")[player.hand.length + i].onclick = () => {
                                        player.hand.unshift(player.discard.splice(i, 1)[0]);
                                        player.banishAt(0);
                                        activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(fullMoonRises), 1);
                                        fullMoonRises.img.remove();
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
            activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(defensiveTraining), 1);
            defensiveTraining.img.remove();
        });
        const forbiddenForestEncounter = new Encounter("Forbidden Forest", "Box 3", ["draw", "health", "influence"], () => {if (activeVillains.filter(villain => {return villain.type.includes("creature");}).length >= 2) activePlayer.health--;}, () => {});
        const filthyHalfBreed = new Encounter("Filthy Half-Breed", "Box 3", [], () => {if (activeShops.filter(card => {return card.type === "spell";}).length >= 2) activePlayer.health--;}, () => {
            if (activePlayer.hand.length) {
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
                activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(filthyHalfBreed), 1); 
                filthyHalfBreed.img.remove();
            }
        });
        const escape = new Encounter("Escape", "Box 3", [], () => {}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000); activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(escape), 1); escape.img.remove();});
        let encounters = [];
        if (activeGame === "Game 7") encounters = [horcrux1, horcrux2, horcrux3, horcrux4, horcrux5, horcrux6];
        else if (activeGame === "Box 1") encounters = [peskipiksiPesternomi, studentsOutOfBed, thirdFloorCorridor];
        else if (activeGame === "Box 2") encounters = [unregisteredAnimagus, fullMoonRises, defensiveTraining];
        else if (activeGame === "Box 3") encounters = [forbiddenForestEncounter, filthyHalfBreed, escape];

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
        <div id="playerContainer">
            <div id="heroImage" style="display: flex"></div>
            <div id="horcruxesDestroyed"></div>
            <div id="playerBoardContainer">
                <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
                <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
                <div id="attackTokens"></div>
                <div id="influenceTokens"></div>
            </div>
            <div id="playerHand"></div>
            <div id="otherPlayerHands"></div>
            <input type="button" id="endTurn" value="End Turn">
        </div>`;
        const disableScreen = document.createElement("DIV");
        disableScreen.id = "disableScreen";
        document.getElementsByTagName("MAIN")[0].appendChild(disableScreen);

        // add locations and events to board
        locations.toReversed().forEach(location => {document.getElementById("locations").appendChild(location.img);});
        if (encounters.length) document.getElementById("encounters").appendChild(encounters[0].img);

        // Hogwarts Castle special
        if (hogwartsCastle.img) {
            hogwartsCastle.img.onclick = () => {
                if (activePlayer.attack >= 5 && !document.getElementById("playerChoice")) {
                    hogwartsCastle.removeFromLocation();
                    activePlayer.attack -= 5;
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
                            activePlayer.attack--;
                            activeVillains[i].health--;
                            activePlayer.attacks++;
                        };
                        const damageWithInfluence = () => {
                            activePlayer.influence--;
                            activeVillains[i].influence--;
                            activePlayer.influences++;
                        };
                        if (activePlayer.attack > 0 && activePlayer.influence > 0 && activeVillains[i].health && activeVillains[i].influence && !activeVillains[i].influenceDamageTaken) {
                            addPlayerChoice("Damage with:", () => {return 2;}, 1, () => {
                                document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                                document.getElementsByClassName("choice")[0].onclick = damageWithAttack;
                                document.getElementsByClassName("choice")[1].innerHTML = influenceToken;
                                document.getElementsByClassName("choice")[1].onclick = damageWithInfluence;
                            });
                        }
                        else if (activePlayer.attack > 0 && activeVillains[i].health) {
                            damageWithAttack();
                        }
                        else if (activePlayer.influence > 0 && activeVillains[i].influence && !activeVillains[i].influenceDamageTaken) {
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

        // start a new turn
        let firstTurn = true;
        const startTurn = () => {
            // disable all events
            disableScreen.style.display = "block";
            let root = document.querySelector(":root");
            root.style.setProperty("--playerChoiceDisplay", "none");
            root.style.setProperty("--revealBoardDisplay", "none");

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
            activePlayer.horcruxesDestroyed.forEach(horcrux => {document.getElementById("horcruxesDestroyed").appendChild(horcrux.img);});
            activePlayer.attack = activePlayer.attack;
            activePlayer.influence = activePlayer.influence;
            populateOtherHands();

            // unstun everyone
            players.forEach(player => {
                if (player.stunned) {
                    player.stunned = false;
                    player.health = 10;
                }
            });

            // Charms proficiency
            if (activePlayer.proficiency === "Charms" && !activePlayer.petrified) {
                document.getElementById("playerProficiency").onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        let spells = activePlayer.hand.filter(card => {return card.type === "spell";});
                        if (spells.length >= 2) {
                            if (spells.length > 2) {
                                addPlayerChoice("Discard:", () => {spells = spells.filter(spell => {return activePlayer.hand.includes(spell);}); return spells.length;}, 2, () => {
                                    for (let i = 0; i < spells.length; i++) {
                                        document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`;
                                        document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spells[i]), false)};
                                    }
                                });
                            }
                            else spells.forEach(spell => {activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spell), false);});
                            players.forEach(player => {player.influence++; player.drawCards(1);});
                        }
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                };
            }
            // Flying Lessons proficiency
            else if (activePlayer.proficiency === "Flying Lessons") {
                document.getElementById("playerProficiency").onclick = () => {
                    if (activePlayer.influence >= 5 && !document.getElementById("playerChoice")) {
                        activePlayer.influence -= 5;
                        activeLocation.removeFromLocation();
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                }
            }
            // Transfiguration proficiency
            else if (activePlayer.proficiency === "Transfiguration") {
                document.getElementById("playerProficiency").onclick = () => {
                    if (!document.getElementById("playerChoice")) {
                        const items = activePlayer.hand.filter(card => {return card.type === "item";});
                        if (items.length) {
                            const transfigure = itemIndex => {
                                activePlayer.shuffle();
                                const cheapos = activePlayer.draw.filter(card => {return card.cost <= 5;});
                                if (cheapos.length) {
                                    const drawCheapo = cheapoIndex => {
                                        const drawIndex = activePlayer.draw.indexOf(cheapos[cheapoIndex]);
                                        const tempCard = activePlayer.draw[drawIndex];
                                        activePlayer.draw[drawIndex] = activePlayer.draw[0];
                                        activePlayer.draw[0] = tempCard;
                                        activePlayer.addToHand(activePlayer.draw.shift());
                                        activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(items[itemIndex]), false);
                                        activePlayer.shuffle();
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
                            document.getElementById("playerProficiency").onclick = () => {};
                        }
                    }
                };
            }
            // Otter Patronus
            else if (activePlayer.proficiency === "Otter Patronus") {
                document.getElementById("playerProficiency").onclick = () => {
                    if (activePlayer.influence >= 1 && !document.getElementById("playerChoice")) {
                        activePlayer.influence--;
                        if (!activePlayer.draw.length) activePlayer.shuffle();
                        if (activePlayer.draw[0].type === "spell") {
                            activePlayer.drawCards(1);
                            activePlayer.attack++;
                        }
                        else addPlayerChoice("Top card:", () => {return 1;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${activePlayer.draw[0].img.src}">`;});
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                }
            }
            // Rabbit Patronus
            else if (activePlayer.proficiency === "Rabbit Patronus") {
                document.getElementById("playerProficiency").onclick = () => {
                    const spells = activePlayer.hand.filter(card => {return card.type === "spell";});
                    if (spells.length && !document.getElementById("playerChoice")) {
                        if (spells.length > 1) {
                            addPlayerChoice("Discard:", () => {return spells.length;}, 1, () => {
                                for (let i = 0; i < spells.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spells[i]), false);};
                                }
                            });
                        }
                        else activePlayer.forcedDiscardAt(activePlayer.hand.indexOf(spells[0]), false);
                        rollHouseDie("blue", false, false);
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                }
            }
            // Terrier Patronus
            else if (activePlayer.proficiency === "Terrier Patronus") {
                document.getElementById("playerProficiency").onclick = () => {
                    if (activePlayer.attack >= 1 && !document.getElementById("playerChoice")) {
                        activePlayer.attack--;
                        rollHouseDie("red", false, false);
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                }
            }

            // horcrux rewards
            if (activeGame === "Game 7") {
                if (activePlayer.horcruxesDestroyed.includes(horcrux2)) horcrux2.img.onclick = () => {if (!document.getElementById("playerChoice")) horcrux2.reward();};
                if (activePlayer.horcruxesDestroyed.includes(horcrux3)) horcrux3.img.onclick = () => {if (!document.getElementById("playerChoice")) horcrux3.reward();};
                if (activePlayer.horcruxesDestroyed.includes(horcrux4)) horcrux4.img.onclick = () => {if (!document.getElementById("playerChoice")) horcrux4.reward();};
                if (activePlayer.horcruxesDestroyed.includes(horcrux5)) horcrux5.img.onclick = () => {if (!document.getElementById("playerChoice")) horcrux5.reward();};
                if (activePlayer.horcruxesDestroyed.includes(horcrux6)) horcrux6.img.onclick = () => {if (!document.getElementById("playerChoice")) horcrux6.reward();};
            }
            // encounter rewards
            if (activeGame === "Box 1") {
                if (activePlayer.horcruxesDestroyed.includes(studentsOutOfBed)) studentsOutOfBed.img.onclick = () => {if (!document.getElementById("playerChoice")) studentsOutOfBed.reward();};
                if (activePlayer.horcruxesDestroyed.includes(thirdFloorCorridor)) thirdFloorCorridor.img.onclick = () => {if (!document.getElementById("playerChoice")) thirdFloorCorridor.reward();};
            }
            if (activeGame === "Box 2") {
                if (activePlayer.horcruxesDestroyed.includes(unregisteredAnimagus)) unregisteredAnimagus.img.onclick = () => {if (!document.getElementById("playerChoice")) unregisteredAnimagus.reward();};
                if (activePlayer.horcruxesDestroyed.includes(fullMoonRises)) fullMoonRises.img.onclick = () => {if (!document.getElementById("playerChoice")) fullMoonRises.reward();};
                if (activePlayer.horcruxesDestroyed.includes(defensiveTraining)) defensiveTraining.img.onclick = () => {if (!document.getElementById("playerChoice")) defensiveTraining.reward();};
            }

            // update activeDarkArtsEvents
            let daeDraws = activeLocation.darkArtsEventDraws;
            if (activeVillains.includes(bellatrixLestrange) && !bellatrixLestrange.petrifiedBy && bellatrixLestrange.health > 0) daeDraws++; // Bellatrix adds 1 draw
            if (activePlayer.passives.includes(finiteIncantatem1) || activePlayer.passives.includes(finiteIncantatem2)) daeDraws = 1; // Finite Incantatem limits draws to 1
            for (let i = 0; i < daeDraws; i++) {
                if (!darkArtsEvents.length) {
                    shuffle(inactiveDarkArtsEvents);
                    while (inactiveDarkArtsEvents.length) darkArtsEvents.push(inactiveDarkArtsEvents.shift());
                }
                darkArtsEvents[0].generateImg();
                if ((darkArtsEvents[0] === avadaKedavra1 || darkArtsEvents[0] === crucio1 || darkArtsEvents[0] === imperio1 || darkArtsEvents[0] === avadaKedavra2 || darkArtsEvents[0] === crucio2 || darkArtsEvents[0] === imperio2 || darkArtsEvents[0] === avadaKedavra3 || darkArtsEvents[0] === crucio3 || darkArtsEvents[0] === imperio3) && !activePlayer.passives.includes(finiteIncantatem1) && !activePlayer.passives.includes(finiteIncantatem2)) i--; // some DAEs draw additional DAEs and Finite Incantatem limits draws to 1
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
                                                    else if (invulnerableVoldemort().petrifiedBy === activePlayer) invulnerableVoldemort().petrifiedBy = null;
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
                                                    if (villain.petrifiedBy === activePlayer) {
                                                        villain.petrifiedBy = null;
                                                    }
                                                    villain.attackDamageTaken = 0;
                                                    villain.influenceDamageTaken = 0;
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
        };
        document.getElementsByTagName("IMG")[document.getElementsByTagName("IMG").length - 1].onload = startTurn;

        // end turn
        document.getElementById("endTurn").onclick = () => {
            // unstun and unpetrify players
            players.forEach(player => {
                player.petrified = false;
                if (player.stunned) {
                    player.stunned = false;
                    player._health = 10;
                }
            });

            // player resets for next turn
            activePlayer.endTurn();
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
                if (activeVillains[i].health <= 0 && activeVillains[i].influence <= 0) {
                    // add new villain
                    if (inactiveVillains.length) {
                        // Death Eater effect
                        if (inactiveVillains[inactiveVillains.length - 1].type.includes("villain")) {
                            if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy && deathEater1.health > 0) players.forEach(player => {player.health--;});
                            if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy && deathEater2.health > 0) players.forEach(player => {player.health--;});
                        }

                        // add new villain
                        activeVillains[i] = inactiveVillains.shift();
                        document.getElementsByClassName("activeVillain")[i].appendChild(activeVillains[i].img);

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

            // start new turn
            startTurn();
        }
    }
    else {
        alert("Can't have more than one of each hero or proficiency.");
    }
}
