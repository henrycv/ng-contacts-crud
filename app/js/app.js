'use strict';

/* App Module */

var contactApp = angular.module('contactApp', [
  'ngRoute',

  'contactsControllers',
  'contactFilters',
  'contactServices'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'contactListCtrl'
      }).
      when('/user/:action/:userId/', {
        templateUrl: 'partials/user-detail.html',
        controller: 'contactDetailCtrl'
      }).
      when('/groups', {
        templateUrl: 'partials/group-list.html',
        controller: 'contactListCtrl'
      }).
      when('/group/:action/:groupId', {
        templateUrl: 'partials/group-detail.html',
        controller: 'contactDetailCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);