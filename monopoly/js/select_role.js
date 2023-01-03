$(document).ready(function() {
    let r1 = "掛角";
    let r2 = "莯沐";
    let r3 = "特雷文";
    let r4 = "陳冠宇";
    let r5 = "林夏在";
    let r6 = "葡萄";
    let r7 = "希椏";
    let r8 = "不會冷";
    let correctRole = 0;

    $("#r1").click(function() {
        $("#list_check_role").html("你選擇的是："+r1);
        correctRole = 1;
    });
    $("#r2").click(function() {
        $("#list_check_role").html("你選擇的是："+r2);
        correctRole = 2;
    });
    $("#r3").click(function() {
        $("#list_check_role").html("你選擇的是："+r3);
        correctRole = 3;
    });
    $("#r4").click(function() {
        $("#list_check_role").html("你選擇的是："+r4);
        correctRole = 4;
    });
    $("#r5").click(function() {
        $("#list_check_role").html("你選擇的是："+r5);
        correctRole = 5;
    });
    $("#r6").click(function() {
        $("#list_check_role").html("你選擇的是："+r6);
        correctRole = 6;
    });
    $("#r7").click(function() {
        $("#list_check_role").html("你選擇的是："+r7);
        correctRole = 7;
    });
    $("#r8").click(function() {
        $("#list_check_role").html("你選擇的是："+r8);
        correctRole = 8;
    });
    $("#btn_check_role").click(function() {
        $.ajax({
            url: '../php/select_role.php',
            type: "POST",
            data: { "character_id": correctRole},
            success: function(result) {
                try{
                    let res = JSON.parse(result);
                
                    let win_percent = (res['win'] / res['win'] + res['lost']);
                    if(isNaN(win_percent))
                        win_percent = 0;

                    window.sessionStorage.setItem("img", res['img']);
                    window.sessionStorage.setItem("character_name", res['character_name']);
                    window.sessionStorage.setItem("player_id", res['player_id']);
                    window.sessionStorage.setItem("player_name", res['player_name']);
                    window.sessionStorage.setItem("win", res['win']);
                    window.sessionStorage.setItem("lost", res['lost']);
                    window.sessionStorage.setItem("win_percent", win_percent.toString() + " %");

                    document.location.href = "player_info.html";
                }catch(e){
                    console.log(result);
                    swal("請選擇一個角色", "", "error");
                } 
            },
            error: function(result) {
                let res = JSON.parse(result);
                console.log(res.state + ' ' + res.message);
            }
        });
        
    });
});
