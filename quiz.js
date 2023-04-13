let userAnswers = [];

const questions = [  
  {    
    question: "What is the capital of France?",    
    answers: ["Paris", "Madrid", "London", "Berlin"],
    correctAnswer: 0,
  },
  {
    question: "Who is the author of The Great Gatsby?",
    answers: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "T.S. Eliot"],
    correctAnswer: 0,
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: 2,
  },
];

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");
const progressEl = document.getElementById("progress");
const resultsContainer = document.getElementById("results");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const resultBtn = document.getElementById("result-btn");
const tableBody = document.querySelector("#answers-table tbody");

let currentQuestion = 0;
let score = 0;

quizContainer.style.display = "none";
resultsContainer.style.display = "none";

startBtn.addEventListener("click", () => {
  quizContainer.style.display = "flex";
  document.querySelector(".quiz-container").style.display = "none";
  startQuiz();
});

A.addEventListener("click", () => {
  checkAnswer(0);
});

B.addEventListener("click", () => {
  checkAnswer(1);
});

C.addEventListener("click", () => {
  checkAnswer(2);
});

D.addEventListener("click", () => {
  checkAnswer(3);
});

restartBtn.addEventListener("click", () => {
  restartQuiz();
});

function startQuiz() {
  resultsContainer.style.display = "none";
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  questionEl.innerText = question.question;
  A.innerText = question.answers[0];
  B.innerText = question.answers[1];
  C.innerText = question.answers[2];
  D.innerText = question.answers[3];
  progressEl.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function checkAnswer(answerIndex) {
  const question = questions[currentQuestion];
  userAnswers[currentQuestion] = answerIndex;
  if (answerIndex === question.correctAnswer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function calculateScore() {
  const percentage = (score / questions.length) * 100;
  return percentage.toFixed(0);
}

function showResults() {
  quizContainer.style.display = "none";
  resultsContainer.style.display = "flex";
  const percentage = calculateScore();
  const scorePercentage = document.createElement("p");
  resultsContainer.appendChild(scorePercentage);
  scoreEl.innerText = `You got ${score} out of ${questions.length} questions and got ${percentage} out of 100`;

  for (let i = 0; i < questions.length; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = questions[i].question;
    const td2 = document.createElement("td");
    const icon = document.createElement("i");
    icon.classList.add("fas");
    if (userAnswers[i] === questions[i].correctAnswer) {
      icon.classList.add("fa-check-circle");
      icon.style.color = "green";
    } else {
      icon.classList.add("fa-times-circle");
      icon.style.color = "red";
    }
    td2.appendChild(icon);
    const td3 = document.createElement("td");
    td3.innerText = questions[i].answers[questions[i].correctAnswer];
    if (userAnswers[i] === questions[i].correctAnswer) {
      td3.style.color = "black";
    } else {
      td3.style.color = "black";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  }
}


function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultsContainer.style.display = "none";
  document.querySelector("#answers-table tbody").innerHTML = ""; // clear previous answers
  quizContainer.style.display = "none"; // hide quiz container
  document.querySelector('.quiz-container').style.display = 'flex'; // show welcome container
}

