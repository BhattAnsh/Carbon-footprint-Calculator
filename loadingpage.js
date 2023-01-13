
loadingAnimation();
function loadingAnimation(){
    var counter = 0;
    var c = 0;
    var i = setInterval(counterAnimation, 20);
    function counterAnimation(){
        document.getElementById("counterNumber").innerHTML = (c+"%");
        document.getElementById("hr").style.width = (c+"%");
        counter++;
        c++;
        if(counter == 101){
            clearInterval(i);
            window.location.href = "result.html";
        }
    };
};