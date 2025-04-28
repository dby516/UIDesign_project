document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.action-buttons button').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        handleAction(action);
      });
    });
  });
  
  function handleAction(action) {
    const feedback = document.getElementById('feedback');
    // gather current hand filenames
    const currentHand = Array.from(document.querySelectorAll('#tileHand .tile'))
      .map(img => img.dataset.filename);
  
    fetch('/check-calling-tiles', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        step: CALLING_TILE_CONTEXT.step,
        action: action,
        current_hand: currentHand
      })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('feedback').textContent = data.feedback;
      const clickedButton = document.querySelector(`.action-buttons button[data-action="${action}"]`);
      document.querySelectorAll('.action-buttons button').forEach(btn => {
        btn.style.backgroundColor = '';
      });
      clickedButton.style.backgroundColor = data.valid ? '#4CAF50' : '#e74c3c';
      // special hand for step 3
      if (CALLING_TILE_CONTEXT.step === 3) {
        clickedButton.style.backgroundColor = '#bdc3c7'; // only clicked one grey
      }

      if (data.valid) {
        //feedback.textContent = 'Correct!';
        // rebuild the hand
        const tileHand = document.getElementById('tileHand');
        tileHand.innerHTML = '';
        data.new_hand.forEach((tile, idx) => {
          if (idx === CALLING_TILE_CONTEXT.placeholderIndex) {
            const placeholder = document.createElement('div');
            placeholder.className = 'tile placeholder';
            tileHand.appendChild(placeholder);
          }
          const img = document.createElement('img');
          img.src = `/static/mahjong_tiles/${tile}`;
          img.className = 'tile';
          img.dataset.filename = tile;
          tileHand.appendChild(img);
        });
        // enable Next
        document.querySelector('.next-button').classList.remove('disabled');
      } else {
        //feedback.textContent = 'Incorrect. Try again.';
      }
    })
    .catch(err => {
      console.error(err);
      feedback.textContent = 'Error checking answer.';
    });
  }
  