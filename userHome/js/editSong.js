// let currentUser= JSON.parse(localStorage.getItem("user"))

function toEditPage(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/song/" + id  ,
        success: function (data){
            window.localStorage.setItem("songEdit",JSON.stringify(data))
            window.location.href= "/casestudy4_FE/userHome/editSong.html"
        }
    })
}

function showEditForm(){
    let songEdit= JSON.parse(localStorage.getItem("songEdit"))

    $("#InputNameSong").val(songEdit.name)
    $("#InputArtist").val(songEdit.artist)
    $("#InputLyrics").val(songEdit.lyrics)
    $("#idSong").val(songEdit.id)
    $("#image").val(songEdit.picture)
}



function updateSong(){
    let id= $("#idSong").val()
    let songName= $("#InputNameSong").val()
    let artist= $("#InputArtist").val()
    let lyrics= $("#InputLyrics").val()
    let category= $("input[type= radio]:checked").val()
    let image= $("#image").val()
    let newSong= {
        id: id,
        name: songName,
        artist: artist,
        lyrics: lyrics,
        categories: [{id:category}],
        picture: image,
        user: {id: currentUser.id},
        path: JSON.parse(localStorage.getItem("songEdit")).path
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "PUT",
        url: "http://localhost:8080/api/song/edit/" + id ,
        data: JSON.stringify(newSong),
        success: function (data){
            if(data.message === "Updated Song Successfully!"){
                $("#editSuccess").modal("show")
                resetCreatePage()
            }

        }



    })
    localStorage.removeItem("songEdit")
}

function deleteSongInApp(){
    localStorage.removeItem("songEdit")

}

function closeEditSuccess(){
    $("#editSuccess").modal("hide")
    window.location.href= "/casestudy4_FE/userHome/mySong.html"
}


showEditForm()