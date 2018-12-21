const user = (function () {
    const getLogin = function (ctx) {
        commonPartials.body = "./views/user/login.hbs";
        ctx.loadPartials(commonPartials).then(function () {
            this.partial('./views/common/main.hbs');
        });
    };
    
    const getRegister = function (ctx) {
        commonPartials.body = "./views/user/register.hbs";
        ctx.loadPartials(commonPartials).then(function () {
            this.partial('./views/common/main.hbs');
        });
    };
    
    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        
        userModel.login(username, password).done(function (data) {
            storage.saveUser(data);
            ctx.redirect('#/');
            notifications.info("Login Successful!");
        }).fail(function () {
            notifications.error("Invalid Username or Password!");
        });
    };
    
    const logout = function (ctx) {
        userModel.logout().done(function () {
            storage.deleteUser();
            notifications.info("Logout Successful");
            ctx.redirect('#/login');
        });
    };
    
    const postRegister = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        
        if (username.length < 3 || !username) {
            notifications.error("Username must be at least 3 symbols");
        } else if (password.length < 6 || !password) {
            notifications.error("Password must be at least 6 symbols");
        } else {
            let user = {
                username,
                password
            };
            userModel.register(user).done(function (data) {
                storage.saveUser(data);
                notifications.info("Registration Successful");
                ctx.redirect('#/');
            });
        }
    };
    
    const getMyPets = function (ctx) {
        ctx.username = storage.getData("userInfo").username;
        let creator = storage.getData("userInfo").username;
        commonPartials.body = "./views/user/myPets.hbs";
        ctx.user = storage.getData("authToken");
        petModel.getAllPets().then(function (response) {
            ctx.pets = response.filter(x => x.creator === creator);
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    return {
        getLogin,
        getRegister,
        postLogin,
        postRegister,
        logout,
        getMyPets
    };
}());