function createTileElement(tile_name) {
    const tileDiv = document.createElement('div');
    tileDiv.className = 'tile_learn';

    const img = document.createElement('img');
    img.src = `/static/mahjong_tiles/${tile_name}.png`;
    img.alt = tile_name;

    const label = document.createElement('div');
    label.className = 'tile_label';
    label.textContent = tile_name.replace('_', ' ');

    const audio = new Audio(`/static/mahjong_tiles/audio/${tile_name}.mp3`);
    tileDiv.onclick = () => audio.play();

    tileDiv.appendChild(img);
    tileDiv.appendChild(label);

    return tileDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tile-learn-section');

    tileTypes.forEach(type => {
        let tileNames = [];

        if (type === "dragon") {
            tileNames = ["middle", "rich", "blank"];
        } else if (type === "wind") {
            tileNames = ["east", "south", "west", "north"];
        } else {
            for (let i = 1; i <= 9; i++) {
                if (type === "flower" && i === 9) continue;
                tileNames.push(`${i}_${type}`);
            }
        }

        // Create a flex row: [type label] [tiles...]
        const row = document.createElement('div');
        row.className = 'd-flex align-items-center mb-3';

        const label = document.createElement('div');
        label.textContent = type.charAt(0).toUpperCase() + type.slice(1) + ":";
        label.style.width = '100px';
        label.style.fontWeight = 'bold';
        label.style.flexShrink = '0';

        const tileContainer = document.createElement('div');
        tileContainer.className = 'd-flex flex-wrap gap-2';

        tileNames.forEach(tile_name => {
            const tileElement = createTileElement(tile_name);
            tileContainer.appendChild(tileElement);
        });

        row.appendChild(label);
        row.appendChild(tileContainer);
        container.appendChild(row);
    });
});

