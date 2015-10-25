app.directive('rythmicGame', function ($rootScope, songsInfo) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="rythmicGame"><canvas width="512" height="620"></canvas><button id="start" ng-click="startGame()" ng-if="!running">start</button></div>',
        link: function (scope, iElem, iAttr) {

            var width = 512, height = 620;
            var canvas = iElem[0].children[0];
            var ctx = canvas.getContext('2d');

            var song;

            var data = {
                arrows_down: {}
            };

            scope.running = false;


            var arrowSprite = new Image();
            arrowSprite.src = 'assets/left.png';

            var arrow = {
                draw: function (direction) {

                    var rotate = {
                        'left': 0,
                        'top': Math.PI / 2,
                        'bottom': -Math.PI / 2,
                        'right': Math.PI
                    };

                    var rotation = rotate[direction] || 0;

                    ctx.save();
                    ctx.translate(128 / 2, 128 / 2);
                    ctx.rotate(rotation);
                    ctx.drawImage(arrowSprite, -128 / 2, -128 / 2);
                    ctx.rotate(-rotation);
                    ctx.restore();
                }
            };


            var arrowBar = {
                draw: function () {
                    ctx.save();

                    ctx.globalAlpha = 0.5;
                    ctx.translate(0, height - 128);

                    arrow.draw('left');
                    ctx.translate(128, 0);
                    arrow.draw('top');
                    ctx.translate(128, 0);
                    arrow.draw('bottom');
                    ctx.translate(128, 0);
                    arrow.draw('right');

                    ctx.restore();
                }
            };


            var arrows = {
                37: {
                    draw: function () {
                        ctx.save();

                        ctx.translate(0, height - 128);
                        ctx.globalAlpha = 1 * data.arrows_down[37] / 100;
                        arrow.draw('left');

                        ctx.restore();
                    }
                },

                38: {
                    draw: function () {
                        ctx.save();

                        ctx.translate(128, height - 128);
                        ctx.globalAlpha = 1 * data.arrows_down[38] / 100;
                        arrow.draw('top');

                        ctx.restore();
                    }
                },

                39: {
                    draw: function () {
                        ctx.save();

                        ctx.translate(3 * 128, height - 128);
                        ctx.globalAlpha = 1 * data.arrows_down[39] / 100;
                        arrow.draw('right');

                        ctx.restore();
                    }
                },

                40: {
                    draw: function () {
                        ctx.save();

                        ctx.translate(2 * 128, height - 128);
                        ctx.globalAlpha = 1 * data.arrows_down[40] / 100;
                        arrow.draw('bottom');

                        ctx.restore();
                    }
                }

            };

            var beat = {
                draw: function () {
                    if(data.beat && data.beat > 0){
                        ctx.save();

                        ctx.globalAlpha = 0.6 * data.beat / 100;

                        var barWidth = 5;

                        ctx.fillRect(0,0,width, barWidth);
                        ctx.fillRect(0,barWidth, barWidth, height-2*barWidth);
                        ctx.fillRect(0,height-barWidth,width, barWidth);
                        ctx.fillRect(width-barWidth,barWidth,barWidth, height-2*barWidth);

                        ctx.restore();
                    }
                }
            };


            function paint() {
                ctx.clearRect(0, 0, width, height);
                ctx.save();

                arrowBar.draw();

                for (var i = 37; i <= 40; i++) {
                    if (data.arrows_down[i] > 0) {
                        arrows[i].draw();
                    }
                }
                beat.draw();
                ctx.restore();
            }

            function tick() {
                for (var i = 37; i <= 40; i++) {
                    if (data.arrows_down[i] > 0) {
                        data.arrows_down[i] -= 4;
                    }
                }
                if(data.beat > 0){
                    data.beat -= 3;
                }
            }

            window.addEventListener('keydown', function (evt) {
                if ($rootScope.animationFrameId) {
                    var ok = [37, 38, 39, 40];

                    if (ok.indexOf(evt.which) >= 0) {

                        evt.preventDefault();
                        data.arrows_down[evt.which] = 100;
                    }
                }
            });


            function loop() {

                tick();
                paint();

                $rootScope.animationFrameId = requestAnimationFrame(loop);
            }

            scope.startGame = function () {
                scope.running = true;

                song = songsInfo.talkDirty;

                var audio = new Audio(song.src);
                audio.play();

                var bpm = song.bpm;
                var bps = bpm/60;

                var bitTime = 1/bps;



                setTimeout(function () {
                    loop();
                    setInterval(function () {
                        data.beat = 100;
                        console.log('beat!')
                    }, bitTime*1000);
                }, song.latency*bitTime*1000); // for talkDirty 3*bitTime

            }

        }
    }
});