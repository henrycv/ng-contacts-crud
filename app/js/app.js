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
        controller: 'ContactListCtrl'
      }).
      when('/user/:action/:userId/', {
        templateUrl: 'partials/user-detail.html',
        controller: 'ContactDetailCtrl'
      }).
      when('/groups', {
        templateUrl: 'partials/group-list.html',
        controller: 'ContactListCtrl'
      }).
      when('/group/:action/:groupId', {
        templateUrl: 'partials/group-detail.html',
        controller: 'ContactDetailCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);