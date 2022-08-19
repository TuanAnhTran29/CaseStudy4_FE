function toMySongSearchSongPage(){
    let keyword= $("#keyword").val()
    window.localStorage.setItem("keywordMySong",keyword);
    window.location.href= "/userHome/mySongListSearchSong.html"
}
function listSearchSongMySong(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let keyword= localStorage.getItem("keywordMySong")
    if(keyword == ""){
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
                    listSong += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                        '            <div class="ms-2 me-auto">\n' +
                        '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                        '                \n' +
                        '            </div>\n' +
                        '        <audio style="width: 80%;" controls><source src="'+ data[i].path +' "></audio>\n' +
                        '        <button onclick="toEditPage('+ data[i].id +')" class="badge bg-primary rounded-pill">EDIT</button>\n' +
                        '        <button onclick="deleteModal('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                        '        </li>'
                }
                document.getElementById("mySongSearchResults").innerHTML= listSong
            }
        })
    }else {
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            },
            type: "GET",
            url: "https://casestudy4.herokuapp.com/api/song/search/" + keyword,
            success: function (data){
                let listSong= ''
                for (let i=0; i< data.length; i++){
                    listSong += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                        '            <div class="ms-2 me-auto">\n' +
                        '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                        '                \n' +
                        '            </div>\n' +
                        '        <audio style="width: 80%;" controls><source src="'+ data[i].path +' "></audio>\n' +
                        '        <button onclick="toEditPage('+ data[i].id +')" class="badge bg-primary rounded-pill">EDIT</button>\n' +
                        '        <button onclick="deleteModal('+ data[i].id +')" class="badge bg-primary rounded-pill">DELETE</button>\n' +
                        '        </li>'
                }
                document.getElementById("mySongSearchResults").innerHTML= listSong
            }
        })
    }


    window.localStorage.removeItem("keywordMySong")
    event.preventDefault()
}


listSearchSongMySong()

