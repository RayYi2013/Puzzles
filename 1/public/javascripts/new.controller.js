/**
 * Created by ray on 2014-10-23.
 */

angular.module('app')
    .controller('NewCtrl', function ($scope, $state, EmployeesService) {

        $scope.dismiss = function(){
            $state.go('main');
        };

        $scope.errors = undefined;

        $scope.save = function(){
            if($scope.form.$valid) {

                return EmployeesService.save($scope.user,
                    function(data) {
                        $state.go('main');
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
