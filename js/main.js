var sheet = angular.module("Sheet", []);


sheet.directive("editable", function () {
  return {
     restrict: 'E',
     link: function (scope, element, attrs) {
        element.html("<div>Hello there</div>")
     }
  }
});
