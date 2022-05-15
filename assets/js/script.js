
//showing the current date at the top


var today = new Date();
var day = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
var time = today.getHours() +":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = day + " " + time;

document.getElementById("currentDay").innerHTML = dateTime;

console.log(today);
