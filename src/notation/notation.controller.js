app.controller('notationController', function ($scope) {

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

    $scope.randomNotes = $scope.notesOptions + $scope.createRandomSymphony($scope.numberOfSegments);
    console.log($scope.randomNotes)
});