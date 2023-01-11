const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        "question": 'What does the abbreviation HTML stand for?',
        "choice1": 'HyperText Markup Language',
        "choice2": 'HighText Markup Language',
        "choice3": 'HyperText Markdown Language',
        "choice4": 'None of the Above',
        "answer": 1,
    },
    {
        "question": "How many sizes of headers are available in HTML by default?",
        "choice1": "5",
        "choice2": "1",
        "choice3": "6",
        "choice4": "3",
        "answer": 3,
    },
    {
        "question": "What is the smallest header in HTML by default?",
        "choice1": "h1",
        "choice2": "h2",
        "choice3": "h4",
        "choice4": "h6",
        "answer": 4,
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

 getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign('/end.html');
    };


    questionCounter++;
    progressText.innerText =  `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true; 
};

choices.forEach(choice => {
    choice.addEventListener('click', 
    e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct":"incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }    
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
  
  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
   };

   startGame();
