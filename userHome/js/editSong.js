var fbBucketName3 = 'picture';

var uploaderPicture3= document.getElementById("uploaderPicture1");
var pictureButton3= document.getElementById("pictureButton1");

let downloadURL3= ""

pictureButton3.addEventListener('change', function (e) {

    // what happened
    console.log('file upload event', e);

    // get file
    var file3 = e.target.files[0];

    // create a storage ref
    var storageRef3 = firebase.storage().ref(`${fbBucketName3}/${file3.name}`);

    // upload file
    var uploadTask3 = storageRef3.put(file3);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask3.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploaderPicture3.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            downloadURL3 = uploadTask3.snapshot.downloadURL;

        })
})

function toEditPage(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/song/" + id  ,
        success: function (data){
            window.localStorage.setItem("songEdit",JSON.stringify(data))
            window.location.href= "/userHome/editSong.html"
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
    let image= downloadURL3
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
        url: "https://casestudy4.herokuapp.com/api/song/edit/" + id ,
        data: JSON.stringify(newSong),
        success: function (data){
            console.log(data)
            if(data.message === "Updated Song Successfully!"){
                $("#editSuccess").modal("show")
            }

        }



    })
    // localStorage.removeItem("songEdit")
}

function deleteSongInApp(){
    localStorage.removeItem("songEdit")

}

function closeEditSuccess(){
    $("#editSuccess").modal("hide")
    window.location.href= "/userHome/mySong.html"
}


showEditForm()