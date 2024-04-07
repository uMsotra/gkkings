// join.js

document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
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
  
    const joinForm = document.getElementById('gk-join-form');
  
    joinForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get the session name from the form
      const sessionName = document.getElementById('session-name').value;
  
      // Check if session name exists in the database
      const sessionRef = database.ref('sessions');
      sessionRef.orderByChild('name').equalTo(sessionName).once('value', function(snapshot) {
        if (snapshot.exists()) {
          // Session found, redirect to the gameplay page with session ID
          const sessionId = Object.keys(snapshot.val())[0]; // Get the session ID
          window.location.href = `gameplay.html?sessionId=${sessionId}`;
        } else {
          // Session not found, display error message
          alert("Session not found. Please enter a valid session name.");
        }
      }).catch(function(error) {
        console.error('Error checking for session:', error);
        alert("An error occurred. Please try again.");
      });
    });
  });
  