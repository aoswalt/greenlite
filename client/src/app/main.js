var app = angular.module('greenlite', ['ngRoute', 'ui.bootstrap'])

  .config($routeProvider =>
    $routeProvider
      .otherwise('/'))
