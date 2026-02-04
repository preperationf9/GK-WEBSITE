let questions = [];
let current = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const subject = localStorage.getItem("quizSubject");
const setNumber = localStorage.getItem("quizSet");

let script = document.createElement("script");
script.src = `data/${subject}/set${setNumber}.js`;
document.body.appendChild(script);

script.onload = () => {
  questions = quizData;
  loadQuestion();
};

function loadQuestion() {
  const q = questions[current];
  document.getElementById("questionBox").innerHTML =
    `<b>Question ${current+1}/${questions.length}:</b><br>${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });

  startTimer();
  updateProgressBar();
}

function startTimer(){
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;

  timerInterval = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timerInterval);
      nextQuestion();
    }
  },1000);
}

function checkAnswer(selected, btn){
  clearInterval(timerInterval);
  const correct = questions[current].answer;
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b=>b.disabled=true);

  if(selected === correct){
    btn.classList.add("correct");
    score++;
    document.getElementById("score").innerText = score;
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }
  setTimeout(nextQuestion, 800);
}

function nextQuestion(){
  current++;
  if(current < questions.length){
    loadQuestion();
  } else {
    alert("Quiz Finished! Score: " + score);
    location.href = "quiz.html";
  }
}

function updateProgressBar(){
  document.getElementById("progressBar").style.width =
    ((current)/questions.length)*100 + "%";
}
