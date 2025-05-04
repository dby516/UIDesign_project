function LearnTiles() {
    window.location.href = '/learn_tiles/1';
}

function LearnGameProc() {
    window.location.href = '/learn_game_proc';
}

function Quiz() {
    window.location.href = '/quiz/1';
}

function StartPlayRound() {
    window.location.href = '/play_round/1';
}
function showCheatsheetPopup() {
    const popup = document.getElementById('cheatsheet-popup');
    const closeBtn = popup.querySelector('.popup-close');

    // Make it visible
    popup.classList.remove('hidden');
    popup.classList.add('show');

    // Allow manual close
    closeBtn.onclick = () => {
        popup.classList.remove('show');
        setTimeout(() => popup.classList.add('hidden'), 500); // match CSS transition
    };

    // Auto close after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.classList.add('hidden'), 500); // match CSS transition
    }, 3000);
}

