app.directive('rythmicGame', function ($rootScope, songsInfo) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/rythmic/game.html',
        link: function (scope, iElem, iAttr) {

            var width = 160, height = 300;
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
                        for (var i = 0; i < 4; i++) {
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
                    this.pump = 0;
                    this.fill = 'white';
                    this.draw = function () {
                        ctx.save();
                        ctx.fillStyle = this.fill;
                        ctx.fillRect(this.x, this.y - this.pump, this.w, this.h+this.pump);
                        ctx.restore();
                    }
                },
                ceil: function () {

                    ctx.save();

                    ctx.fillStyle = '#FFFFFF';
                    ctx.moveTo(0, 0);
                    for (var i = 0; i < 4; i++) {
                        ctx.lineTo(20 + i * 40, 30);
                        ctx.lineTo(40 + i * 40, 0);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.moveTo(0, 0);

                    ctx.restore();
                },
                playerIndex: 2,
                player: {
                    x: 2*40,
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

                        ctx.drawImage((this.left) ? this.sprite : this.spriteR, this.x, height - column.h - 44);

                        ctx.restore();
                    }
                },
                nextIndex: -1
            };


            APP.core = {
                init: function () {
                    for (var i = 0; i < 4; i++) {
                        APP.models.columns.push(new APP.models.column({x: i * 40, y: height - 30}));
                    }


                    window.addEventListener('keydown', function (evt) {
                        console.log(evt.which);
                        // a 65
                        // z 90

                        // m 77
                        // k 75

                        var obj = {
                            65: 0,
                            90: 1,
                            77: 2,
                            75: 3
                        };
                        Object.keys(obj).forEach(function (x) {
                            if(evt.which == x){
                                APP.models.columns.forEach(function (c, i) {
                                    if(i == obj[x]){
                                        c.fill = 'red';
                                    }else{
                                        c.fill = 'white';
                                    }
                                })
                            }
                        });


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

                    ctx.save();
                    ctx.fillStyle = 'rgb(255,0,0)';
                    ctx.fillRect(APP.models.nextIndex * 40, height - 30, 39, 30);
                    ctx.restore();
                    // Render updates to browser (draw to canvas, update css, etc.)
                },

                update: function () {


                    // Update values
                    // var distance = 100 * APP._delta;
                    // APP.thing.x += 100 * APP._delta;
                },

                updateBeat: function () {
                    APP.core.lastBeat = Date.now();

                    var x = Math.floor(Math.random() * 4);
                    while(x == APP.models.playerIndex){
                        x = Math.floor(Math.random() * 4)
                    }
                    APP.models.playerIndex = x;
                    APP.models.player.x = x*40;
                }
            };



            scope.running = false;


            scope.startGame = function (song) {
                scope.running = true;

                song = songsInfo[song];

                var audio = new Audio(song.src);

                bpm = song.bpm;
                bps = bpm / 60;

                bitTime = 1 / bps;

                audio.play();

                APP.play();


                setTimeout(function () {
                    setInterval(APP.core.updateBeat, bitTime * 1000);
                }, song.latency * bitTime * 1000); // for talkDirty 3*bitTime

            }

        }
    }
});