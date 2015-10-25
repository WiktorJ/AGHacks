app.directive('vextab', function($compile){
    //console.log("rendering vextab");
    var canvas = document.createElement('canvas');

    renderer = new Vex.Flow.Renderer( canvas,
        //Vex.Flow.Renderer.Backends.SVG);
        Vex.Flow.Renderer.Backends.CANVAS);
    artist = new Artist(10, 10, 800, {scale: 0.8});
    vextab = new VexTab(artist);
    return{
        restrict: 'E',
        scope:{
            'notesString':"@"
        },
        link: function(scope, element, attrs){
            try {
                scope.$watch('notesString', function (oldVal, newVal) {
                    vextab.reset();
                    artist.reset();
                    vextab.parse(scope.notesString);
                    artist.render(renderer);

                });

                vextab.reset();
                artist.reset();

                //vextab.parse(element.text());
                //console.log(scope.notesString);
                vextab.parse(scope.notesString);
                artist.render(renderer);
            }
            catch (e) {
                console.log("Error");
                console.log(e);
            }
            //element.appendChild(canvas);
            $compile(canvas)(scope);
            //element.append(canvas);
            element.replaceWith(canvas);
            //console.log("vextab processing");
        }
    }
});