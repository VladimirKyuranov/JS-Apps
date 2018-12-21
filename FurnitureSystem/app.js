const app = Sammy("#main", function () {
    this.use("Handlebars", "hbs");
    
    this.get("#/", homeController.index);
    this.get("#/index", homeController.index);
    this.get("#/index.html", homeController.index);
    this.get("#/login", userController.displayLoginPage);
    this.get("#/logout", userController.logout);
    this.get("#/register", userController.displayRegisterPage);
    this.get("#/furniture/create", furnitureController.displayCreatePage);
    
    this.post("#/login", userController.login);
    this.post("#/register", userController.register);
    this.post("#/furniture/create", furnitureController.create);
    
    
});

$(() => app.run("#/"));