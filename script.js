const quizData = [
  {
    question: "Which is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "What is the largest planet?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Charles Dickens", "Hemingway", "Tolstoy"],
    correct: 0
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correct: 1
  },
  {
    question: "HTML stands for?",
    options: ["Cascading Sheet", "Markup Lang", "HyperText Markup Language", "Web Lang"],
    correct: 2
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Tiger", "Leopard", "Cheetah", "Lion"],
    correct: 2
  },
  {
    question: "What does CPU stand for?",
    options: ["Central Program", "Control Panel", "Central Processing Unit", "Computer Processing"],
    correct: 2
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "What gas do plants need?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2
  },
  {
    question: "Sun rises in the?",
    options: ["West", "North", "East", "South"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(quizData.length).fill(null);
let timerInterval;
let timeLeft = 15;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const questionCount = document.getElementById("question-count");
const scoreEl = document.getElementById("score");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");

function startQuiz() {
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  currentQuestionIndex = 0;
  selectedAnswers.fill(null);
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = quizData[currentQuestionIndex];
  questionEl.innerText = q.question;
  questionCount.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.onclick = () => selectOption(i, li);
    if (selectedAnswers[currentQuestionIndex] === i) {
      li.classList.add("selected");
    }
    optionsEl.appendChild(li);
  });

  resetTimer();
}

function selectOption(index, element) {
  selectedAnswers[currentQuestionIndex] = index;
  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  element.classList.add("selected");
}

function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function finishQuiz() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  clearInterval(timerInterval);

  let score = 0;
  answersEl.innerHTML = "";

  quizData.forEach((q, i) => {
    const isCorrect = selectedAnswers[i] === q.correct;
    if (isCorrect) score++;
    const ans = document.createElement("p");
    ans.innerHTML = `Q${i + 1}: <b>${q.question}</b><br>
      Your answer: ${q.options[selectedAnswers[i]] || "Not Answered"}<br>
      Correct answer: ${q.options[q.correct]}`;
    ans.style.color = isCorrect ? "green" : "red";
    ans.style.marginBottom = "10px";
    answersEl.appendChild(ans);
  });

  scoreEl.innerText = score;
}

function startTimer() {
  timeLeft = 15;
  timerEl.innerText = `⏱️ ${timeLeft}`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱️ ${timeLeft}`;
    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}
