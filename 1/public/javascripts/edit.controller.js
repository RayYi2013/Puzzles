/**
 * Created by ray on 2014-10-25.
 */

angular.module('app')
    .controller('EditCtrl', function ($scope, $state,$stateParams,  $filter, Employee, EmployeesService) {



        $scope.user = Employee;
        $scope.name = Employee.name;



        $scope.dismiss = function(){
            $state.go('main');
        };

        $scope.errors = undefined;

        $scope.save = function(){
            if($scope.form.$valid) {

                return EmployeesService.update($scope.user,$scope.user,
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

