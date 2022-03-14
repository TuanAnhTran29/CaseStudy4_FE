function showUserList(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/admin",
        success: function (data) {
            let listUser=''
            for (let i=0; i< data.length; i++){
                listUser+= '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '    <div class="ms-2 me-auto">\n' +
                    '      <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].username +
                    '      \n' +
                    '    </div>\n' +
                    '    <button onclick="deleteUser('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                    '  </li>'
            }
            document.getElementById("listUser").innerHTML= listUser
        }
    })
}

function deleteUser(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let a= $(this)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "DELETE",
        url: "http://localhost:8080/api/admin/" + id,
        success: a.parent().remove()

    })
    window.location.reload()
}



showUserList()