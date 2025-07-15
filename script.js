function card_page_logic() {
    var cards = document.querySelectorAll(".cards");
var fullpage = document.querySelectorAll(".full-page");
var fullpageBtn = document.querySelectorAll(".full-page .btn");

cards.forEach((card) => {
    // console.log(card.id);

    card.addEventListener("click", ()=> {
        fullpage[card.id].style.display = "block";
        // homepage.style.display = "none";
    })
})

fullpageBtn.forEach((btn)=>{
    // console.log(btn.id);
    btn.addEventListener("click", ()=> {
        fullpage[btn.id].style.display= "none";
    })
})

}
card_page_logic();


function Todo_List() {


let Todo_submit_form = document.querySelector("#todo_box2 form");
let todo_input = document.querySelector("#todo_box2 form input");
let todo_textarea = document.querySelector("#todo_box2 form textarea");
let todo_textImp = document.querySelector("#todo_box2 form #checkbox");


let todoArray = []

if(localStorage.getItem("todoArray")){
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
}
else {
    console.log("Local Storage is Empty");
}

function render_tasks() {
    let tasklist_box1 = document.querySelector("#todo_box1");
    let sum = '';

    todoArray.forEach((elem , idx)=> {
        sum += `<div class="box1_task">
                            <div>
                                <h3>${elem.task}</h3>
                                <span class="${elem.imp}">imp</span>
                            </div>
                            
                            <button id="${elem.idx}">Mark as Compelete</button>
                        </div>`
    })

    tasklist_box1.innerHTML = sum;

    localStorage.setItem("todoArray", JSON.stringify(todoArray));

    document.querySelectorAll("#todo_box1 button").forEach((btn)=> {
        btn.addEventListener("click" ,()=> {
            todoArray.splice(btn.id,1);
            render_tasks();
        })
    })
}
render_tasks();

Todo_submit_form.addEventListener("submit" , (e)=> {
    e.preventDefault();
    // console.log(todo_input.value, todo_textarea.value , todo_textImp.checked);
    todoArray.push({task:todo_input.value, details:todo_textarea.value, imp:todo_textImp.checked});
    
    
    render_tasks();
    todo_input.value = '';
    todo_textarea.value = '';
    todo_textImp.checked = false;
});

}
Todo_List();



function dailyPlanner() {
    let daily_plannerData = JSON.parse(localStorage.getItem("daily_plannerData")) || {}
let hours = Array.from({length:20} , (_, idx)=>{ return `${4+idx}:00 - ${idx+5}:00`})
let daily_planner = document.querySelector("#daily_planner");

// console.log(hours);
let wholeDay = '';
hours.forEach((hour, idx)=>{
    let savedData = daily_plannerData[idx] || ''

    wholeDay = wholeDay + `<div class="task_chit">
                    <h3>${hour}</h3>
                    <input id=${idx} type="text" placeholder = "..." value=${savedData}>
                </div>`
})



daily_planner.innerHTML = wholeDay;

let daily_plannerInput = document.querySelectorAll("#daily_planner input");

daily_plannerInput.forEach(function(elem) {
    elem.addEventListener("input" , () => {
        daily_plannerData[elem.id] = elem.value;
        localStorage.setItem("daily_plannerData", JSON.stringify(daily_plannerData))
    })
})
}

dailyPlanner();



function motivational_quote() {

    let motivational_Quote = document.querySelector(".motivation_content p");
    let quote_author = document.querySelector(".motivation_author h1");

    async function fetchQuote() {
        let response = await fetch("https://api.quotable.io/random");
        let data = await response.json();

        motivational_Quote.innerHTML = data.content;
        quote_author.innerHTML = '~'+ data.author
    }
    fetchQuote()
}
motivational_quote();



function pomodoro_timer() {
    let timer = document.querySelector(".pomodoro_container h1");
    let startBtn = document.querySelector(".start");
    let pauseBtn = document.querySelector(".pause");
    let resetBtn = document.querySelector(".reset");
    let session = document.querySelector(".pomodoro_container h4");
    let isWorkSession = true;

    let totalSeconds = 25*60;
    let timeInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds/60);
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")}`
    }

    function startTimer() {
        clearInterval(timeInterval);

        if(isWorkSession) {
            timeInterval = setInterval(() => {
                if(totalSeconds>0) {
                    totalSeconds--
                    updateTimer();
                }
                else {
                    isWorkSession = false;
                    clearInterval(timeInterval);
                    timer.innerHTML = '05:00';
                    session.innerHTML = "Take a Break";
                    session.style.backgroundColor = "var(--blue)"
                    totalSeconds = 5*60;
                }
            }, 1000);
        }
        else {

            timeInterval = setInterval(function () {
                if(totalSeconds>0) {
                    totalSeconds--;
                    updateTimer();
                }
                else {
                    isWorkSession = true;
                    clearInterval(timeInterval)
                    timer.innerHTML = "25:00";
                    session.innerHTML = "Work Session";
                    session.style.backgroundColor = "var(--green)"
                    totalSeconds = 25*60;
                }
            },1000)
        }
    }

    function pauseTimer() {
        clearInterval(timeInterval);
    }

    function resetTimer() {
        totalSeconds = 25*60;
        clearInterval(timeInterval);
        updateTimer();

    }
    startBtn.addEventListener("click",startTimer);
    pauseBtn.addEventListener("click",pauseTimer);
    resetBtn.addEventListener("click",resetTimer);

    
}
pomodoro_timer();