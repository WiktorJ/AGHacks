app.controller('notationController', function ($scope, $timeout) {

    $scope.text = "Sprawdź";
    $scope.notesOptions = "options space=5\ntabstave\nnotation=true\ntablature=false\nnotes ";
    $scope.numberOfSegments = 3;

    var newNotes = false;

    $scope.getNumbersFromRange = function (min, max) {
        return parseInt(Math.random() * (max - min) + min, 10);
    };

    $scope.getRandomNote = function () {
        var notes = ['C', 'D', 'E', 'F', 'G', 'A'];
        var max = notes.length;
        var min = 0;
        return notes[$scope.getNumbersFromRange(0, max)];
    };

    $scope.createRandomSymphony = function (nSegments) {
        var returnSegment = [];
        var outputSegment = "";
        console.log(nSegments);
        for (var i = 0; i < nSegments; i++) {

            outputSegment = "";
            var randomNumber = $scope.getNumbersFromRange(4, 6);
            if (randomNumber >= 6) {
                outputSegment = outputSegment + $scope.getRandomNote();
                var hashRandomNumber = $scope.getNumbersFromRange(0, 10);
                outputSegment = outputSegment + '/' + randomNumber.toString();
                outputSegment = outputSegment + ' ';
                returnSegment[i] = outputSegment;
            }
            else {
                var greaterRandomNumber = $scope.getNumbersFromRange(4, 10);
                var smallerNumber = $scope.getNumbersFromRange(4, 6);
                var modifier = ["", "n", "#", "@"];
                outputSegment = outputSegment + $scope.getRandomNote() + modifier[$scope.getNumbersFromRange(0, modifier.length)] + '/' + smallerNumber;
                outputSegment = outputSegment + ' ';
                returnSegment[i] = outputSegment;
            }

        }
        return returnSegment;
    };


    var tmpNotes = $scope.createRandomSymphony($scope.numberOfSegments);
    $scope.genNotes ="";
    $scope.generatedNotes = [];
    for (var i = 0; i < $scope.numberOfSegments; i++) {
        $scope.genNotes = $scope.genNotes + tmpNotes[i] + " "
        $scope.generatedNotes[i] = tmpNotes[i];
    }
    //$scope.randomNotes = $scope.notesOptions + $scope.generatedNotes + $scope.createAnnotations($scope.numberOfSegments);
    $scope.randomNotes = $scope.notesOptions + $scope.genNotes;
    console.log("scoper: " + $scope.randomNotes);


    //1 -> true
    //0 -> not known
    //-1 -> false
    $scope.correctAnswer = 0;
    $scope.correctA = [-1,-1,-1];
    $scope.check = function () {

        var yourScore = 0;
        if (newNotes) {
            $scope.text = "Sprawdź";
            $scope.correctAnswer = 0;
            for (var i = 0; i < $scope.numberOfSegments; i++) {
                var j = i + 1;
                $scope["notationInput"+j] = "";
                $scope.correctA[i]=-1;
            }
            var tmpNotes = $scope.createRandomSymphony($scope.numberOfSegments);
            $scope.genNotes ="";
            $scope.generatedNotes = [];
            for (var i = 0; i < $scope.numberOfSegments; i++) {
                $scope.genNotes = $scope.genNotes + tmpNotes[i] + " "
                $scope.generatedNotes[i] = tmpNotes[i];
            }
            $scope.randomNotes = $scope.notesOptions + $scope.genNotes;
            console.log("scoper: " + $scope.randomNotes);
            newNotes = false;
        } else {

            for (var i = 0; i < $scope.numberOfSegments; i++) {
                var j = i + 1;
                console.log($scope["notationInput"+j]);
                console.log($scope.generatedNotes[i]);

                if ($scope["notationInput"+j] == $scope.generatedNotes[i].trim()) {
                    $scope.correctA[i] = 1;
                    yourScore = yourScore + 1;
                    console.log("YEAAAH");
                }
                else {
                    $scope.correctA[i] = 0;
                }
            }

            if (yourScore == $scope.numberOfSegments) {
                $scope.correctAnswer = 1;
                $scope.text = "Powtórz";
                newNotes = true;
            } else {
                $scope.correctAnswer = -1;
                $scope.text = "Błąd";
            }
        }
    }

});