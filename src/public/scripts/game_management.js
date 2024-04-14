document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyDkCWyDANV53vHNLC68Kfwq94T3THPx-TA",
        authDomain: "gkkingmakers.firebaseapp.com",
        databaseURL: "https://gkkingmakers-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "gkkingmakers",
        storageBucket: "gkkingmakers.appspot.com",
        messagingSenderId: "173142278652",
        appId: "1:173142278652:web:1510f05e053a22e6437279",
        measurementId: "G-TR70V2T8N3"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');

    if (sessionId) {
        const sessionRef = database.ref('sessions/' + sessionId);

        sessionRef.once('value', function(snapshot) {
            const sessionData = snapshot.val();
            if (sessionData) {
                // Populate session name
                const sessionNameElement = document.getElementById('session-name');
                sessionNameElement.textContent = sessionData.name;

                // Input field for entering category
                const categoryInput = document.getElementById('category-input');
                // Button to add category to the list
                const addCategoryBtn = document.getElementById('add-category-btn');
                // List to display added categories
                const categoryList = document.getElementById('category-list');

                // Button click event to add category
                addCategoryBtn.addEventListener('click', function() {
                    // Check if the maximum number of categories (10) has been reached
                    if (categoryList.children.length >= 10) {
                        alert('Maximum number of categories reached (10).');
                        return; // Stop adding categories
                    }

                    const category = categoryInput.value.trim();
                    if (category !== '') {
                        const categoryItem = document.createElement('li');
                        categoryItem.textContent = category;
                        categoryList.appendChild(categoryItem);
                        categoryInput.value = ''; // Clear input field after adding category

                        // Update categories in Firebase when category is added
                        updateCategoriesInFirebase(sessionRef, categoryList);
                    }
                });

                // Button click event to start the game
                const startGameBtn = document.getElementById('start-game-btn');
                startGameBtn.addEventListener('click', function() {
                    // Get selected letter and category list
                    const selectedLetter = document.querySelector('.selected-letter').textContent;
                    const categories = [];
                    categoryList.querySelectorAll('li').forEach(item => {
                        categories.push(item.textContent);
                    });

                    // Save selected letter and category list to Firebase
                    sessionRef.update({
                        selectedLetter: selectedLetter,
                        categories: categories,
                        gameStarted: true // Update gameStarted to true
                    }).then(function() {
                        console.log('Game started');
                        console.log('Selected letter:', selectedLetter);
                        console.log('Categories:', categories);
                    }).catch(function(error) {
                        console.error('Error starting game:', error);
                    });
                });

                // Generate buttons from A to Z dynamically
                const letterButtons = document.getElementById('letter-buttons');
                for (let i = 0; i < 26; i++) {
                    const letter = String.fromCharCode(65 + i); // ASCII code for 'A' is 65
                    const button = document.createElement('button');
                    button.classList.add('letter-button');
                    button.textContent = letter;
                    button.addEventListener('click', function() {
                        // Remove 'selected' class from all buttons
                        letterButtons.querySelectorAll('.letter-button').forEach(btn => {
                            btn.classList.remove('selected-letter');
                        });
                        // Add 'selected' class to the clicked button
                        button.classList.add('selected-letter');

                        // Update selected letter in Firebase when letter is selected
                        sessionRef.update({
                            selectedLetter: letter
                        }).then(function() {
                            console.log('Selected letter updated to:', letter);
                        }).catch(function(error) {
                            console.error('Error updating selected letter:', error);
                        });
                    });
                    letterButtons.appendChild(button);
                }
            } else {
                console.error('Session data not found');
            }
        }).catch(function(error) {
            console.error('Error fetching session data:', error);
        });
    } else {
        console.error('Session ID not found in URL');
    }
});

// Function to update categories in Firebase
function updateCategoriesInFirebase(sessionRef, categoryList) {
    const categories = [];
    categoryList.querySelectorAll('li').forEach(item => {
        categories.push(item.textContent);
    });

    // Update categories in Firebase
    sessionRef.update({
        categories: categories
    }).then(function() {
        console.log('Categories updated:', categories);
    }).catch(function(error) {
        console.error('Error updating categories:', error);
    });
}
