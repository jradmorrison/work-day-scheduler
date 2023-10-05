// ======================================= Global variables =======================================
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
// ============ Ready function so no DOM manipulation happend until the document is ready =========
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
  // Checks if item from hourblocks array matches any of the stored data and returns the entry if it does
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

// ======================= Pulls data from local storage and parses the data ======================
  function getData() {
    var storedData = localStorage.getItem('calendarData');
    var emptyArr = [];
    if (JSON.parse(storedData)) {
      return JSON.parse(storedData);
    } else {
      return emptyArr;
    }
  }

  // =============================== stores object in local storage ===============================
  function storeData() {
    localStorage.setItem("calendarData", JSON.stringify(data));
  }

  // ================== On page load function init runs and an interval starts ====================
  init();
  setInterval(refresh, 900000);
  btnEl.on('click', saveData);
});
