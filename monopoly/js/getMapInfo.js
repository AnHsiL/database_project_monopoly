$(document).ready(function() {
    setMapInfo();
});
function setMapInfo(){

    for(let i = 0; i < 34; i++){
        $("#block_"+i).click(function(){

            $.ajax({
                url: "../php/getMapInfo.php",
                type: "POST",
                data: {
                    id: i+1
                },
                success: function(res) {
                    res = JSON.parse(res);
                    if (res.state == 200) {
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
                            swal.fire({
                                title: res.data.name,
                                html: '<p>'+ res.data.discription +'</p>\
                                        <img src="../map_png/'+res.data.name+'.png" style="float: left; width:50%; height:50%; ">\
                                        <p style="text-align: left; font-size: 1em; padding:5px; position: absolute; left: 55%; top: 35%;" >\
                                            擁有者:&nbsp;'+ res.data.owner + '<br>\
                                            當前土地等級:&nbsp;'+ res.data.grade + '<br>\
                                            當前土地價值:&nbsp;'+ res.data.price + '<br>\
                                            應繳過路費:&nbsp;&nbsp;&nbsp;&nbsp;'+ parseInt(res.data.paymentRate) + '<br>\
                                        </p>',
                                confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                                timer: 5000,
                                background: "rgba(230, 245, 230, 0.9)",
                            });
                        }
                    }
                }
            });

        });
    }
}