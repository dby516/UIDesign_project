// let roundCounter = 0;
// let score = 0;
// let max_score = 0;
// let score_flag = 1;

// const playerHand = [
//     "/static/mahjong_tiles/2_stripe.png",
//     "/static/mahjong_tiles/2_stripe.png",
//     "/static/mahjong_tiles/5_stripe.png",
//     "/static/mahjong_tiles/5_stripe.png",
//     "/static/mahjong_tiles/6_stripe.png",
//     "/static/mahjong_tiles/6_tong.png",
//     "/static/mahjong_tiles/7_tong.png",
//     "/static/mahjong_tiles/1_million.png",
//     "/static/mahjong_tiles/2_million.png",
//     "/static/mahjong_tiles/3_million.png",
//     "/static/mahjong_tiles/5_million.png",
//     "/static/mahjong_tiles/7_million.png",
//     "/static/mahjong_tiles/8_million.png",
// ];

// const rounds = [
//     {
//         text: "Tiles are dealt! Check your hand!",
//         buttons: ["Start Turn"],
//         action: () => {
//         }
//     },
//     {
//         text: "",
//         card: "/static/mahjong_tiles/9_million.png",
//         buttons: ["Grab"],
//         action: () => {
//             playerHand.push("/static/mahjong_tiles/9_million.png");
//             renderHand(); 
//         }
//     },
//     {
//         text: "Pick one to discard.",
//         buttons: [],
//         allowTileClick: true,
//         correctTileIndex: 10,
//         action: (clickedIndex) => {
//             if (clickedIndex === rounds[roundCounter].correctTileIndex) {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;
                
//                 setMessage("✅ Correct discard!");
//                 playerHand.splice(clickedIndex, 1); 
//                 roundCounter++;
//                 renderRound();
//             } else {
//                 score_flag = 0;
//                 const errorMessages = {
//                     0: "❌ Could be a set or a pair.",
//                     1: "❌ Could be a set or a pair.",
//                     2: "❌ Could be a set or a pair.",
//                     3: "❌ Could be a set or a pair.",
//                     4: "❌ Could be a set or a pair.",
//                     5: "❌ Could be a set or a pair.",
//                     6: "❌ Could be a set or a pair."
//                 };
//                 setMessage(errorMessages[clickedIndex] || "❌ Already a set");
//             }
//         }
//     },
//     {
//         text: "",
//         buttons: ["Next"],
//         action: () => {
//             setMessage("");
//         }
//     },
//     {
//         text: "East player turn\n He played:",
//         card: "/static/mahjong_tiles/8_tong.png",
//         buttons: ["Chi", "Pong", "Hu!", "Pass"],
//         buttonActions: {
//             "Chi": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't chi now");
//             },
//             "Pong": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't pong now");
//             },
//             "Hu!": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't hu now");
//             },
//             "Pass": () => {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;

//                 setMessage("✅ All you can do is pass");
//                 roundCounter++;
//                 renderRound();
//             }
//         },
//         action: () => {
//             setMessage("Select your action");
//         }
//     },
//     {
//         text: "",
//         buttons: ["Next"],
//         action: () => {
//             setMessage("");
//         }
//     },
//     {
//         text: "North player turn\n He played:",
//         card: "/static/mahjong_tiles/7_stripe.png",
//         buttons: ["Chi", "Pong", "Hu!", "Pass"],
//         buttonActions: {
//             "Chi": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't chi now");
//             },
//             "Pong": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't pong now");
//             },
//             "Hu!": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't hu now");
//             },
//             "Pass": () => {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;

//                 setMessage("✅ All you can do is pass");
//                 roundCounter++;
//                 renderRound();
//             }
//         },
//         action: () => {
//             setMessage("Select your action");
//         }
//     },
//     {
//         text: "",
//         buttons: ["Next"],
//         action: () => {
//             setMessage("");
//         }
//     },
//     {
//         text: "West player turn\n He played:",
//         card: "/static/mahjong_tiles/7_stripe.png",
//         buttons: ["Chi", "Pong", "Hu!", "Pass"],
//         buttonActions: {
//             "Chi": () => {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;

//                 setMessage("✅ Correct!");
//                 playerHand.splice(5, 0, "/static/mahjong_tiles/7_stripe.png");
//                 renderHand(); 

//                 roundCounter++;
//                 renderRound();
//             },
//             "Pong": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't pong now");
//             },
//             "Hu!": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't hu now");
//             },
//             "Pass": () => {
//                 score_flag = 0;
//                 setMessage("❌ There's option you can do to form a set")
//             }
//         },
//         action: () => {
//             setMessage("Select your action");
//         }
//     },
//     {
//         text: "Pick one to discard.",
//         buttons: [],
//         allowTileClick: true,
//         correctTileIndex: [2, 3],
//         action: (clickedIndex) => {
//             if (rounds[roundCounter].correctTileIndex.includes(clickedIndex)) {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;

