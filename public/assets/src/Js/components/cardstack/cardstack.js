app.component('cardstack', {
    bindings: {
        cards: '<'
    },
    controller($timeout,VoteService) {
        var ctrl = this;
        ctrl.expanded = false;
        ctrl.myVotes = [];
        ctrl.voteIds = [];
        ctrl.filteredCards = [];
        VoteService.myVotes().then((d) => {
            ctrl.myVotes = d;

            ctrl.myVotes.$loaded().then((e) => {                
                ctrl.refreshData();
            });
            ctrl.myVotes.$watch((e) => {
                ctrl.refreshData();                
            });
            ctrl.cards.$watch((e) => {
                ctrl.refreshData(); 
            });
        }); 

        ctrl.refreshData = () => {
            ctrl.voteIds = ctrl.myVotes.map((i) => {
                    return i.movie;
                });
                ctrl.filterCards();                                    
                ctrl.styleCards();
        }

        ctrl.filterCards = () => {
            ctrl.filteredCards = ctrl.cards.filter((card) => {
                return ctrl.voteIds.indexOf(card.$id) === -1;
            });
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

            // Vote yes            
            if (e.center.x > window.innerWidth * 0.75) {
                ctrl.panCard(c, 100, true);

                $timeout(() => {                   
                    VoteService.vote(c, 1);
                }, 275);
                return false;
            }

            // Vote no
            if (e.center.x < window.innerWidth * 0.25) {
                ctrl.panCard(c, -100, true);

                $timeout(() => {                  
                    VoteService.vote(c, -1);
                }, 275);
                return false;
            }

            ctrl.panCard(c, c.translateX);
        }

        ctrl.styleCards = () => {
            for (var c in ctrl.filteredCards) {
                var isTopcard = c == ctrl.filteredCards.length - 1;
                ctrl.filteredCards[c].translateZ = ((ctrl.filteredCards.length - c) * 10); 
                
                ctrl.filteredCards[c].translateX = isTopcard ? 0 : ctrl.filteredCards[c].translateX;
                ctrl.filteredCards[c].translateY = isTopcard ? 0 : ctrl.filteredCards[c].translateY;
                ctrl.filteredCards[c].rotate = isTopcard ? 0 : ctrl.filteredCards[c].rotate;
                ctrl.filteredCards[c].style = {
                    transform: 'translate3d('+ ctrl.filteredCards[c].translateX +'px, '+ ctrl.filteredCards[c].translateY +'px,-' + ctrl.filteredCards[c].translateZ + 'px) rotateZ(' + ctrl.filteredCards[c].rotate + 'deg)',
                    backgroundImage: (c < ctrl.filteredCards.length - 1 ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : '') + 'url(' + ctrl.filteredCards[c].cover + ')'
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