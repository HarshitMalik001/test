// import { myData } from "./data/data";



var myData = [
    { createdby: "Host", title: "General Knowledge Quiz", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://www.themanthanschool.co.in/blog/wp-content/uploads/2019/12/general-knowledge.jpg", category: 9 },

    { createdby: "Host", title: "General Knowledge Quiz", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 15, time: 450, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqyhfzb3V1YvhoRUCk7t8b71IlYHHTjPNxg&s", category: 9 },

    { createdby: "Host", title: "History", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Mh-GNWBiaY_VzO3ggHkMBBo7GB4cNZ_OhQ&s", category: 23 },
    
    { createdby: "Host", title: "Entertainment: Video Games", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm2wN6zZwcYPnAQgB5vt6h6cJ6DxgLcw-wjQ&s", category: 15 },

    { createdby: "Host", title: "General Knowledge Quiz", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 20, time: 600, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrsM5fkK4h676xn1CprWiVCcKTvLEFGGBTA&s", category: 9 },
    
    { createdby: "Host", title: "Sports ", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 15, time: 450, imgLink: "https://static1.squarespace.com/static/58ee0b551e5b6c8ff18b94ad/58ee41fa414fb5fa31858382/62fe887fb367333c1deca022/1716972818473/sports+quiz+questions+and+answers.jpg?format=1500w", category: 21 },
    
    { createdby: "Host", title: "History", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 20, time: 600, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDtwg7SiWaysHs5qmhMMw_eCiMxM-WkD1Xw&s", category: 23 },
    
    { createdby: "Host", title: "Animal", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://kwizzbit.com/wp-content/uploads/2023/02/animal.jpg.webp", category: 27 },
    
    { createdby: "Host", title: "Entertainment: Film", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://usf.no/wp-content/uploads/filmquiz-1.jpg", category: 11 },
    
    { createdby: "Host", title: "Sports ", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 20, time: 600, imgLink: "https://img.jagranjosh.com/images/2024/January/2112024/indian-sports.jpg", category: 21 },
    
    { createdby: "Host", title: "Entertainment: Music", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 10, time: 300, imgLink: "https://assets.genially.com/s3fs-public/Musical%20quizen.png?VersionId=x57QFrKcI_ulgW5V2By_eaH3Ml3rcSTn", category: 12 },

    { createdby: "Host", title: "Sports ", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 15, time: 400, imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJhg2mLFAqpgulGhfvnLSmBg2fRFkB3tGEZQ&s", category: 21 },
    
    { createdby: "Host", title: "Sports ", from: "9:00 AM", to: "9:00 PM", NoOfQuestions: 25, time: 450, imgLink: "https://cdn.images.express.co.uk/img/dynamic/79/750x445/1279824.jpg", category: 21 },
]


var MyQuestions = JSON.parse(localStorage.getItem('MyQustions')) || [];
// myData = myData.concat(MyQuestions);



function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function refreshThings()
{
    fillQuizMain();
    fillQuizMainForCustom();
}




function myFuction(a) {
    // console.log(a);
    // return;
    if (!isLogged) {
        alert("You Need to Log in First");
        return;
    }

    fetch(`https://opentdb.com/api.php?amount=${a.NoOfQuestions}&category=${a.category}&difficulty=easy&type=multiple`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const questions = data.results;
            const arrOfQuestions = [];

            
            questions.forEach(question => {

                question.incorrect_answers.splice(Math.floor((Math.random()*4)), 0, decodeHtml(question.correct_answer));
                // console.log(question.incorrect_answers);
                arrOfQuestions.push({
                    Question: decodeHtml(question.question),
                    Correct_Answer: decodeHtml(question.correct_answer),
                    Incorrect_Answers: question.incorrect_answers
                    // allAnswer : 
                })
                // console.log(arrOfQuestions[arrOfQuestions.length - 1].Incorrect_Answers);
                // console.log(arrOfQuestions[arrOfQuestions.length - 1].Incorrect_Answers.splice(0,0,0));
                // console.log(arrOfQuestions[arrOfQuestions.length - 1].Incorrect_Answers);

            });
            sessionStorage.setItem('MyQuestions', JSON.stringify(arrOfQuestions));
            sessionStorage.removeItem('CurRemainTime');
            sessionStorage.setItem('CurRemainTime', a.time);
            sessionStorage.setItem('TimeOfThisQuiz', a.time);
            sessionStorage.setItem('TypeOfThisQuiz', a.title);

            // alert(a.time);
            // alert(sessionStorage.getItem('CurRemainTime'));
            window.location.href = 'QuizPage.html';
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });


}

function fillQuizMain() {
    var myMainBox = document.getElementById("quizmain");
    myMainBox.innerHTML = '';
    myData.forEach((data) => {
        var stringContent = JSON.stringify({
            time: data.time,
            NoOfQuestions: data.NoOfQuestions,
            category: data.category,
            title: data.title
        });

        var quizBox = document.createElement("div");
        quizBox.className = "quizBox";
        quizBox.innerHTML = `<div class="quizImage">
          <img src="${data.imgLink}" alt="${data.title} Image">
      </div>
      <div class="quizContent">
          <h3 class="quizTitle">${data.title}</h3>
          <div class = "Hostname"> Created By <strong>${data.createdby}</strong> </div>
          <div class="quizTime">
              <div>From :<span class="quizStartTime">${data.from}</span></div>
              <div>to <span class="quizEndTime">${data.to}</span></div>
          </div>
          <div class="quizDetails">
              <div class="quizInfo">
                  <div class="quizQuestions">${data.NoOfQuestions} Questions</div>
                  <div class="quizDuration">${data.time} sec Duration</div>
              </div>
              <div class="quizPlayButton">
                  <button class="playButton" onclick='myFuction(${stringContent})' >Play</button>
              </div>
          </div>
      </div>`
        myMainBox.appendChild(quizBox);
    })
}
// createdby:"harsh"

function deleteThisQuiz(ind)
{
    if(localStorage.getItem('current_user') != MyQuestions[ind].createdby)
    {
        alert("Can Only be deleted by the Owner or the Host");
        return;
    }
    
    MyQuestions.splice(ind, 1);
    localStorage.setItem('MyQustions', JSON.stringify(MyQuestions));
    // window.location.href = "index.html";
    refreshThings();
}


function updateThisQuiz(ind){
    if(localStorage.getItem('current_user') != MyQuestions[ind].createdby)
    {
        alert("Can Only be deleted by the Owner or the Host");
        return;
    }

    

    let TobeUpdatedList = MyQuestions[ind];
    sessionStorage.setItem('TobeUpdatedList' ,JSON.stringify(TobeUpdatedList));
    MyQuestions.splice(ind, 1);
    localStorage.setItem('MyQustions', JSON.stringify(MyQuestions));

    sessionStorage.removeItem('CalledFromUpdate');
    sessionStorage.setItem('CalledFromUpdate', 1);

    window.location.href = "Create.html";

}



function fillQuizMainForCustom() {
    var myMainBox = document.getElementById("quizmain");

    MyQuestions.forEach((data, ind) => {
        var stringContent = JSON.stringify({
            time: data.time,
            NoOfQuestions: data.NoOfQuestions,
            category: data.category,
            title: data.title
        });

        var quizBox = document.createElement("div");
        quizBox.className = "quizBox";
        quizBox.innerHTML = `<div class="quizImage">
          <img src="${data.imgLink}" alt="${data.title} Image">
      </div>
      <div class="quizContent">
          <h3 class="quizTitle">${data.title}</h3>
          <div class = "Hostname"> Created By <strong>${data.createdby}</strong> </div>
          <div class="quizTime">
              <div>From :<span class="quizStartTime">${data.from}</span></div>
              <div>to <span class="quizEndTime">${data.to}</span></div>
          </div>
          <div class="quizDetails">
              <div class="quizInfo">
                  <div class="quizQuestions">${data.NoOfQuestions} Questions</div>
                  <div class="quizDuration">${data.time} sec Duration</div>
              </div>
              <div class="quizPlayButton">
                  <button class="deleteButton" onclick='deleteThisQuiz(${ind})' > 
                    <img class="deleteimage" src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="">
                  </button>
                  <button class="updateButton" onclick='updateThisQuiz(${ind})' > 
                    <img class="updateimage" src="https://cdn-icons-png.flaticon.com/512/5278/5278646.png" alt="">
                  </button>
                  <button class="playButton" onclick='myFuction(${stringContent})' >Play</button>
              </div>
          </div>
      </div>`
        myMainBox.appendChild(quizBox);
    })
}



refreshThings();





