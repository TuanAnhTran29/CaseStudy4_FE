function listSearchUser(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let username= localStorage.getItem("username")
    console.log(username)
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/admin/user/" + username,
        success: function (data){
            let listUser= ''
            console.log(data)
                listUser += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '    <div class="ms-2 me-auto">\n' +
                    '      <div class="fw-bold">'+ data.username +'</div>\n' + data.name +
                    '      \n' +
                    '    </div>\n' +
                    '    <button onclick="deleteModal('+ data.id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                    '  </li>'
            document.getElementById("listUserSearch").innerHTML= listUser
        }
    })
    window.localStorage.removeItem("username")
    event.preventDefault()
}

function deleteUser(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "DELETE",
        url: "http://localhost:8080/api/admin/" + id,

    })
}

function toSearchUserPage(){
    let username= $("#username").val()
    window.localStorage.setItem("username",username);
    window.location.href= "/casestudy4_FE/adminHome/searchUser.html"
}

function deleteModal(id){
    $("#deleteUser").modal("show")
    window.localStorage.setItem("userId",id)
}

function closeDeleteUser(){
    window.localStorage.removeItem("userId")
    $("#deleteUser").modal("hide")
}

function confirmDeleteUser(){
    let id= localStorage.getItem("userId")
    deleteUser(id)
    closeDeleteUser()
    $("#confirmDelete").modal("show")
}

function closeConfirmDelete(){
    window.localStorage.removeItem("userId")
    $("#confirmDelete").modal("hide")
    // window.location.reload()
    window.location.href= "/casestudy4_FE/adminHome/users.html"
}

listSearchUser()
