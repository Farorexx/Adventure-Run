var tabIndex = 0;

var qlocation;
var easyQuestion ="";
var easyOptions;
var hardQuestion =""
var hardOptions;

async function nextTab(delta){
    var i, tabcontent;
    var qType = document.getElementById("qType").querySelector('input[name="type"]:checked');
    //if (qType != null) {
        //console.log(qType.value);
        //Used to Debug and Identify the Type of Question
    //}
            
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabIndex += delta;
    if (tabIndex<0) {
        tabIndex = 0;
        window.location.href = "Admin.html";
        //This might send it back to a previous Page, like a cancel Button.
    }
    if (tabIndex > tabcontent.length-1) {
        tabIndex =  tabcontent.length-1;
        //Jump to next Page?


        var questions = [
            checkIfNull(easyQuestion),
            easyOptions,
            checkIfNull(hardQuestion),
            hardOptions,
            checkIfNull(qlocation),
            1, //Total Number of Questions.
        ];
        

        sessionStorage.setItem("QaPair", questions);

        //console.log(questions);
        var test = questions.toString();
        //console.log(typeof test);

        submitSets(test);
        window.location.href = "Admin.html";
        
    }
    
    if(tabcontent[tabIndex].id =="ConfirmAnswers"){
        confirmAnswers(qType);
    }
    
    tabcontent[tabIndex].style.display = "block";
    if (qType != null) {
        if (qType.value == "image"){
            q = tabcontent[tabIndex].getElementsByClassName("image");
            hide = tabcontent[tabIndex].getElementsByClassName("choice");
        } else if (qType.value == "choice"){
            q = tabcontent[tabIndex].getElementsByClassName("choice");
            hide = tabcontent[tabIndex].getElementsByClassName("image");
        }
        for (let index = 0; index < q.length; index++) {
            const element = q[index];
            const hidden = hide[index];
            if(element != null && hidden != null){
                element.style.display = "block";
                hidden.style.display = "none";
            }
        }
    }
}
//Used to see all the Questions before submitting
async function confirmAnswers(questionType){
    qlocation = document.getElementById("location").value;

    if (questionType != null && questionType.value == "image") {
        easyQuestion = document.getElementById("EasyImage").value;
        hardQuestion = document.getElementById("HardImage").value;

        easyOptions = "image-upload";
        hardOptions = "image-upload";
    } else if (questionType != null && questionType.value == "choice") {
        easyQuestion = document.getElementById("EasyQuestion").value;
        hardQuestion = document.getElementById("HardQuestion").value;

        var easyans = document.getElementById("easyc").querySelectorAll("[type=text]");
        var hardans = document.getElementById("hardc").querySelectorAll("[type=text]");

        var fill = "";

        easyOptions = [];

        for (let index = 0; index < easyans.length; index++) {
            fill = `${easyans[index].value}`;

            document.getElementById("choiceEasy").querySelectorAll("li")[index].innerHTML = fill;
            easyOptions[index] = checkIfNull(easyans[index].value);
        }
        
        hardOptions = [];

        for (let index = 0; index < hardans.length; index++) {
            fill = `${hardans[index].value}`;

            document.getElementById("choiceHard").querySelectorAll("li")[index].innerHTML = fill;
            hardOptions[index] = checkIfNull(hardans[index].value);
        }
    } 
    
    //Get the Headings
    document.getElementById("ConfirmEasy").querySelector("h3").innerHTML = easyQuestion;
    document.getElementById("ConfirmHard").querySelector("h3").innerHTML = hardQuestion;
}

function checkIfNull(object = ""){
    if(object == ""){
        return "?";
    }

    return object;
}

function submitSets(_questions){
    AddValue(_questions);
}