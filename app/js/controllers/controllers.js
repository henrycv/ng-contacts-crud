'use strict';

/* Controllers */

var contactsControllers = angular.module('contactsControllers', [])

.controller('contactListCtrl', ['$scope', 'storeData', 'APP_CONTANTS',
  function($scope, storeData, APP_CONTANTS) {

    if (typeof storeData.response == 'undefined') {
      storeData.then(function(data) {
        storeData.response = data.response;
        $scope.users = storeData.response.users;
      });
    } else {
      $scope.users = storeData.response.users;
    }

    $scope.orderProp = 'id';
    $scope.APP_CONTANTS = APP_CONTANTS;
  }])

.controller('contactDetailCtrl', ['$scope', '$routeParams', 'requestData', 'APP_CONTANTS', 'PersonClass', 'ContactClass', 'GroupClass',
  function($scope, $routeParams, requestData, APP_CONTANTS, PersonClass, ContactClass, GroupClass) {

    // $scope.contact = requestData.get({phoneId: $routeParams.phoneId}, function(contact) {
    //   $scope.mainImageUrl = contact.images[0];
    // });

    $scope.setImage = function(imageUrl) {
      //$scope.mainImageUrl = imageUrl;
    }

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $("#userAgeLabel").text($event.target.innerText)
    };

    $scope.APP_CONTANTS = APP_CONTANTS;
  }]);