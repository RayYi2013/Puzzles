'use strict';

angular.module('mflowApp')
  .controller('NewuserCtrl', function ($scope, $state, User) {
        $scope.dismiss = function(){
            $state.go('user.list');
        };

    $scope.errors = undefined;

        $scope.save = function(){
            if($scope.form.$valid) {
              if($scope.role){
                $scope.user.role = 'admin';
              }
              return User.save($scope.user,
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
