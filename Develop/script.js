// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
//day.js variables
var currentDay = dayjs().format("dddd");
var currentDate = dayjs().format(" MMM, D, YYYY");



//displays current day and date in header with id of current day
$("#currentDay").text(currentDay + currentDate);
//save button event listner and seting of local storage
$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();

    localStorage.setItem(timeBlockId, userInput);
    
    var confirmationText = "Your event: <span class='italic-text'>" + userInput + "</span> has been added.";
    $("#confirmText").html(confirmationText);

    $("#confirm").addClass("slow-fade")
                 .animate({ opacity: 1 }, 2000) // Fade in
                 .delay(500) // Wait for 0.5 seconds
                 .animate({ opacity: 0.5 }, 2000); // Fade out
  });

  //get current hour and turn its value to an interger for conditional statement
  var currentHour = parseInt(dayjs().format("HH"), 10); 

  //iterate over the time blocks
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var hour = parseInt(timeBlockId.split("-")[1], 10); //get hour based on time block Id and turn it into an interger
   
    // conditional statment to change classes in html
    if (hour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour === currentHour) {
      $(this).removeClass("past future").addClass("present")
    } else {
      $(this).removeClass("present past").addClass("future");
    }
    
  });
  // Retrieve user input from local storage
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });

  //event listner for clear button that will clear all saved events
  $(function () {
    $(".deleteBtn").on("click", function (event) {
      localStorage.clear();
      event.preventDefault();
      location.reload();
});
    });



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
});
