/**
 * Created by wiktor on 24.10.15.
 */


app.controller('intervalsController', function ($scope) {
    $scope.keySound = function(i) {
        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instrument: "acoustic_grand_piano",
            onprogress: function(i) {
                console.log(i);
            },
            onsuccess: function() {
                var delay = 0; // play one note every quarter second
                var note = 50; // the MIDI note
                var velocity = 127; // how hard the note hits
                // play the note
                MIDI.setVolume(0, 127);
                MIDI.noteOn(0, note +i , velocity, delay);
                MIDI.noteOff(0, note + i, delay + 0.75);
            }
        });
    };

   var numberToIntervalName = {
        0: 'pryma',
        1: 'sekunda mała',
        2: 'sekunda wielka',
        3: 'tercja mala',
        4: 'tercja wielka',
        12: 'oktawa'
    };

    var numberToIntervalNameMapping = {
        0: 'pryma',
        1: 'sekunda mała',
        2: 'sekunda wielka',
        3: 'tercja mala',
        4: 'tercja wielka',
        12: 'oktawa'
    };

    var numberToNote = {
        0: "C",
        1: "C#",
        2: "D",
        3: "D#",
        4: "E",
        5: "F",
        6: "F#",
        7: "G",
        8: "G#",
        9: "A",
        10: "A#",
        11: "B"
    };

    $scope.intervalQuestion = {
        question: "Wybierz interwał",
        options: [],
        answer: "wrong"
    };

    var lastPlayedCombination = [];
    var currAns;
    var octave1 = -1;
    var octave2 = -1;
    var note1 = -1;
    var note2 = -1;


    $scope.result = "";

    $scope.notesOptions = "options space=20\ntabstave\nnotation=true\ntablature=false";
    $scope.randomNotes = $scope.notesOptions;


    $scope.loadIntervals = function (intervalsCheckboxes, number) {
        if (!!intervalsCheckboxes) {
            numberToIntervalName[number] = numberToIntervalNameMapping[number];
        } else {
            delete numberToIntervalName[number];
        }

        $scope.nextQuestion(numberToIntervalName[Number(number)]);
    };

    $scope.test = function (melodicCheckbox, descendingCheckbox) {
        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instrument: "acoustic_grand_piano",
            onsuccess: function () {
                var interval = randomInterval();
                lastPlayedCombination = interval;
                $scope.nextQuestion(numberToIntervalName[Number(interval[1])]);
                playInterval(interval[0], interval[1], melodicCheckbox, descendingCheckbox);
                $scope.randomNotes = $scope.notesOptions;
                $scope.$apply();
                console.log(numberToIntervalName[lastPlayedCombination[1]])
            }
        });
    };

    $scope.repeatLastInterval = function (melodicCheckbox, descendingCheckboc) {
        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instrument: "acoustic_grand_piano",
            onsuccess: function () {
                playInterval(lastPlayedCombination[0], lastPlayedCombination[1], melodicCheckbox, descendingCheckboc);

            },
            onerror: function () {
                console.log("zagraj coś kurwiu pierwsze!!one!1!!")
            }
        });
    };

    $scope.checkAnswer = function() {
        if(currAns == $scope.intervalQuestion.answer) {
            $scope.result = "DOBRZE"
        } else {
            $scope.result = "ŹLE"
        }
            $scope.randomNotes = $scope.notesOptions + "\nnotes " + numberToNote[note1] + "/" + octave1 + " " + numberToNote[note2] + "/" + octave2
                                    +"\ntext " + numberToNote[note1] + "/" + octave1 + "," + numberToNote[note2] + "/" + octave2;
    };


    $scope.currentAnswer = function(ans) {
        //$scope.nextQuestion(ans);
        currAns = ans;
    };


    $scope.nextQuestion = function (answer) {
        $scope.intervalQuestion.options = [];
        for (var i = 0; i < Object.keys(numberToIntervalName).length; i++) {
                   $scope.intervalQuestion.options.push(numberToIntervalName[Object.keys(numberToIntervalName)[i]]);
        }
        $scope.intervalQuestion.answer = answer;
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.nextQuestion("wrong");
    });

    $scope.pressedArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    //$scope.pressed = 0;
    //$scope.hopeItWorks = function(){
    //    console.log("Its something");
    //    $scope.pressed =1;
    //    $timeout(function(){ $scope.pressed = 0; }, 200);
    //    $timeout(function(){ $scope.pressed = 1; }, 400);
    //    $timeout(function(){ $scope.pressed = 0; }, 600);
    //    $timeout(function(){ $scope.pressed = 1; }, 800);
    //    $timeout(function(){ $scope.pressed = 0; }, 1000);
    //};

    $scope.pressKey = function(i){
        console.log(i+1);
        $scope.pressedArray[i] = 1;
        $timeout(function(){$scope.pressedArray[i] =0;}, 200);
    }

    $scope.keySequence = function(att){
            //$scope.pressKey(0);
            //$scope.pressKey(2);
            //$scope.pressKey(16);
    }


    function randomInterval() {
        var lowestNote = 40;
        var highestNote = 80;
        var noteNumber = Math.floor((Math.random() * (highestNote - lowestNote)) + lowestNote);
        var keyTable = Object.keys(numberToIntervalName);
        var interval = keyTable[Math.floor((Math.random() * keyTable.length))];
        return [noteNumber, interval];
    }

    function playInterval(baseNote, intervalRange, melodicCheckbox, descendingCheckboc) {
        var delay = 0; // play one note every quarter second
        var delay2 = 0; // play one note every quarter second
        var velocity = 255; // how hard the note hits
        var op = function (a, b) {
            return Number(a) + Number(b)
        };
        if (!!melodicCheckbox) {
            delay2 = 1;
        }

        if (!!descendingCheckboc) {
            op = function (a, b) {
                return Number(a) - Number(b)
            };
        }

        note1 = baseNote%12;
        note2 = (Number(baseNote) + Number(intervalRange)) % 12;
        octave1 = Math.floor(baseNote/12);
        octave2 = Math.floor((Number(baseNote) + Number(intervalRange))/12);
        //console.log(baseNote)
        //console.log(intervalRange)
        //console.log(note1)
        //console.log(note2)
        //console.log(octave1)
        //console.log(octave2)


        MIDI.setVolume(0, 511);
        MIDI.noteOn(0, baseNote, velocity, delay);
        MIDI.noteOn(0, op(Number(baseNote), Number(intervalRange)), velocity, delay2);
        MIDI.noteOff(0, baseNote, delay + 0.75);
        MIDI.noteOff(0, op(Number(baseNote), Number(intervalRange)), delay2 + 0.75);
    }
});