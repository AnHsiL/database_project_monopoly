$(document).ready(function() {
    display();
    $("#del_btn").click(function(){ del(); })
    $("#btn_logout").click(function(){
        $.post("../php/logout.php", null, function(data, status) {
            alert("以登出，請重新登入");
            document.location.href = "index.html";
        });
    });
});

function del(){
    let player_id = [];
    $('input[type=checkbox]:checked').each(function(){
        //console.log($(this).val());
        player_id.push($(this).val());
    });
    console.log(player_id);
    $.ajax({
        url: '../php/delPlayer.php',
        type : "POST",
        data : {"del_arr" : player_id},
    })
    .done(function(data){
        location.reload();
    })
}

function display() {
    $.ajax({
        url: '../php/viewAllPlayer.php',

        success: function(result) {
            let objs = JSON.parse(result);
            if (objs.state != 200) {
                console.log("fetch viewAllPlayer.php failed");
                console.log(objs.state + ' ' + objs.message);
                return;
            }
            for (let i = 0; i < objs.data.length; i++) {
                let objContext = objs.data[i];

                let tr = document.createElement("tr");

                let input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                input.setAttribute("name", "cancel");
                input.setAttribute("value", objContext.id);

                let td1 = document.createElement("td");
                td1.setAttribute("id", "check");
                let td2 = document.createElement("td");
                td2.appendChild(document.createTextNode(objContext.id));
                let td3 = document.createElement("td");
                td3.appendChild(document.createTextNode(objContext.identity));
                let td4 = document.createElement("td");
                td4.appendChild(document.createTextNode(objContext.name));
                let td5 = document.createElement("td");
                td5.appendChild(document.createTextNode(objContext.character_id));
                let td6 = document.createElement("td");
                td6.appendChild(document.createTextNode(objContext.win));
                let td7 = document.createElement("td");
                td7.appendChild(document.createTextNode(objContext.lost));

                td1.appendChild(input);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);

                document.getElementById("display").appendChild(tr);
            }
        },
    });
}