//                 setMessage("✅ Correct discard!");
//                 playerHand.splice(clickedIndex, 1); 
//                 roundCounter++;
//                 renderRound();
//             } else {
//                 score_flag = 0;

//                 const errorMessages = {
//                     0: "❌ Could be a set or a pair.",
//                     1: "❌ Could be a set or a pair."
//                 };
//                 setMessage(errorMessages[clickedIndex] || "❌ Already a set");
//             }
//         }
//     },
//     {
//         text: "",
//         buttons: ["Next"],
//         action: () => {
//             setMessage("");
//         }
//     },
//     {
//         text: "East player turn\n He played:",
//         card: "/static/mahjong_tiles/8_tong.png",
//         buttons: ["Chi", "Pong", "Hu!", "Pass"],
//         buttonActions: {
//             "Chi": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't chi now");
//             },
//             "Pong": () => {
//                 score_flag = 0;
//                 setMessage("❌ You can't pong now");
//             },
//             "Hu!": () => {
//                 if (score_flag === 1) {
//                     score += 1;
//                 }
//                 score_flag = 1;
//                 max_score += 1;

//                 fetch(`/quiz/${questionId}/results`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ score: score, max_score: max_score })
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         window.location.href = `/quiz/${questionId}/results`; 
//                     } else {
//                         console.error("Error while submitting score.");
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error:", error);
//                 });
//             },
//             "Pass": () => {
//                 score_flag = 0;
//                 setMessage("❌ You shouldn't pass now")
//             }
//         },
//         action: () => {
//             setMessage("Select your action");
//         }
//     },
// ];

// renderHand();

// function renderRound() {
//     const centerText = document.querySelector(".discard-info");
//     const cardImg = centerText.querySelector("img");
//     const options = document.querySelector(".options");
//     const paragraph = centerText.querySelector("p");

//     // Current round
//     const current = rounds[roundCounter];

//     // Set the text
//     paragraph.textContent = current.text;

//     // Show the card
//     if (current.card) {
//         cardImg.src = current.card;
//         cardImg.style.display = 'inline';
//     } else {
//         cardImg.style.display = 'none';
//     }

//     // Render buttons
//     options.innerHTML = '';
//     current.buttons.forEach(label => {
//         const btn = document.createElement("button");
//         btn.textContent = label;
//         btn.onclick = () => {
//             if (current.buttonActions && current.buttonActions[label]) {
//                 current.buttonActions[label]();  // 執行對應動作
//             } else if (current.action) {
//                 current.action();
//                 roundCounter++;
//                 renderRound();
//             }
//         };
//         options.appendChild(btn);
//     });

//     // Render hand with correct tile click behavior
//     renderHand(current.allowTileClick ? (index) => {
//         if (typeof current.action === 'function') {
//             current.action(index);
//         }
//     } : null);
// }


// function renderHand(onClickHandler) {
//     const handDiv = document.getElementById("player-hand");
//     handDiv.innerHTML = '';
//     playerHand.forEach((tile, index) => {
//         const img = document.createElement("img");
//         img.src = tile;
//         img.className = "mahjong-tile";
//         img.dataset.index = index;
//         if (onClickHandler) {
//             img.onclick = () => onClickHandler(index);
//         }
//         handDiv.appendChild(img);
//     });
// }

// function handleTileClick(index) {
//     console.log(`Clicked tile index: ${index}`);
// }

// function setMessage(text) {
//     const box = document.getElementById("message-box");
//     box.textContent = text;
// }


// document.addEventListener("DOMContentLoaded", renderRound);

let roundCounter = 0;
let score = 0;
let max_score = 0;
let score_flag = 1;

const discard_E = [];
const discard_N = [];
const discard_W = [];
const discard_S = [];

const playerHand = [
    "/static/mahjong_tiles/2_stripe.png",
    "/static/mahjong_tiles/2_stripe.png",
    "/static/mahjong_tiles/5_stripe.png",
    "/static/mahjong_tiles/5_stripe.png",
    "/static/mahjong_tiles/6_stripe.png",
    "/static/mahjong_tiles/6_tong.png",
    "/static/mahjong_tiles/7_tong.png",
    "/static/mahjong_tiles/1_million.png",
    "/static/mahjong_tiles/2_million.png",
    "/static/mahjong_tiles/3_million.png",
    "/static/mahjong_tiles/5_million.png",
    "/static/mahjong_tiles/7_million.png",
    "/static/mahjong_tiles/8_million.png",
];

