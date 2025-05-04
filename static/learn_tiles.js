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
// function showCheatsheetPopup() {
//     const popup = document.getElementById('cheatsheet-popup');
//     const closeBtn = popup.querySelector('.popup-close');

//     popup.classList.remove('hidden');

//     // Allow close
//     closeBtn.onclick = () => {
//         popup.classList.add('hidden');
//     };
// }

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
        // >>> ADDED >>>
        row.className = 'd-flex flex-column align-items-start mb-4'; 
        // was originally: 'd-flex align-items-center mb-3'
        // <<< ADDED <<<

        const label = document.createElement('div');
        label.textContent = type.charAt(0).toUpperCase() + type.slice(1) + ":";
        label.style.fontWeight = 'bold';
        // >>> ADDED >>>
        label.className = 'mb-2'; 
        // instead of setting width/flexShrink manually (now flexible and clean)
        // <<< ADDED <<<

        const tileContainer = document.createElement('div');
        tileContainer.className = 'd-flex flex-wrap gap-2';
        // >>> ADDED >>>
        tileContainer.setAttribute('data-type', type);  
        // tagging the container to know which group it belongs to
        // <<< ADDED <<<

        tileNames.forEach(tile_name => {
            const tileElement = createTileElement(tile_name);
            tileContainer.appendChild(tileElement);
        });

        // >>> ADDED >>>
        // Create an "Add to Cheatsheet" button per tile group
        const addButton = document.createElement('button');
        addButton.textContent = `⭐`;
        addButton.className = 'btn btn-success mt-2';
        addButton.onclick = () => {
            const imgs = tileContainer.querySelectorAll('img');
            const tileImages = Array.from(imgs).map(img => img.getAttribute('src').split('/').pop());

            fetch('/add-to-cheatsheet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: tileImages, notes: "" })
            }).then(res => {
                if (res.ok) {
                    showCheatsheetPopup();

                }
            });
        };
        // <<< ADDED <<<

        row.appendChild(label);
        row.appendChild(tileContainer);
        // >>> ADDED >>>
        tileContainer.appendChild(addButton); 
        // now each tile group row has its own button
        // <<< ADDED <<<

        container.appendChild(row);
    });

});
