function toSearchSongPage(){
    let keyword= $("#keyword").val()
    window.localStorage.setItem("keyword",keyword);
    window.location.href= "/userHome/searchPage.html"
}
function listSearchSong(){
    let currentUser= JSON.parse(localStorage.getItem("user"))
    let keyword= localStorage.getItem("keyword")
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
                console.log(data)
                let listSong= ''
                for (let i=0; i< data.length; i++){
                    listSong += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                        '            <div class="ms-2 me-auto">\n' +
                        '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                        '                \n' +
                        '            </div>\n' +
                        '        <audio style="width: 80%;" controls><source src="'+ data[i].path +' "></audio>\n' +
                        '            <button onclick="doLike_Dislike(' + data[i].id + ')" style="font-size:24px"><i class="fa fa-heart-o"></i></button>\n' +
                        '        </li>'
                }
                document.getElementById("listSearchSong").innerHTML= listSong
            }
        })
    }else{
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            },
            type: "GET",
            url: "https://casestudy4.herokuapp.com/api/song/search/" + keyword,
            success: function (data){
                console.log(data)
                let listSong= ''
                for (let i=0; i< data.length; i++){
                    listSong += '<li class="list-group-item d-flex justify-content-between align-items-start">\n' +
                        '            <div class="ms-2 me-auto">\n' +
                        '                <div class="fw-bold">'+ data[i].name +'</div>\n' + data[i].artist +
                        '                \n' +
                        '            </div>\n' +
                        '        <audio style="width: 80%;" controls><source src="'+ data[i].path +' "></audio>\n' +
                        '            <button onclick="doLike_Dislike(' + data[i].id + ')" style="font-size:24px"><i class="fa fa-heart-o"></i></button>\n' +
                        '        </li>'
                }
                document.getElementById("listSearchSong").innerHTML= listSong
            }
        })
    }


    window.localStorage.removeItem("keyword")
    event.preventDefault()
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



listSearchSong()
