function listSearchSong(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let song= localStorage.getItem("song")
    console.log(song)
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/song/search/" + song,
        success: function (data){
            let listSong= ''
            for (let i=0; i< data.length; i++){
                listSong += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '            <div class="ms-2 me-auto">\n' +
                    '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                    '                \n' +
                    '            </div>\n' +
                    '        <audio controls><source src="'+ data[i].path +' "></audio>\n' +
                    '            <span class="badge bg-primary rounded-pill">Luot nghe</span>\n' +
                    '        </li>'
            }
            document.getElementById("listSearchSong").innerHTML= listSong
        }
    })
    window.localStorage.removeItem("song")
    event.preventDefault()
}

function toSearchSongPage(){
    let song= $("#keyword").val()
    window.localStorage.setItem("song",song);
    window.location.href= "/casestudy4_FE/userHome/searchPage.html"
}

listSearchSong()
