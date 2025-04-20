let roundCounter = 0;

const playerHand = [
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
            setMessage("");
        }
    },
    {
        text: "Grab a card",
        card: "/static/mahjong_tiles/back.png",
        buttons: ["Grab"],
        action: () => {
            playerHand.push("/static/mahjong_tiles/9_million.png");
            renderHand(); 
            setMessage("You drew a tile!");
        }
    },
    {
        text: "Pick one to discard.",
        buttons: [],
        allowTileClick: true,
        correctTileIndex: 3,
        action: (clickedIndex) => {
            if (clickedIndex === rounds[roundCounter].correctTileIndex) {
                setMessage("✅ Correct discard!");
                playerHand.splice(clickedIndex, 1);  // 移除正確那張
                roundCounter++;
                renderRound();
            } else {
                const errorMessages = {
                    0: "❌ Too early to discard this tile.",
                    1: "❌ That tile isn't helping your set.",
                    3: "❌ Hmm… not quite the right choice.",
                    4: "❌ That doesn't improve your hand.",
                    5: "❌ Wrong tile. Think again!"
                };
                setMessage(errorMessages[clickedIndex] || "❌ Not the right tile.");
            }
        }
    },
    {
        text: "TODO",
        buttons: ["TODO"],
        action: () => {
            // Do nothing
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
            if (current.action) current.action(); 
            roundCounter++;
            renderRound();
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
