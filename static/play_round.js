document.addEventListener("DOMContentLoaded", () => {
    const handContainer = document.getElementById("player-hand");
  
    roundHand.forEach((tile, idx) => {
      const img = document.createElement("img");
      img.src = `/static/mahjong_tiles/${tile}.png`;
      img.classList.add("mahjong-tile");
      img.dataset.index = idx;
  
      if (roundClickable.includes(idx)) {
        img.addEventListener("click", () => {
          document.querySelectorAll(".mahjong-tile").forEach(el => el.classList.remove("selected"));
          img.classList.add("selected");
        });
      } else {
        // img.style.cursor = "not-allowed";
        img.classList.add("disabled");
      }
  
      handContainer.appendChild(img);
    });
  
    function renderDiscardTiles(discardList, containerId) {
      const container = document.getElementById(containerId);
      discardList.forEach(tile => {
        const img = document.createElement("img");
        img.src = `/static/mahjong_tiles/${tile}.png`;
        img.classList.add("discard-tile");
        container.appendChild(img);
      });
    }
  
    renderDiscardTiles(discardN, "discard-N");
    renderDiscardTiles(discardS, "discard-S");
    renderDiscardTiles(discardW, "discard-W");
    renderDiscardTiles(discardE, "discard-E");
});
  