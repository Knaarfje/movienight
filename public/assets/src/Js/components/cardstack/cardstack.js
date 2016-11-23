app.component('cardstack', {
    bindings: {
        cards: '<'
    },
    controller($timeout) {
        var ctrl = this;
        ctrl.expanded = false;

        ctrl.removeCard = (index) => {
           ctrl.cards.splice(index, 1);
            ctrl.styleCards();
        };

        ctrl.$postLink = () => {
            ctrl.styleCards();
        }

        ctrl.onPanStart = (e, c) => {
            e.element[0].classList.add('swiping');
            ctrl.start = e.center;
        }

        ctrl.onPan = (e, c) => {
            var offX = e.center.x - ctrl.start.x; 

            ctrl.panCard(c,offX);
        }

        ctrl.onPanEnd = (e, c) => {
            var o = e.center.x - ctrl.start.x;
            e.element[0].classList.remove('swiping');
            console.log(e);

            // Vote yes            
            if (e.center.x > window.innerWidth * 0.75) {
                ctrl.panCard(c, 100, true);
                $timeout(() => {
                    ctrl.removeCard(ctrl.cards.indexOf(c))
                }, 275);
                return false;
            }

            // Vote no
            if (e.center.x < window.innerWidth * 0.25) {
                ctrl.panCard(c, -100, true);
                $timeout(() => {
                    ctrl.removeCard(ctrl.cards.indexOf(c))
                }, 275);
                return false;
            }

            ctrl.panCard(c, c.translateX);
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

        ctrl.panCard = (c, x, vm) => {
            var unit = vm ? 'vw' : 'px';
            c.style = {                
                transformOrigin: 'center bottom',
                transform: 'translate3d(' + (x + '' + unit) + ', ' + c.translateY + 'px,-' + c.translateZ + 'px) rotateZ(' + x * .1 + 'deg)',
                backgroundImage: 'url(' + c.cover + ')'
            }
        }
    },
    templateUrl: `${templatePath}/cardstack.html`
}); 