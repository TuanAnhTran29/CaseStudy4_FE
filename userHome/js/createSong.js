var image = '';
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'song';
// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
let downloadURL= ""
// listen for file selection
fileButton.addEventListener('change', function (e) {

    // what happened
    console.log('file upload event', e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
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
             downloadURL = uploadTask.snapshot.downloadURL;

        })
})


function createSong(){
                    let currentUser= JSON.parse(localStorage.getItem("user"))
                    let songName= $("#InputNameSong").val()
                    let artist= $("#InputArtist").val()
                    let lyrics= $("#InputLyrics").val()
                    let category= $("input[type= radio]:checked").val()
                    let image= $("#image").val()
                    let path= downloadURL
                    let newSong= {
                        name: songName,
                        artist: artist,
                        lyrics: lyrics,
                        categories: [{id:category}],
                        picture: image,
                        path: path,
                        user: {id:currentUser.id}
                    }

                    $.ajax({
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + currentUser.token
                        },
                        type: "POST",
                        url: "http://localhost:8080/api/song",
                        data: JSON.stringify(newSong),
                        success: function (data){
                            console.log(data.message)
                            if(data.message === "Created Song Successfully!"){
                                $("#createSuccess").modal("show")
                                resetCreatePage()
                            }else{
                                $("#createFail").modal("show")
                            }


                        }


                    })

                }

function resetCreatePage(){
    $('#InputNameSong').val('')
    $('#InputArtist').val('')
    $('#InputLyrics').val('')
    $('input[type= radio]').prop('checked',false)
    $('#image').val('')
}

function closeCreateSuccess(){
    $("#createSuccess").modal("hide")
}

function closeCreateFail(){
    $("#createFail").modal("hide")
}
