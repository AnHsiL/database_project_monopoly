let space = [
    [990, 530],[880, 530],[770, 530],[660, 530],[550, 530],[440, 530],[330, 530], [220, 530],
    [220, 470],[220, 410],[220, 350],[220, 290],[220, 230], [220, 170],[220, 110],[220, 50],[220, 0],
    [330, 0],[440, 0],[550, 0],[660, 0],[770, 0],[880, 0],[990, 0],[1100, 0],
    [1100, 50],[1100, 110],[1100, 170],[1100, 230],[1100, 290],[1100, 350],[1100, 410],[1100, 470],[1100, 530]
];

var asset = [
    ["unknown", 500000], ["unknown", 700000], ["unknown", 600000], ["unknown", 1200000], ["unknown", 800000], ["unknown", 2000000], ["unknown", 3000000], ["unknown", 3500000], ["unknown", 500000], 
    ["unknown", 500000], ["unknown", 600000], ["unknown", 1200000], ["unknown", 800000], ["unknown", 2000000], ["unknown", 3000000], ["unknown", 3500000], ["unknown", 1500000], ["unknown", 500000],
    ["unknown", 500000], ["unknown", 600000], ["unknown", 1200000], ["unknown", 800000], ["unknown", 2000000], ["unknown", 3000000], ["unknown", 3500000], ["unknown", 500000],
    ["unknown", 500000], ["unknown", 600000], ["unknown", 1200000], ["unknown", 800000], ["unknown", 2000000], ["unknown", 3000000], ["unknown", 3500000], ["unknown", 1500000]
];

let paymentRate = 0.7;  // 過路費比率
let upgradeRate = 0.7;  // 升級比率

var player = {
    name: "player",
    location: 0,
    asset: 8000000,     //  初始資金 = 8000000
}
var computer = {
    name: "computer",
    location: 0,
    asset: 8000000,     //  初始資金 = 8000000
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
});

function gameStart(){
    if(isComputerTurn){
        swal.fire({
            title: "電腦的回合"
        }).then(() => {
            computerMove(rollongDice());
        });
    }
    else {
        swal.fire({
            title: "玩家的回合"
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
            text: "經過原點獎勵50000元"
        }).then(()=>{
            player.asset += 50000;
            for(let i = 0; i < nStep; i++){
                setTimeout(function(){ 
                    $("#game_character").animate({top:space[i][1], left:space[i][0]}, "slower");
                }, 1500 + 100 * i);
            }
        })
        isComputerTurn = true;
        return nStep;
    }
    
    isComputerTurn = true;
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
            showDenyButton: true,
            text: "此地價值為: " + asset[blockLocation][1],
            confirmButtonText: '是',
            denyButtonText: '否',
        }).then((result) => {
            if (result.isConfirmed) {
                if(isAssetLargerThan(player, asset[blockLocation][1]))
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
            showDenyButton: true,
            title: "是否要升級?",
            text: "升級價格為: " + asset[blockLocation][1] * upgradeRate,
            confirmButtonText: '是',
            denyButtonText: '否'
        }).then((result) => {
            if (result.isConfirmed) {
                if(isAssetLargerThan(player, asset[blockLocation][1] * upgradeRate))
                    upgrade(player, blockLocation);
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
            title: "付過路費: " + asset[blockLocation][1] * paymentRate,
        }).then(() => {
            payMoney(player, blockLocation);
        });
    }
}
function notHaveOwner(currLocation){
    return asset[currLocation][0] == "unknown";
}
function isMyBlock(owner , currLocation){
    return asset[currLocation][0] == owner.name;
}
function isRivalBlock(owner , currLocation){
    return asset[currLocation][0] != owner.name && asset[currLocation][0] != "unknown";
}
function trade(trader, currLocation){
    trader.asset -= asset[currLocation][1];
    asset[currLocation][0] = trader.name;
}
function upgrade(trader, currLocation){
    trader.asset -= asset[currLocation][1] * upgradeRate;
    asset[currLocation][1] *= 2;
}
function payMoney(trader, currLocation){
    if(trader == player){
        player.asset -= asset[currLocation][1] * paymentRate;
        computer.asset += asset[currLocation][1] * paymentRate;
    }
    else if(trader == computer){
        computer.asset -= asset[currLocation][1] * paymentRate;
        player.asset += asset[currLocation][1] * paymentRate;
    }
}
function isAssetLargerThan(person, num){
    return person.asset >= num;
}

function gameTerminate(){

    swal.fire({
        title: "確定要離開嗎?",
        showDenyButton: true,
        confirmButtonText: '確認',
        denyButtonText: '取消',
    }).then((result) => {
        if (result.isConfirmed) {
            document.location.href = "../html/player_info.html";
        }
    });
}