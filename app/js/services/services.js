'use strict';

/* Services */

angular.module('contactServices', ['ngResource'])

.factory('requestData', ['$http', 'APP_CONTANTS', function($http, APP_CONTANTS) {

    var url = APP_CONTANTS.urlJsonFile,
        _settings = {
            method: 'GET',
            cache: false,
            headers: {
                'Content-Type': 'application/json'
            }
        };

    return {
        getWeather: function() {
            return $http.get(url, _settings)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        }
    };
}])

.factory('storeData', ['requestData', function(requestData) {

    return requestData.getWeather()
        .then(function(data) {
            return {
                response: data
            };
        }, function(error) {
            return {
                response: null
            };
        });
}])

.factory('personClass', [function() {
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

.factory('contactClass', ['personClass', function(personClass) {
    return function() {
        $.extend(
            true,
            this,
            new personClass()
        );

        this.__self = this;

        this.test = function() {
            return 'test';
        }
    };
}])

.factory('groupClass', function(personClass) {
    return function() {
        this.__self = this;
        this.id;
        this.name;
        this.members = [];
    };
});