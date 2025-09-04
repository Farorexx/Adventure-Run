// Initialize the QR code generator
var qr = new QRCode("qrcode-container", {
  correctLevel : QRCode.CorrectLevel.L
});

// Function to generate and show QR code
function showQRCode(text) {
  // Generate the QR code
  qr.makeCode(text);

  // Show the QR code container
  var container = document.getElementById("qrcode-container");
  container.style.display = "block";
}

function updateQr() {
  qrDictionary = sessionStorage.getItem("QaPair");
  // Generate the QR code
  console.log(qrDictionary);
  showQRCode(qrDictionary);
}

// Function to hide QR code
function hideQRCode() {
  // Hide the QR code container
  var container = document.getElementById("qrcode-container");
  container.style.display = "none";
}

function qrGen() {
  // Add event listeners to the buttons
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");
  var btn3 = document.getElementById("btn3");
  var btn4 = document.getElementById("btn4");

  btn1.addEventListener("click", function() {
    showQRCode('["What is the capital of France?", ["Paris","London","Berlin","Rome"], "Who discovered the theory of general relativity?", ["Albert Einstein","Isaac Newton","Nikola Tesla","Galileo Galilei"], "Under the window at the gym!", 4]');
  });

  btn2.addEventListener("click", function() {
    showQRCode('["What is the chemical symbol for water?", ["H2O","CO2","O2","CH4"], "Which scientist proposed the theory of evolution by natural selection?", ["Charles Darwin","Isaac Newton","Galileo Galilei","Albert Einstein"], "Under the window at the gym!", 4]');
  });

  btn3.addEventListener("click", function() {
    showQRCode('["What is 2 + 2?", ["4","3","2","5"], "Who painted the Mona Lisa?", ["Leonardo da Vinci","Vincent van Gogh","Pablo Picasso","Michelangelo"], "Under the window at the gym!", 4]');
  });

  btn4.addEventListener("click", function() {
    showQRCode('["Upload an image of a sunset.", "image-upload", "Upload an image of a famous landmark.", "image-upload", "Under the window at the gym!", 4]')
  });

  // Add event listener to hide QR code on click
  var container = document.getElementById("qrcode-container");
  container.addEventListener("click", hideQRCode);
}


function scanQR() {
  // Initialize the scanner
  var scanner = new Html5Qrcode("reader");

  // Start scanning
  scanner.start(
    { facingMode: "environment" },
    function (decodedText) {
      // Display the scanned QR code's contents on the webpage
      alert(decodedText);
    },
    function (error) {
      // Handle errors

      sessionStorage.setItem("questionArray", error);
      window.location.href = "difficultySelection.html";
      // tbd
    }
  );
}

function difficultySelection(difficulty) {
  sessionStorage.setItem("difficulty", difficulty)

  let startTime; // Variable to store the start time
  startTime = new Date().getTime();
  sessionStorage.setItem("startTime", startTime)

  window.location.href = "answerSelection.html";
}

function updateForum() {
  var stringQuestionArray = sessionStorage.getItem("questionArray");
  questionArray = JSON.parse(stringQuestionArray);

  var difficulty = sessionStorage.getItem("difficulty");

  sessionStorage.setItem("activityTotal", questionArray[5]);

  var question = "";
  var options = "";
  var type = "multiple-choice"; // Default to multiple-choice type

  if (difficulty == "easy") {
    question = questionArray[0];
    options = questionArray[1];
    if (questionArray[1] == "image-upload") {
      type = questionArray[1]; // Update type if specified
    } else {
      sessionStorage.setItem("correctAnswer", questionArray[1][0]);
    }
  } else {
    question = questionArray[2];
    options = questionArray[3];
    if (questionArray[3] == "image-upload") {
      type = questionArray[3]; // Update type if specified
    } else {
      sessionStorage.setItem("correctAnswer", questionArray[3][0]);
    }
  }

  const prompt = document.querySelector("#prompt");
  prompt.textContent = question;

  const form = document.querySelector("#answer-form");
  while (form.firstChild) {
    form.removeChild(form.firstChild);
  }

  if (type === "multiple-choice") {
    // Custom compare function to shuffle the array randomly
    const shuffleRandomly = () => Math.random() - 0.5;

    // randomise answers
    options.sort(shuffleRandomly);

    //display answers.
    options.forEach((option) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = option;
      if (option === "Option1") {
        radio.checked = true;
      }
      const label = document.createElement("label");
      label.for = option;
      label.textContent = option;
      form.appendChild(radio);
      form.appendChild(label);
      form.appendChild(document.createElement("br"));
    });
  } else if (type === "image-upload") {
      prompt.remove()
      const questionElement = document.getElementById("question");
      questionElement.textContent = question;
      const uploadInput = document.createElement("input");
      uploadInput.type = "file";
      uploadInput.name = "image-upload";
      uploadInput.setAttribute("data-custom-type", "generator");
      form.appendChild(uploadInput);
  }
}


function compressFile(file) {
  if (!file) {
    console.error('No file provided for compression.');
    return null;
  }

  return new Promise((resolve, reject) => {
    const maxSize = 720; // Maximum width or height
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      let newWidth, newHeight;

      if (width > height) {
        newWidth = maxSize;
        newHeight = (maxSize * height) / width;
      } else {
        newHeight = maxSize;
        newWidth = (maxSize * width) / height;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, file.type);
    };

    image.onerror = () => {
      console.error('Error loading the image.');
      reject('Error loading the image.');
    };
  });
}

// Your saveAnswer function (assuming it's triggered on a user action)
function saveAnswer() {
  const userAnswer = document.querySelector("input[name='answer']:checked");

  if (userAnswer) {
    // If it's a multiple-choice question
    sessionStorage.setItem("userAnswer", userAnswer.value);
    window.location.href = "progress.html";
  } else {
    sessionStorage.setItem("userAnswer", "image-upload");
    // If it's an image-upload question
    const uploadInput = document.querySelector("input[name='image-upload']");
    if (uploadInput && uploadInput.files.length > 0) {
      compressFile(uploadInput.files[0])
        .then((compressedBlob) => {
          if (compressedBlob) {
            // Convert the Blob to base64 if needed
            const reader = new FileReader();
            reader.onload = function(event) {
              // Save the base64-encoded image data with a unique name
              const uploadCount = sessionStorage.getItem("uploadCount") || 0;
              const uniqueName = "upload" + (parseInt(uploadCount) + 1);
              sessionStorage.setItem(uniqueName, event.target.result);

              // Update the upload count for the next image
              sessionStorage.setItem("uploadCount", parseInt(uploadCount) + 1);

              window.location.href = "progress.html";
            };

            // Read the compressed Blob as base64 data
            reader.readAsDataURL(compressedBlob);
          } else {
            console.error('File compression failed.');
          }
        })
        .catch((error) => {
          console.error('Error compressing the file:', error);
        });
    }
  }
}
