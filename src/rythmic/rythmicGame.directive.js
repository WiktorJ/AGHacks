app.directive('rythmicGame', function ($rootScope, songsInfo) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/rythmic/game.html',
        link: function (scope, iElem, iAttr) {

            var width = 519, height = 300;
            var canvas = iElem[0].children[0];
            var ctx = canvas.getContext('2d');

            var song, bpm, bps, bitTime, APP = {};

            window.APP = window.APP || {};

            APP.pause = function () {
                window.cancelAnimationFrame(APP.core.animationFrame);
            };

            APP.play = function () {
                APP.core.init();
                APP.core.then = Date.now();
                APP.core.frame();
            };

            APP.models = {
                floor: {
                    draw: function () {
                        ctx.save();

                        ctx.fillStyle = '#FFFFFF';
                        for (var i = 0; i < 13; i++) {
                            APP.models.columns[i].draw();
                        }

                        ctx.restore();
                    }
                },
                columns: [],
                column: function Column(x) {
                    this.x = x.x;
                    this.y = x.y;
                    this.w = 39;
                    this.h = 30;
                    this.draw = function () {
                        ctx.fillRect(this.x, this.y, this.w, this.h);
                    }
                },
                ceil: function () {

                    ctx.save();

                    ctx.fillStyle = '#FFFFFF';
                    ctx.moveTo(0, 0);
                    for (var i = 0; i < 13; i++) {
                        ctx.lineTo(20 + i * 40, 30);
                        ctx.lineTo(40 + i * 40, 0);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.moveTo(0, 0);

                    ctx.restore();
                },
                playerIndex: 6,
                player: {
                    left: false,
                    sprite: (function () {
                        var x = new Image();
                        x.src = './assets/drake.png';
                        return x;
                    })(),
                    spriteR: (function () {
                        var x = new Image();
                        x.src = './assets/drake-r.png';
                        return x;
                    })(),
                    draw: function () {
                        ctx.save();

                        ctx.translate(0, 0);

                        var index = APP.models.playerIndex;
                        var column = APP.models.columns[index];

                        ctx.drawImage((this.left) ? this.sprite : this.spriteR, index * 40, height - column.h - 44);

                        ctx.restore();
                    }
                }
            };


            APP.core = {
                init: function () {
                    for (var i = 0; i < 13; i++) {
                        APP.models.columns.push(new APP.models.column({x: i * 40, y: height - 30}));
                    }


                    window.addEventListener('keydown', function (evt) {
                        if (evt.which == 37) {
                            APP.models.playerIndex--;
                            if (APP.models.playerIndex < 0) {
                                APP.models.playerIndex = 0;
                            }
                        }
                        if (evt.which == 39) {
                            APP.models.playerIndex++;
                            if (APP.models.playerIndex > 12) {
                                APP.models.playerIndex = 12;
                            }
                        }

                    })
                },

                frame: function () {
                    APP.core.setDelta();
                    APP.core.update();
                    APP.core.render();
                    APP.core.animationFrame = window.requestAnimationFrame(APP.core.frame);
                },

                setDelta: function () {
                    APP.core.now = Date.now();
                    APP.core.delta = (APP.core.now - APP.core.then) / 1000; // seconds since last frame
                    APP.core.then = APP.core.now;
                },

                render: function () {
                    ctx.clearRect(0, 0, width, height);
                    APP.models.floor.draw();
                    APP.models.ceil();
                    APP.models.player.draw();
                    // Render updates to browser (draw to canvas, update css, etc.)
                },

                update: function () {
                    // Update values
                    // var distance = 100 * APP._delta;
                    // APP.thing.x += 100 * APP._delta;
                }
            };

            APP.play();


            scope.running = false;


            scope.startGame = function (song) {
                scope.running = true;

                song = songsInfo[song];

                var audio = new Audio(song.src);

                bpm = song.bpm;
                bps = bpm / 60;

                bitTime = 1 / bps;

                audio.play();


                setTimeout(function () {
                    setInterval(function () {
                        console.log('beat!')
                    }, bitTime * 1000);
                }, song.latency * bitTime * 1000); // for talkDirty 3*bitTime

            }

        }
    }
});