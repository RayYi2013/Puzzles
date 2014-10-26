/**
 * Created by ray on 2014-10-25.
 */

angular.module('app')
    .controller('HeaderCtrl', function ($scope,$state,$location) {
          $scope.go = function(name){
            $state.go(name);
        }

        $scope.menu = [
            { 'title': 'Employee List', 'link': '/' },
            { 'title': 'Department Chart', 'link': '/chart' }
        ];

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
