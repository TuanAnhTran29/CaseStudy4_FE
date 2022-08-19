function showUserList(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/admin",
        success: function (data) {
            let listUser=''
            for (let i=0; i< data.length; i++){
                listUser+= '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '    <div class="ms-2 me-auto">\n' +
                    '      <div class="fw-bold">'+ data[i].username +'</div>\n' + data[i].name +
                    '      \n' +
                    '    </div>\n' +
                    '    <button onclick="deleteModal('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                    '  </li>'
            }
            document.getElementById("listUser").innerHTML= listUser
        }
    })
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
        url: "https://casestudy4.herokuapp.com/api/admin/" + id,

    })
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
    window.location.href= "/adminHome/users.html"
}



showUserList()