//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.image-container img'));
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    let selectedImages = [];
    let state = 1;
  
    // Shuffle the images
    shuffleArray(images);
  
    // Set the image source and alt attribute
    for (let i = 0; i < images.length - 1; i++) {
      images[i].src = `https://source.unsplash.com/random/150x150/?${i + 1}`;
      images[i].alt = `Image ${i + 1}`;
    }
    
    // Choose a random image to repeat
    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    images[images.length - 1].src = images[randomIndex].src;
    images[images.length - 1].alt = images[randomIndex].alt;
  
    // Function to shuffle an array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Function to handle image clicks
    function handleImageClick(event) {
      const clickedImage = event.target;
      const clickedIndex = images.indexOf(clickedImage);
  
      if (selectedImages.includes(clickedImage) || state === 4) {
        // Ignore if image is already selected or in the verify state
        return;
      }
  
      clickedImage.classList.add('selected');
      selectedImages.push(clickedImage);
  
      if (state === 1) {
        // Transition to state 2
        state = 2;
        resetButton.style.display = 'block';
      } 
      else if (state === 2) {
        // Transition to state 3
        state = 3;
        verifyButton.style.display = 'block';
      }
  
      if (selectedImages.length === 2) {
        // Transition to state 4
        state = 4;
        verifyButton.style.display = 'none';
  
        if (selectedImages[0].alt === selectedImages[1].alt) {
          para.textContent = "You are a human. Congratulations!";
        } else {
          para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
      }
    }
  
    // Function to handle reset button click
    function handleResetClick() {
      selectedImages.forEach((image) => {
        image.classList.remove('selected');
      });
      selectedImages = [];
      state = 1;
      resetButton.style.display = 'none';
      verifyButton.style.display = 'none';
      para.textContent = '';
    }
  
    // Function to handle verify button click
    function handleVerifyClick() {
      // This function is not required as the state transition is handled in the image click handler
    }
  
    // Add event listeners
    images.forEach((image) => {
      image.addEventListener('click', handleImageClick);
    });
  
    resetButton.addEventListener('click', handleResetClick);
    verifyButton.addEventListener('click', handleVerifyClick);
  });