document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var usernam = document.getElementById("Name").value;
    var passw = document.getElementById("pass").value;

    var profileItems = JSON.parse(localStorage.getItem('profile'))
    for(i of profileItems){
        if(usernam==i.name&&passw==i.pass){
            window.localStorage.setItem("current_user",usernam);
            window.localStorage.setItem("current_pass",passw);
            window.localStorage.setItem("isLogged",1);
            window.location.href = 'index.html';
        }
    }
    alert('Invalid username or password. Please try again.');
    
});



