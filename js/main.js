var myApp = angular.module("myApp", []);

// Directive template for later usage
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
    FOR: 0,
    CON: 0,
    DEX: 0,
    TAI: 0,
    INT: 0,
    POU: 0,
    CHA: 0,
  };
  factory.vars.edit = false;
  factory.vars.head = {};
  factory.vars.head.name = "";
  factory.vars.head.player = "";
  factory.vars.head.race = "";
  factory.vars.head.sex = "";
  factory.vars.head.culture = "";
  factory.vars.head.origin = "";
  factory.vars.head.job = "";
  factory.vars.head.family = "";
  factory.vars.head.age = "";
  factory.vars.head.hair = "";
  factory.vars.head.eyes = "";
  factory.vars.head.weight = "";
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
  // Helpers
  factory.save = function () {
    localStorage["pjhead"] = JSON.stringify(factory.vars.head);
    localStorage["pjskills"] = JSON.stringify(factory.vars.skills);
    localStorage["pjattributes"] = JSON.stringify(factory.vars.attributes);
    console.log("Saved");
  };
  factory.load = function () {
    factory.vars.head = JSON.parse(localStorage["pjhead"]);
    factory.vars.skills = JSON.parse(localStorage["pjskills"]);
    factory.vars.attributes = JSON.parse(localStorage["pjattributes"]);
    console.log("loaded");
  };
  factory.reset = function () {
    //localStorage.removeItem("pjhead");
    //localStorage.removeItem("pjskills");
    //localStorage.removeItem("pjattributes");
    angular.forEach(factory.vars.head, function (value, key) {
      factory.vars.head[key] = "";
    });
    angular.forEach(factory.vars.attributes, function (value, key) {
      factory.vars.attributes[key] = 0;
    });
    angular.forEach(factory.vars.skills, function (value, key) {
      delete factory.vars.attributes[key]["base"];
      delete factory.vars.attributes[key]["value"];
    });
    console.log("reset");
  };
  factory.example = function () {
    factory.vars.attributes = {
      FOR: 12,
      CON: 13,
      DEX: 14,
      TAI: 12,
      INT: 10,
      POU: 12,
      CHA: 14,
    };
    factory.vars.head.name = "Jon Snow";
    factory.vars.head.player = "Cyberj";
    factory.vars.head.race = "Humain";
    factory.vars.head.sex = "Homme";
    factory.vars.head.culture = "Civilisée";
    factory.vars.head.origin = "Nordique";
    factory.vars.head.job = "Patrouilleur";
    factory.vars.head.family = "Starck";
    factory.vars.head.age = "22";
    factory.vars.head.hair = "Noir";
    factory.vars.head.eyes = "Noirs";
    factory.vars.head.weight = "75Kg";
    console.log("example");
  };
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
  $scope.pj = pjFactory.vars;
});

myApp.controller('headCtrl', function ($scope, pjFactory) {
  $scope.pj = pjFactory.vars;
  $scope.vars = pjFactory.vars;
  $scope.save = pjFactory.save;
  $scope.load = pjFactory.load;
  $scope.reset = pjFactory.reset;
  $scope.example = pjFactory.example;
});
