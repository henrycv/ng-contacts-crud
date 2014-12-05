'use strict';

/* Services */

angular.module('contactServices', ['ngResource'])

.factory('Contact', ['$http', function($http) {
    var _cacheRequest = true,
        _settings = {
        method: 'GET',
        url: 'js/contacts/contacts.json',
        cache: _cacheRequest,
        headers: {
            'Content-Type': 'application/json'
        }};

    this.setSetting = function(key, value) {
        if (typeof _settings[key] !== 'undefined') {
            _settings[key] = value;
        };
    };

    this.getContacts = function(success, error) {
       $http(_settings).
        success(success).
        error(error);
    };

    return this;
}])

.factory('PersonClass', [function() {
    return function() {
        this.__self = this;
        this.name = null;
        this.gender = null;
        this.age = null;
        this.checkIntegrity = function() {
            return xval;
        };
    };
}])

.factory('ContactClass', ['PersonClass', function(PersonClass) {
    return function() {
        $.extend(
            true,
            this,
            new PersonClass()
        );

        this.__self = this;

        this.test = function() {
            return 'test';
        }
    };
}])

.factory('GroupClass', function(PersonClass) {
    return function() {
        this.__self = this;
        this.id;
        this.name;
        this.members = [];
    };
});