const flight = (function () {
    const getCreate = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            ctx.user = storage.getData("authToken");
            let userInfo = storage.getData("userInfo");
            
            if (userInfo) {
                ctx.username = userInfo.username;
            }
            this.partial('./views/flight/create.hbs');
        });
    };
    
    const postCreate = function (ctx) {
        flightModel.create(ctx.params).done(function () {
            ctx.redirect("#/");
        })
    };
    
    const getDetails = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            ctx.user = storage.getData("authToken");
            let userInfo = storage.getData("userInfo");
            
            if (userInfo) {
                ctx.username = userInfo.username;
            }
            let flightId = ctx.params.id;
            console.log(flightId);
            flightModel.details(flightId)
                .then((response) => {
                    ctx.flight = response;
                    this.partial('./views/flight/details.hbs');
                });
        });
    };
    
    return {
        getCreate,
        postCreate,
        getDetails
    };
}());