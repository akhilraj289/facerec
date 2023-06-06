// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get the uploaded video file
    const fileInput = document.getElementById('videoInput');
    const file = fileInput.files[0];
  
    // Check if a file was selected
    if (file) {
      // Create a FormData object and append the video file
      const formData = new FormData();
      formData.append('video', file);
  
      // Make an AJAX request to the server
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/processVideo', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Handle the response from the server
          const videoUrl = xhr.responseText;
          displayProcessedVideo(videoUrl);
        }
      };
      xhr.send(formData);
    }
  }
  
  // Function to display the processed video
  function displayProcessedVideo(videoUrl) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = videoUrl;
  
    const canvasOutput = document.getElementById('canvasOutput');
    const context = canvasOutput.getContext('2d');
  
    // Render the processed video frames on the canvas
    videoPlayer.addEventListener('play', function() {
      const drawFrame = function() {
        if (videoPlayer.paused || videoPlayer.ended) {
          return;
        }
  
        // Draw the video frame on the canvas
        context.drawImage(videoPlayer, 0, 0, canvasOutput.width, canvasOutput.height);
  
        // Overlay the Delaunay triangle mesh on the frame
        overlayDelaunayTriangleMesh(context);
  
        // Call the drawFrame function recursively to continue rendering frames
        requestAnimationFrame(drawFrame);
      };
  
      drawFrame();
    });
  }
  
  // Function to overlay the Delaunay triangle mesh on the frame
  function overlayDelaunayTriangleMesh(context) {
    // Add your code here to perform Delaunay triangulation and overlay the mesh on the frame
    // You can use a library like delaunator (https://github.com/mapbox/delaunator) for Delaunay triangulation
  
    // Example: Draw a triangle at three random points
    const point1 = { x: getRandomNumber(0, canvasOutput.width), y: getRandomNumber(0, canvasOutput.height) };
    const point2 = { x: getRandomNumber(0, canvasOutput.width), y: getRandomNumber(0, canvasOutput.height) };
    const point3 = { x: getRandomNumber(0, canvasOutput.width), y: getRandomNumber(0, canvasOutput.height) };
  
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.lineTo(point3.x, point3.y);
    context.closePath();
  
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.stroke();
  }
  
  // Function to generate a random number within a range
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Attach the form submit event listener
  const uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', handleFormSubmit);
  