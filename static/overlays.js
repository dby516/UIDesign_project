// static/step2_overlays.js

document.addEventListener("DOMContentLoaded", () => {
  // Explanations for each meld, in the same order as data-meld-index (0…4)
  const explanations = [
    {
      text: "A straight = 3 consecutive tiles in the same suit (Dots, Bamboo, or Characters).",
      img:  "explanation_million_straight.png"
    },
    {
      text: "A triplet = 3 identical tiles of the same rank and suit.",
      img:  "explanation_triplet.png"
    },
    {
      text: "Another straight = 3 consecutive tiles (here using a special tile).",
      img:  "explanation_tong_straight.png"
    },
    {
      text: "Yet another straight = 3‑6‑7 in the Tong suit.",
      img:  "explanation_tong_straight.png"
    },
    {
      text: "A pair = 2 identical wind tiles.",
      img:  "explanation_pair.png"
    }
  ];

  // Grab modal elements
  const modal     = document.getElementById("explanationModal");
  const modalText = document.getElementById("modal-text");
  const modalImg  = document.getElementById("modal-img");
  const closeBtn  = document.querySelector(".close-btn");

  // For each info button, wire up click → show correct explanation
  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.meldIndex, 10);
      const { text, img } = explanations[idx];

      modalText.textContent   = text;
      modalImg.src            = `/static/explanations/${img}`;
      modal.classList.remove("hidden");
    });
  });

  // Close modal on ×
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal if clicking outside of its content
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
