(function () {
    $(document).ajaxStart(() => {
        $("#loadingBox").show();
    });
    $(document).ajaxStop(() => {
        $("#loadingBox").hide();
    })
}());