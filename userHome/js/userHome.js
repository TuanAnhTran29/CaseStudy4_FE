function showListSong(){
    let currentUser= JSON.parse(localStorage.getItem("user"))

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
                listSong+= '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                    '            <div class="ms-2 me-auto">\n' +
                    '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                    '                \n' +
                    '            </div>\n' +
                    '            <button onclick="backwardSong('+ i +')">\n' +
                    '                <img src="https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/backward.svg" alt="Backward">\n' +
                    '            </button>'+
                    '            <button onclick="forwardSong('+ i +')">\n' +
                    '                <img src="https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/forward.svg" alt="Forward">\n' +
                    '            </button>'+
                    '            <audio style="width: 80%" controls><source src="'+ data[i].path +' "></audio>\n' +
                    '                <button onclick="doLike_Dislike(' + data[i].id + ')" style="font-size:24px;background-color: white "><i class="fa fa-heart-o"></i></button>\n' +

                    '       </li>'
            }
            document.getElementById("listSong").innerHTML= listSong
        }
    })
}

function doLike_Dislike(id){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    console.log("clicked")
    let heart= $(this)
    let message= {
        "message": "do like"
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/like_dislike/dolike_dislike/" + id + "/" + currentUser.id,

    })
}

showListSong()


function backwardSong(index){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "https://casestudy4.herokuapp.com/api/song/backward/" + index,
        success: function (data){
            data.play();
        }
    })
}
