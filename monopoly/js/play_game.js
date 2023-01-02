let space = [
    [990, 530],[880, 530],[770, 530],[660, 530],[550, 530],[440, 530],[330, 530], [220, 530],
    [220, 470],[220, 410],[220, 350],[220, 290],[220, 230], [220, 170],[220, 110],[220, 50],[220, 0],
    [330, 0],[440, 0],[550, 0],[660, 0],[770, 0],[880, 0],[990, 0],[1100, 0],
    [1100, 50],[1100, 110],[1100, 170],[1100, 230],[1100, 290],[1100, 350],[1100, 410],[1100, 470],[1100, 530]
];

let paymentRate = 0.7;          // 過路費比率
let upgradeRate = 1.5;          // 升級比率
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
    // setMapInfo();
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
            computerAction(computer.location);
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
            playerAction(player.location);
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
        swal.fire({
            text: "電腦經過原點獲得 "+ passStartMoney +" 元"
        }).then(()=>{
            computer.asset += 50000;
            for(let i = 0; i < nStep; i++){
                setTimeout(function(){ 
                    $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
                }, 1500 + 100 * i);
            }
        });
        return nStep;
    }
    return (computer.location + step) % space.length;
}
function playerAction(blockLocation){
    $.ajax({
        url: "../php/getMapInfo.php",
        type: "POST",
        data: {
            id: blockLocation+1
        },
        success: function(map){
            console.log("[succ] get map data of block " + blockLocation);
            map = JSON.parse(map);
            console.log("map.data = " + map.data.name);

            if(map.data.name == "可愛的家"){        // 可愛的家

            }
            else if(map.data.name == "飲料店"){     // 飲料店
        
            }
            else if(map.data.name == "休息一下"){   // 休息一下: 下回合休息
                player.stopTurn ++;
                swal.fire({
                    title: map.data.name,
                    html: '<p>'+ map.data.discription +'</p>\
                            <img src="../map_png/'+map.data.name+'.png"; style="width:250px; height:250px">\
                            <p style="text-align: center; font-size: 1em; padding:10px" >\
                                休息一下吧~ (休息一回合)<br>\
                            </p>',
                    confirmButtonColor: 'rgb(105, 187, 183)',
                    timer: 5000,
                });
            }
            else if(notHaveOwner(map.data)){               // 無主地: 可購買
                swal.fire({
                    title: "是否要購買?",
                    html: '<p>名稱:  '+ map.data.name +'，價值: ' + map.data.price + ' </p>\
                            <img src="../map_png/'+map.data.name+'.png" style="width:50%; ">\
                            <p style="font-size: 0.8em">目前剩餘財產:&nbsp;'+ player.asset +'&nbsp;元</p>',
                    confirmButtonText: '是',
                    confirmButtonColor: 'rgb(105, 187, 183)',
                    showCancelButton: true,
                    cancelButtonText: '否',
                    width: "30%"
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(isAssetLargerThan(player, map.data.price))
                            trade(player, map.data);
                        else {
                            swal.fire({
                                text: "金額不足以購買",
                                icon: "error",
                                confirmButtonColor: 'rgb(123, 171, 231)',
                            })
                        }
                    } 
                }); 
            }
            else if(isMyBlock(player, map.data)){          // 自己的地: 可升級
                swal.fire({
                    title: "是否要升級?",
                    html: '<p style="text-align: left; font-size: 1em; padding:10px" >\
                        名稱:&nbsp;"'+ map.data.name + '<br>\
                        當前土地等級:&nbsp;'+ map.data.grade + '<br>\
                        當前土地價值:&nbsp;'+ map.data.price + '<br>\
                        升級費用為:&nbsp;" '+ map.data.price * upgradeRate +'</p>\
                        <p style="font-size: 0.8em">目前剩餘財產:&nbsp;'+ player.asset +'&nbsp;元</p>',
                    confirmButtonText: '是',
                    confirmButtonColor: 'rgb(105, 187, 183)',
                    showCancelButton: true,
                    cancelButtonText: '否',
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(isAssetLargerThan(player, map.data.price * upgradeRate))
                            upgrade(player, map.data);
                        else {
                            swal.fire({
                                text: "金額不足以升級",
                                icon: "error",
                                confirmButtonColor: 'rgb(123, 171, 231)',
                            })
                        }
                    } 
                });
            }
            else if(isRivalBlock(player, map.data)){
                swal.fire({
                    text: player.name + " 付過路費 " + parseInt(map.data.price * paymentRate * asset[blockLocation].grade) + " 元給 " + computer.name,
                }).then(() => {
                    payMoney(player, map.data);
                    checkwin();
                });
            }   
        },
        error(err){
            console.log("[err] cannot get map data of block "+ blockLocation);
            console.log(err);
        }
    });
}
function computerAction(blockLocation){
    $.ajax({
        url: "../php/getMapInfo.php",
        type: "POST",
        data: {
            id: blockLocation+1
        },
        success: function(map){
            console.log("[succ] get map data of block " + blockLocation);
            map = JSON.parse(map);
            if(map.data.name == "可愛的家"){        // 可愛的家

            }
            else if(map.data.name == "飲料店"){     // 飲料店
        
            }
            else if(map.data.name == "休息一下"){   // 休息一下: 下回合休息
                computer.stopTurn ++;
                swal.fire({
                    text: computer.name + " 休息一回合",
                    confirmButtonColor: 'rgb(105, 187, 183)',
                    timer: 5000,
                });
            }
            else if(notHaveOwner(map.data)){               // 無主地: 可購買
                if(isAssetLargerThan(computer, map.data.price)) {
                    trade(computer, map.data); 
                    swal.fire({
                        text: computer.name + " 購買了" + map.data.name ,
                        confirmButtonColor: 'rgb(105, 187, 183)',
                    });  
                }
            }
            else if(isMyBlock(player, map.data)){          // 自己的地: 可升級
                if(isAssetLargerThan(computer, map.data.price * upgradeRate)){
                    upgrade(computer, map.data);
                    swal.fire({
                        text: computer.name + " 升級了" + map.data.name,
                        confirmButtonColor: 'rgb(105, 187, 183)',
                    });  
                } 
            }
            else if(isRivalBlock(player, map.data)){
                swal.fire({
                    text: computer.name + " 付過路費 " + parseInt(asset[blockLocation].price * paymentRate * asset[blockLocation].grade) +" 元給 "+ player.name,
                }).then(() => {
                    payMoney(computer, map.data);
                    checkwin();
                });
            }   
        },
        error(err){
            console.log("[err] cannot get map data of block "+ blockLocation);
            console.log(err);
        }
    });
}
function notHaveOwner(mapData){
    console.log("[notHaveOwner]: " + mapData.name);
    return (mapData.owner == "無" 
        && mapData.name != "可愛的家"
        && mapData.name != "飲料店"
        && mapData.name != "休息一下"
        && mapData.name != "Start"
    );
}
function isMyBlock(owner , mapData){
    console.log("[isMyBlock]: " + mapData.name);
    return mapData.owner == owner.name;
}
function isRivalBlock(owner , mapData){
    console.log("[currLocation]: " + mapData.owner + " who: " +owner.name);
    return (mapData.owner != owner.name
        && mapData.owner != "無"
        && mapData.name != "可愛的家"
        && mapData.name != "飲料店"
        && mapData.name != "休息一下"
        && mapData.name != "Start"
    );
}
function trade(trader, mapData){
    console.log("[trade]: " + trader.name +  " buy " + mapData.name);
    trader.asset -= mapData.price;
    mapData.owner = trader.name;
    trader.house.push(mapData.name);
    $.ajax({
        url: "../php/updateMapInfo.php",
        type: "POST",
        data: mapData,
        success: function(){
            if(trader == player)
                swal.fire("購買成功!!!","當前剩餘財產為 " + trader.asset + "元", "success");
        },
        error: function(err){
            console.log("[err] trade");
            console.log(err);
        }
    });
}
function upgrade(trader, mapData){
    trader.asset -= parseInt(mapData.price * upgradeRate * mapData.grade);
    mapData.grade++;
    $.ajax({
        url: "../php/updateMapInfo.php",
        type: "POST",
        data: mapData,
        success: function(){
            swal.fire("升級成功!!!","當前剩餘財產為 " + player.asset + "元", "success");
        },
        error: function(err){
            console.log("[err] trade");
            console.log(err);
        }
    });
}
function payMoney(trader, mapData){
    if(trader == player){
        player.asset -= parseInt(mapData.price * paymentRate * mapData.grade);
        computer.asset += parseInt(mapData.price * paymentRate * mapData.grade);
    }
    else if(trader == computer){
        computer.asset -= parseInt(mapData.price * paymentRate * mapData.grade);
        player.asset += parseInt(mapData.price * paymentRate * mapData.grade);
    }
}
function isAssetLargerThan(person, num){
    return person.asset >= num;
}
function checkwin(){
    if(player.asset < 0){
        swal.fire({
            imageUrl: "../img/lose.png",
            imageWidth: 1200,
            imageHeight: 300,
            confirmButtonText: '繼續遊戲',
            confirmButtonColor: 'rgb(246, 147, 140)',
            showCancelButton: true,
            cancelButtonText: '離開',
            width: "50%"
        }).then((result) => {
            if (result.isConfirmed) 
                location.reload();
            else
                document.location.href = "../html/player_info.html";
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
            if (result.isConfirmed) 
                location.reload();
            else
                document.location.href = "../html/player_info.html";
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
        if (result.isConfirmed) 
            document.location.href = "../html/player_info.html";
    });
}