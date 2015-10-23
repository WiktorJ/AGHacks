app.directive('vextab', function($compile){
    //console.log("rendering vextab");
    var canvas = document.createElement('canvas');

    renderer = new Vex.Flow.Renderer( canvas,
        //Vex.Flow.Renderer.Backends.SVG);
        Vex.Flow.Renderer.Backends.CANVAS);
    artist = new Vex.Flow.Artist(10, 10, 800, {scale: 0.8});
    vextab = new Vex.Flow.VexTab(artist);
    return{
        restrict: 'E',
        link: function(scope, element, attrs){
            try {
                vextab.reset();
                artist.reset();
                vextab.parse(element.text());
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