// Set a timeout to display the main content after a certain amount of time
setTimeout(function() {
    // Hide loading screen and show main content
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("content").style.display = "block";
}, 1000); // Display main content after 5 seconds (adjust as needed)
