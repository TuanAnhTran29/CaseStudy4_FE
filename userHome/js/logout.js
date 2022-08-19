function signout(){
    localStorage.removeItem("user")
    localStorage.removeItem("songEdit")
    checkAut()
}

function checkAut(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    if (currentUser == null || currentUser.token == null){
        window.location.href= "/authentication/index.html"
    }
}