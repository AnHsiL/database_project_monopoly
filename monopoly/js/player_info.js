$(document).ready(function() {
    var win = parseInt(sessionStorage.getItem("win"));
    var lost = parseInt(sessionStorage.getItem("lost"));
    var win_percent = Math.round(win / (win + lost) *1000)/10;
    
    $("#player_id").html(sessionStorage.getItem("player_id"));
    $("#player_name").html(sessionStorage.getItem("player_name"));
    $("#win_count").html(win);
    $("#lose_count").html(lost);
    if(win / (win + lost))
        $("#win_percent").html(String(win_percent)+"%");
    else
        $("#win_percent").html(0+"%");
    $("#charactor_name").html(sessionStorage.getItem("character_name"));
    $("#img").html("<img src = '../character_png/" + sessionStorage.getItem("img") + ".gif' alt = '角色照片'>");

    $("#btn_begin_game").click(function(){ document.location.href = "map.html"; });
    $("#btn_logout").click(function(){
        $.post("../php/logout.php", null, function(data, status) {
            swal.fire({
                text: "已登出，請重新登入",
                confirmButtonColor: 'rgb(123, 171, 231)',
                icon: "warning"
            }).then(()=>{
                document.location.href = "index.html";
            });
        });
    });
});
