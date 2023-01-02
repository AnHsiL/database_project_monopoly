$(document).ready(function() {
    $("#player_id").html(window.sessionStorage.getItem("player_id"));
    $("#player_name").html(window.sessionStorage.getItem("player_name"));
    $("#win_count").html(window.sessionStorage.getItem("win"));
    $("#lose_count").html(window.sessionStorage.getItem("lost"));
    $("#win_percent").html(window.sessionStorage.getItem("win_percent"));
    $("#charactor_name").html(window.sessionStorage.getItem("charactor_name"));
    $("#img").html("<img src = '../character_png/" + window.sessionStorage.getItem("img") + ".gif' alt = '角色照片'>");

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
