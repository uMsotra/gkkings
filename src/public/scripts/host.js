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

const sessionForm = document.getElementById('gk-session-form');

// Load session name from local storage if available
window.addEventListener('load', () => {
  const savedSessionName = localStorage.getItem('sessionName');
  if (savedSessionName) {
    document.getElementById('session-name').value = savedSessionName;
  }
});

sessionForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the session name from the form
  const sessionName = document.getElementById('session-name').value;

  // Save session information locally
  saveSessionLocally(sessionName);

  // Send the data to Firebase
  sendDataToFirebase(sessionName);
});

function saveSessionLocally(sessionName) {
  // Save session name to localStorage
  localStorage.setItem('sessionName', sessionName);
}

function sendDataToFirebase(sessionName) {
  const databaseRef = database.ref('sessions'); // Replace 'sessions' with your desired path

  // Check for duplicate session names
  databaseRef.orderByChild('name').equalTo(sessionName).once('value', (snapshot) => {
    if (snapshot.exists()) {
      alert("Session name already exists. Please choose a different name.");
    } else {
      // Use push() to generate a unique key for each session
      const newSessionRef = databaseRef.push({
        name: sessionName
      });

      // Get the unique session ID generated by push()
      const sessionId = newSessionRef.key;

      // Clear form after successful submission
      sessionForm.reset();

      // Notify host of successful session creation
      alert("Session created successfully.");
      localStorage.setItem('sessionName', sessionName);
      // Redirect to the game management page with session ID in URL
      window.location.href = `game_management.html?sessionId=${sessionId}`;
    }
  }).catch((error) => {
    console.error("Error checking for duplicate session names:", error);
    // Handle error (optional)
  });
}