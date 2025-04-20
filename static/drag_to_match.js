document.addEventListener('DOMContentLoaded', () => {
    // Load tilePairs from JSON embedded in HTML
    // const tilePairsElement = document.getElementById('tilePairsData');
    // if (!tilePairsElement) {
    //     console.warn("No tilePairsData found. Skipping drag-to-match setup.");
    //     return;
    // }

    // const tilePairs = JSON.parse(tilePairsElement.textContent);


    // Initialize drag and drop containers
    const dragSection = document.getElementById('tile-drag-section');
    const dropSection = document.querySelector('.mt-3');

    // Initialize user performance tracking
    let correctCount = Number(localStorage.getItem('drag_correct')) || 0;
    let wrongCount = Number(localStorage.getItem('drag_wrong')) || 0;

    // Shuffle tiles and types
    const shuffledTiles = [...tilePairs].sort(() => Math.random() - 0.5);
    const shuffledTypes = [...new Set(tilePairs.map(pair => pair.type))].sort(() => Math.random() - 0.5);

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
        };

        dragSection.appendChild(img);
    });

    // Create droppable type containers
    shuffledTypes.forEach(type => {
        const dropDiv = document.createElement('div');
        dropDiv.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        dropDiv.className = 'border p-3 m-2 text-center droppable';
        dropDiv.style.width = '120px';
        dropDiv.style.minHeight = '60px';
        dropDiv.style.display = 'inline-block';
        dropDiv.style.background = '#f8f9fa';

        dropDiv.ondragover = (e) => e.preventDefault();

        dropDiv.ondrop = (e) => {
            e.preventDefault();
            const droppedType = e.dataTransfer.getData('text/plain');

            if (droppedType === type) {
                correctCount++;
                dropDiv.style.background = '#d4edda';  // green
            } else {
                wrongCount++;
                dropDiv.style.background = '#f8d7da';  // red
            }

            // Save updated stats
            localStorage.setItem('drag_correct', correctCount);
            localStorage.setItem('drag_wrong', wrongCount);
        };

        dropSection.appendChild(dropDiv);
    });

    // Clear stats on finish
    const finishBtn = document.querySelector('#finish-btn');
    console.log("finish btn:", finishBtn);
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

    if (step === 1) {
        localStorage.setItem('drag_correct', 0);
        localStorage.setItem('drag_wrong', 0);
    }
    
});
