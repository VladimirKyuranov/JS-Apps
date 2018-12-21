const notifications = (function () {
    const info = function (text) {
        $("#infoBox>span").text(text);
        let infoBox = $("#infoBox");
        infoBox.show();
        infoBox.on("click", function f() {
            $("#infoBox").hide();
        });
        setTimeout(function(){
            infoBox.fadeOut(3000);
        }, 3000);
    };
    
    const error = function (text) {
        $("#errorBox>span").text(text);
        let errorBox = $("#errorBox");
        errorBox.show();
        errorBox.on("click", function f() {
            $("#errorBox").hide();
        });
        setTimeout(function(){
            errorBox.fadeOut(3000);
        }, 3000);
    };
    
    return{
        info,
        error
    };
}());