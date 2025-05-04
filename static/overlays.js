// static/step2_overlays.js

document.addEventListener("DOMContentLoaded", () => {
  const explanations = [
    {
      text: "A straight = 3 consecutive tiles in the same suit (Dots, Bamboo, or Characters). Other examples: ",
      img:  "explanation_million_straight.png"
    },
    {
      text: "A triplet = 3 identical tiles of the same rank and suit. Other examples: ",
      img:  "explanation_triplet.png"
    },
    {
      text: "Another straight = 3 consecutive tiles. Other examples: ",
      img:  "explanation_bamboo_straight.png"
    },
    {
      text: "Yet another straight = 5‑6‑7 in the Tong suit. Other examples: ",
      img:  "explanation_tong_straight.png"
    },
    {
      text: "A pair = 2 identical wind tiles. Other examples: ",
      img:  "explanation_pair.png"
    }
  ];

  // Grab modal elements
  const modal     = document.getElementById("explanationModal");
  const modalText = document.getElementById("modal-text");
  const modalImg  = document.getElementById("modal-img");
  const closeBtn  = document.querySelector(".close-btn");
  const saveBtn   = document.getElementById("save-to-cheatsheet-btn");

  let currentImg = "";  // Track which image is showing

  // Wire up each info button
  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.meldIndex, 10);
      const { text, img } = explanations[idx];

      modalText.textContent = text;
      modalImg.src = `/static/explanations/${img}`;
      modal.classList.remove("hidden");

      currentImg = img; // Save current img filename
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close when clicking outside the modal
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Save to Cheatsheet
  saveBtn.addEventListener("click", () => {
    if (currentImg) {
      const imgFilename = currentImg;
      const notes = modalText.textContent.trim();  // Get the explanation text

      fetch('/add-to-cheatsheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [imgFilename], notes: notes })
      }).then(res => {
        if (res.ok) {
          showCheatsheetPopup();

        }
      });
    }
  });

});
