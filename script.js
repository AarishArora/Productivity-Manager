function card_page_logic() {
  var cards = document.querySelectorAll(".cards");
  var fullpage = document.querySelectorAll(".full-page");
  var fullpageBtn = document.querySelectorAll(".full-page .btn");

  cards.forEach((card) => {
    // console.log(card.id);

    card.addEventListener("click", () => {
      fullpage[card.id].style.display = "block";
      // homepage.style.display = "none";
    });
  });

  fullpageBtn.forEach((btn) => {
    // console.log(btn.id);
    btn.addEventListener("click", () => {
      fullpage[btn.id].style.display = "none";
    });
  });
}
card_page_logic();

function Todo_List() {
  let Todo_submit_form = document.querySelector("#todo_box2 form");
  let todo_input = document.querySelector("#todo_box2 form input");
  let todo_textarea = document.querySelector("#todo_box2 form textarea");
  let todo_textImp = document.querySelector("#todo_box2 form #checkbox");

  let todoArray = [];

  if (localStorage.getItem("todoArray")) {
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
  } else {
    console.log("Local Storage is Empty");
  }

  function render_tasks() {
    let tasklist_box1 = document.querySelector("#todo_box1");
    let sum = "";

    todoArray.forEach((elem, idx) => {
      sum += `<div class="box1_task">
                            <div>
                                <h3>${elem.task}</h3>
                                <span class="${elem.imp}">imp</span>
                            </div>
                            
                            <button id="${elem.idx}">Mark as Compelete</button>
                        </div>`;
    });

    tasklist_box1.innerHTML = sum;

    localStorage.setItem("todoArray", JSON.stringify(todoArray));

    document.querySelectorAll("#todo_box1 button").forEach((btn) => {
      btn.addEventListener("click", () => {
        todoArray.splice(btn.id, 1);
        render_tasks();
      });
    });
  }
  render_tasks();

  Todo_submit_form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(todo_input.value, todo_textarea.value , todo_textImp.checked);
    todoArray.push({
      task: todo_input.value,
      details: todo_textarea.value,
      imp: todo_textImp.checked,
    });

    render_tasks();
    todo_input.value = "";
    todo_textarea.value = "";
    todo_textImp.checked = false;
  });
}
Todo_List();

function dailyPlanner() {
  let daily_plannerData =
    JSON.parse(localStorage.getItem("daily_plannerData")) || {};
  let hours = Array.from({ length: 20 }, (_, idx) => {
    return `${4 + idx}:00 - ${idx + 5}:00`;
  });
  let daily_planner = document.querySelector("#daily_planner");

  // console.log(hours);
  let wholeDay = "";
  hours.forEach((hour, idx) => {
    let savedData = daily_plannerData[idx] || "";

    wholeDay =
      wholeDay +
      `<div class="task_chit">
                    <h3>${hour}</h3>
                    <input id=${idx} type="text" placeholder = "..." value=${savedData}>
                </div>`;
  });

  daily_planner.innerHTML = wholeDay;

  let daily_plannerInput = document.querySelectorAll("#daily_planner input");

  daily_plannerInput.forEach(function (elem) {
    elem.addEventListener("input", () => {
      daily_plannerData[elem.id] = elem.value;
      localStorage.setItem(
        "daily_plannerData",
        JSON.stringify(daily_plannerData)
      );
    });
  });
}

dailyPlanner();

function motivational_quote() {
  let motivational_Quote = document.querySelector(".motivation_content p");
  let quote_author = document.querySelector(".motivation_author h1");

  async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();
    // console.log(data);
    motivational_Quote.innerHTML = data.content;
    quote_author.innerHTML = "~" + data.author;
  }
  fetchQuote();
}
motivational_quote();

function pomodoro_timer() {
  let timer = document.querySelector(".pomodoro_container h1");
  let startBtn = document.querySelector(".start");
  let pauseBtn = document.querySelector(".pause");
  let resetBtn = document.querySelector(".reset");
  let session = document.querySelector(".pomodoro_container h4");
  let isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timeInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timeInterval);

    if (isWorkSession) {
      timeInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timeInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timeInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timeInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timeInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timeInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoro_timer();



function weatherFunctionality() {


let city = "New Delhi";

let header1Time = document.querySelector(".header1 h1");
let header1Date = document.querySelector(".header1 h2");
let header2Temp = document.querySelector(".header2 h2");
let header2Condition = document.querySelector(".header2 h4");
let heatIndex = document.querySelector(".header2 .heatIndex");
let humidity = document.querySelector(".header2 .humidity");
let wind = document.querySelector(".header2 .wind");

let data = null;

async function weatherAPICall() {
  var response = await fetch(
    `/api/weather?city=${city}`
  );

  data = await response.json();
  // console.log(data);

  header2Temp.innerHTML = `${data.current.temp_c}°C`;
  header2Condition.innerHTML = `${data.current.condition.text}`;
  wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  heatIndex.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
}

weatherAPICall();

function timeDate() {
  const totalDaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  let dayOfWeek = totalDaysOfWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let tarik = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  header1Date.innerHTML = `${tarik} ${month}, ${year}`;

  if (hours > 12) {
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
      "2",
      "0"
    )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
      "2",
      "0"
    )} PM`;
  } else {
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
      "2",
      "0"
    )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
      "2",
      "0"
    )} AM`;
  }
}

setInterval(() => {
  timeDate();
}, 1000);

}
weatherFunctionality();


function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement;

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
          
            rootElement.style.setProperty('--pri', '#AD8B73')
            rootElement.style.setProperty('--sec', '#FFFBE9')
            rootElement.style.setProperty('--tri1', '#CEAB93')
            rootElement.style.setProperty('--tri2', '#E3CAA5')
            rootElement.style.setProperty('--tri3', '#725f52')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--tri3', '#5E936C')
            rootElement.style.setProperty('--sec', '#F8F3CE')
            rootElement.style.setProperty('--pri', '#57564F')
            rootElement.style.setProperty('--tri2', '#283b2cff')
            rootElement.style.setProperty('--tri1', '#7A7A73')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--tri3', '#824D74')
            rootElement.style.setProperty('--tri2', '#b17aa3ff')
            rootElement.style.setProperty('--sec', '#bb8983ff')
            rootElement.style.setProperty('--tri1', '#956647ff')
            rootElement.style.setProperty('--pri', '#401F71')
            flag = 0
        }

    })


}

changeTheme()