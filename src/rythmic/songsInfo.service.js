app.factory('songsInfo', function () {
    var info = {};

    info.lovers = {
        src: './assets/lovers.mp3',
        bpm: 126,
        latency: 0,
        notes: [
            {
                direction: 'left',
                beatNo: 7
            }
        ]
    };


    info.talkDirty = {
        src: './assets/talkDirty.mp3',
        bpm: 98.5,
        latency: 3,
        notes: [
            {
                direction: 'left',
                beatNo: 7
            }
        ]
    };

    return info;
});