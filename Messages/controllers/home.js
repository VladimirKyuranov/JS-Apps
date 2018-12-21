const home = (function () {
    const index = function (ctx) {
        commonPartials.body = userModel.isAuthorized() ? "./views/user/UserHome.hbs" : "./views/home/home.hbs";
        ctx.user = storage.getData("authToken");
        let userInfo = storage.getData("userInfo");
        if (userInfo) {
            ctx.username = userInfo.name;
        }
        this.loadPartials(commonPartials).then(function () {
            this.partial('./views/common/main.hbs');
        });
    };
    
    return {
        index
    };
}());