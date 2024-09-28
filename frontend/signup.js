function fun1() {
    let info = {
        name: document.getElementById("name").value,
        mail: document.getElementById("mail").value,
        pass: document.getElementById("password").value
    }

    let info_result = {
        name: document.getElementById("name").value,
        pass: document.getElementById("password").value,

        resul: [],
        size: 0,
        score: [],

        // new
        TypeId: [],
        time: []
    }

    var profileItems = JSON.parse(localStorage.getItem('profile')) || [];

    var result = JSON.parse(localStorage.getItem('result')) || [];

    profileItems.push(info);

    result.push(info_result);

    localStorage.setItem('profile', JSON.stringify(profileItems));
    localStorage.setItem('result', JSON.stringify(result));

}


document.getElementById('signupform').addEventListener('submit', function (event) {
    event.preventDefault();

    var passw = document.getElementById("password").value;
    var cpassw = document.getElementById("cpassword").value;

    if (passw == cpassw) {
        fun1();
        window.location.href = 'login.html';
    }
    else {
        alert("Password Does'nt match");
    }
}
);
