// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('yummr', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('YummrCtrl', function($scope, $ionicModal) {
 
  var Recipe = Parse.Object.extend("recipe");
  var query = new Parse.Query(Recipe)
  query.find({
    success: function(results) {
      $scope.recipes = [];
      for (var i = results.length - 1; i >= 0; i--) {
        $scope.recipes.push({
          title: results[i].get('title')
        });
        $scope.$apply();
      };
    },
    error: function(error) {
      alert(error);
    }
  });

  
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
  
  // Called when the form is submitted
  $scope.createTask = function(task) {
    var Todo = Parse.Object.extend("Todo");
    var todo = new Todo()
    todo.set("title", task.title);
    todo.save(null, {
      success: function(todo) {
        // Execute any logic that should take place after the object is saved.
        // alert('New object created with objectId: ' + todo.id);
      },
      error: function(todo, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      // alert('Failed to create new object, with error code: ' + error.message);
      }
    });
    $scope.taskModal.hide();
    
    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo)
    query.find({
      success: function(results) {
        $scope.tasks = [];
        for (var i = results.length - 1; i >= 0; i--) {
          $scope.tasks.push({
            title: results[i].get('title')
          });
          $scope.$apply();
        };
      },
      error: function(error) {
        alert(error);
      }
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.tasks.$apply() 
    
  };

  $scope.doRefresh = function() {
    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo)
    query.find({
      success: function(results) {
        $scope.tasks = [];
        for (var i = results.length - 1; i >= 0; i--) {
          $scope.tasks.push({
            title: results[i].get('title')
          });
          $scope.$apply();
        };
      },
      error: function(error) {
        alert(error);
      }
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.tasks.$apply()
  };
});
