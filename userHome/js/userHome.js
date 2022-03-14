function showListSong(){
    let currentUser= JSON.parse(localStorage.getItem("user"))

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/song",
        success: function (data){
            let listSong= ''
            for (let i=0; i< data.length; i++){
                listSong+= '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '            <div class="ms-2 me-auto">\n' +
                    '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                    '                \n' +
                    '            </div>\n' +
                    '        <audio controls><source src="'+ data[i].path +' "></audio>\n' +
                    '            <span class="badge bg-primary rounded-pill">Luot nghe</span>\n' +
                    '        </li>'
            }
            document.getElementById("listSong").innerHTML= listSong
        }
    })
}






function successHandler(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/song",
        success: function (data) {
            let mySongList = ''
            for (let i = 0; i < data.length; i++) {
                mySongList += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '        <div class="ms-2 me-auto">\n' +
                    '            <div class="fw-bold">' + data[i].name + '</div>\n' + data[i].artist +
                    '            \n' +
                    '        </div>\n' +
                    '        <audio controls><source src="'+ data[i].path +' "></audio>\n' +
                    '        <span onclick="showFormEditSong(' + data[i].id + ')" class="badge bg-primary rounded-pill">EDIT</span>\n' +
                    '        <span onclick="deleteSong(' + data[i].id + ')" class="badge bg-primary rounded-pill">DELETE</span>\n' +
                    '    </li>'
            }
        }
    })



}
showListSong()
