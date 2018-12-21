const homeController = (function () {
    const index = function (context) {
        context.loadPartials({
            header: "./views/header/header.hbs"
        }).then(function () {
            context.user = storage.getData("authToken");
            this.partial("./views/home/home.hbs")
        });
    };
    
    return {
        index
    };
})();