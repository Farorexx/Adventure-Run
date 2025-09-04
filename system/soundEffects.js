
function transition1(location) {
  // Create an Audio object for the sound effect
  const soundFX = new Audio("SoundEffects/transition1.mp3");

  // Play the sound effect
  soundFX.play();

  // Delay the page change for 1 second (adjust as needed)
  setTimeout(() => {
    // Navigate to the new page after the delay
    window.location.href = location;
  }, 500); // Adjust the delay duration in milliseconds (e.g., 1000ms = 1 second)
}

function transition2(location) {
    // Create an Audio object for the sound effect
    const soundFX = new Audio("SoundEffects/transition2.mp3");
  
    // Play the sound effect
    soundFX.play();
  
    // Delay the page change for 1 second (adjust as needed)
    setTimeout(() => {
      // Navigate to the new page after the delay
      window.location.href = location;
    }, 500); // Adjust the delay duration in milliseconds (e.g., 1000ms = 1 second)
}

function correct(location) {
    // Create an Audio object for the sound effect
    const soundFX = new Audio("SoundEffects/correct.mp3");
  
    // Play the sound effect
    soundFX.play();
  
    // Delay the page change for 1 second (adjust as needed)
    setTimeout(() => {
      // Navigate to the new page after the delay
      window.location.href = location;
    }, 500); // Adjust the delay duration in milliseconds (e.g., 1000ms = 1 second)
}

function incorrect(location) {
    // Create an Audio object for the sound effect
    const soundFX = new Audio("SoundEffects/incorrect.mp3");
  
    // Play the sound effect
    soundFX.play();
  
    // Delay the page change for 1 second (adjust as needed)
    setTimeout(() => {
      // Navigate to the new page after the delay
      window.location.href = location;
    }, 500); // Adjust the delay duration in milliseconds (e.g., 1000ms = 1 second)
}

function button() {
    // Create an Audio object for the sound effect
    const soundFX = new Audio("SoundEffects/button.mp3");
  
    // Play the sound effect
    soundFX.play();
}