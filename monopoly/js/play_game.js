let space = [
    [990, 530],[880, 530],[770, 530],[660, 530],[550, 530],[440, 530],[330, 530], [220, 530],
    [220, 470],[220, 410],[220, 350],[220, 290],[220, 230], [220, 170],[220, 110],[220, 50],[220, 0],
    [330, 0],[440, 0],[550, 0],[660, 0],[770, 0],[880, 0],[990, 0],[1100, 0],
    [1100, 50],[1100, 110],[1100, 170],[1100, 230],[1100, 290],[1100, 350],[1100, 410],[1100, 470],[1100, 530]
];

let owner_grade = [
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 
    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, 

    {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}, {owner: "無", grade: 1}
]

// let paymentRate = 0.7;          // 過路費比率
// let upgradeRate = 1.5;          // 升級比率
let passStartMoney = 100000;    // 經過原點的錢

var player = {
    name: "player",
    location: 0,
    asset: 8000000,     //  初始資金 = 8000000
    house: [],
    stopTurn: 0,        // 暫停的回合數
}
var computer = {
    name: "computer",
    location: 0,
    asset: 8000000,     //  初始資金 = 8000000
    house: [],
    stopTurn: 0,        // 暫停的回合數
}

var isComputerTurn = false;

$(document).ready(function() {
    player.location = 0;
    $("#img_dice").click(function(){
        console.log("start");
        gameStart();
    });
    $("#btn_exit_game").click(function(){
        gameTerminate();
    });
    $("#player1").click(function(){
        let b = '<div class="alert alert-info alert-dismissible " style = "width:500px;height:300px;z-index:4; text-align: left;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        content = b+ "player: <br><br><em>財產</em>&nbsp;:&nbsp;&nbsp;" + player.asset + "萬<br><em>名下房地產</em>&nbsp;:&nbsp;&nbsp;<br>";
        for(let i = 0; i < player.house.length; i++) content +=  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + player.house[i] + "<br>";
        content += "</div>";
        $("#player1_info").html(content);
    });
    $("#player2").click(function(){
        let b = '<div class="alert alert-info alert-dismissible " style = "width:500px;height:300px;z-index:4; text-align: left;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        content = b+ "computer: <br><br><em>財產</em>&nbsp;:&nbsp;&nbsp;" +  + computer.asset + "萬<br><em>名下房地產</em>&nbsp;:&nbsp;&nbsp;<br>";
        for(let i = 0; i < computer.house.length; i++) content +=  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + computer.house[i] + "<br>";
        content += "</div>";
        $("#player2_info").html(content);
    });
});

