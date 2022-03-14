let nameSignUp= document.getElementById("nameSignUp")
let usernameSignUp= document.getElementById("usernameSignUp")
let passwordSignUp= document.getElementById("passwordSignUp")
let emailSignUp= document.getElementById("emailSignUp")
let formSignUp= document.getElementById("signup")

formSignUp.addEventListener("submit",function (e) {
    if (nameSignUp.validity.valid || usernameSignUp.validity.valid || passwordSignUp.validity.valid || emailSignUp.validity.valid) {
        signup()
    }else {
        window.location.href= "../index.html"
    }
})

let usernameSignIn= document.getElementById("usernameSignIn")
let passwordSignIn= document.getElementById("passwordSignIn")
let formSignIn= document.getElementById("signin")

formSignIn.addEventListener("submit", function (e){
    if (usernameSignIn.validity.valid || passwordSignIn.validity.valid){
        signin()
    }else{

        window.location.href= "../index.html"
    }
})
