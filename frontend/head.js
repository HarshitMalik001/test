
var isLogged = localStorage.getItem('isLogged');

function checkLogged() {
    if (isLogged == 1) {
        document.getElementById("UserName").innerHTML = `${localStorage.getItem('current_user')}`
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("login").style.display = "none";
    }
    else {
        console.log(isLogged);
        document.getElementById("UserName").innerHTML = "NOT FOUND"
        document.getElementById("sign-up").style.display = "inline";
        document.getElementById("login").style.display = "inline";
    }
}

function CheckLogIn() {
    if (isLogged == 1) {
        window.location.href = "AllResult.html";
    }
    else {
        window.location.href = "login.html";
    }
}

checkLogged();



function TakeMeToCreatePage(){
    if(isLogged != 1)
    {
        alert("You Need TO Log In First");
    }
    else
    {
        sessionStorage.removeItem('CalledFromUpdate');
        sessionStorage.setItem('CalledFromUpdate', 0);
        window.location.href = "create.html"
    }
}
