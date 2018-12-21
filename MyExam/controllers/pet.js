const pet = (function () {
    const getAddPet = function (ctx) {
        commonPartials.body = "./views/pet/create.hbs";
        ctx.user = storage.getData("authToken");
        let userInfo = storage.getData("userInfo");
        if (userInfo) {
            ctx.username = userInfo.username;
        }
        this.loadPartials(commonPartials).then(function () {
            this.partial('./views/common/main.hbs');
        });
    };
    
    const postAddPet = function (ctx) {
        petModel.create(ctx.params).done(function () {
            notifications.info("Pet created");
            ctx.redirect("#/");
        });
    };
    
    const removePet = function (ctx) {
        petModel.remove(ctx.params.id)
            .then(function () {
                notifications.info("Pet removed successfully!");
                ctx.redirect("#/");
            })
    };
    
    const getEdit = function (ctx) {
        commonPartials.body = "./views/pet/edit.hbs";
        ctx.user = storage.getData("authToken");
        let userInfo = storage.getData("userInfo");
        if (userInfo) {
            ctx.username = userInfo.username;
        }
        petModel.getPetById(ctx.params.id)
            .then(function (response) {
                ctx.name = response.name;
                ctx.description = response.description;
                ctx.imageUrl = response.imageUrl;
                ctx.category = response.category;
                ctx.petsCount = response.petsCount;
                ctx._id = response._id;
            })
            .then(() => {
                this.loadPartials(commonPartials).then(function () {
                    this.partial('./views/common/main.hbs');
                });
            });
    };
    
    const postEdit = function (ctx) {
        console.log(ctx.params.id);
        petModel.edit(ctx.params.id, ctx.params).then(function () {
            notifications.info("Pet edited");
            ctx.redirect("#/");
        });
    };
    
    const postPet = function (ctx) {
        console.log(ctx.params.id);
        petModel.postPet(ctx.params.id, ctx.params).then(function () {
            ctx.redirect("#/");
        });
    };
    
    const getDetails = function (ctx) {
        commonPartials.body = "./views/pet/details.hbs";
        ctx.user = storage.getData("authToken");
        let userInfo = storage.getData("userInfo");
        if (userInfo) {
            ctx.username = userInfo.username;
        }
        petModel.getPetById(ctx.params.id)
            .then(function (response) {
                ctx.name = response.name;
                ctx.description = response.description;
                ctx.imageUrl = response.imageUrl;
                ctx.category = response.category;
                ctx.petsCount = response.petsCount;
                ctx._id = response._id;
                console.log(response);
            })
            .then(() => {
                this.loadPartials(commonPartials).then(function () {
                    console.log(ctx);
                    this.partial('./views/common/main.hbs');
                });
            });
    };
    
    return {
        getAddPet,
        postAddPet,
        removePet,
        getEdit,
        postEdit,
        getDetails,
        postPet
    };
}());