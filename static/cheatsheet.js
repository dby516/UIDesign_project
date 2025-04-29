// static/cheatsheet.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle notes updating
    document.querySelectorAll('.cheatsheet-note').forEach(textarea => {
        textarea.addEventListener('change', () => {
            const idx = textarea.dataset.index;
            const notes = textarea.value;

            fetch('/update-cheatsheet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index: parseInt(idx), notes: notes })
            }).then(res => {
                if (res.ok) {
                    console.log('Note updated successfully');
                }
            });
        });
    });

    // Handle delete buttons
    document.querySelectorAll('.delete-entry-btn').forEach(button => {
        button.addEventListener('click', () => {
            const entryDiv = button.closest('.cheatsheet-entry');
            const idx = entryDiv.dataset.index;

            if (confirm('Are you sure you want to delete this cheatsheet entry?')) {
                fetch('/delete-from-cheatsheet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ index: parseInt(idx) })
                }).then(res => {
                    if (res.ok) {
                        entryDiv.remove(); // Remove from DOM
                        console.log('Entry deleted successfully');
                    }
                });
            }
        });
    });
});
