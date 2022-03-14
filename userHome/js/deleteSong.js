function deleteSong(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let a= $(this)
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "DELETE",
        url: "http://localhost:8080/api/song/delete/" + id,
        success: a.parent().remove()
    })
    window.location.reload()

}

