document.addEventListener('DOMContentLoaded', function() {
    // Get the existing modal elements
    const cheatsheetModal = document.getElementById('cheatsheetModal');
    const closeCheatsheetModal = document.querySelector('.close-btn');
    const cheatsheetContent = document.getElementById('cheatsheet-content');
    const cheatsheetBtn = document.getElementById('check-cheatsheet-btn');

    // Initialize wrong answer counter specifically for this session
    // We'll use a separate counter for tracking wrong answers in the current session
    if (localStorage.getItem('current_session_wrong') === null) {
        localStorage.setItem('current_session_wrong', 0);
    }

    // Use the session-specific counter for button display logic
    let currentSessionWrong = parseInt(localStorage.getItem('current_session_wrong') || 0);
    
    if (cheatsheetBtn) {
        // Always start with the button hidden
        cheatsheetBtn.style.display = 'none';
        
        // Show button only if there's been a wrong answer in this session
        if (currentSessionWrong > 0) {
            cheatsheetBtn.style.display = 'block';
        }
        
        // Add event listener to show modal when button is clicked
        cheatsheetBtn.addEventListener('click', function() {
            // Show loading indicator if cheatsheet content exists
            if (cheatsheetContent) {
                cheatsheetContent.innerHTML = '<div style="text-align: center; padding: 20px;">Loading cheatsheet...</div>';
            }
            
            // Show the modal
            if (cheatsheetModal) {
                cheatsheetModal.classList.remove('hidden');
                cheatsheetModal.style.display = 'block';
            }
            
            // Fetch cheatsheet content from the server
            fetch('/get-cheatsheet-content')
                .then(response => response.json())
                .then(data => {
                    // Populate the modal with cheatsheet data
                    if (cheatsheetContent) {
                        populateCheatsheetModal(data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cheatsheet content:', error);
                    // Show error message in modal if content element exists
                    if (cheatsheetContent) {
                        cheatsheetContent.innerHTML = `
                            <div style="padding: 15px; background-color: #f8d7da; border-radius: 5px; color: #721c24;">
                                <p>Could not load cheatsheet content. Please try again later.</p>
                            </div>
                        `;
                    }
                });
        });
    }

    // Close modal when clicking the close button
    if (closeCheatsheetModal) {
        closeCheatsheetModal.addEventListener('click', function() {
            if (cheatsheetModal) {
                cheatsheetModal.classList.add('hidden');
                cheatsheetModal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === cheatsheetModal) {
            cheatsheetModal.classList.add('hidden');
            cheatsheetModal.style.display = 'none';
        }
    });

    // Listen for wrong answers in the quiz
    document.addEventListener('dragdrop', function(e) {
        if (e.detail && e.detail.isWrong) {
            // Update both counters
            let wrongCount = parseInt(localStorage.getItem('drag_wrong') || 0);
            wrongCount++;
            localStorage.setItem('drag_wrong', wrongCount);
            
            // Update session-specific counter
            currentSessionWrong++;
            localStorage.setItem('current_session_wrong', currentSessionWrong);
            
            // Show the cheatsheet button after first wrong answer in this session
            if (currentSessionWrong === 1 && cheatsheetBtn) {
                cheatsheetBtn.style.display = 'block';
            }
        }
    });

    if (window.location.pathname.startsWith('/play_round/')) {
        cheatsheetBtn.style.display = 'block';
    }

    // Reset the session counter when the page loads 
    // This ensures the counter resets on each new quiz
    // Add this line at the beginning of your script to reset for each new page load:
    localStorage.setItem('current_session_wrong', 0);

    // Function to populate the cheatsheet modal content
    function populateCheatsheetModal(cheatsheetData) {
        if (!cheatsheetContent) {
            console.error("cheatsheetContent element not found");
            return;
        }
        
        cheatsheetContent.innerHTML = '';
        
        if (!cheatsheetData || cheatsheetData.length === 0) {
            cheatsheetContent.innerHTML = '<p>No cheatsheet entries found.</p>';
            return;
        }
        
        // Apply modal-specific styles to ensure proper container and image sizing
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .cheatsheet-entries {
                width: 100%;
                overflow-y: auto;
                max-height: 70vh;
            }
            .cheatsheet-entry {
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
                padding: 10px;
                background-color: #f8f9fa;
                border-radius: 5px;
                width: 100%;
            }
            @media (max-width: 768px) {
                .cheatsheet-entry {
                    flex-direction: column;
                }
            }
            .cheatsheet-images-container {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 5px;
                background-color: #e5f2e5;
                padding: 10px;
                border-radius: 5px;
                min-height: 100px;
                max-height: 200px;
                overflow-y: auto;
            }
            .cheatsheet-image {
                height: auto;
                width: auto;
                max-height: 80px;
                max-width: 80px;
                object-fit: contain;
            }
            .cheatsheet-explanation-image {
                width: 100%;
                height: auto;
                max-width: 100%;
                max-height: 180px;
                object-fit: contain;
            }
            .cheatsheet-notes-container {
                flex: 1;
                padding: 10px;
                margin-left: 10px;
                overflow-y: auto;
                max-height: 200px;
            }
            .cheatsheet-notes {
                margin: 0;
                white-space: pre-wrap;
                word-break: break-word;
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Create container for cheatsheet entries
        const entriesContainer = document.createElement('div');
        entriesContainer.className = 'cheatsheet-entries';
        
        // Add each cheatsheet entry
        cheatsheetData.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'cheatsheet-entry';
            
            // Left column: images
            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'cheatsheet-images-container';
            
            // Check if there's only a single explanation image
            const hasExplanationImage = entry.images && 
                                        entry.images.length === 1 && 
                                        entry.images[0].startsWith('explanation_');
            
            // Add images
            if (entry.images && entry.images.length) {
                entry.images.forEach(img => {
                    const imgEl = document.createElement('img');
                    
                    if (img.startsWith('explanation_')) {
                        imgEl.src = `/static/explanations/${img}`;
                        // Apply special class for explanation images
                        imgEl.className = 'cheatsheet-explanation-image';
                    } else {
                        imgEl.src = `/static/mahjong_tiles/${img}`;
                        imgEl.className = 'cheatsheet-image';
                    }
                    
                    imgEl.alt = img;
                    imagesDiv.appendChild(imgEl);
                });
            }
            
            // For explanation images, adjust container height
            if (hasExplanationImage) {
                imagesDiv.style.maxHeight = '250px'; // Give more height for explanation images
            }
            
            // Right column: notes (read-only)
            const notesDiv = document.createElement('div');
            notesDiv.className = 'cheatsheet-notes-container';
            
            const notesText = document.createElement('p');
            notesText.textContent = entry.notes || 'No notes';
            notesText.className = 'cheatsheet-notes';
            notesDiv.appendChild(notesText);
            
            // Add columns to entry
            entryDiv.appendChild(imagesDiv);
            entryDiv.appendChild(notesDiv);
            
            // Add entry to container
            entriesContainer.appendChild(entryDiv);
        });
        
        // Add the container to the modal content
        cheatsheetContent.appendChild(entriesContainer);
    }
});
