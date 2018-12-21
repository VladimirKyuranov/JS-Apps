function attachEvents() {
    $("#btnLoadTowns").on("click", listTowns);
    
    async function listTowns() {
        let townsInput = $("#towns")
        let towns = townsInput.val()
            .split(", ")
            .reduce((acc, curr) => {
                acc.towns.push({town: curr});
                return acc;
            }, {towns: []});
        
        $.get("towns.hbs").then(res => {
        let template = Handlebars.compile(res);
        
        $("#root").html(template(towns));
        
        townsInput.val("")
        });
    }
}