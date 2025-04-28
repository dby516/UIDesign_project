const exampleTiles = {
    "million": ["1_million", "2_million", "3_million", "4_million"],
    "tong": ["1_tong", "2_tong", "3_tong", "4_tong"],
    "stripe": ["1_stripe", "2_stripe", "3_stripe", "4_stripe"],
    "wind": ["east", "south", "west", "north"],
    "dragon": ["middle", "rich", "blank"],
    "flower": ["1_flower", "2_flower", "3_flower", "4_flower"]
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize drag and drop containers
    const dragSection = document.getElementById('tile-drag-section');
    const dropSection = document.getElementById('drop-section');

    // Initialize user performance tracking
    let correctCount = Number(localStorage.getItem('drag_correct')) || 0;
    let wrongCount = Number(localStorage.getItem('drag_wrong')) || 0;
    let totalTiles = tilePairs.length; // total tiles for this step
    let correctDrops = 0;

    // ---------------------
    // 1. Group tiles by type
    const typeToTiles = {};
    tilePairs.forEach(pair => {
        if (!typeToTiles[pair.type]) {
            typeToTiles[pair.type] = [];
        }
        typeToTiles[pair.type].push(pair);
    });

    let allTypes = Object.keys(typeToTiles);
    if (allTypes.length > 4) {
        allTypes = allTypes.sort(() => Math.random() - 0.5).slice(0, 4);
    } else {
        allTypes = allTypes.sort(() => Math.random() - 0.5);
    }

    const shuffledTiles = allTypes.map(type => {
        const tiles = typeToTiles[type];
        return tiles[Math.floor(Math.random() * tiles.length)];
    });

    const shuffledTypes = [...allTypes].sort(() => Math.random() - 0.5);

    // ---------------------

    // Create draggable tile images
    shuffledTiles.forEach(({ tile, type }) => {
        const img = document.createElement('img');
        img.src = `/static/mahjong_tiles/${tile}.png`;
        img.alt = tile;
        img.draggable = true;
        img.className = 'tile_learn';
        img.id = `drag-${tile}`;

        img.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', type);
            e.dataTransfer.setData('tile-id', img.id);
        };
        

        dragSection.appendChild(img);
    });

    // Create droppable type containers
    shuffledTypes.forEach(type => {
        const dropDiv = document.createElement('div');
        dropDiv.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        dropDiv.className = 'droppable';
        dropDiv.style.display = 'inline-block';

        dropDiv.ondragover = (e) => e.preventDefault();
        
        dropDiv.ondragenter = (e) => {
            e.preventDefault();
            dropDiv.classList.add('droppable-hover');
        };
        
        dropDiv.ondragleave = (e) => {
            e.preventDefault();
            dropDiv.classList.remove('droppable-hover');
        };
        

        dropDiv.ondrop = (e) => {
            e.preventDefault();
            const droppedType = e.dataTransfer.getData('text/plain');
            const draggedTileId = e.dataTransfer.getData('tile-id');
            const draggedTile = document.getElementById(draggedTileId);
            const responseText = document.getElementById('response-text');

            if (droppedType === type) {
                correctCount++;
                correctDrops++;
                dropDiv.style.background = '#d4edda';  // green
        
                // Find the dragged tile and disable further dragging
                // const draggedTileId = e.dataTransfer.getData('tile-id');
                // const draggedTile = document.getElementById(draggedTileId);
                if (draggedTile) {
                    draggedTile.draggable = false;
                    draggedTile.style.opacity = '0.5'; // Optional: visually dim it
                    draggedTile.style.cursor = 'default'; // Optional: change cursor
                }

                // Check if all tiles are correctly matched
                if (correctDrops === totalTiles) {
                    const nextBtn = document.getElementById('next-btn');
                    if (nextBtn) {
                        nextBtn.disabled = false;
                    }
                }

                // Show correct response
                responseText.innerHTML = `<span class="text-success fw-bold">✅ Correct!</span>`;
        
            } else {
                wrongCount++;
                dropDiv.style.background = '#f8d7da';  // red
                const tileName = draggedTile.id.replace('drag-', ''); // e.g., drag-1_million -> 1_million
                const description = tileDescriptions[tileName] || "No description available.";
                console.log(description)
                // Show "Wrong!" with hover popup
                // Find all tiles of the correct dropped category
                const correctTypeTiles = (exampleTiles[type] || [])
                    .map(tileName => `<img src="/static/mahjong_tiles/${tileName}.png" alt="${tileName}">`)
                    .join('');

                // Create full tooltip content
                const tooltipHTML = `
                    <div class="tooltip-content">
                        <div><strong>Your Tile:</strong></div>
                        <img src="/static/mahjong_tiles/${tileName}.png" alt="${tileName}">
                        <div style="margin-top: 8px; font-size: 14px;">${description}</div>
                        <hr>
                        <div><strong>This is what "${type}" looks like:</strong></div>
                        ${correctTypeTiles}
                    </div>
                `;

                responseText.innerHTML = `
                    <span class="text-danger fw-bold">❌ Wrong! 
                        <span class="tile-info">
                            (Learn More)
                            ${tooltipHTML}
                        </span>
                    </span>
                `;
            }
        
            // Save updated stats
            localStorage.setItem('drag_correct', correctCount);
            localStorage.setItem('drag_wrong', wrongCount);
        };
        

        dropSection.appendChild(dropDiv);
    });

    // Clear stats on finish
    const finishBtn = document.querySelector('#finish-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            console.log("Resetting localStorage...");
            console.log("Before reset:", {
                correct: localStorage.getItem('drag_correct'),
                wrong: localStorage.getItem('drag_wrong')
            });

            localStorage.removeItem('drag_correct');
            localStorage.removeItem('drag_wrong');

            console.log("After reset:", {
                correct: localStorage.getItem('drag_correct'),
                wrong: localStorage.getItem('drag_wrong')
            });
        });
    }

    // Reset counters on first step
    if (step === 1) {
        localStorage.setItem('drag_correct', 0);
        localStorage.setItem('drag_wrong', 0);
    }
});
