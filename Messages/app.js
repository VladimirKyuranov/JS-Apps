const app = Sammy('#app', function(){
    this.use('Handlebars', 'hbs');
    
    this.get('#/', home.index);
    this.get('#/home', home.index);
    this.get('#/index', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.get('#/myMessages', user.getReceivedMessages);
    this.get('#/archiveMessages', user.getSentMessages);
    this.get('#/sendMessage', user.getSendMessage);
    this.post('#/register', user.postRegister);
    this.post('#/sendMessage', user.sendMessage);
    this.get('#/delete:id', user.deleteMessage);
});

$(function(){
    app.run('#/');
});