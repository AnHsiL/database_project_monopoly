let space = [
    [990, 530],[880, 530],[770, 530],[660, 530],[550, 530],[440, 530],[330, 530], [220, 530],
    [220, 470],[220, 410],[220, 350],[220, 290],[220, 230], [220, 170],[220, 110],[220, 50],
    [220, 0],[330, 0],[440, 0],[550, 0],[660, 0],[770, 0],[880, 0],[990, 0],[1100, 0],
    [1100, 50],[1100, 110],[1100, 170],[1100, 230],[1100, 290],[1100, 350],[1100, 410],[1100, 470],[1100, 530]
];

var curr_location = 0;

$(document).ready(function() {
    curr_location = 0;
    $("#btn_game_start").click(function(){
        gameStart()
    });
});

function gameStart(){
    //document.querySelector(".pic_dice").setAttribute("src", "../dice_png/dice.gif");
    var step = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".pic_dice").setAttribute("src", "../dice_png/" + step + ".png");
    move(step);
    curr_location = (curr_location + step) % space.length;
}

function move(steps){
    
    for(let i = curr_location; i < steps+curr_location; i++){
        setTimeout(function(){ 
            $("#game_character").animate({top:space[i][1], left:space[i][0]}, "slower");
        } ,100*i);
    }
}