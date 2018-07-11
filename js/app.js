//The global variables
const cards = $('.card');
let matched = $('.match');
let openCards = [];

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


// This function adds as an event listener listening to whenever a user presses restart it shuffles the cards
$('.restart').bind('click', function () {
	for (let i = 0; i<cards.length; i++) {
		cards[i].classList.remove('show', 'open');
	};
    const shuffled = shuffle(cards)
    $('.deck').append(shuffled);;
});

//This function checks if the opened cards match
function isMatch() {
	openCards.push(this);
    if(openCards.length === 2){
        if(openCards[0].type === openCards[1].type){
            openCards[0].classList.add("match", "disabled");
            openCards[1].classList.add("match", "disabled");
            openCards[0].classList.remove("show", "open", "no-event");
            openCards[1].classList.remove("show", "open", "no-event");
        } else {
            openCards[0].classList.add("unmatched");
            openCards[1].classList.add("unmatched");

        setTimeout(function(){
            openCards[0].classList.remove("show", "open", "no-event","unmatched");
            openCards[1].classList.remove("show", "open", "no-event","unmatched");
            },1000);
        }
		openCards = [];
    }
};
		

//This turns the cards uses event delegation
cards.on('click',function(e) {
    e.target.classList.toggle('open');
	e.target.classList.toggle('show');
	e.target.classList.toggle('disabled');
	isMatch();
})