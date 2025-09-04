let currentTaskNumber = 0; // Initialize the task number

// Function to calculate and set the image based on the score
function setImage(score) {
    if (score < 7) {
        return "bronze.png";
    } else if (score < 15) {
        return "silver.png";
    } else {
        return "gold.png";
    }
}

// Function to add a new row to the table
function addTask(taskNumber, score) {
    const table = document.getElementById("taskTable");
    const newRow = document.createElement("tr");
    const taskName = "Task " + taskNumber;
    const imageSrc = setImage(score);

    newRow.innerHTML = `
      <td>${taskName}</td>
      <td>${score}</td>
      <td><img src="Images\\${imageSrc}" alt="${imageSrc}" width="20%" height="20%"></td>
    `;

    table.appendChild(newRow);
}

// Function to calculate the total score and update the total score element
function updateTotalScore() {
    let totalScore = 0;
    const scoreCells = document.querySelectorAll("#taskTable td:nth-child(2)");

    scoreCells.forEach((cell) => {
        const score = parseInt(cell.textContent);
        totalScore += score;
    });

    document.getElementById("totalScore").textContent = totalScore;
    sessionStorage.setItem("totalScore", totalScore);
}

function updateTableAndScore(score) {
    currentTaskNumber++;

    // Retrieve the tasks array from the session storage
    const existingTasks = sessionStorage.getItem("tasks");
    const tasks = existingTasks ? JSON.parse(existingTasks) : [];

    // Add the new task to the tasks array
    tasks.push({ taskNumber: currentTaskNumber, score });

    // Save the updated tasks array in session storage
    sessionStorage.setItem("tasks", JSON.stringify(tasks));

    // Now, update the table with the new task
    addTask(currentTaskNumber, score);

    // Finally, update the total score
    updateTotalScore();
}

function calculatePoints(timeSpentInSeconds) {
    const basePoints = 10;
    const maxPointsForSpeed = 10;
    const maxTime = 240;

    // Calculate the points earned based on time spent
    const pointsEarned = basePoints + maxPointsForSpeed - (timeSpentInSeconds / maxTime) * maxPointsForSpeed;

    // Round the points to a single number
    const roundedPoints = Math.round(pointsEarned);

    return Math.max(roundedPoints, 5); // Ensure roundedPoints is not negative
}

function loadPreviousTasks() {
    const existingTasks = sessionStorage.getItem("tasks");
    if (existingTasks) {
        const tasks = JSON.parse(existingTasks);
        tasks.forEach((task) => {
            addTask(task.taskNumber, task.score);
            currentTaskNumber = Math.max(currentTaskNumber, task.taskNumber);
        });
        updateTotalScore();
    } else {
        // Initialize tasks array if no previous tasks exist
        const tasks = [];
        sessionStorage.setItem("tasks", JSON.stringify(tasks));
        currentTaskNumber = 0;
    }
    checkAnswer(); // Call checkAnswer after loading previous tasks
}

function checkAnswer() {
    const userAnswer = sessionStorage.getItem("userAnswer");

    if (userAnswer) {
        if (userAnswer == "image-upload") {
            //Was image upload.
            earnedPoints = 10;
            updateTableAndScore(earnedPoints);

            //remove item.
            sessionStorage.setItem("userAnswer", '')
            checkActivityCount()
        } else {
            const selectedChoice = userAnswer;
            const correctAnswer = sessionStorage.getItem("correctAnswer");
            let earnedPoints = 4;
    
            if (selectedChoice === correctAnswer) {
            // Calculate and display the time spent/ points earned on the question
            const endTime = new Date().getTime();
            startTime = sessionStorage.getItem("startTime");
            const timeSpent = endTime - startTime;
            const timeSpentInSeconds = (timeSpent / 1000).toFixed(2);
            const earnedPoints = calculatePoints(timeSpentInSeconds);
    
            // Call the function to update the table and score
            updateTableAndScore(earnedPoints);
            } else {
            // Call the function to update the table and score
            updateTableAndScore(earnedPoints);
            }

            //Remove Item
            sessionStorage.setItem("userAnswer", '')
            checkActivityCount()
        }
    }
}

// Load previous tasks when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadPreviousTasks();
});

function checkActivityCount() {
    activityTotal = sessionStorage.getItem("activityTotal");
    activityCount = sessionStorage.getItem("activityCount");

    activityCount+=1;

    if (activityCount == activityTotal) {
        //have completed all activity's.
        sessionStorage.setItem("gameFinished", true);
    } else {
        sessionStorage.setItem("gameFinished", false);
    }
}