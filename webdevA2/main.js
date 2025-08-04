//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const musicplay = document.getElementById("musicplayer");

var allpages = document.querySelectorAll(".contentcard");

//audio files
const milesaudio = new Audio("audio/500milescompress.mp3");
milesaudio.setAttribute("quizanswer", "b");

const burnaudio = new Audio("audio/burncompress.mp3");
burnaudio.setAttribute("quizanswer", "a");

const tellheraudio = new Audio("audio/ificouldtellhercompress.mp3");
tellheraudio.setAttribute("quizanswer", "a");

const thanksaudio = new Audio("audio/thisisthethanksigetcompress.mp3");
thanksaudio.setAttribute("quizanswer", "b");

const thunderaudio = new Audio("audio/thunderbringercompress.mp3");
thunderaudio.setAttribute("quizanswer", "a");

const talkaudio = new Audio("audio/wedonttalkanymorecompress.mp3");
talkaudio.setAttribute("quizanswer", "b");

//audio that plays when you press the button
var audiotest = milesaudio;

//audio reloader
var reloadButton = document.getElementById('reload');

//select all subtopic pages
function hideall() { //function to hide all pages
	for (let onepage of allpages) { //go through all subtopic pages
		onepage.style.display = "none"; //hide it
	}
}

function show(pgno) { //function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	onepage.style.display = "block"; //show the page
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/


page1btn.addEventListener("click", function() {
	audiotest.pause();
	audiotest.currentTime = 0;
	show(1);
});
page2btn.addEventListener("click", function() {
	audiotest.pause();
	audiotest.currentTime = 0;
	show(2);
});
page3btn.addEventListener("click", function() {
	audiotest.pause();
	audiotest.currentTime = 0;
	show(3);
});
musicplay.addEventListener("click", function() {
	audiotest.pause();
	audiotest.currentTime = 0;
	audiotest.play();
});

//for random number generation
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}



//Quiz game

var quizContainer = document.getElementById('quiz');
var submitButton = document.getElementById('submit');

var myQuestions = {
	question: "Is this a Musical Theatre styled song?",
	answers: {
		a: 'Yes',
		b: 'No'
	},
	correctAnswer: audiotest.getAttribute("quizanswer")
};
Object.defineProperty(myQuestions, "correctAnswer", {
	writable: true
});

function reloadAudio() {
	audiotest.pause();
	audiotest.currentTime = 0;
	audiotest = null;
	var randnum = getRandomInt(6);
	if (randnum == 0) {
		audiotest = milesaudio;
	} else if (randnum == 1) {
		audiotest = burnaudio;
	} else if (randnum == 2) {
		audiotest = tellheraudio;
	} else if (randnum == 3) {
		audiotest = thanksaudio;
	} else if (randnum == 4) {
		audiotest = thunderaudio;
	} else if (randnum == 5) {
		audiotest = talkaudio;
	}
	Object.defineProperty(myQuestions, "correctAnswer", {
		value: audiotest.getAttribute("quizanswer")
	});
}

function generateQuiz(questions, quizContainer, submitButton) {

	function showQuestions(questions, quizContainer) {

		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		// first reset the list of answers
		answers = [];

		// for each available answer to this question...
		for (var letter in questions.answers) {

			// ...add an html radio button
			answers.push(
				'<label>' + '<input type="radio" name="question" value="' + letter + '">' + letter + ': ' + questions.answers[letter] + '</label>'
			);
		}

		// add this question and its answers to the output
		output.push(
			'<div class="question">' + questions.question + '</div>' + '<div class="answers">' + answers.join('') + '</div>'
		);

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');

	}

	function showResults(questions, quizContainer) {
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelector('.answers');

		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;

		// find selected answer
		userAnswer = (answerContainers.querySelector('input[name=question]:checked') || {}).value;

		// if answer is correct
		if (userAnswer === questions.correctAnswer) {
			// add to the number of correct answers
			numCorrect++;

			// color the answers green
			answerContainers.style.color = 'green';
		}
		// if answer is wrong or blank
		else {
			// color the answers red
			answerContainers.style.color = 'red';
		}

	}


	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function() {
		showResults(questions, quizContainer);
	};

	reloadButton.onclick = function() {
		reloadAudio();
	};

}

generateQuiz(myQuestions, quizContainer, submitButton);

hideall();

//------------------------------------------------------------
//Matching game

const gridDisplay = document.getElementById('matchgrid');

const canvas = document.createElement('canvas');

var TextOnCard = [];

const cardsArr = [
	'Burn',
	'This Is The Thanks I Get',
	'500 Miles',
	'Thunder Bringer',
	'If I Could Tell Her',
	'We Dont Talk Anymore'
];
const cardAudioArr = [
	burnaudio,
	thanksaudio,
	milesaudio,
	thunderaudio,
	tellheraudio,
	talkaudio
];

let indices = [0, 1, 2, 3, 4, 5];

let card1 = null,
	card2 = null;

init();

function init() {
	indices = [...indices, ...indices];
	indices.sort(() => 0.5 - Math.random());
	createBoard();
}

function createBoard() {
	indices.forEach(i => {
		const img = document.createElement('div');
		img.setAttribute('data-id', i);
		img.setAttribute('cardAudio', cardAudioArr[i]);
		img.classList.add('card');
		img.addEventListener('click', cardFlip);
		gridDisplay.appendChild(img);
	});
}

function cardFlip() {
	audiotest.pause();
	audiotest.currentTime = 0;
	audiotest = cardAudioArr[this.getAttribute('data-id')];
	audiotest.play();
		// Is this the first card being flipped?
	if (card1 == null) {
		card1 = this;
	} else {
		card2 = this;
		checkMatch();
	}
}

function checkMatch() {
	if (card1.getAttribute('data-id') === card2.getAttribute('data-id')) {

		TextOnCard.push(
			'<div class="cardText">' + cardsArr[card1.getAttribute('data-id')] + '</div>'
		);
		card1.innerHTML = TextOnCard.join('');
		TextOnCard.pop();

		TextOnCard.push(
			'<div class="cardText">' + cardsArr[card2.getAttribute('data-id')] + '</div>'
		);
		card2.innerHTML = TextOnCard.join('');
		TextOnCard.pop();

		card1.classList.add('matched');
		card2.classList.add('matched');
		card1 = null;
		card2 = null;
	} else {
		restoreCards();
	}
}

function restoreCards() {
	card1.src = canvas.toDataURL();
	card2.src = canvas.toDataURL();
	card1 = null;
	card2 = null;
}