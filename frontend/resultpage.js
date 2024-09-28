
function CalledFromQuiz() {
    var result = JSON.parse(localStorage.getItem('result')) || [];

    var usernam = localStorage.getItem('current_user');
    var passw = localStorage.getItem('current_pass');
    var resulttofind = localStorage.getItem('resulttofind');


    var myresult;
    var myscore;
    console.log(resulttofind);

    for (i of result) {
        if (usernam == i.name && passw == i.pass) {
            myresult = i.resul[resulttofind - 1];
            myscore = i.score[resulttofind - 1];
        }
    }

    const resultsContainer = document.getElementById('results');
    
    myresult.forEach((result, ind) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `Question ${ind + 1}: ${result.Question}`;

        const selectedAnswerText = document.createElement('p');
        selectedAnswerText.textContent = `Your Answer: ${result.selectedAnswer}`;
        selectedAnswerText.classList.add(result.selectedAnswer === result.Correct_Answer ? 'correct' : 'incorrect');

        const correctAnswerText = document.createElement('p');
        correctAnswerText.textContent = `Correct Answer: ${result.Correct_Answer}`;

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(selectedAnswerText);
        questionDiv.appendChild(correctAnswerText);

        resultsContainer.appendChild(questionDiv);

        const scoreContainer = document.getElementById('score');
        const scoreText = `Your Score: ${myscore[0]} out of ${myscore[1]}`;
        scoreContainer.textContent = scoreText;
    });
}

CalledFromQuiz();


