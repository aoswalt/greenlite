var app = angular.module('greenlite', ['ngRoute', 'ui.bootstrap'])

  .config($httpProvider => {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken'
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
  })

  .config($routeProvider =>
    $routeProvider
      .otherwise('/'))
