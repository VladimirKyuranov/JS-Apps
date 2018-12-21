$(() => {
    const app = Sammy('#main', function () {
        
        this.use("Handlebars", "hbs");
        
        this.get("/index.html", displayHome);
        this.get("#/home", displayHome);
        this.get("#/about", displayAbout);
        this.get("#/login", displayLogin);
        this.get("#/register", displayRegister);
        this.get("#/create", displayCreate);
        this.get("#/edit", displayEdit);
        this.get("#/logout", logoutUser);
        this.get("#/catalog", displayCatalog);
        
        this.post("#/register", registerUser);
        this.post("#/login", loginUser);
        this.post("#/create", createTeam);
        
        function displayHome(context) {
            
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined" && sessionStorage.getItem("teamId") !== null;
            
            context.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/home/home.hbs")
            });
        }
        
        function displayAbout(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/about/about.hbs")
            });
        }
        
        function displayLogin(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                loginForm: "./templates/login/loginForm.hbs"
            }).then(function () {
                this.partial("./templates/login/loginPage.hbs")
            });
        }
        
        function displayRegister(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                registerForm: "./templates/register/registerForm.hbs"
            }).then(function () {
                this.partial("./templates/register/registerPage.hbs")
            });
        }
        
        function displayCreate(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                createForm: "./templates/create/createForm.hbs"
            }).then(function () {
                this.partial("./templates/create/createPage.hbs")
            });
        }
        
        function displayEdit(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                editForm: "./templates/edit/editForm.hbs"
            }).then(function () {
                this.partial("./templates/edit/editPage.hbs")
            });
        }
        
        function registerUser(context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;
            
            if (password !== repeatPassword) {
                auth.showError("The passwords must match!")
            } else {
                auth.register(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("Registration Successful");
                        displayHome(context);
                    }).catch(auth.handleError)
            }
        }
        
        function loginUser(context) {
            let username = this.params.username;
            let password = this.params.password;
    
            auth.login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("Login Successful");
                    displayHome(context);
                }).catch(auth.handleError)
        }
        
        function logoutUser(context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Logout Successful");
                    
                    displayHome(context);
                })
        }
        
        function displayCatalog(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined" && sessionStorage.getItem("teamId") !== null;
            context.hasNoTeam = !context.teamId;
            
            context.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                team: "./templates/catalog/team.hbs"
            }).then(function () {
                teamsService.loadTeams()
                    .then((response) => {
                        context.teams = response;
                        this.partial("./templates/catalog/teamCatalog.hbs");
                    });
            });
        }
        
        function createTeam(context) {
            let name = this.params.name;
            let comment = this.params.comment;
        }
    });
    
    app.run();
});