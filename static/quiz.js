let roundCounter = 0;
let score = 0;

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
        action: () => {
        }
    },
    {
        text: "",
        card: "/static/mahjong_tiles/9_million.png",
        buttons: ["Grab"],
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
        action: (clickedIndex) => {
            if (clickedIndex === rounds[roundCounter].correctTileIndex) {
                setMessage("✅ Correct discard!");
                playerHand.splice(clickedIndex, 1); 
                roundCounter++;
                renderRound();
            } else {
                const errorMessages = {
                    0: "❌ Could be a set or a pair.",
                    1: "❌ Could be a set or a pair.",
                    2: "❌ Could be a set or a pair.",
                    3: "❌ Could be a set or a pair.",
                    4: "❌ Could be a set or a pair.",
                    5: "❌ Could be a set or a pair.",
                    6: "❌ Could be a set or a pair."
                };
                setMessage(errorMessages[clickedIndex] || "❌ Already a set");
            }
        }
    },
    {
        text: "",
        buttons: ["Next"],
        action: () => {
            setMessage("");
        }
    },
    {
        text: "East player turn\n He played:",
        card: "/static/mahjong_tiles/8_tong.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        buttonActions: {
            "Chi": () => setMessage("❌ You can't chi now"),
            "Pong": () => setMessage("❌ You can't pong now"),
            "Hu!": () => setMessage("❌ You can't hu now"),
            "Pass": () => {
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
        action: () => {
            setMessage("");
        }
    },
    {
        text: "North player turn\n He played:",
        card: "/static/mahjong_tiles/7_stripe.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        buttonActions: {
            "Chi": () => setMessage("❌ You can't chi now"),
            "Pong": () => setMessage("❌ You can't pong now"),
            "Hu!": () => setMessage("❌ You can't hu now"),
            "Pass": () => {
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
        action: () => {
            setMessage("");
        }
    },
    {
        text: "West player turn\n He played:",
        card: "/static/mahjong_tiles/7_stripe.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        buttonActions: {
            "Chi": () => {
                setMessage("✅ Correct!");
                playerHand.splice(5, 0, "/static/mahjong_tiles/7_stripe.png");
                renderHand(); 

                roundCounter++;
                renderRound();
            },
            "Pong": () => setMessage("❌ You can't pong now"),
            "Hu!": () => setMessage("❌ You can't hu now"),
            "Pass": () => setMessage("✅ There's option you can do to form a set")
        },
        action: () => {
            setMessage("Select your action");
        }
    },
    {
        text: "Pick one to discard.",
        buttons: [],
        allowTileClick: true,
        correctTileIndex: [2, 3],
        action: (clickedIndex) => {
            if (rounds[roundCounter].correctTileIndex.includes(clickedIndex)) {
                setMessage("✅ Correct discard!");
                playerHand.splice(clickedIndex, 1); 
                roundCounter++;
                renderRound();
            } else {
                const errorMessages = {
                    0: "❌ Could be a set or a pair.",
                    1: "❌ Could be a set or a pair."
                };
                setMessage(errorMessages[clickedIndex] || "❌ Already a set");
            }
        }
    },
    {
        text: "",
        buttons: ["Next"],
        action: () => {
            setMessage("");
        }
    },
    {
        text: "East player turn\n He played:",
        card: "/static/mahjong_tiles/8_tong.png",
        buttons: ["Chi", "Pong", "Hu!", "Pass"],
        buttonActions: {
            "Chi": () => setMessage("❌ You can't chi now"),
            "Pong": () => setMessage("❌ You can't pong now"),
            "Hu!": () => {window.location.href = `/quiz/${questionId}/results`;},
            "Pass": () => setMessage("❌ You shouldn't pass now")
        },
        action: () => {
            setMessage("Select your action");
        }
    },
];

renderHand();

function renderRound() {
    const centerText = document.querySelector(".discard-info");
    const cardImg = centerText.querySelector("img");
    const options = document.querySelector(".options");
    const paragraph = centerText.querySelector("p");

    // Current round
    const current = rounds[roundCounter];

    // Set the text
    paragraph.textContent = current.text;

    // Show the card
    if (current.card) {
        cardImg.src = current.card;
        cardImg.style.display = 'inline';
    } else {
        cardImg.style.display = 'none';
    }

    // Render buttons
    options.innerHTML = '';
    current.buttons.forEach(label => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.onclick = () => {
            if (current.buttonActions && current.buttonActions[label]) {
                current.buttonActions[label]();  // 執行對應動作
            } else if (current.action) {
                current.action();
                roundCounter++;
                renderRound();
            }
        };
        options.appendChild(btn);
    });

    // Render hand with correct tile click behavior
    renderHand(current.allowTileClick ? (index) => {
        if (typeof current.action === 'function') {
            current.action(index);
        }
    } : null);
}


function renderHand(onClickHandler) {
    const handDiv = document.getElementById("player-hand");
    handDiv.innerHTML = '';
    playerHand.forEach((tile, index) => {
        const img = document.createElement("img");
        img.src = tile;
        img.className = "tile";
        img.dataset.index = index;
        if (onClickHandler) {
            img.onclick = () => onClickHandler(index);
        }
        handDiv.appendChild(img);
    });
}

function handleTileClick(index) {
    console.log(`Clicked tile index: ${index}`);
}

function setMessage(text) {
    const box = document.getElementById("message-box");
    box.textContent = text;
}


document.addEventListener("DOMContentLoaded", renderRound);
