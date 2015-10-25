app.factory('songsInfo', function () {
    var info = {};

    info.lovers = {
        src: './assets/lovers.mp3',
        bpm: 126,
        latency: 0
    };


    info.talkDirty = {
        src: './assets/talkDirty.mp3',
        bpm: 98.5,
        latency: 3
    };

    return info;
});