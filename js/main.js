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
  factory.vars.calc = {};
  factory.vars.calc.ac = 0;
  factory.vars.calc.md = 0;
  factory.vars.calc.ma = 0;
  factory.vars.calc.mv = "";
  factory.vars.calc.pd = 0;
  factory.vars.calc.pm = 0;
  factory.vars.calc.ra = 0;
  factory.vars.body = {
    head: {pv: 0, pa: 0},
    chest: {pv: 0, pa: 0},
    bide: {pv: 0, pa: 0},
    rarm: {pv: 0, pa: 0},
    larm: {pv: 0, pa: 0},
    rfoot: {pv: 0, pa: 0},
    lfoot: {pv: 0, pa: 0},
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
  factory.vars.advskills = []
  factory.vars.cmbskills = []
  factory.vars.div = {}
  // Helpers
  factory.save = function () {
    localStorage["pjhead"] = JSON.stringify(factory.vars.head);
    localStorage["pjskills"] = JSON.stringify(factory.vars.skills);
    localStorage["pjadvskills"] = JSON.stringify(factory.vars.advskills);
    localStorage["pjcmbskills"] = JSON.stringify(factory.vars.cmbskills);
    localStorage["pjattributes"] = JSON.stringify(factory.vars.attributes);
    localStorage["pjcalc"] = JSON.stringify(factory.vars.calc);
    localStorage["pjbody"] = JSON.stringify(factory.vars.body);
    localStorage["pjdiv"] = JSON.stringify(factory.vars.div);
    console.log("Saved");
  };
  factory.load = function () {
    factory.vars.head = JSON.parse(localStorage["pjhead"]);
    factory.vars.skills = JSON.parse(localStorage["pjskills"]);
    factory.vars.advskills = JSON.parse(localStorage["pjadvskills"]);
    factory.vars.cmbskills = JSON.parse(localStorage["pjcmbkills"]);
    factory.vars.attributes = JSON.parse(localStorage["pjattributes"]);
    factory.vars.calc = JSON.parse(localStorage["pjcalc"]);
    factory.vars.body = JSON.parse(localStorage["pjbody"]);
    factory.vars.div = JSON.parse(localStorage["pjdiv"]);
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
    factory.vars.calc.pm = 0;
    factory.vars.calc.pd = 0;
    factory.vars.calc.mv = "";
    factory.vars.body = {
      head: {pv: 0, pa: 0},
      chest: {pv: 0, pa: 0},
      bide: {pv: 0, pa: 0},
      rarm: {pv: 0, pa: 0},
      larm: {pv: 0, pa: 0},
      rfoot: {pv: 0, pa: 0},
      lfoot: {pv: 0, pa: 0},
    }
    angular.forEach(factory.vars.skills, function (value, key) {
      obj = factory.vars.attributes[key];
      if (obj) {
        delete factory.vars.attributes[key]["base"];
        delete factory.vars.attributes[key]["value"];
      };
    });
    factory.vars.advskills.length = 0;
    factory.vars.cmbskills.length = 0;
    factory.vars.div = {}
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
    factory.vars.head.sex = "H";
    factory.vars.head.culture = "Civilisée";
    factory.vars.head.origin = "Nordique";
    factory.vars.head.job = "Patrouilleur";
    factory.vars.head.family = "Starck";
    factory.vars.head.age = "22";
    factory.vars.head.hair = "Noir";
    factory.vars.head.eyes = "Noirs";
    factory.vars.head.weight = "75Kg";
    factory.vars.calc.mv = "8m";
    factory.vars.body.chest.pa = 1;
    factory.vars.body.bide.pa = 1;
    factory.vars.body.head.pa = 1;
    factory.vars.body.larm.pa = 1;
    factory.vars.body.rarm.pa = 1;
    factory.vars.advskills = [
      {name: "Empathie", init:["CHA", "POU"], value:45, base: 26},
      {name: "Conn (Le mur)", init:["INT", "INT"], value:60, base: 20},
    ];
    factory.vars.cmbskills = [
      {name: "Épée a deux mains", init:["FOR", "DEX"], value:65, base: 26},
    ];
    factory.vars.div.armor = [
      {name: "Cuir souple"},
    ]

  };
  factory.cons = {};
  factory.cons.attrs = [
    "FOR", "CON", "DEX", "TAI", "INT", "POU", "CHA",
  ];
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
  factory.example();
  return factory;
});

