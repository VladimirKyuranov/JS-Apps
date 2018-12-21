const furnitureController = (function () {
    const displayCreatePage = function(context){
        context.loadPartials({
            header: "./views/header/header.hbs",
            createForm: "./views/furniture/create/createForm.hbs"
        }).then(function () {
            this.partial("./views/furniture/create/createPage.hbs")
        });
    };
    
    const create = function (context) {
        furnitureModel.create(context.params);
    };
    
    return {
        displayCreatePage,
        create
    }
})();