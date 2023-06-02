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

      // inform user that their event has been saved
      var confirmationText = "Your event: <span class='italic-text'>" + userInput + "</span> has been added.";
      $("#confirmText").html(confirmationText);
      //when event has been saved make text pop on top of page to let user know it was succesful
      $("#confirm").addClass("slow-fade")
        .animate({ opacity: 1 }, 2000) // Fade in
        .delay(1000) // Wait for 1 seconds
        .animate({ opacity: 0 }, 3000); // Fade out

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
  });
});
