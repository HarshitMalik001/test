
//  ---
function convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const convertedHours = hours % 12 || 12; 
    const formattedTime = `${convertedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}

function convertTo24hr(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === "AM") {
        if (hours === 12) {
            hours = 0; 
        }
    } else {
        if (hours !== 12) {
            hours += 12; 
        }
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


document.getElementById("Create-own-Quest").addEventListener('submit', (event)=>{
    event.preventDefault();

    var info = {
        title : document.getElementById('Title').value,
        from : convertTo12HourFormat(document.getElementById('From').value),
        to : convertTo12HourFormat(document.getElementById('To').value),
        NoOfQuestions : parseInt(document.getElementById('NoOfQuestions').value),
        time : parseInt(document.getElementById('Time').value),
        imgLink : document.getElementById('ImgLink').value,
        category : document.getElementById('category').value,
        createdby : localStorage.getItem('current_user')
    }
    // console.log(document.getElementById('From').value, document.getElementById('To').value);
    if(document.getElementById('From').value > document.getElementById('To').value)
    {
        alert("From can't be Greater than to");
        return ;
    }

    var MyQuestions = JSON.parse(localStorage.getItem('MyQustions')) || [];

    MyQuestions.push(info);

    localStorage.setItem('MyQustions', JSON.stringify(MyQuestions));

    window.location.href = "index.html";

})


function checkIfCalledFromUpdate(){
    let flag = sessionStorage.getItem('CalledFromUpdate');
    console.log(flag);

    if(flag != 1){
        console.log("called From create");
        return;
    }

    let prevInfo = JSON.parse(sessionStorage.getItem('TobeUpdatedList'));

    console.log(prevInfo);

    document.getElementById('Title').value = prevInfo.title;
    document.getElementById('From').value = convertTo24hr(prevInfo.from);
    document.getElementById('To').value = convertTo24hr(prevInfo.to);
    document.getElementById('NoOfQuestions').value = prevInfo.NoOfQuestions;
    document.getElementById('Time').value = prevInfo.time;
    document.getElementById('ImgLink').value = prevInfo.imgLink;
}


checkIfCalledFromUpdate();