// get a reference to the environment Variables
let e = new env();

function uploadScore() {
    const groupName = sessionStorage.getItem("groupName");
    const groupAvatar = sessionStorage.getItem("groupAvatar");
    const groupScore = sessionStorage.getItem("totalScore");

    const subject = `BHARA Group: ${groupName} Submission`;

    // Get the number of uploaded images
    const uploadCount = parseInt(sessionStorage.getItem("uploadCount")) || 0;

    // Create a table to display the images and names in the email's HTML body
    const imageTable = createImageTable(uploadCount);

    // Create an HTML message with the table of images
    const body = `
        <p><strong>Group Name:</strong> ${groupName}</p>
        <p><strong>Group Avatar:</strong> ${groupAvatar}</p>
        <p><strong>Group Score:</strong> ${groupScore}</p>
        <p><strong>Group Uploads:</strong> Attached</p>
    `;

    // Assuming you have correctly initialized and configured the Email.js library
    Email.send({
        Host: `${e.host}`,
        Username: `${e.username}`,
        Password: `${e.password}`,
        To: `${e.destination}`,
        From: `${e.username}`,
        Subject: subject,
        Body: body, // Use the HTML body here
        Attachments: createImageAttachments(uploadCount), // Attach images
    }).then(
        message => alert(message)
    );
}

function createImageTable(uploadCount) {
    const table = document.createElement("table");

    for (let i = 1; i <= uploadCount; i++) {
        const uniqueName = "upload" + i;
        const base64ImageData = sessionStorage.getItem(uniqueName);

        if (base64ImageData) {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            cell1.textContent = "Uploaded Image " + i;
            const cell2 = row.insertCell(1);
            const imgElement = document.createElement("img");
            imgElement.src = "cid:uploaded_image_" + i; // Use "cid" notation for embedded images
            imgElement.alt = "Uploaded Image " + i;
            imgElement.style.width = "100px";
            imgElement.style.height = "100px";
            cell2.appendChild(imgElement);
        }
    }

    return table.outerHTML; // Return the HTML of the table
}

function createImageAttachments(uploadCount) {
    const attachments = [];

    for (let i = 1; i <= uploadCount; i++) {
        const uniqueName = "upload" + i;
        const base64ImageData = sessionStorage.getItem(uniqueName);

        if (base64ImageData) {
            attachments.push({
                name: `uploaded_image_${i}.png`,
                data: base64ImageData,
                cid: `uploaded_image_${i}`, // Content-ID for embedded image
            });
        }
    }

    return attachments;
}