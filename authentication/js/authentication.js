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
        url: "http://localhost:8080/api/auth/signin",
        success: function (data){
            if (data.message !== "Error -> Unauthorized"){
                window.localStorage.setItem('user',JSON.stringify(data));
                let currentUser= JSON.parse(localStorage.getItem("user"))
                if (currentUser.roles[0].authority == "USER"){
                    window.location.href= "/casestudy4_FE/userHome/index.html"
                }else {
                    window.location.href= "/casestudy4_FE/adminHome/index.html"
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
        roles: ["USER"]
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(userSignUp),
        url: "http://localhost:8080/api/auth/signup",
        success: function (data){
            if (data.message !== "Username Existed! Please try again!" && data.message !== "Email Existed! Please try again!"){
                if (password == passwordAgain){
                    $("#signUpSuccess").modal("show")
                }else {
                    $("#signUpPasswordFail").modal("show")
                }
            }else {
                $("#signUpFail").modal("show")
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