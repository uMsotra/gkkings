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
    // Get session ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');
  
    if (sessionId) {
      // Fetch session details from Firebase
      const sessionRef = database.ref('sessions/' + sessionId);
      sessionRef.once('value', function(snapshot) {
        const sessionData = snapshot.val();
        if (sessionData) {
          // Create session name element
          const sessionNameElement = document.createElement('div');
          sessionNameElement.classList.add('session-name-container');
  
          const sessionNameText = document.createElement('p');
          sessionNameText.classList.add('session-name');
          sessionNameText.textContent = sessionData.name;
  
          sessionNameElement.appendChild(sessionNameText);
  
          // Insert session name element into the DOM
          const sessionInfoElement = document.getElementById('session-info');
          sessionInfoElement.appendChild(sessionNameElement);
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
  