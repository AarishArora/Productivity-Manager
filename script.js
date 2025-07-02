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