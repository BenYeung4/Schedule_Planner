var currentDay = $("#currentDay");
var container = $(".container");
var timeBlocks = $(".timeblocks");

//the current day is displayed at the top of the calendar
var currentDay = moment().format("dddd, MMM Do YYYY");
$("#currentDay").text(currentDay);

//the current hour of the day
var currentHr = moment().format("h");


var tasks = {}; //saving to local repository
var workHr = 9;

// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
//the timeblocks
var listTimeBlocks = function(){
    for (var i = 0; i < workHr; i++){
        var block = moment().hour(9).add(i, 'hour'). format("hA");
        var hour = moment().hour(9).add(i, "hour").format("h");
        var Content = tasks["" + hour];
    

        $('<div class = " hour align-items-center justify-content-center d-flex col-1">')
            .text(block)
            .attr('id', hour)
            .appendTo(timeBlocks);
    
        $('<div class="row d-flex border-left border-right col-10 pl-3">')
            .text(Content)
            .attr('id', hour)
            .appendTo(timeBlocks);

        $('<button class="saveBtn align-items-center justify-content-center d-flex col-1">')
            .text("Save")
            .attr('id', hour)
            .appendTo(timeBlocks);

        if(hour < currentHr){
            $("div#" + hour + ".row")
            .addClass("past")
        } else if (hour === currentHr){
            $("div#" + hour + ".row")
            .addClass("present")
         }
        else {
            $("div#" + hour + ".row")
            .addClass("future")
        }
    }
}

// WHEN I click into a time block
// THEN I can enter an event
$(document).on("clock",".row", function(){
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
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

//replace tasks when you click off of textarea

$(document).on("blur", "textarea", function(){
    var text = $(this).val();

    var id = $(this)
        .attr("id")
    
    var classLabel = $(this)
        .attr("class");
    
    var taskP = $("<div>")
        .addClass(classLabel)
        .attr('id', id)
        .text(text);

    $(this).replaceWith(taskP);

});


// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
$(document).on("click", ".saveBtn", function(){
    var id = $(this).attr("id");
    var text = $("#" + id + ".row").text();
    tasks[""+id] = text;
    saveTasks();
});

// WHEN I refresh the page
// THEN the saved events persist

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if(!tasks){
        tasks = {};
    }
}
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();
listTimeBlocks();