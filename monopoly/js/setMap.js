$(document).ready(function() {
    for(let i=0; i<30; i++){
        $("#"+i).click(function(){
            swal.fire({
                imageUrl: "../map_png/麻薏.png",
                imageWidth: 500,
                imageHeight: 300,
                confirmButtonColor: 'rgba(71, 112, 78, 0.695)',
                timer: 2000,
                background: "rgba(218, 234, 221, 0.858)",
              });
        });
    }
});