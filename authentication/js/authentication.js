function signin(){
    let username= $("#usernameSignIn").val();
    let password= $("#passwordSignIn").val();
    let userLogin= {
        username: username,
        password: password
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(userLogin),
        url: "https://casestudy4.herokuapp.com/api/auth/signin",
        success: function (data){
            if (data.message !== "Error -> Unauthorized"){
                window.localStorage.setItem('user',JSON.stringify(data));
                let currentUser= JSON.parse(localStorage.getItem("user"))
                if (currentUser.roles[0].authority === "USER"){
                    window.location.href= "/userHome/index.html"
                }else {
                    window.location.href= "/adminHome/index.html"
                }

            }else {
                $("#signInFail").modal("show")
            }

        },

    })
}


function signup(){
    let name= $("#nameSignUp").val();
    let email= $("#emailSignUp").val();
    let username= $("#usernameSignUp").val();
    let password= $("#passwordSignUp").val();
    let passwordAgain= $("#passwordSignUpAgain").val();
    let userSignUp= {
        name: name,
        email: email,
        username: username,
        password: password,
        re_enterPassword: passwordAgain,
        roles: ["USER"]
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(userSignUp),
        url: "https://casestudy4.herokuapp.com/api/auth/signup",
        success: function (data){
            if (data.message !== "Username Existed! Please try again!" && data.message !== "Email Existed! Please try again!"){
                if(data.message !== "Password must be more than 6 characters"){
                    if (data.message !== "Re-enter incorrect password!"){
                        $("#signUpSuccess").modal("show")
                    }else {
                        $("#signUpPasswordFail").modal("show")
                    }
                }else {
                    $("#signUpPasswordLengthFail").modal("show")
                }

            }else {
                $("#signUpFail").modal("show")
            }

        }
    })
}

function next(){
    let username= $("#username").val()
    let password= $("#password").val()
    let re_enterPassword= $("#reenterPassword").val()
    let forgotForm= {
        username: username,
        password: password,
        re_enterPassword: re_enterPassword
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(forgotForm),
        url: "https://casestudy4.herokuapp.com/api/auth/forgotPassword",
        success: function (data){
            if(data.message !== "Can not find this user"){
                if(data.message !== "Password must be more than 6 characters"){
                    if(data.message !== "Re-enter incorrect password!"){
                        $("#forgotSuccess").modal("show")
                    }else {
                        $("#forgotFail3").modal("show")
                    }

                }else{
                    $("#forgotFail1").modal("show")
                }
            }else{
                $("#forgotFail2").modal("show")
            }
        }
    })
}

function closeSignUpModal(){
    $("#signUpSuccess").modal("hide");
    window.location.href= "/casestudy4_FE/authentication/index.html?_ijt=tb3je3t7bdda526lgd0gr4mp76&_ij_reload=RELOAD_ON_SAVE#signin"
}

function closeSignUpFailModal(){
    $("#signUpFail").modal("hide")
}

function closeSignInFailModal(){
    $("#signInFail").modal("hide")
}

function closeSignUpPasswordFailModal(){
    $("#signUpPasswordFail").modal("hide")
}

function closeSignUpPasswordLengthFailModal(){
    $("#signUpPasswordLengthFail").modal("hide")
}

function closeForgotSuccess(){
    $("#forgotSuccess").modal("hide")
    window.location.href= "/casestudy4_FE/authentication/index.html"
}

function closeForgotFail1(){
    $("#forgotFail1").modal("hide")
}

function closeForgotFail2(){
    $("#forgotFail2").modal("hide")
}

function closeForgotFail3(){
    $("#forgotFail3").modal("hide")
}

// Forgot Password Form
function myFunction1() {
    let password = document.getElementById("password");
    let icon= document.getElementById("togglePassword1");
    if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("fa-eye")
    } else {
        password.type = "password";
        icon.classList.toggle("fa-eye-slash")
    }
}

function myFunction2() {
    let password = document.getElementById("reenterPassword");
    let icon= document.getElementById("togglePassword2");
    if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("fa-eye")
    } else {
        password.type = "password";
        icon.classList.toggle("fa-eye-slash")
    }
}

// Sign In Form
function myFunction3() {
    let password = document.getElementById("passwordSignIn");
    let icon= document.getElementById("togglePassword3");
    if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("fa-eye")
    } else {
        password.type = "password";
        icon.classList.toggle("fa-eye-slash")
    }
}

// Sign Up Form
function myFunction4() {
    let password = document.getElementById("passwordSignUp");
    let icon= document.getElementById("togglePassword4");
    if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("fa-eye")
    } else {
        password.type = "password";
        icon.classList.toggle("fa-eye-slash")
    }
}

function myFunction5() {
    let password = document.getElementById("passwordSignUpAgain");
    let icon= document.getElementById("togglePassword5");
    if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("fa-eye")
    } else {
        password.type = "password";
        icon.classList.toggle("fa-eye-slash")
    }
}


