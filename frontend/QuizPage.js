let timer;
let currentIndex = 1;


function submitHandlerManualy() {
  document.getElementById("Submit-Confirm").style.display = "block";
}

function submitHandlerManualyNo() {
  document.getElementById("Submit-Confirm").style.display = "none";

}

function submitHandler() {
  var profileItems = JSON.parse(sessionStorage.getItem('MyQuestions'));

  var profileItems = profileItems.map((a, ind) => {
    let currentAnswer = document.querySelector(`input[name="answer${ind + 1}"]:checked`);
    if (currentAnswer) {
      a.selectedAnswer = (currentAnswer.value);
    }
    else{
      a.selectedAnswer = "Nothing Selected";
    }
    return a;
  });

  var result = JSON.parse(localStorage.getItem('result')) || [];

  var usernam = localStorage.getItem('current_user');
  var passw = localStorage.getItem('current_pass');

  for (i of result) {
    if (usernam == i.name && passw == i.pass) {
      i.resul.push(profileItems);
      i.size++;
      var total = 0;
      var correct = 0;
      profileItems.forEach((item) => {
        if (item.Correct_Answer == item.selectedAnswer) {
          correct++;
        }
        total++;
      })
      i.score.push([correct, total]);
      localStorage.setItem('resulttofind', i.size);
      i.TypeId.push(`${sessionStorage.getItem('TypeOfThisQuiz')}`);
      i.time.push(`${sessionStorage.getItem('TimeOfThisQuiz')}`);
    }
  }

  localStorage.setItem('result', JSON.stringify(result));

  sessionStorage.removeItem('MyQuestions');
  window.location.href = 'resultpage.html';
}


function updateTimer() {
  const timerElement = document.getElementById("timer");

  let timeLeft = parseInt(sessionStorage.getItem('CurRemainTime'));
  // alert(timeLeft);
  if (timeLeft <= 0) {
    clearInterval(timer);
    // Handle time out scenario
    alert("Time's Up!!!")
    submitHandler();
    return;
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timeLeft--;
  sessionStorage.setItem('CurRemainTime', timeLeft);
}


function myFunctionnext(a) {
  document.getElementById(`quiz${a}`).style.display = "none";
  document.getElementById(`quiz${parseInt(a) + 1}`).style.display = "block";
  currentIndex++;
}

function myFunctionprev(a) {
  document.getElementById(`quiz${a}`).style.display = "none";
  document.getElementById(`quiz${parseInt(a) - 1}`).style.display = "block";
  currentIndex--;
}

function myFunction(a) {
  document.getElementById(`quiz${currentIndex}`).style.display = "none";
  document.getElementById(`quiz${a}`).style.display = "block";
  currentIndex = a;
}

function displayTheQuiz() {
  var profileItems = JSON.parse(sessionStorage.getItem('MyQuestions'));

  if (profileItems == undefined || profileItems == []) {
    console.error('No quiz questions found or invalid format.');
    var ParentBox = document.getElementById("Body");
    ParentBox.innerHTML = `
        SOMETHING WENT WRONG PLEASE TRY AGAIN
        `
    return;
  }

  var ParentBox = document.getElementById("Parent-Box");
  var indexnumbers = document.getElementById("index-numbers");

  ParentBox.innerHTML += `
    <div class = "TimeBox">
      <div>Remaining Time : </div>
      <div class="timer" id="timer">Loading...</div>
    </div>
    `;

  profileItems.forEach((cur, ind) => {
    var indexButton = document.createElement("button");
    indexButton.className = "index-button";
    indexButton.value = `${ind + 1}`;
    indexButton.innerHTML = `${ind + 1}`;
    indexButton.addEventListener("click", function () {
      myFunction(this.value);
    });

    indexnumbers.appendChild(indexButton);

    var quizBox = document.createElement("div");
    quizBox.className = "quiz-container";
    quizBox.id = `quiz${ind + 1}`;

    var next = ``;
    var prev = ``;

    if (ind != 0) {
      prev = `<button id="prev${ind + 1}" value="${ind + 1}" onclick="myFunctionprev(this.value)" >Prev</button>`
    }
    if (ind != profileItems.length - 1) {
      next = `<button id="Next${ind + 1}" value="${ind + 1}" onclick="myFunctionnext(this.value)" >Next</button>`
    }
    quizBox.innerHTML = `
        <div class="quiz-header">
        <h2 id="question${ind + 1}">Q${ind + 1}. ${cur.Question}</h2>
      </div>
      <ul>
        <li>
          <input type="radio" name="answer${ind + 1}" id="a${ind + 1}" value="${cur.Incorrect_Answers[3]}" class="answer">
          <label for="a${ind + 1}" id="a_text${ind + 1}">${cur.Incorrect_Answers[3]}</label>
        </li>
        <li>
          <input type="radio" name="answer${ind + 1}" id="b${ind + 1}" value="${cur.Incorrect_Answers[0]}" class="answer">
          <label for="b${ind + 1}" id="b_text${ind + 1}">${cur.Incorrect_Answers[0]}</label>
        </li>
        <li>
          <input type="radio" name="answer${ind + 1}" id="c${ind + 1}" value="${cur.Incorrect_Answers[1]}" class="answer">
          <label for="c${ind + 1}" id="c_text${ind + 1}">${cur.Incorrect_Answers[1]}</label>
        </li>
        <li>
          <input type="radio" name="answer${ind + 1}" id="d${ind + 1}" value="${cur.Incorrect_Answers[2]}" class="answer">
          <label for="d${ind + 1}" id="d_text${ind + 1}">${cur.Incorrect_Answers[2]}</label>
        </li>
      </ul>
      ${prev}
      ${next}
        `
    ParentBox.appendChild(quizBox);
  });

  timer = setInterval(updateTimer, 1000);

}

displayTheQuiz();