myApp.controller('skillsCtrl', function ($scope, pjFactory) {
  $scope.cons = pjFactory.cons;
  $scope.vars = pjFactory.vars;
  $scope.pj = pjFactory.vars;
  $scope.newskill = {base1:"FOR", base2:"FOR"};
  $scope.newcskill = {base1:"FOR", base2:"DEX"};
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
  $scope.addSkill = function () {
    nskill = {name: $scope.newskill.name, init: [$scope.newskill.base1, $scope.newskill.base2]}
    $scope.pj.advskills.push(nskill);
    $scope.newskill = {base1:"FOR", base2:"FOR"};
    
  };
  $scope.addcSkill = function () {
    ncskill = {name: $scope.newcskill.name, init: [$scope.newcskill.base1, $scope.newcskill.base2]}
    $scope.pj.cmbskills.push(ncskill);
    $scope.newcskill = {base1:"FOR", base2:"DEX"};
    
  };
  $scope.rmSkill = function (index) {
    $scope.pj.advskills.pop(index);
  };
  $scope.rmcSkill = function (index) {
    $scope.pj.cmbskills.pop(index);
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

myApp.controller('svgCtrl', function ($scope, pjFactory) {
  $scope.pj = pjFactory.vars;
  $scope.cons = pjFactory.cons;
  

  // TODO : Move the watchers in service/factory ?
  // Attributes watcher
  $scope.$watch('pj.attributes', function(newval, oldval) {
    // Combat Actions
    if (newval.DEX && newval.INT) { 
      $scope.pj.calc.ac= Math.ceil(Math.ceil((newval.DEX + newval.INT)/2)/6);
    } else {
      $scope.pj.calc.ac = 0
    };
    // Damage Modifier
    if (newval.FOR || newval.TAI) { 
      dicetable = [
        "-1D8", "-1D6", "-1D4", "-1D2",
        "+0",
        "+1D2", "+1D4", "+1D6", "+1D8", "+1D10", "+1D12",
        "+2D6", "+2D8", "+2D10", "+2D12",
        ];
      md = dicetable[Math.floor((newval.FOR + newval.TAI) / 5)];
      $scope.pj.calc.md = md;
    } else {
      $scope.pj.calc.md = "";
    };
    // Modificateur d'amélioration
    if (newval.CHA) { 
      ma = Math.floor((newval.CHA -7) / 6);
      if (ma>0) { 
        ma = "+" + ma;
      } else {
        ma = ""+ma
      }
      $scope.pj.calc.ma = ma;
    } else {
      $scope.pj.calc.ma = "0";
    };
    // Points de magie 
    if (newval.POU) { 
      $scope.pj.calc.pm = newval.POU - $scope.pj.calc.pd;
    };
    // Points de vie
    if (newval.CON || newval.TAI) { 
      contai = newval.CON + newval.TAI;
      $scope.pj.body.head.pv = Math.ceil(contai/5);
      $scope.pj.body.chest.pv = Math.ceil((contai+5)/5);
      $scope.pj.body.bide.pv = Math.ceil((contai+10)/5);
      $scope.pj.body.rarm.pv = Math.ceil(contai/5);
      $scope.pj.body.larm.pv = Math.ceil(contai/5);
      if (contai < 6) {
        $scope.pj.body.rfoot.pv = 1;
        $scope.pj.body.lfoot.pv = 1;
      } else {
        $scope.pj.body.rfoot.pv = Math.ceil((contai-5)/5);
        $scope.pj.body.lfoot.pv = Math.ceil((contai-5)/5);
      };
    } else {
      $scope.pj.body.head.pv = 0;
      $scope.pj.body.chest.pv = 0;
      $scope.pj.body.bide.pv = 0;
      $scope.pj.body.rarm.pv = 0;
      $scope.pj.body.larm.pv = 0;
    };
    // Rang d'action
    if (newval.DEX || newval.INT) { 
      $scope.pj.calc.ra = Math.ceil((newval.INT+newval.DEX)/2);
    } else { 
      $scope.pj.calc.ra = 0;
    };
  }, true);
  
  // Attributes body
  $scope.$watch('pj.body', function(newval, oldval) {
    // Pénalité d'armure
    totalpa = newval.head.pa +
      newval.chest.pa +
      newval.bide.pa +
      newval.rarm.pa +
      newval.larm.pa +
      newval.rfoot.pa +
      newval.lfoot.pa;
    $scope.pj.calc.pa = Math.ceil(totalpa/5);
  }, true);

  
  $scope.getBase = function (skill) {
    var base = $scope.pj.attributes[skill.init[0]]+$scope.pj.attributes[skill.init[1]];
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
    if (base != 0) {
      return text + " ("+base+"%)";
    } else { 
      return text
    };
  };
});
