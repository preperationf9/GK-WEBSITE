let questions = [];
let current = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

let examMode = localStorage.getItem("examQuiz");
let month = localStorage.getItem("quizMonth");

let script = document.createElement("script");
script.src = examMode ? "data/exam_" + examMode.toLowerCase() + ".js"
                      : "data/" + month + ".js";
document.body.appendChild(script);

script.onload = () => {
  questions = examMode ? quizData[examMode] : quizData;
  if (!questions || questions.length === 0) {
    document.getElementById("question").innerText = "No questions available!";
    return;
  }
  loadQuestion();
};

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerHTML =
    `<b>Question ${current + 1}/${questions.length}:</b><br>${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });

  updateProgressBar();
  startTimer();
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected, btn) {
  clearInterval(timerInterval);
  const correct = questions[current].answer;
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
    document.getElementById("score").innerText = score;
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }
  setTimeout(nextQuestion, 900);
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    saveExamHistory();
    window.location.href = "result.html";
  }
}

function updateProgressBar() {
  document.getElementById("progressBar").style.width =
    ((current / questions.length) * 100) + "%";
}

function saveExamHistory() {
  let history = JSON.parse(localStorage.getItem("examHistory")) || [];
  history.push({
    exam: examMode ? examMode : month,
    score: score,
    total: questions.length,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("examHistory", JSON.stringify(history));
  localStorage.setItem("score", score);
  localStorage.setItem("total", questions.length);
}
