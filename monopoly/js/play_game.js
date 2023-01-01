let space = [
    [990, 530],[880, 530],[770, 530],[660, 530],[550, 530],[440, 530],[330, 530], [220, 530],
    [220, 470],[220, 410],[220, 350],[220, 290],[220, 230], [220, 170],[220, 110],[220, 50],[220, 0],
    [330, 0],[440, 0],[550, 0],[660, 0],[770, 0],[880, 0],[990, 0],[1100, 0],
    [1100, 50],[1100, 110],[1100, 170],[1100, 230],[1100, 290],[1100, 350],[1100, 410],[1100, 470],[1100, 530]
];

var asset = [   // 擁有者, 價值, 等級, 名稱, 說明
    {name:  "Start",    owner: "無",    price: 50000,   grade: 1,   discription: "又回到這裡了呢!"},
    {name:  "Gummy",    owner: "無",    price: 700000,  grade: 1,   discription: "巧克力裡面包著QQ的軟糖，有誰沒吃過呢?"},
    {name:  "小熊軟糖", owner: "無",    price: 600000,  grade: 1,   discription: "1個、2個、3個...黃色那位你要去哪裡?"},
    {name:  "pocky", owner: "無",    price: 1200000, grade: 1,   discription: "Share happiness! Pocky～分かち合うって、いいね！～"},
    {name:  "維力",     owner: "無",    price: 800000,  grade: 1,   discription: "同學，不好意思，可以請你坐遠一點嗎?"},
    {name:  "洋芋球",   owner: "無",    price: 2000000, grade: 1,   discription: "一口咬下馬鈴薯香氣好幸福~"},
    {name:  "雪餅",     owner: "無",    price: 3000000, grade: 1,   discription: "甜中帶鹹，鹹中帶甜，大人小孩都愛☆"},
    {name:  "Maltesers", owner: "無",   price: 3500000, grade: 1,   discription: "酥脆香濃的美味巧克力球，一吃就停不了口"},
    {name:  "可愛的家", owner: "無",    price: 500000,  grade: 1,   discription: "可愛的家是溫暖的小窩還是巫婆的糖果屋呢?"},
    
    {name:  "奇多",     owner: "無",    price: 500000,  grade: 1,   discription: "cheetos!!"},
    {name:  "小熊餅乾", owner: "無",    price: 600000,  grade: 1,   discription: "我的名字是March君喔! &nbsp;&nbsp;還有我!我叫華爾滋妹!"},
    {name:  "旺旺仙貝", owner: "無",    price: 1200000,  grade: 1,   discription: "拜拜時總少不了它，「旺旺拜拜，真是旺旺」!"},
    {name:  "浪味先",   owner: "無",    price: 800000,  grade: 1,   discription: "浪~味~先~~ &nbsp;讓你快樂似神仙~~~"},
    {name:  "蝦味先",   owner: "無",    price: 2000000,  grade: 1,   discription: "「蝦味先，呷袂先」"},
    {name:  "足球巧克力", owner: "無",  price: 3000000,  grade: 1,   discription: "足球外觀的巧克力有一個可愛的名字叫「哈哈球」"},
    {name:  "新貴派",   owner: "無",    price: 3500000,  grade: 1,   discription: "酥脆威化與香濃顆粒花生醬，淋上濃郁的巧克力，豐富口感，帶來滿滿正能量！"},
    {name:  "洋芋片",   owner: "無",    price: 1500000,  grade: 1,   discription: "你喜歡原味還是海苔味? &nbsp;&nbsp;...我喜歡蚵仔煎口味的!"},
    {name:  "飲料店",   owner: "無",    price: 500000,  grade: 1,   discription: "嗯...我要一杯鐵觀音拿鐵，微糖去冰"},
    
    {name:  "Oreo",     owner: "無",    price: 500000,  grade: 1,   discription: "轉一轉，舔一舔...接下來你們會的對吧?"},
    {name:  "牛肉乾",   owner: "無",    price: 600000,  grade: 1,   discription: "我嚼...我嚼..."},
    {name:  "Kitkat",   owner: "無",    price: 1200000, grade: 1,   discription: "Have a Break，Have a Kit Kat"},
    {name:  "飛機餅乾", owner: "無",    price: 800000,  grade: 1,   discription: "小小的飛機，載著童年的回憶"},
    {name:  "水果乾",   owner: "無",    price: 2000000,  grade: 1,  discription: "很好吃!! &nbsp;除了番茄乾...噁..."},
    {name:  "健達",     owner: "無",    price: 3000000,  grade: 1,  discription: "牛奶巧克力加上威化外層, 含綿滑牛奶及榛果內餡。獨特口感，多重享受"},
    {name:  "牛舌餅",   owner: "無",    price: 3500000,  grade: 1,  discription: "香香甜甜~ &nbsp;能甜到心裡去~"},
    {name:  "休息一下", owner: "無",    price: 500000,  grade: 1,  discription: "我想來一份休息套餐!!"},

    {name:  "玉米濃湯棒", owner: "無",  price: 500000,  grade: 1,  discription: "濃郁的玉米濃湯味，鹹鹹甜甜好刷嘴"},
    {name:  "棒棒糖",   owner: "無",    price: 600000,  grade: 1,  discription: "哇哈哈--我的是葡萄味的!"},
    {name:  "曲奇",     owner: "無",    price: 1200000, grade: 1,  discription: "我不管! &nbsp;巧克力的才是最好吃的!"},
    {name:  "Nutella",  owner: "無",    price: 800000,  grade: 1,  discription: "我要致死量的醬!"},
    {name:  "雪Q餅",    owner: "無",    price: 2000000,  grade: 1,  discription: "你知道嗎? 我的前身是棉花糖餅乾喔"},
    {name:  "爆米花",   owner: "無",    price: 3000000,  grade: 1,  discription: "我就是電影院愛情片的電燈泡!"},
    {name:  "七七乳加", owner: "無",    price: 3500000,  grade: 1,  discription: "嚕加嚕好呷--七七乳加"},
    {name:  "果凍",     owner: "無",    price: 1500000,  grade: 1,  discription: "齜溜---"}
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

    for(let i = 0; i < asset.length; i++){
        $("#block_"+i).click(function(){
            if(asset[i].name == "Start"){
                swal.fire({
                    title: asset[i].name,
                    html: '<p>'+ asset[i].discription +'</p>\
                            <img src="../map_png/'+asset[i].name+'.png"; style="width:200px; height:120px">\
                            <p style="text-align: center; font-size: 1em; padding:10px" >\
                                經過可獲得&nbsp'+passStartMoney+'&nbsp元 <br>\
                            </p>',
                    confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                    timer: 5000,
                    background: "rgba(230, 245, 230, 0.9)",
                });
            }
            else if(asset[i].name == "可愛的家"){
                swal.fire({
                    title: asset[i].name,
                    html: '<p>'+ asset[i].discription +'</p>\
                            <img src="../map_png/'+asset[i].name+'.png"; style="width:250px; height:250px">\
                            <p style="text-align: center; font-size: 1em; padding:10px" >\
                                (說明)<br>\
                            </p>',
                    confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                    timer: 5000,
                    background: "rgba(230, 245, 230, 0.9)",
                });
            }
            else if(asset[i].name == "飲料店"){
                swal.fire({
                    title: asset[i].name,
                    html: '<p>'+ asset[i].discription +'</p>\
                            <img src="../map_png/'+asset[i].name+'.png"; style="width:250px; height:250px">\
                            <p style="text-align: center; font-size: 1em; padding:10px" >\
                                (說明)<br>\
                            </p>',
                    confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                    timer: 3000,
                    background: "rgba(230, 245, 230, 0.9)",
                });
            }
            else if(asset[i].name == "休息一下"){
                swal.fire({
                    title: asset[i].name,
                    html: '<p>'+ asset[i].discription +'</p>\
                            <img src="../map_png/'+asset[i].name+'.png"; style="width:250px; height:250px">\
                            <p style="text-align: center; font-size: 1em; padding:10px" >\
                                休息一下吧~ (休息一回合)<br>\
                            </p>',
                    confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                    timer: 5000,
                    background: "rgba(230, 245, 230, 0.9)",
                });
            }
            else{
                swal.fire({
                    title: asset[i].name,
                    html: '<p>'+ asset[i].discription +'</p>\
                            <img src="../map_png/'+asset[i].name+'.png" style="float: left; width:50%; height:50%; ">\
                            <p style="text-align: left; font-size: 1em; padding:5px; position: absolute; left: 55%; top: 35%;" >\
                                擁有者:&nbsp;'+ asset[i].owner + '<br>\
                                當前土地等級:&nbsp;'+ asset[i].grade + '<br>\
                                當前土地價值:&nbsp;'+ asset[i].price + '<br>\
                                應繳過路費:&nbsp;&nbsp;&nbsp;&nbsp;'+ parseInt(asset[i].price * paymentRate * asset[i].grade) + '<br>\
                            </p>',
                    confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                    timer: 5000,
                    background: "rgba(230, 245, 230, 0.9)",
                });
            }
        });
    }
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
            blockAction(player.location);
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

    if(step + player.location > space.length){
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
            player.asset += 50000;
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

    if(step + computer.location > space.length){
        for(let i = computer.location; i < space.length; i++){
            setTimeout(function(){ 
                $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * (i - computer.location));
        }
        computer.asset += 50000;
        for(let i = 0; i < step + computer.location - space.length; i++){
            setTimeout(function(){ 
                $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * i);
        }
    }
    else {
        for(let i = computer.location; i < step + computer.location; i++){
            setTimeout(function(){ 
                $("#computer_character").animate({top:space[i][1], left:space[i][0]}, "slower");
            }, 1500 + 100 * (i - computer.location));
        }
    }
    computer.location = (computer.location + step) % space.length;
    isComputerTurn = false;
}
function blockAction(blockLocation){
    if(notHaveOwner(blockLocation)){
        swal.fire({
            title: "是否要購買?",
            text: "名稱:  "+ asset[blockLocation].name +"，價值: " + asset[blockLocation].price,
            confirmButtonText: '是',
            confirmButtonColor: 'rgb(105, 187, 183)',
            showCancelButton: true,
            cancelButtonText: '否',
        }).then((result) => {
            if (result.isConfirmed) {
                if(isAssetLargerThan(player, asset[blockLocation].price))
                    trade(player, blockLocation);
                else {
                    swal.fire({
                        title: "金額不足以購買",
                        icon: "danger"
                    })
                }
            } 
        });
    }
    else if(isMyBlock(player, blockLocation)){
        swal.fire({
            title: "是否要升級?",
            html: '<p style="text-align: left; font-size: 1em; padding:10px" >\
                名稱:&nbsp;"'+ asset[blockLocation].name + '<br>\
                當前土地等級:&nbsp;'+ asset[i].grade + '<br>\
                當前土地價值:&nbsp;'+ asset[i].price + '<br>\
                升級費用為:&nbsp;" '+ asset[blockLocation].price * upgradeRate +'<br>\
            </p>',
            confirmButtonText: '是',
            confirmButtonColor: 'rgb(105, 187, 183)',
            showCancelButton: true,
            cancelButtonText: '否',
        }).then((result) => {
            if (result.isConfirmed) {
                if(isAssetLargerThan(player, asset[blockLocation].price * upgradeRate)) upgrade(player, blockLocation);
                else {
                    swal.fire({
                        title: "金額不足以升級",
                        icon: "danger"
                    })
                }
            } 
        });    
    }
    else if(isRivalBlock(player, blockLocation)){
        swal.fire({
            text: player.name + "付過路費 " + parseInt(asset[blockLocation].price * paymentRate * asset[blockLocation].grade) +" 元給電腦",
        }).then(() => {
            payMoney(player, blockLocation);
        });
    }
    else ;
}
function notHaveOwner(currLocation){
    return (asset[currLocation].owner == "無" 
        && asset[currLocation].name != "可愛的家"
        && asset[currLocation].name != "飲料店"
        && asset[currLocation].name != "休息一下"
        && asset[currLocation].name != "Start"
    );
}
function isMyBlock(owner , currLocation){
    return asset[currLocation].owner == owner.name;
}
function isRivalBlock(owner , currLocation){
    return (asset[currLocation].owner == "電腦" 
        && asset[currLocation].owner != "無"
        && asset[currLocation].name != "可愛的家"
        && asset[currLocation].name != "飲料店"
        && asset[currLocation].name != "休息一下"
        && asset[currLocation].name != "Start"
    );
}
function trade(trader, currLocation){
    console.log(trader.name +  " " + asset[currLocation].name);
    trader.asset -= asset[currLocation].price;
    asset[currLocation].owner = trader.name;
    trader.house.push(asset[currLocation].name);
    swal.fire("Successfully purchase!!!","Your remain property is " + player.asset + "萬", "success");
}
function upgrade(trader, currLocation){
    trader.asset -= parseInt(asset[currLocation].price * upgradeRate * asset[currLocation].grade);
    asset[currLocation].grade++;
    swal.fire("Successfully upgrade!!!","Your remain property is " + player.asset + "萬", "success");
}
function payMoney(trader, currLocation){
    if(trader == player){
        player.asset -= parseInt(asset[currLocation].price * paymentRate * asset[currLocation].grade);
        computer.asset += parseInt(asset[currLocation].price * paymentRate * asset[currLocation].grade);
        checkwin();
    }
    else if(trader == computer){
        computer.asset -= parseInt(asset[currLocation].price * paymentRate * asset[currLocation].grade);
        player.asset += parseInt(asset[currLocation].price * paymentRate * asset[currLocation].grade);
        checkwin();
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
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }else{
                document.location.href = "../html/player_info.html";
            }
        });
        // let content2 = "<img src = '../img/lose.png' style = 'width: 800px;'>"
        // $("body").html(content2);
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

        // $("body").css("background-color", "coral");
        // let content2 = "<img src = '../img/win.gif' style = 'width: 800px;'>"
        // $("body").html(content2);
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