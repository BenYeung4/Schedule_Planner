var tasks = {}; //saving to local repository

//the current day is displayed at the top of the calendar
setInterval(function(){
var today = new Date(); //local machine date and time
var day = today.toDateString();
var time = today.toLocaleTimeString();
var dateTime = day + " "+ time;
document.getElementById("currentDay").innerHTML = dateTime;
},100); //sets the refresh for the counting of the time

//loads the saved tasks, need to input if there is nothing saved
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));
}


// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours


// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future


// WHEN I click into a time block
// THEN I can enter an event


// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}