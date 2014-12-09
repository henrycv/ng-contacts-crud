angular.module('contactDirectives', []).directive('gender', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // console.log([scope, elm, attrs, ctrl]);
      // console.log(elm.text());
      ctrl.$parsers.unshift(function(viewValue) {
        // console.log(viewValue);
        if (viewValue === 'hen') {
          // it is valid
          ctrl.$setValidity('gender', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('gender', false);
          return undefined;
        }
      });
    }
  };
})

.directive('validContactName', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
console.log(this);
        ctrl.$parsers.unshift(function(viewValue) {
          // Any way to read the results of a "required" angular validator here?
          var isBlank = viewValue === ''
          var invalidChars = !isBlank && !/^[A-z0-9]+$/.test(viewValue)
          var invalidLen = !isBlank && !invalidChars && (viewValue.length < 5 || viewValue.length > 20)
console.log([isBlank, invalidChars, invalidLen]);
          ctrl.$setValidity('isBlank', !isBlank)
          ctrl.$setValidity('invalidChars', !invalidChars)
          ctrl.$setValidity('invalidLen', !invalidLen)
          scope.usernameGood = !isBlank && !invalidChars && !invalidLen
        })
      }
    }
})

.directive('validContactAge', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          // Any way to read the results of a "required" angular validator here?
          var isBlank = viewValue === ''
          var invalidNumber = !isBlank && !/^[0-9]+$/.test(viewValue)
console.log([isBlank, invalidChars]);
          ctrl.$setValidity('isBlank', !isBlank)
          ctrl.$setValidity('invalidNumber', !invalidNumber)
          scope.usernameGood = !isBlank && !invalidNumber
        })
      }
    }
})