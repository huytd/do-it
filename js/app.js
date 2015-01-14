var app = angular.module('doit', ['ngStorage']);

app.run(function(){
  console.log("Started");
  $(".task-list").show();
});

app.controller('doitController', function($scope, $localStorage){

  $scope.today = "D" + (new Date()).getDate() + "" + (new Date()).getMonth() + "" + (new Date()).getFullYear();
  $scope.todayID = 0;
  $scope.tasks = [];
  $scope.currentTimeValue = (new Date()).getHours() * 100 + (new Date()).getMinutes() - 15;

  $scope.loadSavedData = function() {
    $scope.tasks = $localStorage.tasks;
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].id == $scope.today) {
        $scope.todayID = i; console.log("Today ID: " + $scope.todayID);
      }
    }
  }

  $scope.initNewData = function() {
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
  }

  $scope.saveData = function() {
    $localStorage.tasks = $scope.tasks;
    console.log($scope.tasks);
  }


  // Startup

  if (angular.isDefined($localStorage.tasks)) {
    $scope.loadSavedData();
  } else {
    $scope.initNewData();
  }

  $(document).ready(function(){
    setTimeout(function(){
      $('html, body').animate({
        scrollTop: $(".available:eq(0)").offset().top - $(".available:eq(0)").outerHeight()
      }, 1000);
    }, 300);
    $(".available:eq(0)").addClass("highlight");

    $(".loading-bar").css("width", "100%").delay(1000).fadeOut();
  });

});
