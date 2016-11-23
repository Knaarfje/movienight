app.component('card', {
    bindings: {
        card: '<',        
        count: '<',
        index: '<'
    },
    controller() {
        var ctrl = this;
        ctrl.expanded = false;

        ctrl.$onInit = () => {
            var isTopCard = ctrl.index == ctrl.count - 1;

            ctrl.card.translateZ = ((ctrl.count - ctrl.index) * 10)
            ctrl.card.translateY = isTopCard ? 0 : ((ctrl.count - ctrl.index) * getRandomInt(-3, 3))
            ctrl.card.translateX = isTopCard ? 0 : ((ctrl.count - ctrl.index) * getRandomInt(-3, 3))
            ctrl.card.rotate = isTopCard ? 0 : getRandomInt(-2, 2)
            ctrl.card.style = {
                transform: 'translate3d(' +ctrl.card.translateX +'px, '+ ctrl.card.translateY +'px,-' + ctrl.card.translateZ + 'px) rotateZ(' + ctrl.card.rotate + 'deg)',
                backgroundImage: (ctrl.index < ctrl.count - 1 ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : '') + 'url(' + ctrl.card.cover + ')'
            }
        };
    },
    templateUrl: `${templatePath}/card.html`
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}