let roundCounter = 0;

const stateMachine = [
    {
        text: "Tiles are dealt! Check your hand!",
        buttons: ["Start Turn"],
        action: () => {
            // Do nothing
        }
    },
    {
        text: "He discards: 2萬",
        discard: "/static/mahjong_tiles/2_million.png",
        buttons: ["Grab"],
        action: () => {
            // Maybe highlight the discard
        }
    },
    {
        text: "Pick one to discard.",
        buttons: [],
        allowTileClick: true,
        action: () => {
            // You can click a tile to discard
        }
    }
];

function renderRound() {
    const centerText = document.querySelector(".discard-info");
    const options = document.querySelector(".options");
    const discardImg = centerText.querySelector("img");
    const paragraph = centerText.querySelector("p");

    const current = stateMachine[roundCounter];

    // Set the text
    paragraph.textContent = current.text;

    // Show the card
    if (current.discard) {
        discardImg.src = current.discard;
        discardImg.style.display = 'inline';
    } else {
        discardImg.style.display = 'none';
    }

    // Clear
    options.innerHTML = '';
    current.buttons.forEach(label => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.onclick = () => {
            roundCounter++;
            renderRound();
        };
        options.appendChild(btn);
    });

    // Control if the tiles are clickable
    document.querySelectorAll(".tile").forEach(tile => {
        tile.onclick = current.allowTileClick ? () => {
            alert("You discarded this tile.");
            roundCounter++;
            renderRound();
        } : null;
    });

    // Do the action
    if (current.action) current.action();
}

document.addEventListener("DOMContentLoaded", renderRound);
