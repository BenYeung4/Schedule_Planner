
WHEN I open the planner
THEN the current day is displayed at the top of the calendar

In the index, we have the id="currentDay".  Which we can link to under javascript to push for the current numeric day, with the help of moment.js source.    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script> -->

Under script, we would set it to the following, and push.

var today = moment().format("dddd, MMM Do YYYY");
currentDay.text(today);

which shows the following:

![Top of Calandar](https://user-images.githubusercontent.com/52897163/169454245-7a75116d-d817-4742-9aed-958ef1a8ba4e.JPG)



WHEN I scroll down
THEN I am presented with time blocks for standard business hours

This was a bit difficult, had to create a function loop for the business hours, while creating classes which sets their own image design setting.  Tried my best to match with the image sample.

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


![time blocks](https://user-images.githubusercontent.com/52897163/169454289-a8250849-9d5b-43a0-a383-c785753b87a8.JPG)


WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future

Used the if statement inside the loop, making sure that the hour matches.  if not, then it would indicate the difference with the colors.
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
 
WHEN I click into a time block
THEN I can enter an event

Using the module example, would create the click function where would enter text.

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

![Enter Event](https://user-images.githubusercontent.com/52897163/169454361-4979aa34-9f9f-4d65-99af-d91afb2eadde.JPG)


WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist

Using the module's example, on saving to the localstorage, and JSON.stringify to make the content into a string.

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

![Save](https://user-images.githubusercontent.com/52897163/169454381-6bc46c62-72d3-4555-ac4f-f7d0b8f584c0.JPG)
