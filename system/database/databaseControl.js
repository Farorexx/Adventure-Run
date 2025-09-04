
/** ### AddValue
 * @param {Array} Questions - [Easy Question, [Easy Answers], Hard Question, [Hard Answers]]
 * 
 * Used to add the Questions Array from the recently Created Activity to the Full List.
 */
function AddValue(questions = String){

    //Get Prior List, or Create new One
    activity = sessionStorage.getItem("qList");
    if (activity == null) {
        activity =  "";
        activity = activity.concat(questions);
    } else{
        //Since list is a String, merge, keeping comma between.
        activity = activity.concat(",", questions);
    }

    activity = activity.toString(); //Because it keeps turning into an Object!
    let count = activity.split(",");
    console.log(typeof activity);

    let value = Math.floor(count.length/12);
    console.log(value);

    if (value >= 1) {
        //If there is more than one Question set
        for (let index = 0; index < value; index++) {
            count[11+index*12] = value;
            console.log(count[11+index*12]);
        }   
        activity = count.toString(); 
    }

    activity.toString();
    //Save new Value;
    sessionStorage.setItem("qList", activity);
}