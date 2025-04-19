function startLearning() {

    window.location.href = '/learn/1';
}

function selectTile(tileElement) {
    // 取消其他選中
    document.querySelectorAll('.tile').forEach(tile => tile.classList.remove('selected'));
    tileElement.classList.add('selected');
    console.log("你選了這張牌：", tileElement.innerText);
}

function chooseOption(optionId) {
    const selectedTile = document.querySelector('.tile.selected');
    if (!selectedTile) {
        alert("請先選擇一張牌！");
        return;
    }

    const action = ["吃", "碰", "槓", "過"][optionId - 1];
    const tile = selectedTile.innerText;

    alert(`你選擇了「${action}」這張牌：${tile}`);
    // 這裡可以用 fetch/post 傳資料給後端
}

