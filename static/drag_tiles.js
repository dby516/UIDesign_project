document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tileContainer");
    const nextButton = document.getElementById("nextBtn");
    let draggedTile = null;

    container.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("tile")) {
            draggedTile = e.target;
        }
    });

    container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains("tile") && target !== draggedTile) {
            const children = [...container.children];
            const draggedIndex = children.indexOf(draggedTile);
            const targetIndex = children.indexOf(target);

            if (draggedIndex < targetIndex) {
                container.insertBefore(draggedTile, target.nextSibling);
            } else {
                container.insertBefore(draggedTile, target);
            }
        }
    });

    container.addEventListener("drop", (e) => {
        e.preventDefault();
        draggedTile = null;
        checkTileOrder();
    });

    function checkTileOrder() {
        const currentOrder = [...container.children].map(tile => tile.dataset.filename);
        fetch("/check-tile-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tiles: currentOrder })
        })
        .then(res => res.json())
        .then(data => {
            const tiles = container.children;
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].classList.remove("correct", "incorrect");
                if (!data.result[i]) {
                    tiles[i].classList.add("incorrect");
                }
            }

            if (data.valid) {
                nextButton.classList.remove("disabled");
                nextButton.onclick = null;  // allow default link
            } else {
                nextButton.classList.add("disabled");
                nextButton.onclick = (e) => e.preventDefault();  // block navigation
            }
        });
    }
});
