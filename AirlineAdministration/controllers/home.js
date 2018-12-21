const home = (function () {
    const index = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            ctx.user = storage.getData("authToken");
            let flights;
            let userInfo = storage.getData("userInfo");
            
            if (userModel.isAuthorized()) {
                ctx.username = userInfo.username;
                flights = flightModel.flights(false);
            } else {
                flights = flightModel.flights(true);
            }
            
            flights.done((data) => {
                ctx.flights = data;
                this.partial('./views/home/home.hbs')
                    .then(function () {
                        $("#detailsLink").on("click", flight.getId);
                    });
            });
        });
    };
    
    return {
        index
    };
}());