//------------------------VARIABLES----------------------------

//Time variables
const timer = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let time;
let timerStart;

//The global variables
const cards = $('.card');
let matched = $('.match');

//------------------------FUNCTIONS----------------------------

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

function restart() {
	cards.map(x => {
	cards[x].classList.remove('show', 'open', 'disabled', 'match');
	});
    const shuffled = shuffle(cards)
    $('.deck').append(shuffled);;
};
	

//This function checks if the opened cards match
function isMatch() {
	let openCards = $('.open');
    if(openCards.length === 2){
        if(openCards[0].innerHTML === openCards[1].innerHTML){
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
};
		
	let openCards = $('.open');


//------------------------EVENT LISTENERS----------------------------
	
// This function adds as an event listener listening to whenever a user presses restart it shuffles the cards
$('.restart').bind('click', restart)
	
//This turns the cards using event delegation to assign event listener
cards.on('click',function(e) {
	let openCards = $('.open');
	if(openCards.length < 2){
		e.target.classList.toggle('open');
		e.target.classList.toggle('show');
		e.target.classList.toggle('disabled');
	}
	isMatch();
});

//------------------------------MAIN---------------------------------
restart();