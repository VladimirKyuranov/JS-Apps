const user = (function () {
    const getLogin = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            this.partial('./views/user/login.hbs');
        });
    };
    
    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let pass = ctx.params.pass;
        
        userModel.login(username, pass).done(function (data) {
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
    
    const getRegister = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            this.partial('./views/user/register.hbs');
        });
    };
    
    const postRegister = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.pass;
        let checkPassword = ctx.params.checkPass;
        
        if (username.length < 5) {
        
        } else if (!password) {
        
        } else if (password !== checkPassword) {
        
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
    
    const getFlights = function (ctx) {
        ctx.loadPartials({
            header: "./views/header/header.hbs",
            footer: "./views/footer/footer.hbs"
        }).then(function () {
            ctx.user = storage.getData("authToken");
            let userInfo = storage.getData("userInfo");
            
            if (userInfo) {
                ctx.username = userInfo.username;
            }
            this.partial('./views/user/flights.hbs');
        });
    };
    
    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        getFlights,
    };
}());