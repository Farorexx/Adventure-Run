
const adminUser = "BHARA"
const adminPW = "feduniBhara"

QDict = [];
prevLoc = 10;

//User for Login
function setCookie(cname, cvalue, exdays) {
    console.log("Creating Cookie");
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      return true;
    } else{
      return false;
    }
  }

function saveFile(){
    const link = document.createElement("a");
         const content = sessionStorage.getItem("qList");
         const file = new Blob([content], { type: 'text/plain' });
         link.href = URL.createObjectURL(file);
         link.download = "BHARAquestions.txt";
         link.click();
         URL.revokeObjectURL(link.href);
}

function uploadFile(){
    const content = document.querySelector(".content");
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      sessionStorage.setItem("qList", reader.result);
    },
    false,
  );

  if (file) {
    reader.readAsText(file);
    window.alert(`Upload Complete`);
  } else{
    window.alert(`No file attached`);
  }

}

function printAll(){
    //send all DatabaseValues to console.
    Values = sessionStorage.getItem("qList")
    console.log(sessionStorage.getItem("qList").toString());

    container = document.getElementsByClassName("content")[0];
    buttons = document.getElementsByClassName("content2")[0];
    defaultContent = document.getElementsByClassName("content")[0].innerHTML;

    QDict = Values.split(",");  

    length = QDict.length; //Total number of Question Pairs.

    text ="";
 
    for (let x = 0; x < length; x++) {
        e = 0; //Offset caused by Image QUestions
        h = 0;
        console.log("x value: "+x);

        //Each Set of Questions.
        // EasyQuestion, EasyAns x 4, Hard Question, HardAns x4, location, question total
        //Replacing Location Prompt with next in line, or first if last

        elist ="";
        hlist ="";
        if(QDict[x+1] == "image-upload"){
          elist = 
          `<li>File Upload</li>`
          hlist = `<li>File Upload</li>`
          e -=3;
          h -=3;
        } else{
          elist = 
          `<li>${QDict[x+1]}</li>
          <li>${QDict[x+2]}</li>
          <li>${QDict[x+3]}</li>
          <li>${QDict[x+4]}</li>`
          hlist = 
          `<li>${QDict[x+e+6]}</li>
          <li>${QDict[x+e+7]}</li>
          <li>${QDict[x+e+8]}</li>
          <li>${QDict[x+e+9]}</li>`
        }

        console.log(x,x+e+h+11);
        text+=
        `<div>
        <h2>Location: ${QDict[x+e+h+10]}</h2>
        <div style='width: 50%;float: left;'>
            <h3>Junior Question: ${QDict[x+0]}</h3>
            ${elist}
            <b>Correct Answer: ${QDict[x+1]}</b>
            </div>
        <div style='width: 50%;float: left;'>
            <h3>Senior Question: ${QDict[x+e+5]}</h3>
            ${hlist}
            <b>Correct Answer: ${QDict[x+e+6]}</b>
            </div>
            <button onclick="genQR(${x},${12+e+h});" type="admin" style ='width=90%;'>Get QR code</button>
        </div>
        `
        x+= 11+e+h;
        length += e+h;
    }


    container.innerHTML = text;
    buttons.innerHTML = `<button onclick="transition2('Admin.html');" type="submit" alt='night'>Back</button>`
}

function genQR(start, end){
    console.log(start, end);
    x = QDict.slice(start, start+end);
    if (start == 0) {
      x[end-2] = QDict[QDict.length-2];
      
    } else{
      x[end-2] = QDict[start-2];
    }
    //Set the Location to the location of the Previous Question

    xString = "";
    if (x[1] == "image-upload") {
      xString = `["${x[0]}","${x[1]}","${x[2]}","${x[3]}","${x[4]}","${x[5]}"]`;
    } else {
      xString = `["${x[0]}",["${x[1]}","${x[2]}","${x[3]}","${x[4]}"],"${x[5]}",["${x[6]}","${x[7]}","${x[8]}","${x[9]}"],"${x[10]}",${x[11]}]`;
    }
    
    sessionStorage.setItem("QaPair", xString);
      transition2('activityToQR.html');
    }

function checkLogin(){
    user = document.getElementById("username-input").value;
    pWord = document.getElementById("password-input").value;

    if (user == adminUser && pWord == adminPW ) {
        setCookie("username", user, 365); //Set Cookie for 1 day
        return true;
    } else {
        //Error
        window.alert(`Incorrect Username or Password`);
    }
}