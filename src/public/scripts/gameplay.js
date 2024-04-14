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
    const playerName = urlParams.get('playerName');

    if (sessionId && playerName) {
        // Update player name in the player name container
        const playerNameElement = document.createElement('p');
        playerNameElement.textContent = playerName;
        document.getElementById('player-name-container').appendChild(playerNameElement);

        // Retrieve session name from the database
        const sessionRef = database.ref('sessions/' + sessionId);
        sessionRef.once('value', function(snapshot) {
            const sessionData = snapshot.val();
            if (sessionData) {
                const sessionName = sessionData.name;

                // Update session name in the session name container
                const sessionNameElement = document.createElement('p');
                sessionNameElement.textContent = sessionName;
                document.getElementById('session-name-container').appendChild(sessionNameElement);

                // Listen for changes in gameStarted variable
                sessionRef.child('gameStarted').on('value', function(snapshot) {
                    let gameStarted = snapshot.val();
                    if (gameStarted) {
                        console.log('Game has started');

                        // Fetch categories
                        const categories = sessionData.categories;

                        // Listen for changes in selected letter
                        sessionRef.child('selectedLetter').on('value', function(letterSnapshot) {
                            const selectedLetter = letterSnapshot.val();
                            if (selectedLetter) {
                                console.log('Selected letter:', selectedLetter);

                                // Display categories as questions with a delay
                                displayCategoriesWithDelay(categories, selectedLetter);
                            }
                        });
                    }
                });

            } else {
                console.error('Session data not found for ID: ' + sessionId);
            }
        });
    } else {
        console.error('Session ID or player name not found in URL');
    }
});

// Function to display categories as questions with a delay
function displayCategoriesWithDelay(categories, selectedLetter) {
    const questionContainer = document.getElementById('question-container');
    let index = 0;

    function displayNextQuestion() {
        if (index < categories.length) {
            const category = categories[index];
            const question = document.createElement('div');
            question.classList.add('question');
            question.textContent = `${category} starting with letter ${selectedLetter}?`;

            // Clear any existing content in the question container
            questionContainer.innerHTML = '';

            // Append question to the question container
            questionContainer.appendChild(question);

            // Add pulse class to question container for 1 second
            questionContainer.classList.add('pulse');
            setTimeout(() => {
                // Remove pulse class after 1 second
                questionContainer.classList.remove('pulse');
            }, 1000);

            // Increment index and set timeout for next question
            index++;
            setTimeout(displayNextQuestion, 10000); // 10 seconds delay
        } else {
            // All questions have been asked, clear question container
            questionContainer.innerHTML = '';
        }
    }

    // Start displaying questions
    displayNextQuestion();
}
