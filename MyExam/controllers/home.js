const home = (function () {
    const index = function (ctx) {
        commonPartials.body = userModel.isAuthorized() ? "./views/home/dashboard.hbs" : "./views/home/home.hbs";
        ctx.user = storage.getData("authToken");
        let creator;
        let userInfo = storage.getData("userInfo");
        if (userInfo) {
            ctx.username = userInfo.username;
            creator = storage.getData("userInfo").username;
        }
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator);
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllPets = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator);
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllCats = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator && x.category === "Cat");
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllDogs = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator && x.category === "Dog");
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllParrots = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator && x.category === "Parrot");
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllReptiles = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator && x.category === "Reptile");
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getAllOthers = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/home/dashboard.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator !== creator && x.category === "Other");
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    return {
        index,
        getAllPets,
        getAllOthers,
        getAllReptiles,
        getAllParrots,
        getAllDogs,
        getAllCats
    };
}());