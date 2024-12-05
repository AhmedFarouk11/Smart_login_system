let UserName_input = document.getElementById("UserName_input");
let UserEmail_input = document.getElementById("UserEmail_input");
let UserPassword_input = document.getElementById("UserPassword_input");
let SignupBtn = document.getElementById("SignupBtn");
let passwordWrongBlock = document.getElementById("passwordWrongBlock");
let passwordSuccessBlock = document.getElementById("passwordSuccessBlock")
let passwordExistBlock = document.getElementById("passwordExistBlock")
let PFailedalertName = document.getElementById("PFailedalertName")
let PFailedalertEmail = document.getElementById("PFailedalertEmail")
let PFailedalertPassword = document.getElementById("PFailedalertPassword")
let UserEmail_inputLogin = document.getElementById("UserEmail_inputLogin")
let UserPassword_inputLogin = document.getElementById("UserPassword_inputLogin")
let LoginBtn = document.getElementById("LoginBtn")
let usersArray = [];
if (localStorage.getItem('userdata_items') == null) {
    usersArray = [];
} else {
    usersArray = JSON.parse(localStorage.getItem('userdata_items'));
}
function checkDuplicateData(userEmail) {
    var usersArray = JSON.parse(localStorage.getItem('userdata_items')) || [];

    for (var i = 0; i < usersArray.length; i++) {
        if (
            usersArray[i].userEmail.toLowerCase().trim() === userEmail.toLowerCase().trim()
        ) {
            return true;
        }
    }
    return false;
}
function UserExist() {
    var usersArray = JSON.parse(localStorage.getItem('userdata_items')) || [];

    for (var i = 0; i < usersArray.length; i++) {
        if (
            usersArray[i].userEmail.toLowerCase() === UserEmail_inputLogin.value.trim().toLowerCase() &&
            usersArray[i].userPassword.toLowerCase() === UserPassword_inputLogin.value.trim().toLowerCase()

        ) {
            localStorage.setItem('loggedInUsername', usersArray[i].userName);
            validdatalogin()
            setTimeout(() => {
                window.location.href = `index.html`;
            }, 1000);
            return true;
        }
    }
    invaliddatalogin()
    clearInputsLogin()
    return false;
}
document.addEventListener("DOMContentLoaded", function () {
    let userName_person = document.getElementById("userName_person")
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (loggedInUsername && userName_person) {
        userName_person.textContent = `
        ${loggedInUsername}`;
    }
});
LoginBtn?.addEventListener('click', function () {
    UserExist();
})
function clearInputsLogin() {
    UserEmail_inputLogin.value = null
    UserPassword_inputLogin.value = null
}
function clearInputs() {

    UserName_input.value = null
    UserEmail_input.value = null
    UserPassword_input.value = null
    UserName_input.classList.remove("is-invalid", "is-valid");
    UserEmail_input.classList.remove("is-invalid", "is-valid");
    UserPassword_input.classList.remove("is-invalid", "is-valid");


}
function validdatalogin() {
    PLoginSuccess.classList.remove('d-none');
    PLoginFaild.classList.add('d-none');
    UserEmail_inputLogin.classList.add('is-valid')
    UserEmail_inputLogin.classList.remove('is-invalid')
    UserPassword_inputLogin.classList.add('is-valid')
    UserPassword_inputLogin.classList.remove('is-invalid')

}
function invaliddatalogin() {
    PLoginSuccess.classList.add('d-none');
    PLoginFaild.classList.remove('d-none');
    UserEmail_inputLogin.classList.add('is-invalid')
    UserPassword_inputLogin.classList.add('is-invalid')
}
function RemoveInvalid() {
    UserName_input.classList.remove("is-invalid");
    UserEmail_input.classList.remove("is-invalid");
    UserPassword_input.classList.remove("is-invalid");
    passwordExistBlock.classList.remove("d-none")
}
function WrongInputs() {
    UserName_input.classList.add("is-invalid");
    UserEmail_input.classList.add("is-invalid");
    UserPassword_input.classList.add("is-invalid");
    PFailedalertName.classList.remove("d-none")
    PFailedalertEmail.classList.remove("d-none")
    PFailedalertPassword.classList.remove("d-none")
}
function validData() {
    UserName_input.classList.add("is-valid");
    UserEmail_input.classList.add("is-valid");
    UserPassword_input.classList.add("is-valid");
    passwordWrongBlock.classList.add('d-none');
    passwordExistBlock.classList.add('d-none');
    passwordSuccessBlock.classList.remove('d-none')
}
SignupBtn?.addEventListener("click", function () {
    var users_data = {
        userName: UserName_input.value.trim(),
        userEmail: UserEmail_input.value.trim(),
        userPassword: UserPassword_input.value.trim(),
    };

    var Regexusername = /^[a-zA-Z0-9_-]{3,15}$/;
    var Regexuseremail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var RegexuserPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (
        Regexusername.test(users_data.userName) &&
        Regexuseremail.test(users_data.userEmail) &&
        RegexuserPassword.test(users_data.userPassword)
    ) {
        if (checkDuplicateData(users_data.userEmail)) {
            passwordExistBlock.classList.remove('d-none')
            passwordSuccessBlock.classList.add('d-none')
            passwordWrongBlock.classList.add('d-none')
            passwordExistBlock.classList.remove("d-none")
            clearInputs()
            return;


        } else {
            usersArray.push(users_data);
            localStorage.setItem("userdata_items", JSON.stringify(usersArray));
            validData();
            clearInputs();
        }
    } else {
        WrongInputs()
        clearInputs();
        passwordWrongBlock.classList.remove('d-none')
        passwordWrongBlock.classList.remove('d-none')
    }
});




