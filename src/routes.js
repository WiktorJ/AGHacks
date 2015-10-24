
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/home/home.html',
            controller: 'homeController'
        })
        .state('intervals', {
            url: '/intervals',
            templateUrl: 'src/intervals/intervals.html',
            controller: 'intervalsController'
        });


});
