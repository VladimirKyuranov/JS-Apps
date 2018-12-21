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
    
    const getReceivedMessages = function (ctx) {
        ctx.username = storage.getData("userInfo").name;
        let recipient = storage.getData("userInfo").username;
        commonPartials.body = "./views/user/myMessages.hbs";
        ctx.user = storage.getData("authToken");
        messageModel.getAllMessages().then(function (response) {
            ctx.messages = response.filter(x => x.recipient_username === recipient);
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
        });
    };
    
    const getSentMessages = function (ctx) {
        ctx.username = storage.getData("userInfo").name;
        let sender = storage.getData("userInfo").username;
        commonPartials.body = "./views/user/archiveMessages.hbs";
        ctx.user = storage.getData("authToken");
        messageModel.getAllMessages().then(function (response) {
            ctx.messages = response.filter(x => x.sender_username === sender);
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs').then(function () {
                    $("button").on("click", deleteMessage);
                });
            });
        });
    };
    
    const getSendMessage = function (ctx) {
        ctx.username = storage.getData("userInfo").name;
        commonPartials.body = "./views/user/sendMessage.hbs";
        ctx.user = storage.getData("authToken");
        userModel.getAllUsers().then(function (response) {
            ctx.users = response;
            ctx.loadPartials(commonPartials).then(function () {
                this.partial('./views/common/main.hbs');
            });
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
        let name = ctx.params.name;
        
        if (username.length < 5) {
        
        } else if (!password) {
        
        } else {
            let user = {
                username,
                password,
                name
            };
            userModel.register(user).done(function (data) {
                storage.saveUser(data);
                notifications.info("Registration Successful");
                ctx.redirect('#/');
            });
        }
    };
    
    const sendMessage = function (ctx) {
        messageModel.send(ctx.params).done(function () {
            ctx.redirect("#/");
        })
    };
    
    const deleteMessage = function (e) {
        let id = $(e.target).attr('data-id');
        messageModel.remove(id).then(() =>{
            $(e.target).parent().parent().remove();
        });
    };
    
    return {
        getLogin,
        getRegister,
        getReceivedMessages,
        getSentMessages,
        getSendMessage,
        postLogin,
        postRegister,
        logout,
        sendMessage,
        deleteMessage
    };
}());