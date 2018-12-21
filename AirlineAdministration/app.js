const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');
    
    this.get('#/', home.index);
    this.get('#/home', home.index);
    this.get('#/index', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/flight/create', flight.getCreate);
    this.post('#/flight/create', flight.postCreate);
    this.get('#/flight/details/:id', flight.getDetails);
    
    
    this.get('#/flights', user.getFlights)
});

$(function(){
    app.run('#/');
});