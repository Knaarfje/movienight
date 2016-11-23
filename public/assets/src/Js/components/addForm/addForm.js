app.component('addForm', {
    bindings: {
    },
    controller(TmdbService) {
        var ctrl = this;

        ctrl.$onInit = () => {
            TmdbService.search("guardians").then((a) => {
                ctrl.suggestions = a.data.results;
            });
        }
    },
    templateUrl: `${templatePath}/addForm.html`
});