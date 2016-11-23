app.component('cardstack', {
    bindings: {
        cards: '<'
    },
    controller() {
        var ctrl = this;
        ctrl.expanded = false;

        ctrl.removeCard = (index) => {
           ctrl.cards.splice(index, 1);
            ctrl.styleCards();
        };

        ctrl.$postLink = () => {
            ctrl.styleCards();
        }
        ctrl.styleCards = () => {
            for (var c in ctrl.cards) {
                var isTopcard = c == ctrl.cards.length - 1;
                ctrl.cards[c].translateZ = ((ctrl.cards.length - c) * 10); 
                
                ctrl.cards[c].translateX = isTopcard ? 0 : ctrl.cards[c].translateX;
                ctrl.cards[c].translateY = isTopcard ? 0 : ctrl.cards[c].translateY;
                ctrl.cards[c].rotate = isTopcard ? 0 : ctrl.cards[c].rotate;
                ctrl.cards[c].style = {
                    transform: 'translate3d('+ ctrl.cards[c].translateX +'px, '+ ctrl.cards[c].translateY +'px,-' + ctrl.cards[c].translateZ + 'px) rotateZ(' + ctrl.cards[c].rotate + 'deg)',
                    backgroundImage: (c < ctrl.cards.length - 1 ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : '') + 'url(' + ctrl.cards[c].cover + ')'
                }
            }
        }
    },
    templateUrl: `${templatePath}/cardstack.html`
}); 