// DOM Elements
const landingPage = document.getElementById("landing-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
        ],
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false },
        ],
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "African Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Polar Bear", correct: false },
        ],
    },
    {
        question: "In which year did World War II end?",
        answers: [
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1918", correct: false },
            { text: "1950", correct: false },
        ],
    },
];

// Quiz State Variables
let CurrentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    ;
    // Reset variables
    CurrentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    landingPage.classList.remove("active");
    quizPage.classList.add("active");

    showQuestion();
}

function showQuestion() {
    answerDisabled = false;  // Reset State

    const currentQuestion = quizQuestions[CurrentQuestionIndex];

    currentQuestionSpan.textContent = CurrentQuestionIndex + 1;

    const progressPercent = (CurrentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    // Clear content from the previous question
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Converts the NodeList returned by answerContainer.children into an array to convert the NodeList to array
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        CurrentQuestionIndex++;
        if (CurrentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizPage.classList.remove("active");
    resultPage.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a Genuis!";
    } else if (percentage === 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage === 60) {
        resultMessage.textContent = "Good Effort! Keep Learning!";
    } else if (percentage === 40) {
        resultMessage.textContent = "Not Bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep Studying! You'll get better!";
    }
}

function restartQuiz() {
    resultPage.classList.remove("active");

    startQuiz();
}