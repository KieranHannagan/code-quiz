var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var timeLeft = document.querySelector("#timeLeft");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let quetionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        number: 1,
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:", 
        choice1: "JavaScript",
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log()",
        answer: 4,
    },
    {
        number: 2,
        question: "String values must be enclosed within ____ when being assigned to variables.", 
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3,
    },
    {
        number: 3,
        question: "Arrays in JavaScript can be used to store ______", 
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4,
    },
    {
        number: 4,
        question: "The condition in an if / else statement is enclosed with ______", 
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 3,
    },
    {   number: 5,
        question: "Commonly used data types DO NOT include:", 
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3,
    }

]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter> MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++;
    
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataSet['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers= true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptingAnswers)
        return;

        acceptingAnswers=false;
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataSet['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score += num;
    score.innerText = score;
}

startGame();