

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
const cards = $('.card');
// This function adds as an event listener listening to whenever a user presses restart it shuffles the cards
$('.restart').bind('click', function () {
	for (let i = 0; i<cards.length; i++) {
		cards[i].classList.remove('show', 'open');
	};
    const shuffled = shuffle(cards)
    $('.deck').append(shuffled);;
});


//This turns the cards
cards.on('click',function(e) {
    e.target.classList.toggle('open');
	e.target.classList.toggle('show');
})