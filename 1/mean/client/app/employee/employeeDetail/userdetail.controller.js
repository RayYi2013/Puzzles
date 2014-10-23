'use strict';

angular.module('mflowApp')
  .controller('UserdetailCtrl', function ($scope, $stateParams, $state, Me, User, UserData) {
    $scope.IsMe = Me._id ==  $stateParams.id;
        $scope.user = UserData;

    $scope.role = $scope.user.role=='admin';

    $scope.errors = undefined;

    $scope.dismiss = function(){
      $state.go('user.list');
    };

    $scope.save = function(){
      //update
      if($scope.form.$valid) {
        if($scope.role){
          $scope.user.role = 'admin';
        }
        return User.updateDetail({ id: $stateParams.id },$scope.user,
          function(data) {
            $state.go('user.list');
          },
          function(err) {
            console.dir(err);
            //todo: show error
            //if email is already exist
            //$scope.form.email.$invalid = true;
            $scope.errors = err.data.errors;
          });
      }
    }
  });
