const SECRET="1232"
var secretHandler ="";

$(".backpack-image").click(function(ev){
    $(this).toggleClass('shake-Anim'); 
    var id =$(this).attr("id");
    readCode(id);
});

function readCode(input){
    secretHandler=secretHandler+input;
    console.log(secretHandler);
    if(SECRET.length===secretHandler.length){
        if(secretHandler==SECRET){
            document.location = "https://es.pornhub.com/view_video.php?viewkey=ph5e39ac3f69542";
        }
        secretHandler="";
    }
}
