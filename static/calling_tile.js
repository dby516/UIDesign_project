function handleAction(action) {
    const feedback = document.getElementById('feedback');
    switch(action) {
        case 'chi':
            feedback.innerText = "You chose Chi. Checking for straight...";
            break;
        case 'pong':
            feedback.innerText = "You chose Pong. Checking for triplet...";
            break;
        case 'hu':
            feedback.innerText = "You chose Hu! Validating winning hand...";
            break;
        case 'pass':
            feedback.innerText = "You passed. Let’s continue.";
            break;
    }
}
