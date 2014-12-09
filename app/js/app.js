'use strict';

/* App Module */

var contactApp = angular.module('contactApp', [
  'ngRoute',

  'contactFactories',
  'contactsControllers',
  'contactDirectives',
  'contactFilters',
  'contactServices'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'partials/contact-list.html',
        controller: 'contactListCtrl'
      }).
      when('/contact/:action/:contactId/', {
        templateUrl: 'partials/contact-detail.html',
        controller: 'contactDetailCtrl'
      }).
      when('/contact/:action/', {
        templateUrl: 'partials/contact-detail.html',
        controller: 'contactDetailCtrl'
      }).
      when('/groups', {
        templateUrl: 'partials/group-list.html',
        controller: 'groupListCtrl'
      }).
      when('/group/:action/:groupId', {
        templateUrl: 'partials/group-detail.html',
        controller: 'contactDetailCtrl'
      }).
      otherwise({
        redirectTo: '/contacts'
      });
  }]);