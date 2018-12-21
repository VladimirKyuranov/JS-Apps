$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        $.get("catTemplate.hbs").then(res => {
            let template = Handlebars.compile(res);
    
            $("#allCats").html(template({cats: window.cats}));
        }).then(() => {
            $(".btn").on("click", function () {
                let id = $(this).val();
                
                if ($(this).text() === "Show status code"){
                    $(this).text("Hide status code");
                    $(`#${id}`).show();
                } else {
                    $(this).text("Show status code");
                    $(`#${id}`).hide();
                }
            });
        });
    }
});