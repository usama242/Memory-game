//------------------------VARIABLES----------------------------

//Time variables
const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;
let timerStart = true;

//Move variables
let moves = 0;
let movesCounter = document.querySelector(".moves");
let star = 3;
const stars = document.querySelectorAll(".fa-star");

//The global variables
const cards = $('.card');
let matched = document.getElementsByClassName("match");

//------------------------FUNCTIONS----------------------------

//This function shuffles
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//This function resets the game
function restart() {
    moves = 0;
    star = 3;
    stars[2].style.display = "block";
    stars[1].style.display = "block";
    movesCounter.innerHTML = "0 Move";

    clearInterval(time);
    timer.innerHTML = "Time: 0 mins 0 sec";
    timerStart = true;

    cards.map(x => {
        cards[x].classList.remove('show', 'open', 'disabled', 'match');
    });
    const shuffled = shuffle(cards)
    $('.deck').append(shuffled);;
};

function timeCounter() {
    time = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.innerHTML = `Time: ${minutes} mins ${seconds} sec`;
    }, 1000);
}

//This function checks if the opened cards match
function isMatch() {
    let openCards = $('.open');
    if (openCards.length === 2) {
        moves++;
        if (moves === 1) {
            movesCounter.innerHTML = moves + ' Move';
        } else {
            movesCounter.innerHTML = moves + ' Moves';
        }
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards.map(x => {
                openCards[x].classList.remove("open", "show")
                openCards[x].classList.add("match");
            });
        } else {
            setTimeout(() => openCards.map(x => {
                openCards[x].classList.remove("open", "show", "disabled");
            }), 1000);
        }
    }
    if (matched.length === 16) {
        modal()
    }
    if (moves === 15) {
        star = 2;
        stars[2].style.display = "none";
    } else if (moves === 25) {
        star = 1;
        stars[1].style.display = "none";
    }
};

function modal() {
    clearInterval(time);
    //Sweet alert external api
    swal({
        title: "Congratulations !!!",
        text: `You won with time: ${minutes} min ${seconds} sec \nwith a rating of ${star} stars (${moves} moves)`,
        type: "success",
        confirmButtonText: "Play again!"
    }).then(function (isConfirm) {
        if (isConfirm) {
            restart();
        }
    })
}
//------------------------EVENT LISTENERS----------------------------

// This function adds as an event listener listening to whenever a user presses restart it shuffles the cards
$('.restart').bind('click', restart)

//This turns the cards using event delegation to assign event listener
cards.on('click', function (e) {
    let openCards = $('.open');
    if (openCards.length < 2) {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');
        e.target.classList.toggle('disabled');
    }
    if (timerStart) {
        timeCounter();
        timerStart = false;
    }
    isMatch();
});

//------------------------------MAIN---------------------------------

$(document).ready(restart());