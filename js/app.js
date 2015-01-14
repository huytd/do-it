var app = angular.module('doit', ['ngStorage']);

app.run(function(){
  console.log("Started");
  $(".task-list").show();
});

app.controller('doitController', function($scope, $localStorage, $q){

  $scope.today = "D" + (new Date()).getDate() + "" + (new Date()).getMonth() + "" + (new Date()).getFullYear();
  $scope.todayID = 0;
  $scope.tasks = [];
  $scope.currentTimeValue = (new Date()).getHours() * 100 + (new Date()).getMinutes() - 15;

  $scope.loadSavedData = function() {
    var func = $q.defer();
    $scope.tasks = $localStorage.tasks;
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].id == $scope.today) {
        $scope.todayID = i; console.log("Today ID: " + $scope.todayID);
      }
    }
    func.resolve();
    return func.promise;
  }

  $scope.initNewData = function() {
    var func = $q.defer();
    $scope.tasks = [
    {
      id: $scope.today,
      hours: []
    }
    ];

    for (var i = 0; i < 16; i++) {
      $scope.tasks[$scope.todayID].hours[i] = {
        label: ((i+8<10)?("0" + (i+8)):(i+8)) + ":00",
        timevalue: (i + 8) * 100,
        tasks: []
      };
      for (var j = 0; j < 4; j++) {
        var min = j * 15;
        $scope.tasks[$scope.todayID].hours[i].tasks[j] = {
          text: "",
          time: ((i+8<10)?("0" + (i+8)):(i+8)) + ":" + ((min<10)?("0" + min):min),
          timevalue: (i + 8) * 100 + min
        };
      }
    }
    func.resolve();
    return func.promise;
  }

  $scope.saveData = function() {
    $localStorage.tasks = $scope.tasks;
    console.log($scope.tasks);
  }


  // Startup

  if (angular.isDefined($localStorage.tasks)) {
    $scope.loadSavedData().then(function(){ finished() });
  } else {
    $scope.initNewData().then(function(){ finished() });
  }

  function finished() {
    console.log("Run done");
    setTimeout(function(){
      $(".available:eq(0)").addClass("highlight");
      $('html, body').animate({
        scrollTop: $(".available:eq(0)").offset().top - $(".available:eq(0)").outerHeight()
      }, 1000);
    }, 300);
  }

});
