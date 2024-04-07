document.addEventListener("DOMContentLoaded", function () {
    const instructionsSlider = document.getElementById('instructions-slider');
    let currentInstructionIndex = 0;
    let intervalId;

    // Function to show the next instruction card
    function showNextInstruction() {
        const instructionCards = document.querySelectorAll('.instruction-card');
        if (currentInstructionIndex < instructionCards.length - 1) {
            instructionCards[currentInstructionIndex].classList.remove('active');
            currentInstructionIndex++;
            instructionCards[currentInstructionIndex].classList.add('active');
        } else {
            // Reset to the first instruction card if at the end
            instructionCards[currentInstructionIndex].classList.remove('active');
            currentInstructionIndex = 0;
            instructionCards[currentInstructionIndex].classList.add('active');
        }
    }

    // Function to show the previous instruction card
    function showPreviousInstruction() {
        const instructionCards = document.querySelectorAll('.instruction-card');
        if (currentInstructionIndex > 0) {
            instructionCards[currentInstructionIndex].classList.remove('active');
            currentInstructionIndex--;
            instructionCards[currentInstructionIndex].classList.add('active');
        }
    }

    // Start the interval to automatically advance instructions
    function startInterval() {
        intervalId = setInterval(showNextInstruction, 5000); // Advance every 5 seconds
    }

    // Stop the interval when user interacts with the slider
    function stopInterval() {
        clearInterval(intervalId);
    }

    // Tap event handler for instruction slider
    instructionsSlider.addEventListener('click', function (event) {
        const { clientX } = event;
        const { left, width } = instructionsSlider.getBoundingClientRect();
        const tapPosition = clientX - left;
        const instructionCardWidth = width / 2;

        // Check if the tap is on the left half or right half of the slider
        if (tapPosition < instructionCardWidth) {
            showPreviousInstruction();
            stopInterval(); // Stop interval on user interaction
        } else {
            showNextInstruction();
            stopInterval(); // Stop interval on user interaction
        }
    });

    // Swipe event handlers for instruction slider
    const hammer = new Hammer(instructionsSlider);
    hammer.on('swipeleft', function () {
        showNextInstruction();
        stopInterval(); // Stop interval on user interaction
    });

    hammer.on('swiperight', function () {
        showPreviousInstruction();
        stopInterval(); // Stop interval on user interaction
    });

    // Start the interval when the page loads
    startInterval();
});


