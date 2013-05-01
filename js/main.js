var myApp = angular.module("myApp", []);


myApp.directive("editable", function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      element.html("<div>Hello there</div>")
    }
  }
});

// Global parameters for pagination
myApp.factory('pjFactory', function () {
  factory = {};
  factory.vars = {};
  // Vars
  factory.vars.attributes = {
    FOR: 12,
    CON: 13,
    DEX: 14,
    TAI: 12,
    INT: 10,
    POU: 12,
    CHA: 14,
  };
  factory.vars.name = "Jon Snow";
  factory.vars.player = "Cyberj";
  factory.vars.race = "Humain";
  factory.vars.sex = "Homme";
  factory.vars.culture = "Civilisée";
  factory.vars.origin = "Nordique";
  factory.vars.job = "Patrouilleur";
  factory.vars.family = "Starck";
  factory.vars.age = "22";
  factory.vars.hair = "Noir";
  factory.vars.eyes = "Noirs";
  factory.vars.weigth = "75Kg";
  factory.vars.skills = [
    {name: "Athlétisme", init:["FOR", "DEX"]},
    {name: "Bagarre", init:["FOR", "DEX"]},
    {name: "Chant", init:["CHA", "POU"]},
    {name: "Conduite", init:["DEX", "POU"]},
    {name: "Conn (Régionale)", init:["INT", "INT"]},
    {name: "Culture (d'origine)", init:["INT", "INT"]},
    {name: "Danse", init:["DEX", "CHA"]},
    {name: "Discretion", init:["INT", "DEX"]},
    {name: "Endurance", init:["CON", "CON"]},
    {name: "Equitation", init:["DEX", "POU"]},
    {name: "Evaluer", init:["INT", "CHA"]},
    {name: "Evasion", init:["DEX", "DEX"]},
    {name: "Force Brute", init:["FOR", "TAI"]},
    {name: "Influence", init:["CHA", "CHA"]},
    {name: "Natation", init:["FOR", "CON"]},
    {name: "Passe-passe", init:["DEX", "CHA"]},
    {name: "Perception", init:["POU", "INT"]},
    {name: "Persévérance", init:["POU", "POU"]},
    {name: "Perspicacité", init:["INT", "POU"]},
    {name: "Premiers soins", init:["INT", "DEX"]},
  ];
  // Constants
  factory.periods = [
    {key: "3days", value: "3 days"},
    {key: "curweek", value: "Current week"},
    {key: "curmonth", value: "Current month"},
    {key: "curyear", value: "Current year"},
    {key: "week", value: "A week"},
    {key: "month", value: "A month"},
    {key: "year", value: "A year"},
    {key: "all", value: "Whole mailbox"},
  ];
  return factory;
});

myApp.controller('skillsCtrl', function ($scope, pjFactory) {
  $scope.edit = false;
  $scope.vars = pjFactory.vars;
  $scope.getBase = function (skill) {
    var base = $scope.vars.attributes[skill.init[0]]+$scope.vars.attributes[skill.init[1]];
    var text = "";
    if (skill.base == null) {
      skill.base = base;
      skill.value = base;
    } else if (skill.base != base) {
      skill.value += base - skill.base;
      skill.base = base;
    };
    if ( skill.init[0] == skill.init[1]) {
      text = skill.init[0]+"x2";
    } else {
      text = skill.init[0]+"+"+skill.init[1];
    };
    return text + " ("+base+"%)"
  };
});

myApp.controller('attrCtrl', function ($scope, pjFactory) {
  $scope.vars = pjFactory.vars;
  $scope.edit = false;
  $scope.test = "Test";
});
myApp.controller('headCtrl', function ($scope, pjFactory) {
  $scope.pj = pjFactory.vars;
  $scope.edit = false;
  $scope.test = "Test";
});
