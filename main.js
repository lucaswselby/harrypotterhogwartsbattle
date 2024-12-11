// display player proficiecy choice
const displayProficiencyChoice = playerNumber => {
    if (document.getElementById(`player${playerNumber}Hero`).value && (document.getElementById("game").value === "Game 6" || document.getElementById("game").value === "Game 7" || document.getElementById("game").value.includes("Box"))) {
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

// prep for mobile magnify
window.oncontextmenu = event => {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

document.getElementById("submitPlayers").onclick = () => {
    // can't have more than one of each hero or proficiency
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
    for (let i = 0; i < document.getElementsByClassName("playerProficiency").length - 1; i++) {
        if (document.getElementsByClassName("playerProficiency")[i].style.display === "initial") {
            for (let j = i + 1; j < document.getElementsByClassName("playerProficiency").length; j++) {
                if (document.getElementsByClassName("playerProficiency")[j].style.display === "initial" && document.getElementsByClassName("playerProficiency")[i].value === document.getElementsByClassName("playerProficiency")[j].value) {
                    continueGame = false;
                }
            }
        }
    }

    // display game
    if (continueGame) {
        document.getElementsByTagName("MAIN")[0].style.display = "flex";
        let activeGame = document.getElementById("game").value;
        const attackToken = "<img src=\"./images/attackToken.png\" alt=\"Choose Attack Token\" style=\"width: 33%;\">";
        const influenceToken = "<img src=\"./images/influenceToken.png\" alt=\"Choose Influece Token\" style=\"width: 33%;\">";
        const healthToken = "<img src=\"images/healthTracker.png\" alt=\"Choose Health Token\" style=\"width: 33%;\">";
        const hogwartsCardBack = "<img src=\"./images/hogwartsCardBack.png\" alt=\"Draw card\" style=\"width: 33%;\">";

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
                    // create playerChoice label
                    const playerChoiceLabel = document.createElement("h1");
                    playerChoiceLabel.id = "playerChoiceLabel";
                    playerChoiceLabel.innerHTML = description;

                    // create playerChoice element
                    const playerChoiceElement = document.createElement("div");
                    playerChoiceElement.id = "playerChoice";
                    playerChoiceElement.className = iterations;

                    // create revealBoard button
                    const revealBoard = document.createElement("button");
                    revealBoard.id = "revealBoard";
                    revealBoard.innerHTML = "Reveal Board";
                    revealBoard.onclick = () => {
                        playerChoiceElement.classList.toggle("revealBoard");
                        playerChoiceLabel.classList.toggle("revealBoard");
                        revealBoard.innerHTML = revealBoard.innerHTML === "Reveal Board" ? "Hide Board" : "Reveal Board";
                    };

                    // create playerChoiceContainer
                    const playerChoiceContainer = document.createElement("div");
                    playerChoiceContainer.id = "playerChoiceContainer";
                    playerChoiceContainer.appendChild(playerChoiceLabel);
                    playerChoiceContainer.appendChild(playerChoiceElement);
                    playerChoiceContainer.appendChild(revealBoard);

                    // add columns to playerChoice
                    for (let i = 1; i <= choices(); i++) {
                        const choice = document.createElement("div");
                        choice.className = "choice";
                        playerChoiceElement.appendChild(choice);
                    }

                    playerChoiceElement.onclick = () => {
                        // remove playerChoice when clicked
                        playerChoiceContainer.remove();

                        // increment and display a new playerChoice for multiple iterations
                        if (--iterations > 0) {
                            playerChoice(description, choices, iterations, populateFunction);
                        }
                    }

                    // add playerChoice to main
                    document.getElementsByTagName("MAIN")[0].appendChild(playerChoiceContainer);
                    playerChoiceElement.style.gridTemplateColumns = `repeat(${choices()}, calc((100% - ${getComputedStyle(playerChoiceElement).getPropertyValue("gap")} * ${choices() - 1}) / ${choices()}))`;
                    populateFunction();
                }
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

        // Hogwarts die
        const rollHouseDie = (color, evil, arithmancyUsed) => {
            let sides = ["influence", "draw", "attack", "health"];
            if (color === "red") sides.push("influence", "influence", "influence");
            else if (color === "green") sides.push("attack", "attack", "attack");
            else if (color === "yellow") sides.push("health", "health", "health");
            else if (color === "blue") sides.push("draw", "draw", "draw");
            else alert(`${color} is not a Hogwarts die color.`);
            const result = sides[Math.floor(Math.random() * sides.length)];
            const arithmancyCheck = effect => {
                // Destroy Horcrux
                const destroyedHorcrux = () => {
                    if (horcruxes.length && !evil) {
                        horcruxes[0].addSymbol(result);
                        if (!horcruxes[0].remaining.length) {
                            document.getElementById("events").innerHTML = "";
                            activePlayer.addDestroyedHorcrux(horcruxes.shift());
                            if (horcruxes.length) {
                                document.getElementById("events").appendChild(horcruxes[0].img);
                                horcruxes[0].img.oncontextmenu = event => {magnify(event);};
                            }
                        }
                    }
                };

                // check for Arithmancy
                if (activePlayer.proficiency === "Arithmancy" && !arithmancyUsed) {
                    playerChoice("Choose:", () => {return 2;}, 1, () => {
                        if (result === "influence") document.getElementsByClassName("choice")[0].innerHTML = influenceToken;
                        else if (result === "draw") document.getElementsByClassName("choice")[0].innerHTML = hogwartsCardBack;
                        else if (result === "attack") document.getElementsByClassName("choice")[0].innerHTML = attackToken;
                        else if (result === "health") document.getElementsByClassName("choice")[0].innerHTML = healthToken;
                        else alert(`But seriously, ${color} is not a Hogwarts die color.`);
                        document.getElementsByClassName("choice")[0].onclick = () => {
                            effect();
                            destroyedHorcrux();
                        };
                        document.getElementsByClassName("choice")[1].innerHTML = "<p>Re-roll</p>";
                        document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie(color, evil, true);};
                    });
                }
                else {
                    effect();
                    destroyedHorcrux();
                }
            };
            if (evil) {
                if (result === "influence") arithmancyCheck(() => {activeLocation.addToLocation();});
                else if (result === "draw") arithmancyCheck(() => {players.forEach(player => {
                    playerChoice("Discard:", () => {return player.hand.length;}, 1, () => {
                        for (let i = 0; i < player.hand.length; i++) {
                            document.getElementsByClassName("choice")[i].innerHTML = `<img src="${player.hand[i].img.src}">`;
                            document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(i, true);};
                        }
                    });
                });});
                else if (result === "attack") arithmancyCheck(() => {players.forEach(player => {player.health--;});});
                else if (result === "health") arithmancyCheck(() => {activeVillains.forEach(villain => {villain.health++;});});
                else alert(`But seriously, ${color} is not a Hogwarts die color.`);
            }
            else {
                if (result === "influence") arithmancyCheck(() => {activePlayer.influence++;});
                else if (result === "draw") arithmancyCheck(() => {activePlayer.drawCards(1);});
                else if (result === "attack") arithmancyCheck(() => {activePlayer.attack++;});
                else if (result === "health") arithmancyCheck(() => {activePlayer.health++;});
                else alert(`But seriously, ${color} is not a Hogwarts die color.`);
            }
        };

        // check if Voldemort is in the draw villain spot
        const invulnerableVoldemort = () => {
            if (!inactiveVillains.length) {
                if (activeGame === "Game 5" && activeVillains[0] !== lordVoldemort1) {
                    return lordVoldemort1;
                }
                else if (activeGame === "Game 6" && activeVillains[0] !== lordVoldemort2) {
                    return lordVoldemort2;
                }
                else if (activeGame === "Game 7" && (activeVillains[0] !== lordVoldemort3 || horcruxes.length)) {
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
            if (horcruxes.length && horcruxes[0] === horcrux6 && player === activePlayer) {
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
                        playerChoice("Choose:", () => {return 2;}, 1, () => {
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
                    if (horcruxes.length && horcruxes[0] === horcrux1 && this.type === "ally") {
                        activePlayer.health--;
                        darken(horcrux1.img);
                    }

                    if (this.type === "spell") activePlayer.spellsCast++;
                    else if (this.type === "ally") activePlayer.alliesCast++;
                    else if (this.type === "item") activePlayer.itemsCast++;
                    else alert(`ERROR: ${this._name} has type "${this.type}".`);
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
        const startingAllyEffect = () => {if (!canHeal(activePlayer)) activePlayer.attack++; else {playerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.health += 2};});}};
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
        const theTalesOfBeedleTheBard = new Card("The Tales Of Beedle The Bard", "Game 1", "item", 0, () => {if (horcruxes[0] === horcrux3) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `ALL Heroes: ${influenceToken}`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.influence++;});};});}}, false, false);
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
        const mandrake = new Card("Mandrake", "Game 1", "item", 0, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = attackToken; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack++;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>Any one Hero</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${hurtPlayers.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<div>Health: ${hurtPlayers[i].health}</div>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;};});} else activePlayer.attack++;}, false, false);
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
        const spectrespecs = new Card("Spectrespecs", "Box 1", "item", 0, () => {/* TO-DO: spectrespecs function */}, false, false);
        const lunaStartingCards = [alohomoraLuna1, alohomoraLuna2, alohomoraLuna3, alohomoraLuna4, alohomoraLuna5, alohomoraLuna6, alohomoraLuna7, crumpleHornedSnorkack, lionHat, spectrespecs];

        // Hogwarts cards
        // Game 1
        const albusDumbledore = new Card("Albus Dumbledore", "Game 1", "ally", 8, () => {players.forEach(player => {player.attack++; player.influence++; player.health++; player.drawCards(1)});}, false, false);
        const descendo1 = new Card("Descendo", "Game 1", "spell", 5, () => {activePlayer.attack += 2;}, false, false);
        const descendo2 = descendo1.clone();
        const essenceOfDittany1 = new Card("Essence Of Dittany", "Game 1", "item", 2, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Pick a player to heal:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, false);
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
        const reparo1 = new Card("Reparo", "Game 1", "spell", 3, () => {if (activePlayer.petrified) activePlayer.influence += 2; else {playerChoice("Choose 1:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2;}; document.getElementsByClassName("choice")[1].innerHTML = hogwartsCardBack; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.drawCards(1)};});}}, false, false);
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
        const fawkesThePhoenix = new Card("Fawkes The Phoenix", "Game 2", "ally", 5, () => {if (players.filter(player => {return canHeal(player);}).length) {playerChoice("Pick one:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.attack += 2;}; document.getElementsByClassName("choice")[1].innerHTML = `<p>ALL Heroes:</p><div class="choiceContainer">${healthToken + healthToken}</div><div>${players.reduce((prev, curr) => {return prev + `<p>${curr.hero}'s Health: ${curr.health}</p>`;}, "")}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {players.forEach(player => {player.health += 2;});};});} else activePlayer.attack += 2;}, false, false);
        const finite1 = new Card("Finite", "Game 2", "spell", 3, () => {activeLocation.removeFromLocation();}, false, false);
        const finite2 = finite1.clone();
        const gilderoyLockhart = new Card("Gilderoy Lockhart", "Game 2", "ally", 2, () => {if (!activePlayer.petrified) {activePlayer.drawCards(1); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);}}});}}, false, false);
        const ginnyWeasley = new Card("Ginny Weasley", "Game 2", "ally", 4, () => {activePlayer.attack++; activePlayer.influence++;}, false, false);
        const mollyWeasley = new Card("Molly Weasley", "Game 2", "ally", 6, () => {players.forEach(player => {player.influence++; player.health += 2;});}, false, false);
        const nimbusTwoThousandAndOne1 = new Card("Nimbus Two Thousand And One", "Game 2", "item", 5, () => {activePlayer.attack += 2;}, true, false);
        const nimbusTwoThousandAndOne2 = nimbusTwoThousandAndOne1.clone();
        const polyjuicePotion1 = new Card("Polyjuice Potion", "Game 2", "item", 3, () => {const allies = activePlayer.hand.filter(card => {return card.type === "ally";}); if (allies.length) {const polyjuiceAlly = ally => {ally.effect(); if (ally.passive) activePlayer.passives.push(ally);}; if (allies.length > 1) {playerChoice("Pick an ally to copy:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {polyjuiceAlly(allies[i]);};}});} else polyjuiceAlly(allies[0]);}}, false, false);
        const polyjuicePotion2 = polyjuicePotion1.clone();

        // Game 3
        const butterbeer1 = new Card("Butterbeer", "Game 3", "item", 3, () => {if (players.length > 2) {playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health++; const remainingPlayers = players.filter(player => {return players[i] !== player;}); playerChoice(`Give ${influenceToken + healthToken} to:`, () => {return remainingPlayers.length;}, 1, () => {for (let j = 0; j < remainingPlayers.length; j++) {document.getElementsByClassName("choice")[j].appendChild(remainingPlayers[j].heroImage.cloneNode()); document.getElementsByClassName("choice")[j].innerHTML += `<p>Influence: ${remainingPlayers[j].influence}</p><p>Health: ${remainingPlayers[j].health}</p>`; document.getElementsByClassName("choice")[j].onclick = () => {remainingPlayers[j].influence++; remainingPlayers[j].health++;};}});};}});} else {players.forEach(player => {player.influence++; player.health++;});}}, false, false);
        const butterbeer2 = butterbeer1.clone();
        const butterbeer3 = butterbeer1.clone();
        const chocolateFrog1 = new Card("Chocolate Frog", "Game 3", "item", 2, () => {let unstunnedPlayers = players.filter(player => {return !player.stunned;}); if (unstunnedPlayers.length) {if (unstunnedPlayers.length > 1) {playerChoice(`Give 1 influence and 1 health to:`, () => {return unstunnedPlayers.length;}, 1, () => {for (let i = 0; i < unstunnedPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(unstunnedPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${unstunnedPlayers[i].influence}</p><p>Health: ${unstunnedPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {unstunnedPlayers[i].influence++; unstunnedPlayers[i].health++;};}});} else {unstunnedPlayers[0].influence++; unstunnedPlayers[0].health++;}}}, false, false);
        const chocolateFrog2 = chocolateFrog1.clone();
        const chocolateFrog3 = chocolateFrog1.clone();
        const crystalBall1 = new Card("Crystal Ball", "Game 3", "item", 3, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});}}, false, false);
        const crystalBall2 = crystalBall1.clone();
        const expectoPatronum1 = new Card("Expecto Patronum", "Game 3", "spell", 5, () => {activePlayer.attack++; activeLocation.removeFromLocation();}, false, false);
        const expectoPatronum2 = expectoPatronum1.clone();
        const maraudersMap = new Card("Marauder's Map", "Game 3", "item", 5, () => {activePlayer.drawCards(2);}, false, false);
        const petrificusTotalus1 = new Card("Petrificus Totalus", "Game 3", "spell", 6, () => {activePlayer.attack++; let unpetrifiedVillains = activeVillains.concat(invulnerableVoldemort() ? invulnerableVoldemort() : []).filter(villain => {return !villain.petrifiedBy && villain.health > 0 && villain.type === "villain";}); if (unpetrifiedVillains.length) {if (unpetrifiedVillains.length > 1) {playerChoice("Petrify:", () => {return unpetrifiedVillains.length;}, 1, () => {for (let i = 0; i < unpetrifiedVillains.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedVillains[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedVillains[i].petrifiedBy = activePlayer;};}});} else unpetrifiedVillains[0].petrifiedBy = activePlayer;}}, false, false);
        const petrificusTotalus2 = petrificusTotalus1.clone();
        const remusLupin = new Card("Remus Lupin", "Game 3", "ally", 4, () => {activePlayer.attack++; const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;}}, false, false);
        const siriusBlack = new Card("Sirius Black", "Game 3", "ally", 6, () => {activePlayer.attack += 2; activePlayer.influence++;}, false, false);
        const sybillTrelawney = new Card("Sybill Trelawney", "Game 3", "ally", 4, () => {if (!activePlayer.petrified) {activePlayer.drawCards(2); playerChoice("Discard", () => {return activePlayer.hand.length}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.hand[i].type === "spell") activePlayer.influence += 2; activePlayer.forcedDiscardAt(i, false);};}});}}, false, false);

        // Game 4
        const accio1 = new Card("Accio", "Game 4", "spell", 4, () => {const items = activePlayer.discard.filter(card => {return card.type === "item";}); if (items.length) {playerChoice("Choose:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 2}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[1].onclick = () => {const discardToHand = index => {activePlayer.discard.splice(activePlayer.discard.indexOf(items[index]), 1); activePlayer.addToHand(items[index]);}; if (items.length === 1) discardToHand(0); else {playerChoice("Move from Discard to Hand:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i);};}});}};});} else activePlayer.influence += 2;}, false, false);
        const accio2 = accio1.clone();
        const alastorMadEyeMoody = new Card("Alastor Mad-Eye Moody", "Game 4", "ally", 6, () => {activePlayer.influence += 2; activeLocation.removeFromLocation();}, false, false);
        const cedricDiggory = new Card("Cedric Diggory", "Game 4", "ally", 4, () => {activePlayer.attack++; rollHouseDie("yellow", false, false);}, false, true);
        const filiusFlitwick = new Card("Filius Flitwick", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.drawCards(1); rollHouseDie("blue", false, false);}, false, true);
        const fleurDelacour = new Card("Fleur Delacour", "Game 4", "ally", 4, () => {activePlayer.influence += 2;}, true, false);
        const hogwartsAHistory1 = new Card("Hogwarts A History", "Game 4", "item", 4, () => {playerChoice("Roll a House Die:", () => {return 4;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Blue</p>"; document.getElementsByClassName("choice")[0].onclick = () => {rollHouseDie("blue", false, false);}; document.getElementsByClassName("choice")[1].innerHTML = "<p>Green</p>"; document.getElementsByClassName("choice")[1].onclick = () => {rollHouseDie("green", false, false);}; document.getElementsByClassName("choice")[2].innerHTML = "<p>Red</p>"; document.getElementsByClassName("choice")[2].onclick = () => {rollHouseDie("red", false, false);}; document.getElementsByClassName("choice")[3].innerHTML = "<p>Yellow</p>"; document.getElementsByClassName("choice")[3].onclick = () => {rollHouseDie("yellow", false, false);};});}, false, true);
        const hogwartsAHistory2 = hogwartsAHistory1.clone();
        const hogwartsAHistory3 = hogwartsAHistory1.clone();
        const hogwartsAHistory4 = hogwartsAHistory1.clone();
        const hogwartsAHistory5 = hogwartsAHistory1.clone();
        const hogwartsAHistory6 = hogwartsAHistory1.clone();
        const minervaMcgonagall = new Card("Minerva Mcgonagall", "Game 4", "ally", 6, () => {activePlayer.influence++; activePlayer.attack++; rollHouseDie("red", false, false);}, false, true);
        const pensieve = new Card("Pensieve", "Game 4", "item", 5, () => {const pensieveEffect = player => {player.influence++; player.drawCards(1);}; if (players.length > 2) {playerChoice("+1 influence and draw a card:", () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {pensieveEffect(players[i])};}});} else players.forEach(player => {pensieveEffect(player);});}, false, false);
        const pomonaSprout = new Card("Pomona Sprout", "Game 4", "ally", 6, () => {activePlayer.influence++; rollHouseDie("yellow", false, false); const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};}});} else hurtPlayers[0].health += 2;}}, false, true);
        const protego1 = new Card("Protego", "Game 4", "spell", 5, () => {activePlayer.attack++; activePlayer.health++;}, false, false);
        const protego2 = protego1.clone();
        const protego3 = protego1.clone();
        const severusSnape = new Card("Severus Snape", "Game 4", "ally", 6, () => {activePlayer.attack++; activePlayer.health += 2; rollHouseDie("green", false, false);}, false, true);
        const triwizardCup = new Card("Triwizard Cup", "Game 4", "item", 5, () => {activePlayer.attack++; activePlayer.influence++; activePlayer.health++;}, false, false);
        const viktorKrum = new Card("Viktor Krum", "Game 4", "ally", 5, () => {activePlayer.attack += 2;}, true, false);

        // Game 5
        const choChang = new Card("Cho Chang", "Game 5", "ally", 4, () => {rollHouseDie("blue", false, false); if (!activePlayer.petrified) {activePlayer.drawCards(3); playerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false)};}});}}, false, true);
        const fredWeasley = new Card("Fred Weasley", "Game 5", "ally", 4, () => {activePlayer.attack++; if (players.filter(player => {return player !== activePlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.influence++;}); rollHouseDie("red");}, false, true);
        const georgeWeasley = new Card("George Weasley", "Game 5", "ally", 4, () => {activePlayer.attack++; if (players.filter(player => {return player !== activePlayer && player.hand.map(card => {return card.name;}).filter(name => {return name.includes("Weasley");}).length;}).length) players.forEach(player => {player.health++;}); rollHouseDie("red");}, false, true);
        const kingsleyShacklebolt = new Card("Kingsley Shacklebolt", "Game 5", "ally", 7, () => {activePlayer.attack += 2; activePlayer.health++; activeLocation.removeFromLocation();}, false, false);
        const lunaLovegood = new Card("Luna Lovegood", "Game 5", "ally", 5, () => {activePlayer.influence++; rollHouseDie("blue");}, true, true);
        const nymphadoraTonks = new Card("Nymphadora Tonks", "Game 5", "ally", 5, () => {let barty = activeVillains.includes(bartyCrouchJr) && bartyCrouchJr.health > 0 && !bartyCrouchJr.petrifiedBy; playerChoice("Choose:", () => {return barty ? 2 : 3;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken + influenceToken}</div>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.influence += 3;}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.attack += 2;}; if (!barty) {document.getElementsByClassName("choice")[2].innerHTML = "<img src=\"./images/locationToken.png\">"; document.getElementsByClassName("choice")[2].onclick = () => {activeLocation.removeFromLocation();};}});}, false, true);
        const owls1 = new Card("OWLS", "Game 5", "item", 4, () => {activePlayer.influence += 2;}, true, false); let owlsSpells1 = 0;
        const owls2 = owls1.clone(); let owlsSpells2 = 0;
        const stupefy1 = new Card("Stupefy", "Game 5", "spell", 6, () => {activePlayer.attack++; activeLocation.removeFromLocation(); activePlayer.drawCards(1);}, false, false);
        const stupefy2 = stupefy1.clone();

        // Game 6
        const advancedPotionMaking = new Card("Advanced Potion-Making", "Game 6", "item", 6, () => {players.forEach(player => {player.health += 2; if (player.health === 10) {player.attack++; player.drawCards(1);}});}, false, false);
        const bezoar1 = new Card("Bezoar", "Game 6", "item", 4, () => {const hurtPlayers = players.filter(player => {return canHeal(player);}); if (hurtPlayers.length) {if (hurtPlayers.length > 1) {playerChoice("Heal for 3:", () => {return hurtPlayers.length;}, 1, () => {for (let i = 0; i < hurtPlayers.length; i++) {document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 3;};}});} else hurtPlayers[0].health += 3;} activePlayer.drawCards(1);}, false, false);
        const bezoar2 = bezoar1.clone();
        const confundus1 = new Card("Confundus", "Game 6", "spell", 3, () => {activePlayer.attack++;}, true, false);
        const confundus2 = confundus1.clone();
        const deluminator = new Card("Deluminator", "Game 6", "item", 6, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, false, false);
        const elderWand = new Card("Elder Wand", "Game 6", "item", 7, () => {}, true, false);
        const felixFelicis = new Card("Felix Felicis", "Game 6", "item", 7, () => {let felixFelicisOptions = ["attack", "influence"]; if (canHeal(activePlayer)) felixFelicisOptions.push("health"); if (!activePlayer.petrified) felixFelicisOptions.push("draw"); if (felixFelicisOptions.length > 2) {playerChoice("Choose two:", () => {return felixFelicisOptions.length;}, 1, () => {const displayFelixFelicisOptions = () => {let choiceIndex = 0; if (felixFelicisOptions.includes("attack")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${attackToken + attackToken}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.attack += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("attack"), 1); playerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("influence")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${influenceToken + influenceToken}</div`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.influence += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("influence"), 1); playerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("health")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.health += 2; felixFelicisOptions.splice(felixFelicisOptions.indexOf("health"), 1); playerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});}; choiceIndex++;} if (felixFelicisOptions.includes("draw")) {document.getElementsByClassName("choice")[choiceIndex].innerHTML = `<div class="choiceContainer">${hogwartsCardBack + hogwartsCardBack}</div>`; document.getElementsByClassName("choice")[choiceIndex].onclick = () => {activePlayer.drawCards(2); felixFelicisOptions.splice(felixFelicisOptions.indexOf("draw"), 1); playerChoice("Choose one:", () => {return felixFelicisOptions.length;}, 1, () => {displayFelixFelicisOptions(); felixFelicisOptions = [];});};}}; displayFelixFelicisOptions();});} else {activePlayer.attack += 2; activePlayer.influence += 2;}}, false, false);
        const horaceSlughorn = new Card("Horace Slughorn", "Game 6", "ally", 6, () => {players.forEach(player => {if (canHeal(player)) {playerChoice(`${player.hero} choose 1`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `${influenceToken}<p>Influence: ${player.influence}</p>`; document.getElementsByClassName("choice")[0].onclick = () => {player.influence++;}; document.getElementsByClassName("choice")[1].innerHTML = `${healthToken}<p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health++;};});} else player.influence++;}); rollHouseDie("green", false, false);}, false, true);

        // Game 7
        const swordOfGryffindor = new Card("Sword Of Gryffindor", "Game 7", "item", 7, () => {activePlayer.attack += 2; rollHouseDie("red", false, false); rollHouseDie("red");}, false, true);

        // Box 1
        const detention = new Card("Detention", "Box 1", "item", 0, () => {}, false, false);
        const argusFilchAndMrsNorris = new Card("Argus Filch And Mrs Norris", "Box 1", "ally", 4, () => {activePlayer.drawCards(2); playerChoice("Choose a card to discard or banish:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {playerChoice("Discard or banish:", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<img src="${activePlayer.hand[i].img.src}"><p>Discard</p>`; document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.forcedDiscardAt(i, false)}; document.getElementsByClassName("choice")[1].innerHTML = `<img src="${activePlayer.hand[i].img.src}"><p>Banish</p>`; document.getElementsByClassName("choice")[1].onclick = () => {activePlayer.banishAt(i)};});};}});}, false, false);
        const fang = new Card("Fang", "Box 1", "ally", 3, () => {playerChoice(`Give 1 ${influenceToken} and 2 ${healthToken} to:`, () => {return players.length;}, 1, () => {for (let i = 0; i < players.length; i++) {document.getElementsByClassName("choice")[i].appendChild(players[i].heroImage.cloneNode()); document.getElementsByClassName("choice")[i].innerHTML += `<p>Influence: ${players[i].influence}</p><p>Health: ${players[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++; players[i].health += 2;};}});}, false, false);
        const finiteIncantatem1 = new Card("Finite Incantatem", "Box 1", "spell", 6, () => {activeLocation.removeFromLocation();}, true, false);
        const finiteIncantatem2 = finiteIncantatem1.clone();
        const harp = new Card("Harp", "Box 1", "item", 6, () => {activePlayer.attack++; let unpetrifiedCreatures = activeVillains.filter(villain => {return !villain.petrifiedBy && villain.health > 0 && villain.type === "creature";}); if (unpetrifiedCreatures.length) {if (unpetrifiedCreatures.length > 1) {playerChoice("Petrify:", () => {return unpetrifiedCreatures.length;}, 1, () => {for (let i = 0; i < unpetrifiedCreatures.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${unpetrifiedCreatures[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {unpetrifiedCreatures[i].petrifiedBy = activePlayer;};}});} else unpetrifiedCreatures[0].petrifiedBy = activePlayer;}}, false, false);
        const oldSock1 = new Card("Old Sock", "Box 1", "item", 1, () => {activePlayer.influence++; if (players.filter(player => {return player !== activePlayer && (player.hand.includes(dobbyTheHouseElf)/* || player.hand.includes(other house elves)*/)}).length) activePlayer.attack += 2;}, false, false);
        const oldSock2 = oldSock1.clone();
        const tergeo1 = new Card("Tergeo", "Box 1", "spell", 2, () => {activePlayer.influence++; playerChoice("Do you want to banish a card?", () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = "<p>Yes</p>"; document.getElementsByClassName("choice")[0].onclick = () => {playerChoice("Banish:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {if (activePlayer.hand[i].type === "item") activePlayer.drawCards(1); activePlayer.banishAt(i);};}});}; document.getElementsByClassName("choice")[1].innerHTML = "<p>No</p>";});}, false, false);
        const tergeo2 = tergeo1.clone();
        const tergeo3 = tergeo1.clone();
        const tergeo4 = tergeo1.clone();
        const tergeo5 = tergeo1.clone();
        const tergeo6 = tergeo1.clone();

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
                // TO-DO: add Box 2 hogwarts cards
                if (activeGame !== "Box 2") {
                    // TO-DO: add Box 3 hogwarts cards                    
                    if (activeGame !== "Box 3") {
                        // TO-DO: add Box 4 hogwarts cards
                    }
                }
            }
        }

        // purchase a Hogwarts card
        hogwartsCards.forEach(card => {
            card.img.onclick = () => {
                const cost = card.cost - (activePlayer.proficiency === "Arithmancy" && card.houseDie ? 1 : 0);
                if (activePlayer.influence >= cost) {
                    activePlayer.influence -= cost;

                    // History of Magic proficiency
                    if (activePlayer === "History Of Magic" && card.type === "spell") {
                        playerChoice("Give 1 influence to:", () => {return players.length;}, 1, () => {
                            for (let i = 0; i < players.length; i++) {
                                document.getElementsByClassName("choice")[i].innerHTML = `<img src="${players[i].heroImage.src}">`;
                                document.getElementsByClassName("choice")[i].onclick = () => {players[i].influence++;};
                            }
                        });
                    }

                    // Time Turner, Sorting Hat, and Wingardium Leviosa effects
                    if ((activePlayer.passives.includes(timeTurner) && card.type === "spell") || (activePlayer.passives.includes(sortingHat) && card.type === "ally") || ((activePlayer.passives.includes(wingardiumLeviosa1) || activePlayer.passives.includes(wingardiumLeviosa2) || activePlayer.passives.includes(wingardiumLeviosa3)) && card.type === "item")) {
                        playerChoice("Choose 1:", () => {return 2;}, 1, () => {
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
                    if (activeVillains.includes(doloresUmbridge) && cost >= 4 && !doloresUmbridge.petrifiedBy && doloresUmbridge.health > 0) {
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
                if (activeGame === "Game 6" || activeGame === "Game 7" || activeGame.includes("Box")) {
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
                else if (hero === "Luna Lovegood") this._discard = lunaStartingCards;
                // TO-DO: add other heroes
                this._petrified = false;
                this._stunned = false;
                this._spellsCast = 0;
                this._itemsCast = 0;
                this._alliesCast = 0;
                this._potionsProficiencyUsed = false;
                this._gainedHealth = false;
                this._attacks = 0;
                this._healthGained = 0;
                this._horcruxesDestroyed = [];
                this._cardsDrawn = 0;
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
                // can't heal if stunned
                if (!this.stunned) {
                    // Invisibility Cloak effect
                    if (this.passives.includes(invisibilityCloak) && health < this.health) {
                        health = this.health - 1;
                    }
                    else if (this.health < health) {
                        if (!canHeal(this)) {
                            health = this.health;
                        }
                        else {
                            // Neville Longbottom special
                            if (!this.gainedHealth) {
                                if (activePlayer.hero === "Neville Longbottom" && (activeGame === "Game 3" || activeGame === "Game 4" || activeGame === "Game 5" || activeGame === "Game 6")) {
                                    health++;
                                }
                                this.gainedHealth = true;
                            }
                            else if (activePlayer.hero === "Neville Longbottom" && activeGame === "Game 7") {
                                health++;
                            }

                            // Herbology proficiency
                            this._healthGained += health - this.health;
                            if (activePlayer.proficiency === "Herbology" && this.healthGained >= 3) {
                                this.drawCards(1);
                                this._healthGained = -99;
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
                if ((!this.stunned && (!horcruxes.length || horcruxes[0] !== horcrux3)) || activePlayer === this) {
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
                if ((!this.stunned && (!horcruxes.length || horcruxes[0] !== horcrux3)) || activePlayer === this) {
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
                    if (activeVillains.includes(basilisk)) darken(basilisk.img);
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
            potionsProficiency() {
                if (this.proficiency === "Potions" && this.spellsCast > 0 && this.itemsCast > 0 && this.alliesCast > 0 && !this._potionsProficiencyUsed) {
                    playerChoice("Heal for 1 and gain 1 attack:", () => {return players.length;}, 1, () => {
                        for (let i = 0; i < players.length; i++) {
                            document.getElementsByClassName("choice").innerHTML = `<img src="${players[i].heroImage.src}"><p>Health: ${players[i].health}</p><p>Attack: ${players[i].attack}</p>`;
                            document.getElementsByClassName("choice").onclick = () => {players[i].health++; players[i].attack++;};
                        }
                    });
                    this._potionsProficiencyUsed = true;
                }
            }
            get spellsCast() {
                return this._spellsCast;
            }
            set spellsCast(spellsCast) {
                this._spellsCast = spellsCast;

                // Hermione Granger special
                if (this.spellsCast === 4 && this.hero === "Hermione Granger" && activeGame !== "Game 1" && activeGame !== "Game 2") {
                    if (activeGame.includes("Game")) {
                        if (activeGame === "Game 7") {
                            players.forEach(player => {player.influence++;});
                        }
                        else {
                            playerChoice("Gain 1 influence:", () => {return players.length;}, 1, () => {
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
                                playerChoice("Gain 1 attack:", () => {return remainingPlayers.length;}, 2, () => {
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

                this.potionsProficiency();
            }
            get itemsCast() {
                return this._itemsCast;
            }
            set itemsCast(itemsCast) {
                this._itemsCast = itemsCast;

                this.potionsProficiency();
            }
            get alliesCast() {
                return this._alliesCast;
            }
            set alliesCast(alliesCast) {
                this._alliesCast = alliesCast;

                this.potionsProficiency();

                // Horcrux 1 reward
                if (this.horcruxesDestroyed.includes(horcrux1) && this.alliesCast === 2) {
                    const hurtPlayers = players.filter(player => {return canHeal(player);});
                    if (hurtPlayers.length) {
                        if (hurtPlayers.length > 1) {
                            playerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
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
                    if (activeGame.includes("Game")) {
                        if (activeGame === "Game 7") {
                            players.forEach(player => {player.health += 2;});
                        }
                        else {
                            const hurtPlayers = players.filter(player => {return canHeal(player);});
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
                    // Ron Weasley Box expansion special
                    else {
                        players.forEach(player => {player.health++;});
                    }
                }
            }
            get healthGained() {
                return this._healthGained;
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
            }
            discardAt(index) {
                this._discard.push(this.hand[index]);
                if (document.getElementById("playerHand").contains(this.hand[index].img)) document.getElementById("playerHand").removeChild(this.hand[index].img);
                this._hand.splice(index, 1);
            }
            forcedDiscardAt(index, evil) {
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

                if (evil) {
                    // Crabbe and Goyle effect
                    setTimeout(() => {
                        if (activeVillains.includes(crabbeAndGoyle) && !crabbeAndGoyle.petrifiedBy) {
                            this.health--;
                        }
                    }, 1000);

                    // Defense Against the Dark Arts proficiency
                    if (this.proficiency === "Defense Against the Dark Arts") {
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
            }
            drawCards(numberOfCards) {
                if (!this.petrified) {
                    for (let i = 0; i < numberOfCards; i++) {
                        // moves a card from the draw pile to your hand
                        if (this.draw.length > 0) {
                            this.addToHand(this._draw.shift());
                        }
                        // shuffles the discard pile into the draw pile
                        else {
                            this.shuffle();
                            i--;
                        }
    
                        // Luna Lovegood special
                        this.cardsDrawn++;
                        if (this.hero === "Luna Lovegood" && this.cardsDrawn === 1) {
                            const hurtPlayers = players.filter(player => {return player.health < 10;});
                            if (hurtPlayers.length) {
                                if (hurtPlayers.length > 1) {
                                    playerChoice("Heal for 1:", () => {return hurtPlayers.length;}, 1, () => {
                                        for (let i = 0; i < hurtPlayers.length; i++) {
                                            document.getElementsByClassName("choice")[i].appendChild(hurtPlayers[i].img.cloneNode());
                                            document.getElementsByClassName("choice")[i].innerHTML += `<p>Health: ${hurtPlayers[i].health}</p>`;
                                            document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayers[i].health += 2;};
                                        }
                                    });
                                }
                                else hurtPlayers[0].health += 2;
                            }
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
                this.spellsCast = 0;
                this.itemsCast = 0;
                this.alliesCast = 0;
                this._potionsProficiencyUsed = false;
                this.gainedHealth = false;
                this.attacks = 0;
                owlsSpells1 = 0;
                owlsSpells2 = 0;
                this._healthGained = 0;
                this.cardsDrawn = -5;
                this.drawCards(5);
            }
            stun() {
                this.stunned = true;
                this.attack = 0;
                this.influence = 0;
                activeLocation.addToLocation();
                let iterations = Math.floor(this.hand.length / 2);
                playerChoice(`${this.hero} discard:`, () => {return this.hand.length;}, iterations, () => {
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
                if ((this.spaces - 1) % 3 === 0) locationToken.style.top = this.added % 2 === 0 ? "78%" : "82%";
                else locationToken.style.top = this.added % 2 === 0 ? "82%" : "78%";
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
                // Barty Crouch Jr effect
                if (!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) {
                    // Harry Potter special
                    if (!this.removed && players.filter(player => {return player.hero === "Harry Potter";}).length && activeGame !== "Game 1" && activeGame !== "Game 2" && activeGame.includes("Game")) {
                        playerChoice(`Gain 1 attack:`, () => {return players.length;}, activeGame === "Game 7" ? 2 : 1, () => {
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

                    // Lord Voldemort Game 7
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
                                if ((activeLocation.spaces - 1) % 3 === 0) locationToken.style.top = i % 2 === 0 ? "82%" : "78%";
                                else locationToken.style.top = i % 2 === 0 ? "78%" : "82%";
                                locationToken.style.left = `${56 + i * 11 - activeLocation.spaces * 6}%`;
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
                else {
                    darken(bartyCrouchJr.img);
                }
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
        const graveyard = new Location("Graveyard", "Game 4", 3, 7, 2, () => {players.forEach(player => {const allies = player.hand.filter(card => {return card.type === "ally"}); if (allies.length) {if (allies.length > 1) {playerChoice("Discard:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(allies[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(allies[0]), false);}});});
        const azkaban = new Location("Azkaban", "Game 5", 1, 7, 1, () => {});
        const hallOfProphecy = new Location("Hall Of Prophecy", "Game 5", 2, 7, 2, () => {});
        const ministryOfMagic = new Location("Ministry Of Magic", "Game 5", 3, 7, 2, () => {players.forEach(player => {const spells = player.hand.filter(card => {return card.type === "spell"}); if (spells.length) {if (spells.length > 1) {playerChoice("Discard:", () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(spells[0]), false);}});});
        const knockturnAlley = new Location("Knockturn Alley", "Game 6", 1, 7, 1, () => {});
        const theBurrow = new Location("The Burrow", "Game 6", 2, 7, 2, () => {});
        const astronomyTower = new Location("Astronomy Tower", "Game 6", 3, 8, 3, () => {players.forEach(player => {const items = player.hand.filter(card => {return card.type === "item"}); if (items.length) {if (items.length > 1) {playerChoice("Discard:", () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items[i]), false);};}});} else player.forcedDiscardAt(player.hand.indexOf(items[0]), false);}});});
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
        const obliviate = new DarkArtsEvent("Obliviate", "Game 2", () => {players.forEach(player => {const spells = player.hand.filter(card => {return card.type === "spell";}); if (spells.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(spells); document.getElementsByClassName("choice")[0].onclick = () => {if (spells.length > 1) {playerChoice(`${player.hero} discards:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(spells[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(spells[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const poison = new DarkArtsEvent("Poison", "Game 2", () => {players.forEach(player => {const allies = player.hand.filter(card => {return card.type === "ally";}); if (allies.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(allies); document.getElementsByClassName("choice")[0].onclick = () => {if (allies.length > 1) {playerChoice(`${player.hero} discards:`, () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(allies[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(allies[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const relashio = new DarkArtsEvent("Relashio", "Game 2", () => {players.forEach(player => {const items = player.hand.filter(card => {return card.type === "item";}); if (items.length) {playerChoice(`${player.hero} loses:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = choiceScroll(items); document.getElementsByClassName("choice")[0].onclick = () => {if (items.length > 1) {playerChoice(`${player.hero} discards:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {player.forcedDiscardAt(player.hand.indexOf(items[i]), true);};}});} else player.forcedDiscardAt(player.hand.indexOf(items[0]), true);}; document.getElementsByClassName("choice")[1].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[1].onclick = () => {player.health -= 2;};});} else player.health -= 2;});});
        const dementorsKiss1 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); activePlayer.health--;});
        const dementorsKiss2 = new DarkArtsEvent("Dementor's Kiss", "Game 3", () => {players.forEach(player => {player.health--;}); activePlayer.health--;});
        const oppugno = new DarkArtsEvent("Oppugno", "Game 3", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].cost) {activePlayer.cardsDrawn--; player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.health -= 2;}});});
        const tarantallegra = new DarkArtsEvent("Tarantallegra", "Game 3", () => {activePlayer.health--;});
        const avadaKedavra1 = new DarkArtsEvent("Avada Kedavra", "Game 4", () => {activePlayer.health -= 3; if (activePlayer.stunned) activeLocation.addToLocation();});
        const crucio1 = new DarkArtsEvent("Crucio", "Game 4", () => {activePlayer.health--;});
        const heirOfSlytherin1 = new DarkArtsEvent("Heir Of Slytherin", "Game 4", () => {rollHouseDie("green", true, false);});
        const heirOfSlytherin2 = new DarkArtsEvent("Heir Of Slytherin", "Game 4", () => {rollHouseDie("green", true, false);});
        const imperio1 = new DarkArtsEvent("Imperio", "Game 4", () => {const otherPlayers = players.filter(player => {return player !== activePlayer;}); if (otherPlayers.length) {if (otherPlayers.length > 1) {playerChoice("Choose to lose 2 health:", () => {return otherPlayers.length;}, 1, () => {for (let i = 0; i < otherPlayers.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${otherPlayers[i].img.src}"><p>Health: ${otherPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {otherPlayers[i].health -= 2;};}});} else otherPlayers[0].health -= 2;}});
        const morsmordre1 = new DarkArtsEvent("Morsmordre", "Game 4", () => {players.forEach(player => {player.health--;});activeLocation.addToLocation(); if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});});
        const morsmordre2 = new DarkArtsEvent("Morsmordre", "Game 4", () => {players.forEach(player => {player.health--;});activeLocation.addToLocation(); if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});});
        const regeneration = new DarkArtsEvent("Regeneration", "Game 4", () => {activeVillains.forEach(villain => {villain.health += 2;})});
        const avadaKedavra2 = new DarkArtsEvent("Avada Kedavra", "Game 5", () => {activePlayer.health -= 3; if (activePlayer.stunned) activeLocation.addToLocation();});
        const crucio2 = new DarkArtsEvent("Crucio", "Game 5", () => {activePlayer.health--;});
        const educationalDecree1 = new DarkArtsEvent("Educational Decree", "Game 5", () => {activePlayer.hand.forEach(card => {if (card.cost - (activePlayer.proficiency === "Arithmancy" && card.houseDie) ? 1 : 0 >= 4) activePlayer.health--;});});
        const educationalDecree2 = new DarkArtsEvent("Educational Decree", "Game 5", () => {activePlayer.hand.forEach(card => {if (card.cost - (activePlayer.proficiency === "Arithmancy" && card.houseDie) ? 1 : 0 >= 4) activePlayer.health--;});});
        const imperio2 = new DarkArtsEvent("Imperio", "Game 5", () => {const otherPlayers = players.filter(player => {return player !== activePlayer;}); if (otherPlayers.length) {if (otherPlayers.length > 1) {playerChoice("Choose to lose 2 health:", () => {return otherPlayers.length;}, 1, () => {for (let i = 0; i < otherPlayers.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${otherPlayers[i].img.src}"><p>Health: ${otherPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {otherPlayers[i].health -= 2;};}});} else otherPlayers[0].health -= 2;}});
        const legilimency = new DarkArtsEvent("Legilimency", "Game 5", () => {players.forEach(player => {if (!player.draw.length) player.shuffle(); if (player.draw[0].type === "spell") {activePlayer.cardsDrawn--; player.drawCards(1); player.forcedDiscardAt(player.hand.length - 1, true); player.health -= 2;}});});
        const morsmordre3 = new DarkArtsEvent("Morsmordre", "Game 5", () => {players.forEach(player => {player.health--;});activeLocation.addToLocation(); if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});});
        const morsmordre4 = new DarkArtsEvent("Morsmordre", "Game 6", () => {players.forEach(player => {player.health--;});activeLocation.addToLocation(); if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy) players.forEach(player => {player.health--;}); if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy) players.forEach(player => {player.health--;});});
        const sectumsempra1 = new DarkArtsEvent("Sectumsempra", "Game 6", () => {players.forEach(player => {player.health -= 2;});});
        const sectumsempra2 = new DarkArtsEvent("Sectumsempra", "Game 6", () => {players.forEach(player => {player.health -= 2;});});
        const avadaKedavra3 = new DarkArtsEvent("Avada Kedavra", "Game 7", () => {activePlayer.health -= 3; if (activePlayer.stunned) activeLocation.addToLocation();});
        const crucio3 = new DarkArtsEvent("Crucio", "Game 7", () => {activePlayer.health--;});
        const fiendfyre = new DarkArtsEvent("Fiendfyre", "Game 7", () => {players.forEach(player => {player.health -= 3;});});
        const imperio3 = new DarkArtsEvent("Imperio", "Game 7", () => {const otherPlayers = players.filter(player => {return player !== activePlayer;}); if (otherPlayers.length) {if (otherPlayers.length > 1) {playerChoice("Choose to lose 2 health:", () => {return otherPlayers.length;}, 1, () => {for (let i = 0; i < otherPlayers.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${otherPlayers[i].img.src}"><p>Health: ${otherPlayers[i].health}</p>`; document.getElementsByClassName("choice")[i].onclick = () => {otherPlayers[i].health -= 2;};}});} else otherPlayers[0].health -= 2;}});
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
        const blastEnded = new DarkArtsEvent("Blast Ended", "Box 1", () => {let hurtPlayer = players.indexOf(activePlayer) ? players[players.indexOf(activePlayer) - 1] : players[players.length - 1]; hurtPlayer.health--; if (hurtPlayer.hand.length) {if (hurtPlayer.hand.length > 1) {playerChoice(`Discard for ${hurtPlayer.hero}:`, () => {return hurtPlayer.hand.length;}, 1, () => {for (let i = 0; i < hurtPlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${hurtPlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {hurtPlayer.forcedDiscardAt(i, true);};}});} else hurtPlayer.forcedDiscardAt(0, true);}});
        const inquisitorialSquad1 = new DarkArtsEvent("Inquisitorial Squad", "Box 1", () => {activePlayer.addToHand(detention.clone()); players.forEach(player => {player.health -= player.hand.filter(card => {return card.name === "Detention"}).length});});
        const inquisitorialSquad2 = new DarkArtsEvent("Inquisitorial Squad", "Box 1", () => {activePlayer.addToHand(detention.clone()); players.forEach(player => {player.health -= player.hand.filter(card => {return card.name === "Detention"}).length});});
        const menacingGrowl1 = new DarkArtsEvent("Menacing Growl", "Box 1", () => {players.forEach(player => {player.health -= player.hand.filter(card => {return card.cost === 3}).length;});});
        const menacingGrowl2 = new DarkArtsEvent("Menacing Growl", "Box 1", () => {players.forEach(player => {player.health -= player.hand.filter(card => {return card.cost === 3}).length;});});
        const ragingTroll1 = new DarkArtsEvent("Raging Troll", "Box 1", () => {players[players.indexOf(activePlayer) === players.length - 1 ? 0 : players.indexOf(activePlayer) + 1].health -= 2; activeLocation.addToLocation();});
        const ragingTroll2 = new DarkArtsEvent("Raging Troll", "Box 1", () => {players[players.indexOf(activePlayer) === players.length - 1 ? 0 : players.indexOf(activePlayer) + 1].health -= 2; activeLocation.addToLocation();});
        const slugulusEructo = new DarkArtsEvent("Slugulus Eructo", "Box 1", () => {players.forEach(player => {player.health -= activeVillains.filter(villain => {return villain.type === "creature"}).length});});
        if (activeGame.includes("Box")) {
            darkArtsEvents.push(blastEnded, inquisitorialSquad1, inquisitorialSquad2, menacingGrowl1, menacingGrowl2, ragingTroll1, ragingTroll2, slugulusEructo);
            if (activeGame !== "Box 1") {
                // TO-DO: add Box 2 DAEs
                if (activeGame !== "Box 2") {
                    // TO-DO: add Box 3 DAEs
                    if (activeGame !== "Box 3") {
                        // TO-DO: add Box 4 DAEs
                    }
                }
            }
        }
        shuffle(darkArtsEvents);
        let activeDarkArtsEvents = [];
        let inactiveDarkArtsEvents = [];

        // villains
        class Villain {
            constructor(name, game, type, health, healthType, effect, reward) {
                this._name = name;
                this._img = document.createElement("img");
                this._img.className = "villain";
                this._img.src = `./images/${activeGame.includes("Box") && (name === "Basilisk" || name === "Dementor") ? "Box 1" : game}/${src(name)}`;
                this._img.alt = name;
                this._type = activeGame.includes("Box") && (name === "Basilisk" || name === "Dementor") ? "creature" : type;
                this._maxHealth = health;
                this._health = health;
                this._damageTaken = 0;
                this._healthType = healthType;
                this._effect = effect;
                this._reward = reward;
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
            displayDamage() {
                document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML = "";
                for (let i = 0; i < this._maxHealth - this.health; i++) {
                    document.getElementsByClassName("villainDamage")[activeVillains.indexOf(this)].innerHTML += this.type === "villain" ? "<img class=\"attackToken\" src=\"./images/attackToken.png\" alt=\"attack token\">" : "<img class=\"influenceToken\" src=\"./images/influenceToken.png\" alt=\"influence token\">";
                }
            }
            set health(health) {
                if (health > this._maxHealth) health = this._maxHealth;
                else if (health < this.health) {
                    this.damageTaken++;

                    // Confundus effect
                    if (activeVillains.every(villain => {return villain.damageTaken}) && (activePlayer.passives.includes(confundus1) || activePlayer.passives.includes(confundus2))) {
                        if (activePlayer.passives.includes(confundus1)) activePlayer.passives.splice(activePlayer.passives.indexOf(confundus1), 1);
                        else if (activePlayer.passives.includes(confundus2)) activePlayer.passives.splice(activePlayer.passives.indexOf(confundus2), 1);
                        activeLocation.removeFromLocation();
                    }

                    // Care of Magical Creatures proficiency
                    if (this.health === this._maxHealth && activePlayer.proficiency === "Care Of Magical Creatures" && this.type === "creature") {
                        const hurtPlayers = players.filter(player => {return canHeal(player);});
                        if (hurtPlayers.length) {
                            if (hurtPlayers.length > 1) {
                                playerChoice("Heal for 2:", () => {return hurtPlayers.length;}, 1, () => {
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
                    if (horcruxes[0] === horcrux2 && this.damageTaken === 2) {
                        activePlayer.health -= 2;
                        darken(horcrux2.img);
                    }
                }
                this._health = health;
                this.displayDamage();
                if (this.health <= 0) {

                    // remove villain
                    this.img.classList.toggle("defeating");
                    const petrifiedToken = this.petrifiedBy ? document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)].getElementsByClassName("petrifiedToken")[0] : null;
                    if (this.petrifiedBy) petrifiedToken.classList.toggle("defeating");
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

                        // reward players for villain defeat
                        setTimeout(() => {
                            this.reward();

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
                            // Viktor Krum effect
                            if (activePlayer.passives.includes(viktorKrum)) {
                                activePlayer.influence++;
                                activePlayer.health++;
                            }
                            // Care of Magical Creatures proficiency
                            if (activePlayer.proficiency === "Care Of Magical Creatures" && this.type === "creature") {
                                activeLocation.removeFromLocation();
                            }

                            // check for victory
                            if (!activeVillains.filter(villain => {return villain.health}).length && !inactiveVillains.length) {
                                // Voldemort
                                activeVillains = [];
                                if (activeGame === "Game 5" && this !== lordVoldemort1) {
                                    activeVillains.push(lordVoldemort1);
                                }
                                else if (activeGame === "Game 6" && this !== lordVoldemort2) {
                                    activeVillains.push(lordVoldemort2);
                                }
                                else if (activeGame === "Game 7" && this !== lordVoldemort3) {
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
            get damageTaken() {
                return this._damageTaken;
            }
            set damageTaken(damageTaken) {
                this._damageTaken = damageTaken;
            }
            get healthType() {
                return this._healthType;
            }
            effect() {
                darken(this.img);
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
                const activeVillainElement = this === invulnerableVoldemort() ? document.getElementById("villainDraw") : document.getElementsByClassName("activeVillain")[activeVillains.indexOf(this)];
                if (this.petrifiedBy) {
                    activeVillainElement.innerHTML += `<img src="./images/${this.type === "villain" ? "petrified" : "harp"}Token.png" class="petrifiedToken">`;

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
        const crabbeAndGoyle = new Villain("Crabbe And Goyle", "Game 1", "villain", 5, "health", () => {}, () => {players.forEach(player => {player.drawCards(1);});});
        const dracoMalfoy = new Villain("Draco Malfoy", "Game 1", "villain", 6, "health", () => {}, () => {activeLocation.removeFromLocation();});
        const quirinusQuirrell = new Villain("Quirinus Quirrell", "Game 1", "villain", 6, "health", () => {activePlayer.health--;}, () => {players.forEach(player => {player.influence++; player.health++;});});
        const basilisk = new Villain("Basilisk", "Game 2", "villain", 8, "health", () => {players.forEach(player => {player.petrified = true;});}, () => {players.forEach(player => {player.petrified = false; player.drawCards(1);}); activeLocation.removeFromLocation();});
        const luciusMalfoy = new Villain("Lucius Malfoy", "Game 2", "villain", 7, "health", () => {}, () => {players.forEach(player => {player.influence++;}); activeLocation.removeFromLocation();});
        const tomRiddle = new Villain("Tom Riddle", "Game 2", "villain", 6, "health", () => {
            let allies = activePlayer.hand.filter(card => {return card.type === "ally";}); 
            const tomRiddleEffect = () => {
                playerChoice("Lose:", () => {allies = allies.filter(card => {return activePlayer.hand.includes(card);}); if (allies.length) return 2; return 0;}, 1, () => {
                    document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div>`; 
                    document.getElementsByClassName("choice")[0].onclick = () => {activePlayer.health -= 2; allies.pop(); tomRiddleEffect();}; 
                    document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(activePlayer.hand); 
                    document.getElementsByClassName("choice")[1].onclick = () => {
                        playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {
                            for (let j = 0; j < activePlayer.hand.length; j++) {
                                document.getElementsByClassName("choice")[j].innerHTML = `<img src="${activePlayer.hand[j].img.src}">`; document.getElementsByClassName("choice")[j].onclick = () => {
                                    if (allies.includes(activePlayer.hand[j])) allies.splice(allies.indexOf(activePlayer.hand[j]), 1); 
                                    activePlayer.forcedDiscardAt(j, true); 
                                    allies.pop();
                                    tomRiddleEffect();
                                };
                            }
                        });
                    };
                });
            }; 
            tomRiddleEffect();
        }, () => {players.forEach(player => {const allies = player.discard.filter(card => {return card.type === "ally"}); const drawAllyFromDiscard = () => {const putAllyInHand = index => {player.addToHand(allies[index]); player.discard.splice(player.discard.indexOf(allies[index]), 1);}; if (allies.length === 1) putAllyInHand(0); else {playerChoice("Add to hand:", () => {return allies.length;}, 1, () => {for (let i = 0; i < allies.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${allies[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {putAllyInHand(i)};}});}}; if (allies.length && canHeal(player)) {playerChoice(`Choose for ${player.hero}:`, () => {return 2;}, 1, () => {document.getElementsByClassName("choice")[0].innerHTML = `<div class="choiceContainer">${healthToken + healthToken}</div><p>Health: ${player.health}</p>`; document.getElementsByClassName("choice")[0].onclick = () => {player.health += 2;}; document.getElementsByClassName("choice")[1].innerHTML = choiceScroll(allies); document.getElementsByClassName("choice")[1].onclick = drawAllyFromDiscard;});} else if (allies.length) drawAllyFromDiscard(); else player.health += 2;});});
        const dementor = new Villain("Dementor", "Game 3", "villain", 8, "health", () => {activePlayer.health -= 2;}, () => {players.forEach(player => {player.health += 2;}); activeLocation.removeFromLocation();});
        const peterPettigrew = new Villain("Peter Pettigrew", "Game 3", "villain", 7, "health", () => {if (!activePlayer.draw.length) activePlayer.shuffle(); if (activePlayer.draw[0].cost) {const tempPetrified = activePlayer.petrified; activePlayer.petrified = false; activePlayer.cardsDrawn--; activePlayer.drawCards(1); activePlayer.forcedDiscardAt(activePlayer.hand.length - 1, true); activePlayer.petrified = tempPetrified; activeLocation.addToLocation();}}, () => {players.forEach(player => {const spells = player.discard.filter(card => {return card.type === "spell";}); if (spells.length) {const discardToHand = index => {player.discard.splice(player.discard.indexOf(spells[index]), 1); player.addToHand(spells[index]);}; if (spells.length === 1) discardToHand(0); else {playerChoice(`${player.hero} move from Discard to Hand:`, () => {return spells.length;}, 1, () => {for (let i = 0; i < spells.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${spells[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});}}}); activeLocation.removeFromLocation();});
        const bartyCrouchJr = new Villain("Barty Crouch Jr", "Game 4", "villain", 7, "health", () => {}, () => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);});
        const deathEater1 = new Villain("Death Eater", "Game 4", "villain", 7, "health", () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();});
        const deathEater2 = new Villain("Death Eater", "Game 5", "villain", 7, "health", () => {}, () => {players.forEach(player => {player.health++;}); activeLocation.removeFromLocation();});
        const doloresUmbridge = new Villain("Dolores Umbridge", "Game 5", "villain", 7, "health", () => {}, () => {players.forEach(player => {player.influence++; player.health += 2;});});
        const lordVoldemort1 = new Villain("Lord Voldemort", "Game 5", "villain", 10, "health", () => {activePlayer.health--; if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, true);};}});} else activePlayer.forcedDiscardAt(0, true);}}, () => {});
        const bellatrixLestrange = new Villain("Bellatrix Lestrange", "Game 6", "villain", 9, "health", () => {}, () => {players.forEach(player => {const items = player.discard.filter(card => {return card.type === "item"}); if (items.length) {const discardToHand = index => {player.addToHand(discard[index]); player.discard.splice(index, 1);}; if (items.length > 1) {playerChoice(`${player.hero} move from discard to hand:`, () => {return items.length;}, 1, () => {for (let i = 0; i < items.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {discardToHand(i)};}});} else discardToHand(0);}}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);});
        const fenrirGreyback = new Villain("Fenrir Greyback", "Game 6", "villain", 8, "health", () => {}, () => {players.forEach(player => {player.health += 3;}); activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);});
        const lordVoldemort2 = new Villain("Lord Voldemort", "Game 6", "villain", 15, "health", () => {rollHouseDie("green", true, false);}, () => {});
        const lordVoldemort3 = new Villain("Lord Voldemort", "Game 7", "villain", 20, "health", () => {activeLocation.addToLocation();}, () => {});
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
        let activeVillains = [inactiveVillains.shift()];
        if (activeGame !== "Game 1" && activeGame !== "Game 2") {
            activeVillains.push(inactiveVillains.shift());
            if (activeGame !== "Game 3" && activeGame !== "Game 4") {
                activeVillains.push(inactiveVillains.shift());
            }
        }

        // events (horcruxes)
        class Horcrux {
            constructor(name, destroys, effect, reward) {
                this._name = name;
                this._img = document.createElement("IMG");
                this._img.className = "event";
                this._img.src = `./images/Game 7/${src(name)}`;
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
                            symbolImg.style.left = `${this === horcrux6 ? (6 + 12 * this._destroys.indexOf(symbol)) : (6 + 20 * this._destroys.indexOf(symbol))}%`;
                            document.getElementById("events").appendChild(symbolImg);
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
        const horcrux1 = new Horcrux("Horcrux 1", ["health", "draw"], () => {}, () => {});
        const horcrux2 = new Horcrux("Horcrux 2", ["attack", "influence"], () => {}, () => {if (activePlayer.hand.length >= 2 && (!activeVillains.includes(bartyCrouchJr) || bartyCrouchJr.petrifiedBy || bartyCrouchJr.health <= 0) && (activeLocation.number > 1 || activeLocation.added)) {if (activePlayer.hand.length > 2) {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 2, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else {activePlayer.forcedDiscardAt(0, false); activePlayer.forcedDiscardAt(0, false);} activeLocation.removeFromLocation(); horcrux2.img.onclick = () => {};}});
        const horcrux3 = new Horcrux("Horcrux 3", ["attack", "health"], () => {}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("green", false, false); horcrux3.img.onclick = () => {};}});
        const horcrux4 = new Horcrux("Horcrux 4", ["health", "influence"], () => {activeVillains.forEach(villain => {villain.health++;});}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("yellow", false, false); horcrux4.img.onclick = () => {};}});
        const horcrux5 = new Horcrux("Horcrux 5", ["draw", "attack"], () => {if (activePlayer.hand.filter(card => {return card.type === "ally"}).length && activePlayer.hand.filter(card => {return card.type === "item"}).length && activePlayer.hand.filter(card => {return card.type === "spell"}).length) activePlayer.health -= 2;}, () => {if (activePlayer.hand.length) {if (activePlayer.hand.length > 1) {playerChoice("Discard:", () => {return activePlayer.hand.length;}, 1, () => {for (let i = 0; i < activePlayer.hand.length; i++) {document.getElementsByClassName("choice")[i].innerHTML = `<img src="${activePlayer.hand[i].img.src}">`; document.getElementsByClassName("choice")[i].onclick = () => {activePlayer.forcedDiscardAt(i, false);};}});} else activePlayer.forcedDiscardAt(0, false); rollHouseDie("blue", false, false); horcrux5.img.onclick = () => {};}});
        const horcrux6 = new Horcrux("Horcrux 6", ["attack", "draw", "health"], () => {activePlayer.health--;}, () => {if (activePlayer.hand.length) {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation(); setTimeout(() => {activeLocation.removeFromLocation();}, 1000);}, 1000); activePlayer.horcruxesDestroyed.splice(activePlayer.horcruxesDestroyed.indexOf(horcrux6), 1); horcrux6.img.remove();}});
        let horcruxes = activeGame === "Game 7" ? [horcrux1, horcrux2, horcrux3, horcrux4, horcrux5, horcrux6] : [];

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
            <div id="events"></div>
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
            <div id="horcruxesDestroyed"></div>
            <div id="playerBoardContainer">
                <img id="playerBoard" src="./images/playerBoard.png" alt="player board">
                <img id="healthTracker" src="./images/healthTracker.png" alt="health tracker">
                <div id="attackTokens"></div>
                <div id="influenceTokens"></div>
            </div>
            <div id="playerHand"></div>
            <input type="button" id="endTurn" value="End Turn">
        </div>`;
        const disableScreen = document.createElement("DIV");
        disableScreen.id = "disableScreen";
        document.getElementsByTagName("MAIN")[0].appendChild(disableScreen);

        // add locations and events to board
        locations.toReversed().forEach(location => {document.getElementById("locations").appendChild(location.img);});
        if (activeGame === "Game 7") document.getElementById("events").appendChild(horcruxes[0].img);

        // Hogwarts Castle special
        if (hogwartsCastle.img) {
            hogwartsCastle.img.onclick = () => {
                if (activePlayer.attack >= 5) {
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
                    if ((!activeDarkArtsEvents.includes(tarantallegra) || !activeVillains[i].damageTaken) && (activeVillains[i] !== lordVoldemort3 || !horcruxes.length)) {
                        if (activePlayer.attack > 0 && activeVillains[i].healthType === "health") {
                            activePlayer.attack--;
                            activeVillains[i].health--;
                            activePlayer.attacks++;
                        }
                        else if (activePlayer.influence > 0 && activeVillains[i].healthType === "influence") {
                            activePlayer.influence--;
                            activeVillains[i].health--;
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
        let firstTurn = true;
        const startTurn = () => {
            // disable all events
            disableScreen.style.display = "block";
            let root = document.querySelector(":root");
            root.style.setProperty("--playerChoiceDisplay", "none");

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
                    let spells = activePlayer.hand.filter(card => {return card.type === "spell";});
                    if (spells.length >= 2) {
                        if (spells.length > 2) {
                            playerChoice("Discard:", () => {spells = spells.filter(spell => {return activePlayer.hand.includes(spell);}); return spells.length;}, 2, () => {
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
                };
            }
            // Flying Lessons proficiency
            else if (activePlayer.proficiency === "Flying Lessons") {
                document.getElementById("playerProficiency").onclick = () => {
                    if (activePlayer.influence >= 5) {
                        activePlayer.influence -= 5;
                        activeLocation.removeFromLocation();
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                }
            }
            // Transfiguration proficiency
            else if (activePlayer.proficiency === "Transfiguration") {
                document.getElementById("playerProficiency").onclick = () => {
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
                                    playerChoice("Add to hand:", () => {return cheapos.length;}, 1, () => {
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
                            playerChoice("Discard:", () => {return items.length;}, 1, () => {
                                for (let i = 0; i < items.length; i++) {
                                    document.getElementsByClassName("choice")[i].innerHTML = `<img src="${items[i].img.src}">`;
                                    document.getElementsByClassName("choice")[i].onclick = () => {transfigure(i)};
                                }
                            });
                        }
                        else transfigure(0);
                        document.getElementById("playerProficiency").onclick = () => {};
                    }
                };
            }

            // horcrux rewards
            if (activeGame === "Game 7") {
                if (activePlayer.horcruxesDestroyed.includes(horcrux2)) horcrux2.img.onclick = horcrux2.reward;
                if (activePlayer.horcruxesDestroyed.includes(horcrux3)) horcrux3.img.onclick = horcrux3.reward;
                if (activePlayer.horcruxesDestroyed.includes(horcrux4)) horcrux4.img.onclick = horcrux4.reward;
                if (activePlayer.horcruxesDestroyed.includes(horcrux5)) horcrux5.img.onclick = horcrux5.reward;
                if (activePlayer.horcruxesDestroyed.includes(horcrux6)) horcrux6.img.onclick = horcrux6.reward;
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
                                for (let i = 0; i < activeVillains.length; i++) {
                                    setTimeout(() => {
                                        if (!activeVillains[i].petrifiedBy) activeVillains[i].effect();

                                        if (i === activeVillains.length - 1) {
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
                                            if (horcruxes.length) {
                                                setTimeout(() => {
                                                    horcruxes[0].effect();
                                                    darken(horcruxes[0].img);
                                                }, 1000 + (invulnerableVoldemort() ? 1000 : 0));
                                            }

                                            // reenable all events
                                            setTimeout(() => {
                                                disableScreen.style.display = "none";
                                                root.style.setProperty("--playerChoiceDisplay", "flex");
                                            }, 1000 + (invulnerableVoldemort() ? 1000 : 0) + (horcruxes.length ? 1000 : 0));

                                            // magnify images
                                            for (let i = 0; i < document.getElementsByTagName("IMG").length; i++) {
                                                const img = document.getElementsByTagName("IMG")[i];
                                                img.oncontextmenu = event => {magnify(event);};
                                            }
                                        }

                                        // unpetrify villain
                                        if (activeVillains[i].petrifiedBy === activePlayer) {
                                            activeVillains[i].petrifiedBy = null;
                                        }
                                        activeVillains[i].damageTaken = 0;
                                    }, i * 1000);
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
                if (activeVillains[i].health <= 0) {
                    // add new villain
                    if (inactiveVillains.length) {
                        // Death Eater effect
                        if (activeVillains.includes(deathEater1) && !deathEater1.petrifiedBy && deathEater1.health) players.forEach(player => {player.health--;});
                        if (activeVillains.includes(deathEater2) && !deathEater2.petrifiedBy && deathEater2.health) players.forEach(player => {player.health--;});

                        // add new villain
                        activeVillains[i] = inactiveVillains.shift();
                        document.getElementsByClassName("activeVillain")[i].appendChild(activeVillains[i].img);

                        // remove villain card back and add Lord Voldemort
                        if (!inactiveVillains.length) {
                            document.getElementById("villainDraw").innerHTML = "";
                            if (activeGame === "Game 5" && activeVillains[0] !== lordVoldemort1) {
                                document.getElementById("villainDraw").appendChild(lordVoldemort1.img);
                            }
                            else if (activeGame === "Game 6" && activeVillains[0] !== lordVoldemort2) {
                                document.getElementById("villainDraw").appendChild(lordVoldemort2.img);
                            }
                            else if (activeGame === "Game 7" && activeVillains[0] !== lordVoldemort3) {
                                document.getElementById("villainDraw").appendChild(lordVoldemort3.img);
                            }
                        }
                    }
                    // shift remaining villains to the left
                    else {
                        activeVillains.splice(i, 1);
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