const rounds = [
    {
        text: "Tiles are dealt! Check your hand!",
        buttons: ["Start Turn"],
        turn: "S",
        action: () => {
        }
    },
    {
        text: "",
        card: "/static/mahjong_tiles/9_million.png",
        buttons: ["Grab"],
        turn: "S",
        action: () => {
            playerHand.push("/static/mahjong_tiles/9_million.png");
            renderHand(); 
        }
    },
    {
        text: "Pick one to discard.",
        buttons: [],
        allowTileClick: true,
        correctTileIndex: 10,
        turn: "S",
        action: (clickedIndex) => {
            if (clickedIndex === rounds[roundCounter].correctTileIndex) {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;
                
                setMessage("✅ Correct discard! The tile isn't any part of the set or pair");
                const discarded = playerHand.splice(clickedIndex, 1)[0];
                discard_S.push(discarded);
                addDiscard("S", discarded);
                roundCounter++;
                renderRound();
            } else {
                score_flag = 0;
                const errorMessages = {
                    0: "❌ Already a pair, it could also be a potental set",
                    1: "❌ Already a pair, it could also be a potental set",
                    2: "❌ Already a pair, it could also be a potental set",
                    3: "❌ Already a pair, it could also be a potental set",
                    4: "❌ Could be a potental set",
                    5: "❌ Could be a potental set",
                    6: "❌ Could be a potental set"
                };
                setMessage(errorMessages[clickedIndex] || "❌ Already a set");
                addStrike();
            }
        }
    },
    {
        text: "",
        buttons: ["Next"],
        turn: "S",
        action: () => {
            setMessage("");
        }
    },
    {
        text: "East player turn\n He played:",
        card: "/static/mahjong_tiles/8_tong.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        turn: "E",
        buttonActions: {
            "Chi": () => {
                score_flag = 0;
                setMessage("❌ You can't chi this player's discard card");
                addStrike();
            },
            "Pong": () => {
                score_flag = 0;
                setMessage("❌ No set for you to pong now");
                addStrike();
            },
            "Hu!": () => {
                score_flag = 0;
                setMessage("❌ You can't hu now");
                addStrike();
            },
            "Pass": () => {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;
                discard_E.push(rounds[roundCounter].card);
                addDiscard("E", rounds[roundCounter].card);

                setMessage("✅ All you can do is pass");
                roundCounter++;
                renderRound();
            }
        },
        action: () => {
            setMessage("Select your action");
        }
    },
    {
        text: "",
        buttons: ["Next"],
        turn: "E",
        action: () => {
            setMessage("");
        }
    },
    {
        text: "North player turn\n He played:",
        card: "/static/mahjong_tiles/7_stripe.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        turn: "N",
        buttonActions: {
            "Chi": () => {
                score_flag = 0;
                setMessage("❌ You can't chi this player's discard card");
                addStrike();
            },
            "Pong": () => {
                score_flag = 0;
                setMessage("❌ No set for you to pong now");
                addStrike();
            },
            "Hu!": () => {
                score_flag = 0;
                setMessage("❌ You can't hu now");
                addStrike();
            },
            "Pass": () => {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;
                discard_N.push(rounds[roundCounter].card);
                addDiscard("N", rounds[roundCounter].card);

                setMessage("✅ All you can do is pass");
                roundCounter++;
                renderRound();
            }
        },
        action: () => {
            setMessage("Select your action");
        }
    },
    {
        text: "",
        buttons: ["Next"],
        turn: "N",
        action: () => {
            setMessage("");
        }
    },
    {
        text: "West player turn\n He played:",
        card: "/static/mahjong_tiles/7_stripe.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        turn: "W",
        buttonActions: {
            "Chi": () => {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;

                setMessage("✅ Correct!");
                playerHand.splice(5, 0, "/static/mahjong_tiles/7_stripe.png");
                renderHand(); 

                roundCounter++;
                renderRound();
            },
            "Pong": () => {
                score_flag = 0;
                setMessage("❌ No set for you to pong now");
                addStrike();
            },
            "Hu!": () => {
                score_flag = 0;
                setMessage("❌ You can't hu now");
                addStrike();
            },
            "Pass": () => {
                score_flag = 0;
                setMessage("❌ There's option you can do to form a set");
                addStrike();
            }
        },
        action: () => {
            setMessage("Select your action");
            discard_W.push(rounds[roundCounter].card);
            addDiscard("W", rounds[roundCounter].card);
        }
    },
    {
        text: "Pick one to discard.",
        buttons: [],
        allowTileClick: true,
        correctTileIndex: [2, 3],
        turn: "S",
        action: (clickedIndex) => {
            if (rounds[roundCounter].correctTileIndex.includes(clickedIndex)) {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;

                setMessage("✅ Correct discard!");
                const discarded = playerHand.splice(clickedIndex, 1)[0];
                discard_S.push(discarded);
                addDiscard("S", discarded);
                roundCounter++;
                renderRound();
            } else {
                score_flag = 0;

                const errorMessages = {
                    0: "❌ This is a pair.",
                    1: "❌ This is a pair."
                };
                setMessage(errorMessages[clickedIndex] || "❌ Already a set");
                addStrike();
            }
        }
    },
    {
        text: "",
        buttons: ["Next"],
        turn: "S",
        action: () => {
            setMessage("");
        }
    },
    {
        text: "East player turn\n He played:",
        card: "/static/mahjong_tiles/8_tong.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        turn: "E",
        buttonActions: {
            "Chi": () => {
                score_flag = 0;
                setMessage("❌ You can't chi this player's discard card");
                addStrike();
            },
            "Pong": () => {
                score_flag = 0;
                setMessage("❌ No set for you to pong now");
                addStrike();
            },
            "Hu!": () => {
                if (score_flag === 1) {
                    score += 1;
                }
                score_flag = 1;
                max_score += 1;

                fetch(`/quiz/${questionId}/results`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ score: score, max_score: max_score })
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = `/quiz/${questionId}/results`; 
                    } else {
                        console.error("Error while submitting score.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            },
            "Pass": () => {
                score_flag = 0;
                setMessage("❌ You shouldn't pass now");
                addStrike();
            }
        },
        action: () => {
            setMessage("Select your action");
            discard_E.push(rounds[roundCounter].card);
            addDiscard("E", rounds[roundCounter].card);
        }
    },
];


renderHand();

function renderRound() {
    const centerText = document.querySelector(".discard-info");
    const cardImg = centerText.querySelector("img");
    const options = document.querySelector(".options");
    const paragraph = document.getElementById("discard-message");

    const current = rounds[roundCounter];
    let roundTurn = rounds[roundCounter].turn;

    paragraph.textContent = current.text;

    if (current.card) {
        cardImg.src = current.card;
        cardImg.style.display = 'inline';
    } else {
        cardImg.style.display = 'none';
    }

    options.innerHTML = '';
    current.buttons.forEach(label => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.onclick = () => {
            if (current.buttonActions && current.buttonActions[label]) {
                current.buttonActions[label]();
            } else if (current.action) {
                current.action();
                roundCounter++;
                renderRound();
            }
        };
        options.appendChild(btn);
    });

    renderHand(current.allowTileClick ? (index) => {
        if (typeof current.action === 'function') {
            current.action(index);
        }
    } : null);

    if (roundTurn === 'S') {
        const southImg = document.querySelector(".player.south .player-info img");
        southImg.classList.add("player-highlight");
    } else {
        const southImg = document.querySelector(".player.south .player-info img");
        southImg.classList.remove("player-highlight");
    }
    if (roundTurn === 'N') {
        const northImg = document.querySelector(".player.north img");
        northImg.classList.add("player-highlight");
    } else {
        const northImg = document.querySelector(".player.north img");
        northImg.classList.remove("player-highlight");
    }
    if (roundTurn === 'E') {
        const eastImg = document.querySelector(".player.east img");
        eastImg.classList.add("player-highlight");
    } else {
        const eastImg = document.querySelector(".player.east img");
        eastImg.classList.remove("player-highlight");
    }
    
    if (roundTurn === 'W') {
        const westImg = document.querySelector(".player.west img");
        westImg.classList.add("player-highlight");
    } else {
        const westImg = document.querySelector(".player.west img");
        westImg.classList.remove("player-highlight");
    }
}

function renderHand(onClickHandler) {
    const handDiv = document.getElementById("player-hand");
    handDiv.innerHTML = '';
    playerHand.forEach((tile, index) => {
        const img = document.createElement("img");
        img.src = tile;
        img.className = "mahjong-tile";
        img.dataset.index = index;
        if (onClickHandler) {
            img.onclick = () => onClickHandler(index);
        }
        handDiv.appendChild(img);
    });
}

function setMessage(text) {
    const box = document.getElementById("message-box");
    box.textContent = text;
}

function addDiscard(player, tile) {
    const div = document.getElementById(`discard-${player}`);
    const img = document.createElement("img");
    img.src = tile;
    img.className = "discard-tile";
    div.appendChild(img);
}

// let strikeCount = 0;

function addStrike() {
    strikeCount++;
    const strikes = document.querySelectorAll(".strike");
    if (strikeCount <= 3) {
        strikes[strikeCount - 1].classList.add("active");
    }
    if (strikeCount >= 3) {
        const strikeMsg = "You made too many mistakes. Restarting the quiz...";
        setMessage(strikeMsg); 
        document.getElementById("strike-message").innerText = strikeMsg; 
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
}




document.addEventListener("DOMContentLoaded", renderRound);
