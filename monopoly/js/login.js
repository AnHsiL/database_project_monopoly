$(document).ready(function() {
    $("#btn_login").click(function() {
        login($('#player_id').val(), $("#password").val());
    });
    $("#btn_register_submit").click(function() {
        if($('#regPlayer_id').val() == "" || $('#regName').val() == "" || $('#regPwd').val() == "" || $('#checkPwd').val() == "")
            swal("每格皆須輸入", "", "error");
        else
            register($('#regPlayer_id').val(), $('#regName').val(), $('#regPwd').val(), $('#checkPwd').val());
    });    
    $("#btn_request_register").click(function(){
        document.location.href = "register.html";
    });
    $("#btn_back").click(function(){
        document.location.href = "login.html";
    });
});
function login(player_id, password) {
    $.ajax({
        url: '../php/login.php',
        type: "POST",
        data: { "player_id": player_id, "password": password },
        success: function(result) {
            console.log(result);
            let res = JSON.parse(result);
            if (res.state == 200) {
                if(res.identity == 1){
                    swal({
                        title: "登入成功",
                        text: "",
                        icon: "success",
                    }).then(function () {
                        document.location.href = "select_role.html"
                    })
                }else{
                    swal({
                        title: "登入成功",
                        text: "",
                        icon: "success",
                    }).then(function () {
                        document.location.href = "viewAllPlayer.html"
                    })
                }
                
            } 
            else
                swal("登入失敗，請檢查帳號密碼", "", "error");
        },
        error: function(result) {
            let res = JSON.parse(result);
            console.log(res.state + ' ' + res.message);
            swal("登入失敗，請檢查帳號密碼", "", "error");
        }
    });
}

function register(player_id, player_name, password, checkPassword) {
    if (password == checkPassword) {
        $.ajax({
            url: '../php/register.php',
            type: 'POST',
            data: { "player_id": player_id, "password": password, "player_name" : player_name },
            success: function(result) {
                console.log(result);
                let res = JSON.parse(result);
                if (res.state == 200) {
                    swal({
                        title: "註冊成功",
                        text: "",
                        icon: "success",
                    }).then(function () {
                        document.location.href = "login.html"
                    })
                } 
                else if (res.state == 409)
                    swal("使用者名稱已存在", "", "error")
                else 
                    swal("註冊失敗", "", "error");
            },
            error: function(result) {
                let res = JSON.parse(result);
                console.log(res.state + ' ' + res.message);
                swal("註冊失敗", "", "error");
            }
        });
    } 
    else 
        swal("密碼與確認密碼不同", "", "error");
}

