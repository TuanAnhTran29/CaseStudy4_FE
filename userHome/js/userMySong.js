let currentUser= JSON.parse(localStorage.getItem("user"))

function showUserSongs(){
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/song/user/" + currentUser.id  ,
        success: function(data) {
            let mySongList=''
            for (let i=0; i< data.length; i++){
                mySongList +=
                    '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '            <div class="ms-2 me-auto">\n' +
                    '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                    '                \n' +
                    '            </div>\n' +
                    '        <audio controls><source src="'+ data[i].path +' "></audio>\n' +
                    '        <button onclick="toEditPage('+ data[i].id +')" class="badge bg-primary rounded-pill">EDIT</button>\n' +
                    '        <button onclick="deleteModal('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                    '        </li>'
            }
            document.getElementById("mySongList").innerHTML= mySongList
        }
    })
}


showUserSongs()