function gameStart(){
    if(isComputerTurn){
        swal.fire({
            text: "電腦的回合",
            confirmButtonColor: 'rgb(123, 171, 231)'
        }).then(() => {
            computer.location = computerMove(rollongDice());
        });
        setTimeout(function() {
            blockAction(computer.location, 'C');
        }, 3900);
    }
    else {
        swal.fire({
            text: "玩家的回合",
            confirmButtonColor: 'rgb(123, 171, 231)'
        }).then(() => {
            player.location = playerMove(rollongDice());
        });
        setTimeout(function() {
            blockAction(player.location, 'P');
        }, 3900);
    }
}
function rollongDice(){
    var rollongStep = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".pic_dice").setAttribute("src", "../dice_png/dice.gif");
    setTimeout(function(){
        document.querySelector(".pic_dice").setAttribute("src", "../dice_png/" + rollongStep + ".png");
    }, 1000);
    return rollongStep;
}
function playerMove(step){
    if(!computer.stopTurn) isComputerTurn = true;
    else computer.stopTurn--;

    for(let i = player.location; i < step + player.location; i++){
        setTimeout(function(){ 
            $("#game_character").animate({top:space[i][1], left:space[i][0]}, "slower");
        }, 1500 + 100 * (i - player.location));
    }

    if(step + player.location >= space.length){
        var nStep = (step + player.location) % space.length;
        for(let i = player.location; i < (step + player.location)-space.length; i++){
            setTimeout(function(){ 
                $("#game_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * (i - player.location));
        }
        swal.fire({
            title: "發錢啦!",
            text: "經過原點獎勵 "+passStartMoney+" 元"
        }).then(()=>{
            player.asset += passStartMoney;
            for(let i = 0; i < nStep; i++){
                setTimeout(function(){ 
                    $("#game_character").animate({top:space[i][1], left:space[i][0]}, "slower");
                }, 1500 + 100 * i);
            }
        });
        return nStep;
    }
    return (player.location + step) % space.length;
}
function computerMove(step){
    if(!player.stopTurn) isComputerTurn = false;
    else player.stopTurn--;

    for(let i = computer.location; i < step + computer.location; i++){
        setTimeout(function(){ 
            $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
        }, 1500 + 100 * (i - computer.location));
    }

    if(step + computer.location >= space.length){
        var nStep = (step + computer.location) % space.length;
        for(let i = computer.location; i < (step + computer.location)-space.length; i++){
            setTimeout(function(){ 
                $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * (i - computer.location));
        }
        computer.asset += passStartMoney;
        for(let i = 0; i < nStep; i++){
            setTimeout(function(){ 
                $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * i);
        }
        return nStep;
    }
    return (computer.location + step) % space.length;
}
function blockAction(blockLocation, who){

    $.ajax({
        url: "../php/getMapInfo.php",
        type: "POST",
        data: {
            id: blockLocation+1
        },
        success: function(res) {
            console.log("kk " + blockLocation);
            res = JSON.parse(res);
            if (res.state == 200) {
                if(notHaveOwner(res.data)){
                    if(who == 'P'){
                        swal.fire({
                            title: "是否要購買?",
                            text: "名稱:  "+ res.data.name +"，價值: " + res.data.price,
                            confirmButtonText: '是',
                            confirmButtonColor: 'rgb(105, 187, 183)',
                            showCancelButton: true,
                            cancelButtonText: '否',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                if(isAssetLargerThan(player, res.data.price))
                                    trade(player, res.data);
                                else {
                                    swal.fire({
                                        title: "金額不足以購買",
                                        icon: "error"
                                    })
                                }
                            } 
                        });    
                    }else{
                        if(isAssetLargerThan(computer, res.data.price)) trade(computer, res.data); 
                    }
                }
                else if(who=='P' && isMyBlock(player, res.data)){
                    swal.fire({
                        title: "是否要升級?",
                        html: '<p style="text-align: left; font-size: 1em; padding:10px" >\
                            名稱:&nbsp;"'+ res.data.name + '<br>\
                            當前土地等級:&nbsp;'+ owner_grade[res.data.map_id-1].grade + '<br>\
                            當前土地價值:&nbsp;'+ res.data.price + '<br>\
                            升級費用為:&nbsp;" '+ res.data.upgradeRate +'<br>\
                        </p>',
                        confirmButtonText: '是',
                        confirmButtonColor: 'rgb(105, 187, 183)',
                        showCancelButton: true,
                        cancelButtonText: '否',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if(isAssetLargerThan(player, res.data.upgradeRate)) upgrade(player, res.data);
                            else {
                                swal.fire({
                                    title: "金額不足以升級",
                                    icon: "error"
                                })
                            }
                        } 
                    });    
                }
                else if(who=='C' && isMyBlock(computer, res.data)){
                    if(isAssetLargerThan(computer, res.data.upgradeRate)) upgrade(computer, res.data);
                }
                else if(who=='P' && isRivalBlock(computer, res.data)){
                    swal.fire({
                        text: player.name + "付過路費 " + parseInt(res.data.paymentRate * owner_grade[res.data.map_id-1].grade) +" 元給computer",
                    }).then(() => {
                        payMoney(player, res.data);
                        checkwin();
                    });
                }
                else if( who=='C' && isRivalBlock(player, res.data)){
                    swal.fire({
                        text: computer.name + "付過路費 " + parseInt(res.data.paymentRate * owner_grade[res.data.map_id-1].grade) +" 元給player",
                    }).then(() => {
                        payMoney(computer, res.data);
                        checkwin();
                    });
                }    
            }
        }
    });    
}
function notHaveOwner(currLocation){
    console.log("notHaveOwner: " + currLocation.name);
    return (owner_grade[currLocation.map_id-1].owner == "無" 
        && currLocation.name != "可愛的家"
        && currLocation.name != "飲料店"
        && currLocation.name != "休息一下"
        && currLocation.name != "Start"
    );
}
function isMyBlock(owner , currLocation){
    console.log("isMyBlock: now=" + owner_grade[currLocation.map_id-1].owner + " check " + owner.name);
    return owner_grade[currLocation.map_id-1].owner == owner.name;
}
function isRivalBlock(owner , currLocation){
    console.log("currLocation: " + owner_grade[currLocation.map_id-1].owner + " who: " +owner.name);
    return (owner_grade[currLocation.map_id-1].owner == owner.name
        && owner_grade[currLocation.map_id-1].owner != "無"
        && currLocation.name != "可愛的家"
        && currLocation.name != "飲料店"
        && currLocation.name != "休息一下"
        && currLocation.name != "Start"
    );
}
function trade(trader, currLocation){
    console.log(trader.name +  " buy " + currLocation.name);
    trader.asset -= currLocation.price;
    owner_grade[currLocation.map_id-1].owner = trader.name;
    trader.house.push(currLocation.name);
    swal.fire("Successfully purchase!!!","Your remain property is " + player.asset + "萬", "success");
}
function upgrade(trader, currLocation){
    trader.asset -= parseInt(currLocation.upgradeRate * owner_grade[currLocation.map_id-1].grade);
    owner_grade[currLocation.map_id-1].grade++;
    swal.fire("Successfully upgrade!!!","Your remain property is " + player.asset + "萬", "success");
}
function payMoney(trader, currLocation){
    if(trader == player){
        player.asset -= parseInt(currLocation.paymentRate * owner_grade[currLocation.map_id-1].grade);
        computer.asset += parseInt(currLocation.paymentRate * owner_grade[currLocation.map_id-1].grade);
    }
    else if(trader == computer){
        computer.asset -= parseInt(currLocation.paymentRate * owner_grade[currLocation.map_id-1].grade);
        player.asset += parseInt(currLocation.paymentRate * owner_grade[currLocation.map_id-1].grade);
    }
}
function isAssetLargerThan(person, num){
    return person.asset >= num;
}
function checkwin(){
    if(player.asset < 0){
        swal.fire({
            imageUrl: "../img/lose.png",
            imageWidth: 500,
            imageHeight: 300,
            confirmButtonText: '繼續遊戲',
            confirmButtonColor: 'rgb(246, 147, 140)',
            showCancelButton: true,
            cancelButtonText: '離開',
            background: "rgba(218, 234, 221, 0.858)",
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }else{
                document.location.href = "../html/player_info.html";
            }
        });
    }
    else if(computer.asset < 0){
        swal.fire({
            imageUrl: "../img/win.gif",
            imageWidth: 500,
            imageHeight: 300,
            confirmButtonText: '繼續遊戲',
            confirmButtonColor: 'rgb(246, 147, 140)',
            showCancelButton: true,
            cancelButtonText: '離開',
            background: "rgba(218, 234, 221, 0.858)",
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }else{
                document.location.href = "../html/player_info.html";
            }
        });
    }
}
function gameTerminate(){
    swal.fire({
        text: "確定要離開嗎?",
        confirmButtonText: '確認',
        confirmButtonColor: 'rgb(246, 147, 140)',
        showCancelButton: true,
        cancelButtonText: '取消',
    }).then((result) => {
        if (result.isConfirmed) {
            document.location.href = "../html/player_info.html";
        }
    });
}