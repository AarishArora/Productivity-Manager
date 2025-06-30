var cards = document.querySelectorAll(".cards");
var fullpage = document.querySelectorAll(".full-page");

cards.forEach((card) => {
    // console.log(card.id);

    card.addEventListener("click", ()=> {
        fullpage[card.id].style.display = "block";
        console.log(fullpage[card.id]);
    })
})