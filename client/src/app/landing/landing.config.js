app.config($routeProvider =>
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'landingCtrl',
      controllerAs: 'landing',
    }))
