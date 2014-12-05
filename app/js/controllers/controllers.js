'use strict';

/* Controllers */

var contactsControllers = angular.module('contactsControllers', []);

contactsControllers.controller('ContactListCtrl', ['$scope', 'Contact', 'APP_CONTANTS',
  function($scope, Contact, APP_CONTANTS) {
    $scope.users = [];

    // Get contacts from JSON file using to service
    Contact.getContacts(function(data) {
        $scope.users = data.users;
      },
      function(data) {
        $scope.users = [];
    });

    $scope.orderProp = 'id';
    $scope.APP_CONTANTS = APP_CONTANTS;
  }]);

contactsControllers.controller('ContactDetailCtrl', ['$scope', '$routeParams', 'Contact', 'APP_CONTANTS', 'PersonClass', 'ContactClass', 'GroupClass',
  function($scope, $routeParams, Contact, APP_CONTANTS, PersonClass, ContactClass, GroupClass) {

    // $scope.contact = Contact.get({phoneId: $routeParams.phoneId}, function(contact) {
    //   $scope.mainImageUrl = contact.images[0];
    // });

    // console.log(helloTo.sayHelloTo('MyFriend'));
    var a = new PersonClass();
    var b = new ContactClass();
    var c = new GroupClass();
    a.name = 'aa';
    b.name = 'bb';
    c.name = 'cc';

    console.log(a.__self);
    console.log(b.__self);
    console.log(c.__self);
    $scope.setImage = function(imageUrl) {
      //$scope.mainImageUrl = imageUrl;
    }

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $("#userAgeLabel").text($event.target.innerText)
    };

    $scope.APP_CONTANTS = APP_CONTANTS;
  }]);


