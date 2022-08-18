// let currentUser= JSON.parse(localStorage.getItem("user"))
async function deleteSong(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let a= $(this)
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "DELETE",
        url: "https://casestudy4.herokuapp.com/api/song/delete/" + id,
        // success: setTimeout(getAllList,500)





    })

    event.preventDefault()
}

function deleteModal(id){
    $("#deleteSong").modal("show")
    window.localStorage.setItem("songId",id)
}

function closeDeleteSong(){
    window.localStorage.removeItem("songId")
    $("#deleteSong").modal("hide")
}

function confirmDeleteSong(){
    let id= localStorage.getItem("songId")
    deleteSong(id)
    closeDeleteSong()
    $("#confirmDelete").modal("show")
}

function closeConfirmDelete(){
    window.localStorage.removeItem("songId")
    $("#confirmDelete").modal("hide")

    // window.location.reload()
    window.location.href= "/casestudy4_FE/userHome/mySong.html"
}

function getAllList(){
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/song",
        success: function (data){
            let listSong= ''
            for (let i=0; i< data.length; i++){
                listSong+=

                    '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '            <div class="ms-2 me-auto">\n' +
                    '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                    '                \n' +
                    '            </div>\n' +
                    '        <audio controls><source src="'+ data[i].path +' "></audio>\n' +
                    '        <button onclick="toEditPage('+ data[i].id +')" class="badge bg-primary rounded-pill">EDIT</button>\n' +
                    '        <button onclick="deleteSong('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                    '        </li>'

            }
            document.getElementById("mySongList").innerHTML= listSong
        }
    })
}



