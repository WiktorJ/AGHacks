var app = angular.module('app', ['ui.router']);

app.run(function ($rootScope) {
    $rootScope.$on("$stateChangeStart",
        function (event, toState, toParams, fromState, fromParams) {
            if($rootScope.animationFrameId){
                cancelAnimationFrame($rootScope.animationFrameId);
                console.log('animation canceled');
                delete($rootScope.animationFrameId);
                window.removeEventListener('keydown');
            }
        });
})