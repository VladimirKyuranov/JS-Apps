const userController = (function () {
    const displayLoginPage = function (context) {
        context.loadPartials({
            header: "./views/header/header.hbs",
            loginForm: "./views/user/login/loginForm.hbs"
        }).then(function () {
            this.partial("./views/user/login/loginPage.hbs")
        });
    };
    
    const displayRegisterPage = function (context) {
        context.loadPartials({
            header: "./views/header/header.hbs",
            registerForm: "./views/user/register/registerForm.hbs"
        }).then(function () {
            this.partial("./views/user/register/registerPage.hbs")
        });
    };
    
    const login = function (context) {
        let username = context.params.username;
        let password = context.params.password;
        
        userModel.login(username, password)
            .done(function (data) {
                storage.saveUser(data);
                
                context.redirect("#/");
            });
    };
    
    const logout = function (context) {
        userModel.logout()
            .done(function () {
                storage.deleteUser();
                context.redirect("#/");
            });
    };
    
    const register = function (context) {
        let username = context.params.username;
        let password = context.params.password;
        let repeatPassword = context.params.repeatPassword;
        let firstName = context.params.firstName;
        let lastName = context.params.lastName;
        
        if (password !== repeatPassword){
            return;
        }
        
        userModel.register(context.params)
            .done(function (data) {
                storage.saveUser(data);
                
                context.redirect("#/");
            });
    };
    
    return {
        displayLoginPage,
        displayRegisterPage,
        login,
        logout,
        register
    };
})();