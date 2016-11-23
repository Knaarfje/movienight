app.component('fab', {
    transclude: true,
    bindings: {},
    controller() {
        var ctrl = this;
        ctrl.expanded = false;
    },
    templateUrl: `${templatePath}/fab.html`
});