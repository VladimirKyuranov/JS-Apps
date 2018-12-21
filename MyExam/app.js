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
    this.get('#/addPet', pet.getAddPet);
    this.post('#/addPet', pet.postAddPet);
    this.get('#/myPets', user.getMyPets);
    this.get('#/allPets', home.getAllPets);
    this.get('#/allCats', home.getAllCats);
    this.get('#/allDogs', home.getAllDogs);
    this.get('#/allParrots', home.getAllParrots);
    this.get('#/allReptiles', home.getAllReptiles);
    this.get('#/allOthers', home.getAllOthers);
    this.get('#/delete/:id', pet.removePet);
    this.get('#/details/:id', pet.getEdit);
    this.get('#/detailsOther/:id', pet.getDetails);
    this.post('#/editPet/:id', pet.postEdit);
    this.post('#/postPet/:id', pet.postPet);
});

$(function(){
    app.run('#/');
});