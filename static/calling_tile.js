function handleAction(action) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;
  
    switch (action) {
      case 'chi':
        feedback.textContent = 'Nice! You made another straight with a Chi call!';
        // optionally: highlight the Yes button
        break;
  
      case 'pass':
        feedback.textContent = 'No Chi! You need a straight to eat that tile!';
        break;
  
      // you can add pong/hu flows similarly if you branch further
      default:
        feedback.textContent = '';
    }
  
    // enable NEXT once user has clicked
    document.querySelector('.next-button').classList.remove('disabled');
  }
  