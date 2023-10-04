// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
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
/*
what a save button is clicked:
retrieve the value from the sibling element with the value of description
retrieve the value id attribute of the parent element as time
store the value into the local storage with the time as the key
display a notification by adding the class of 'show'
after a few second hide notifiction by removing class 'show'

extract the value of the ID from attribute and convert it to an intager

set an interval to recall the function to update the page every 15 mins

get the stored data from local storage for block
retrive the value from local storage for the respective hour
set the value to the corresponding element with the class description with the specific time block
*/
var btnEl = $('.btn');
var data = [];
const hourBlocks = [
  'hour-9',
  'hour-10',
  'hour-11',
  'hour-12',
  'hour-13',
  'hour-14',
  'hour-15',
  'hour-16',
  'hour-17'
]
$(function () {
  console.log("ready!");


  // ============================= Initialization function ========================================
  function init() {
    var currentDay = dayjs().format('dddd, MMMM D')
    var currentHour = dayjs().format('HH');
    console.log(currentDay);
    console.log(currentHour);

    $('#currentDay').text(currentDay);

    setHour(currentHour);

    for (let i = 0; i < hourBlocks.length; i++) {
      let hour = `${hourBlocks[i]}`
      var text = checkData(hour);
      $(`#${hour}`).children('textarea').text(text)
    }
  }
  // Check 
  function checkData(hour) {
    
    var data = getData()
    for (let i = 0; i < data.length; i++) {
      if (data[i].hour == hour) {
        return data[i].calendarEntry;
      }
    }
  }
  
  // ================ Sets the class of the time blocks based on current time =====================
  function setHour(currentHour) {

    for (let i = 9; i <= 17; i++) {

      // var timeBlock = $(`#hour-${i}`);
      // console.log(timeBlock);
      if (currentHour > i) {
        $(`#hour-${i}`).addClass('past');
      } else if (currentHour == i) {
        $(`#hour-${i}`).addClass('present');
      } else {
        $(`#hour-${i}`).addClass('future');
      }
    }
  }

  // =============== Refreshes the page after 15 mins to update class of time blocks ==============
  function refresh() {
    location.reload();
  }

  // =========================== Saves text in text area to an object =============================
  function saveData() {

    var divEl = $(this).parent();
    entry = divEl.children('textarea').val();

    if (entry === '') {
      return;
    } else {
      newData = {
        hour: divEl.attr('id'),
        calendarEntry: entry
      }
    }

    addData(newData);
  }
// ========================= adding both stored and new data to data array ========================
  function addData(newData) {
    data = getData();
    data.push(newData);
    storeData(data)
  }

  function getData() {
    var storedData = localStorage.getItem('calendarData');
    var emptyArr = [];
    if (JSON.parse(storedData)) {
      return JSON.parse(storedData);
    } else {
      return emptyArr;
    }
    // if (storedData == null) {
    //   return storedData = [];
    // } else {
    //   return storedData;
    // }
  }

  // =============================== stores object in local storage ===============================
  function storeData() {
    localStorage.setItem("calendarData", JSON.stringify(data));
  }

  init();
  setInterval(refresh, 900000);
  btnEl.on('click', saveData);
});
