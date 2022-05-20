//set variables for the time, container from index, and current day
var currentDay = $("#currentDay");
var container = $(".container");
var timeBlocks = $(".timeblocks");

//the current day is displayed at the top of the calendar
var today = moment().format("dddd, MMM Do YYYY");
currentDay.text(today);

//the current hour of the day
var currentHr = moment().format("kk");
var tasks = {}; //saving to local repository


// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
//the timeblocks
//function to loop creating the blocks
var listTimeBlocks = function(){
    for (var i = 0; i < 9; i++){
        var block = moment().hour(9).add(i, 'hour'). format("hA");
        var hour = moment().hour(9).add(i, "hour").format("kk");
        var Content = tasks["" + hour];
    
        $('<div class = " hour align-items-center justify-content-center d-flex col-1">')
            .text(block)
            .attr('id', hour)
            .appendTo(timeBlocks);
    
        $('<div class="fillIng d-flex border-left border-right col-10 pl-3">')
            .text(Content)
            .attr('id', hour)
            .appendTo(timeBlocks);

        $('<button class="saveBtn align-items-center justify-content-center d-flex col-1">')
            .text("Save")
            .attr('id', hour)
            .appendTo(timeBlocks);

            //when hour of the day is a certain time, then color of the block changes
        if(hour === currentHr){
            $("div#" + hour + ".fillIng")
            .addClass("present")
        } else if (hour < currentHr){
            $("div#" + hour + ".fillIng")
            .addClass("past")
        } else{
            $("div#" + hour + ".fillIng")
            .addClass("future")
        }
 
    }
};

// WHEN I click into a time block
// THEN I can enter an event
$(document).on("click",".fillIng", function(){
    var text = $(this)
        .text()
        .trim();

    var id = $(this)
        .attr("id");

    var classLabel = $(this)
        .attr("class");

    var textInput = $("<textarea>")
        .addClass(classLabel)
        .attr("id", id)
        .text(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

//replace input when clicked off
$(document).on("blur", "textarea", function(){
    var text = $(this).val().trim();

    var id = $(this)
    .attr("id");

    var classLabel = $(this)
    .attr("class");

    var taskP = $("<textarea>")
    .addClass(classLabel)
    .attr("id", id)
    .text(text);
    
    $(this).replaceWith(taskP);
});

// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
$(document).on("click", ".saveBtn", function(){
    var id = $(this).attr("id");
    var text = $("#" + id + ".fillIng").text();
    tasks[""+id] = text;
    saveTasks();
});

// WHEN I refresh the page
// THEN the saved events persist
//retrieving task from local repository
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if(!tasks){
        tasks = {};
    }
};

//saving task in the local repository
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//load task for the first time
loadTasks();
listTimeBlocks();