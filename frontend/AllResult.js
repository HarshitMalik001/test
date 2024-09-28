
function getCurrentUsersResult() {
    var result = JSON.parse(localStorage.getItem('result')) || [];

    var usernam = localStorage.getItem('current_user');
    var passw = localStorage.getItem('current_pass');
    // var resulttofind = localStorage.getItem('resulttofind');


    var myresult;
    var myscore;
    var time;
    var TypeId;
    for (i of result) {
        if (usernam == i.name && passw == i.pass) {
            myresult = i.resul;
            myscore = i.score;
            TypeId = i.TypeId;
            time = i.time;
        }
    }

  

    document.getElementById("user-info").innerHTML = `
    <div class="summary-item"><strong>Current User:</strong> ${usernam}</div>
    <div class="summary-item"><strong>Total Tests Attempted:</strong> ${myresult.length}</div>
`;

    myresult.forEach((result, index) => {
        const summaryDiv = document.createElement('div');
        summaryDiv.classList.add('summary-item');
        summaryDiv.innerHTML = `
        <strong>Test Type:</strong> ${TypeId[index]} <br>
        <strong>Score:</strong> ${myscore[index][0]}/${myscore[index][1]} <br>
        <strong>Total Time:</strong> ${time[index]} sec <br>
        <button value = ${index + 1} class="buttonAllresult" onclick = "LoadDetailResult(this.value)"> View Detailed Results</button>
    `;
        document.getElementById("test-summary").appendChild(summaryDiv);
    });

}

function LoadDetailResult(a)
{
    localStorage.setItem('resulttofind', parseInt(a));
    window.location.href = "resultpage.html";
}

getCurrentUsersResult();


function logout()
{
    localStorage.setItem('isLogged', 0);
    window.location.href = "login.html"
}
