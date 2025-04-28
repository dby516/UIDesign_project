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
  