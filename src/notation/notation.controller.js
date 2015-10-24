app.controller('notationController', function ($scope,$timeout) {

    $scope.text="Sprawdź";
    $scope.notesOptions = "options space=20\ntabstave\nnotation=true\ntablature=false\nnotes ";
    $scope.numberOfSegments = 12;


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
        var outputSegment = "";
        console.log(nSegments);
        for (var i = 0; i < nSegments; i++) {


            var randomNumber = $scope.getNumbersFromRange(4, 7);
            if(randomNumber>=6){
                outputSegment = outputSegment + $scope.getRandomNote();
                var hashRandomNumber = $scope.getNumbersFromRange(0, 10);
                outputSegment = outputSegment + '/' + randomNumber.toString();
            }
            else{
                var greaterRandomNumber = $scope.getNumbersFromRange(4,10);
                var smallerNumber = $scope.getNumbersFromRange(1,greaterRandomNumber >7 ? 6 : greaterRandomNumber);
                outputSegment = outputSegment + greaterRandomNumber + '/' + smallerNumber;
            }

            outputSegment = outputSegment + ' ';
        }
        return outputSegment;
    };

    $scope.createAnnotations = function (nSegments) {
        var outputSegment = "\ntext ";
        console.log(nSegments);
        var j;
        for (j = 1; j < nSegments; j++) {
            outputSegment = outputSegment + j + ",";
        }
        outputSegment = outputSegment + j;
        return outputSegment;
    };

    $scope.generatedNotes = $scope.createRandomSymphony($scope.numberOfSegments);
    $scope.randomNotes = $scope.notesOptions + $scope.generatedNotes + $scope.createAnnotations($scope.numberOfSegments);
    console.log($scope.randomNotes);


    //1 -> true
    //0 -> not known
    //-1 -> false
    $scope.correctAnswer = 0;
    $scope.check = function(){
        console.log();
        console.log(document.getElementById('userInput').value);
        console.log($scope.generatedNotes);

        if(document.getElementById('userInput').value == $scope.generatedNotes.trim()){
            $scope.correctAnswer=1;
            $scope.text="Ok";
        }
        else{
            $scope.correctAnswer=-1;
            $scope.text="Błąd";
        }

        $timeout(function(){
            $scope.correctAnswer=0;
            $scope.text="Sprawdź";
        },3000);
    }

});