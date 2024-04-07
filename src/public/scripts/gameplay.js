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

document.addEventListener('DOMContentLoaded', function() {
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
                const gameStarted = snapshot.val();
                if (gameStarted) {
                    console.log('Game has started');

                    // Fetch categories and selected letter
                    const categories = sessionData.categories;
                    const selectedLetter = sessionData.selectedLetter;

                    // Display categories and selected letter in the question container
                    const questionContainer = document.getElementById('question-container');

                    // Clear any existing content in the question container
                    questionContainer.innerHTML = '';

                    // Create elements to display categories and selected letter
                    const categoriesElement = document.createElement('p');
                    categoriesElement.textContent = "Categories: " + categories.join(", ");
                    const selectedLetterElement = document.createElement('p');
                    selectedLetterElement.textContent = "Selected Letter: " + selectedLetter;

                    // Append elements to the question container
                    questionContainer.appendChild(categoriesElement);
                    questionContainer.appendChild(selectedLetterElement);
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
