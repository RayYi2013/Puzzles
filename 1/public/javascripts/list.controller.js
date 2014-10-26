/**
 * Created by ray on 2014-10-23.
 */
angular.module('app')
    .controller('ListCtrl', function ($scope,$state,Employees,EmployeesService) {
        $scope.list = Employees;

        $scope.del = function(employee){
            EmployeesService.delete(employee).$promise.then(function(){
                var i = $scope.list.indexOf(employee);
                if(i>-1){
                    $scope.list.splice(i, 1);
                }
//                $state.go('.', {}, { reload: true });
            });
        };

        $scope.edit = function(employee){
            $state.go('edit', employee);
        }
    });
