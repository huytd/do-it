var config = {
  startTime: 8,
  endTime: 23,
  tasksPerHour: 4
};

var app = angular.module('do-it', ['ngStorage']);

app.run(function(){
  $(".task-list").show();
});

app.controller('doItController', function($scope, $localStorage, $q){

  $scope.tasks = [];

  var now = new Date();

  $scope.today = "D" + now.getDate() + "" + now.getMonth() + "" + now.getFullYear();
  $scope.todayIndex = 0;

  $scope.currentTimeValue = now.getHours() * 100 + now.getMinutes() - 15;

  $scope.loadSavedData = function() {
    var func = $q.defer();
    $scope.tasks = $localStorage.tasks;
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].id == $scope.today) {
        $scope.todayIndex = i;
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

    for (var i = 0; i < (config.endTime - config.startTime); i++) {
      $scope.tasks[$scope.todayIndex].hours[i] = {
        label: ((i + config.startTime < 10)?("0" + (i + config.startTime)):(i + config.startTime)) + ":00",
        timeValue: (i + config.startTime) * 100,
        tasks: []
      };
      for (var j = 0; j < config.tasksPerHour; j++) {
        var minutes = j * (60 / config.tasksPerHour);
        $scope.tasks[$scope.todayIndex].hours[i].tasks[j] = {
          text: "",
          time: ((i + config.startTime < 10)?("0" + (i + config.startTime)):(i + config.startTime)) + ":" + ((minutes < 10)?("0" + minutes):minutes),
          timeValue: (i + config.startTime) * 100 + minutes
        };
      }
    }
    func.resolve();
    return func.promise;
  }

  $scope.saveData = function() {
    $localStorage.tasks = $scope.tasks;
  }


  // Startup

  if (angular.isDefined($localStorage.tasks)) {
    $scope.loadSavedData().then(function(){ finishedLoading() });
  } else {
    $scope.initNewData().then(function(){ finishedLoading() });
  }

  function finishedLoading() {
    setTimeout(function(){
      $(".available:eq(0)").addClass("highlight");
      $('html, body').animate({
        scrollTop: $(".available:eq(0)").offset().top - $(".available:eq(0)").outerHeight()
      }, 1000);
    }, 300);
  }

});
