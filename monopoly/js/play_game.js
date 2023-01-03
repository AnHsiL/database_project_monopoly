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
];

let paymentRate = 0.7;          // 過路費比率
let upgradeRate = 1.5;          // 升級比率
let passStartMoney = 1000000;    // 經過原點的錢
let chanceMoney = 5000000;       // 機會獎勵金
let countOfBlock = 34;

var player = {
    name: sessionStorage.getItem("player_name"),
    location: 0,
    asset: 18000000,     //  初始資金 = 8000000
    house: [],
    stopTurn: 0,        // 暫停的回合數
}
var computer = {
    name: "computer",
    location: 0,
    asset: 18000000,     //  初始資金 = 8000000
    house: [],
    stopTurn: 0,        // 暫停的回合數
}

var isComputerTurn = false;
var CanClickChance = true;

$(document).ready(function() {
    player.location = 0;
    document.querySelector("#game_character").setAttribute("src", "../character_png/" + sessionStorage.getItem("img") + ".gif");
    setMapInfo();
    $("#img_dice").click(function(){
        console.log("start");
        gameStart();
    });
    $("#btn_exit_game").click(function(){
        gameTerminate();
    });
    $("#player1").click(function(){
        let b = '<div class="alert alert-info alert-dismissible " style = "width:500px;height:300px;z-index:4; text-align: left;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        content = b+ player.name + ": <br><br><em>財產</em>&nbsp;:&nbsp;&nbsp;" + player.asset + "元<br><em>名下房地產</em>&nbsp;:&nbsp;&nbsp;<br>";
        for(let i = 0; i < player.house.length; i++) content +=  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + player.house[i] + "<br>";
        content += "</div>";
        $("#player1_info").html(content);
    });
    $("#player2").click(function(){
        let b = '<div class="alert alert-info alert-dismissible " style = "width:500px;height:300px;z-index:4; text-align: left;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        content = b+ "computer: <br><br><em>財產</em>&nbsp;:&nbsp;&nbsp;" +  + computer.asset + "元<br><em>名下房地產</em>&nbsp;:&nbsp;&nbsp;<br>";
        for(let i = 0; i < computer.house.length; i++) content +=  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + computer.house[i] + "<br>";
        content += "</div>";
        $("#player2_info").html(content);
    });
    $("#btn_chance").click(function(){
        if(CanClickChance) {
            swal.fire({
                title: "機會",
                html: '<p><strong>來而不可失者，時也; 蹈而不可失者，機也。</strong></p><p style="font-size:0.8em;">機會只有一次，可以貢獻題目以獲得獎勵金"'+chanceMoney+'"元</p><p>確定要使用嗎?</p>',
                confirmButtonText: '是',
                confirmButtonColor: 'rgb(105, 187, 183)',
                showCancelButton: true,
                cancelButtonText: '否',
                icon: "info",
            }).then((result) => {
                if (result.isConfirmed) {
                    addNewQuestion();
                } 
            }); 
        }
        else swal.fire("", "機會只有一次，不要太貪心喔", "warning");
    });

});
function setMapInfo(){
    for(let i = 0; i < countOfBlock; i++){
        $("#block_"+i).click(function(){
            console.log("[chk] #block_"+i+" is clicked");
            $.ajax({
                url: "../php/getMapInfo.php",
                type: "POST",
                data: {
                    id: i+1
                },
                success: function(res) {
                    res = JSON.parse(res);
                    if(res.data.name == "Start"){
                        swal.fire({
                            title: res.data.name,
                            html: '<p>'+ res.data.discription +'</p>\
                                    <img src="../map_png/'+res.data.name+'.png"; style="width:200px; height:120px">\
                                    <p style="text-align: center; font-size: 1em; padding:10px" >\
                                        經過可獲得&nbsp'+passStartMoney+'&nbsp元 <br>\
                                    </p>',
                            confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                            timer: 5000,
                            background: "rgba(230, 245, 230, 0.9)",
                        });
                    }
                    else if(res.data.name == "可愛的家"){
                        swal.fire({
                            title: res.data.name,
                            html: '<p>'+ res.data.discription +'</p>\
                                    <img src="../map_png/'+res.data.name+'.png"; style="width:250px; height:250px">\
                                    <p style="text-align: center; font-size: 1em; padding:10px" >\
                                        (說明)<br>\
                                    </p>',
                            confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                            timer: 5000,
                            background: "rgba(230, 245, 230, 0.9)",
                        });
                    }
                    else if(res.data.name == "飲料店"){
                        swal.fire({
                            title: res.data.name,
                            html: '<p>'+ res.data.discription +'</p>\
                                    <img src="../map_png/'+res.data.name+'.png"; style="width:250px; height:250px">\
                                    <p style="text-align: center; font-size: 1em; padding:10px" >\
                                        (說明)<br>\
                                    </p>',
                            confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                            timer: 3000,
                            background: "rgba(230, 245, 230, 0.9)",
                        });
                    }
                    else if(res.data.name == "休息一下"){
                        swal.fire({
                            title: res.data.name,
                            html: '<p>'+ res.data.discription +'</p>\
                                    <img src="../map_png/'+res.data.name+'.png"; style="width:250px; height:250px">\
                                    <p style="text-align: center; font-size: 1em; padding:10px" >\
                                        休息一下吧~ (休息一回合)<br>\
                                    </p>',
                            confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                            timer: 5000,
                            background: "rgba(230, 245, 230, 0.9)",
                        });
                    }
                    else{
                        console.log("[view] owner_grade["+i+"].owner = "+owner_grade[i].owner);
                        console.log("[view] owner_grade["+i+"].grade = "+owner_grade[i].grade);
                        swal.fire({
                            title: res.data.name,
                            html: '<p>'+ res.data.discription +'</p>\
                                    <img src="../map_png/'+res.data.name+'.png" style="float: left; width:50%; height:50%; ">\
                                    <p style="text-align: left; font-size: 1em; padding:5px; position: absolute; left: 55%; top: 35%;" >\
                                        擁有者:&nbsp;'+ owner_grade[i].owner + '<br>\
                                        當前土地等級:&nbsp;'+ owner_grade[i].grade + '<br>\
                                        當前土地價值:&nbsp;'+ (res.data.price * owner_grade[i].grade) + '<br>\
                                        應繳過路費:&nbsp;&nbsp;&nbsp;&nbsp;'+ parseInt(res.data.price * owner_grade[i].grade * paymentRate) + '<br>\
                                    </p>',
                            confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                            timer: 5000,
                            background: "rgba(230, 245, 230, 0.9)",
                        });
                    }
                },
                error:function(err){
                    console.log("[err] "+ err);
                }
            });
        });
    }
}
function gameStart(){
    if(isComputerTurn){
        swal.fire({
            text: "電腦的回合",
            confirmButtonColor: 'rgb(123, 171, 231)'
        }).then(() => {
            computer.location = computerMove(rollongDice());
        });
        setTimeout(function() {
            blockAction(computer.location, computer);
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
            blockAction(player.location, player);
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
            computer.asset += passStartMoney;
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
function blockAction(blockLocation, who){

    $.ajax({
        url: "../php/getMapInfo.php",
        type: "POST",
        data: {
            id: blockLocation+1
        },
        success: function(res) {
            console.log("[succ] get map data of block " + blockLocation);
            map = JSON.parse(res);
            if(map.data.name == "可愛的家"){        // 可愛的家

            }
            else if(map.data.name == "飲料店"){     // 飲料店
        
            }
            else if(map.data.name == "休息一下"){   // 休息一下: 下回合休息
                who.stopTurn++;
                if(who == player){
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
                else if(who == computer){
                    swal.fire({
                        text: computer.name + " 休息一回合",
                        confirmButtonColor: 'rgb(105, 187, 183)',
                        timer: 5000,
                    });
                }
            }
            else if(notHaveOwner(map.data, blockLocation)){               // 無主地: 可購買
                if(who == player){
                    swal.fire({
                        title: "是否要購買?",
                        html: '<p>名稱:  '+ map.data.name +'，價值: ' + map.data.price * owner_grade[blockLocation].grade + ' </p>\
                                <img src="../map_png/'+map.data.name+'.png" style="width:50%; ">\
                                <p style="font-size: 0.8em">目前剩餘財產:&nbsp;'+ player.asset +'&nbsp;元</p>',
                        confirmButtonText: '是',
                        confirmButtonColor: 'rgb(105, 187, 183)',
                        showCancelButton: true,
                        cancelButtonText: '否',
                        width: "30%"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if(isAssetLargerThan(player.asset, map.data.price))
                                trade(player, map.data, blockLocation);
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
                else if(who == computer){   // computer 預留 1/3 資產付過路費
                    if(isAssetLargerThan(computer.asset*2/3, map.data.price)) {
                        trade(computer, map.data, blockLocation); 
                        swal.fire({
                            text: computer.name + " 購買了" + map.data.name ,
                            confirmButtonColor: 'rgb(105, 187, 183)',
                        });  
                    }
                }
            }
            else if(isMyBlock(who, blockLocation)){          // 自己的地: 可升級
                var updatePrice = map.data.price * owner_grade[blockLocation].grade * upgradeRate;
                if (who == player){
                    swal.fire({
                        title: "是否要升級?",
                        html: '<p style="text-align: left; font-size: 1em; padding:10px" >\
                            名稱:&nbsp;"'+ map.data.name + '<br>\
                            當前土地等級:&nbsp;'+ owner_grade[blockLocation].grade + '<br>\
                            當前土地價值:&nbsp;'+ map.data.price * owner_grade[blockLocation].grade + '<br>\
                            升級費用為:&nbsp;" '+ updatePrice  +'</p>\
                            <p style="font-size: 0.8em">目前剩餘財產:&nbsp;'+ player.asset +'&nbsp;元</p>',
                        confirmButtonText: '是',
                        confirmButtonColor: 'rgb(105, 187, 183)',
                        showCancelButton: true,
                        cancelButtonText: '否',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if(isAssetLargerThan(player.asset, updatePrice))
                                upgrade(player, map.data, blockLocation);
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
                else if(who == computer){   // computer 預留 1/4 資產付過路費
                    if(isAssetLargerThan(computer.asset *3/4, updatePrice))
                        upgrade(computer, map.data, blockLocation);
                }
            }
            else if(isRivalBlock(who, map.data, blockLocation)){
                var payment = parseInt(map.data.price * paymentRate * owner_grade[blockLocation].grade);
                var rival = (who == player)? computer : player;
                
                swal.fire({
                    text: who.name + " 付過路費 " + payment + " 元給 " + rival.name,
                }).then(() => {
                    who.asset -= payment;
                    rival.asset += payment;
                    checkwin();
                });
            }    
        }
    });    
}
function notHaveOwner(mapData, currLocation){
    console.log("[chk][notHaveOwner]: " + mapData.name);
    return (owner_grade[currLocation].owner == "無" 
        && mapData.name != "可愛的家"
        && mapData.name != "飲料店"
        && mapData.name != "休息一下"
        && mapData.name != "Start"
    );
}
function isMyBlock(self, currLocation){
    console.log("[chk][isMyBlock]: " + self.name + " check block" + currLocation + " (is belong to "+owner_grade[currLocation].owner+" now)" );
    return owner_grade[currLocation].owner == self.name;
}
function isRivalBlock(self, mapData, currLocation){
    console.log("[chk][isRivalBlock]: " + self.name + " check block" + currLocation + " (is belong to "+owner_grade[currLocation].owner+" now)" );
    return (owner_grade[currLocation].owner != self.name
        && owner_grade[currLocation].owner != "無"
        && mapData.name != "可愛的家"
        && mapData.name != "飲料店"
        && mapData.name != "休息一下"
        && mapData.name != "Start"
    );
}
function trade(trader, mapData, currLocation){
    console.log("[trade]: " + trader.name +  " buy " + mapData.name);
    trader.asset -= mapData.price;
    owner_grade[currLocation].owner = trader.name;
    trader.house.push(mapData.name);
    if(trader == player)
        swal.fire("購買成功!!!","當前剩餘財產為 " + trader.asset + "元", "success");
}
function upgrade(trader, mapData, currLocation){
    trader.asset -= parseInt(mapData.price * upgradeRate * owner_grade[currLocation].grade);
    owner_grade[currLocation].grade++;
    if(trader == player)
        swal.fire("升級成功!!!","當前剩餘財產為 " + trader.asset + "元", "success");
    else if(trader == computer)
        swal.fire({
            text: trader.name + " 升級了" + map.data.name,
            confirmButtonColor: 'rgb(105, 187, 183)',
        });  
}
function isAssetLargerThan(asset, num){
    return asset >= num;
}
function checkwin(){
    if(player.asset <= 0){
        sessionStorage.setItem("lost", parseInt(sessionStorage.getItem("lost"))+1);
        updateRecord();
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
    else if(computer.asset <= 0){
        sessionStorage.setItem("win", parseInt(sessionStorage.getItem("win"))+1);
        updateRecord();
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
function updateRecord(){
    alert("update record");
    var record = {
        player_id: sessionStorage.getItem("player_id"),
        win: sessionStorage.getItem("win"),
        lost: sessionStorage.getItem("lost")
    };
    console.log("[chk][update record] "+ JSON.stringify(record));
    $.ajax({
        url: "../php/updatePlayerRecord.php",
        type: "POST",
        data: record,
        success:function(res){
            if(res.state == 200)
                console.log("[succ][updateRecord]");
            else console.log("[err][updateRecord]" + res.message);;
        },
        error:function(err){
            console.log("[err][updateRecord]"+err);
        }
    });
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
function addNewQuestion(){  
    swal.fire({
        title: '新增問題',
        html:
          '<div align="left">題目描述: </div><textarea id="title" class="swal2-input" style="font-size: 0.9em; height:100px; padding: 10px" required></textarea><br>' +
          '<div class="input-group"><span>選項A:&nbsp;&nbsp;&nbsp;</span><input id="A" class="form-control" style="font-size: 0.9em;"></div><br>'+  
          '<div class="input-group"><span>選項B:&nbsp;&nbsp;&nbsp;</span><input id="B" class="form-control" style="font-size: 0.9em;"></div><br>'+  
          '<div class="input-group"><span>選項C:&nbsp;&nbsp;&nbsp;</span><input id="C" class="form-control" style="font-size: 0.9em;"></div><br>'+  
          '<div class="input-group"><span>選項D:&nbsp;&nbsp;&nbsp;</span><input id="D" class="form-control" style="font-size: 0.9em;"></div><br>'+  
          '答案:&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<input type="radio" name="ans" value="A" checked> A&nbsp;&nbsp;'+
                '<input type="radio" name="ans" value="B"> B&nbsp;&nbsp;'+
                '<input type="radio" name="ans" value="C"> C&nbsp;&nbsp;'+
                '<input type="radio" name="ans" value="D"> D&nbsp;&nbsp;',
        confirmButtonText: '新增',
        confirmButtonColor: 'rgb(105, 187, 183)',
        showCancelButton: true,
        cancelButtonText: '取消',
        width: "50%"
    }).then((result)=>{
        if (result.isConfirmed) {
            var newQuestion = {};
            newQuestion.title = document.getElementById('title').value;
            newQuestion.A = document.getElementById('A').value;
            newQuestion.B = document.getElementById('B').value;
            newQuestion.C = document.getElementById('C').value;
            newQuestion.D = document.getElementById('D').value;
            newQuestion.ans = $('input[name="ans"]:checked').val();

            console.log("newQuestion = " + JSON.stringify(newQuestion));
            $.ajax({
                url: "../php/addNewQuestion.php",
                type: "POST",
                data: newQuestion,
                success: function(result){
                    let res = JSON.parse(result);
                    if (res.state == 200) {
                        player.asset += chanceMoney;
                        CanClickChance = false;
                        swal.fire("新增成功!","目前財產為: "+ player.asset, "success");
                    }
                    else
                        swal.fire("新增失敗","", "error");
                },
                error:function(){
                    swal.fire("新增失敗","", "error");
                }
            });
        } 
<<<<<<< HEAD
    });
}
=======
    })
}
>>>>>>> f5a11a39b3f85dfa8973973302f3074887ba1fd2
