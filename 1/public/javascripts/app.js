'use strict';

angular.module('app', [
    'ngResource',
    'ngSanitize',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');


        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: "assets/html/list.html",
                controller: "ListCtrl",
                resolve: {
                    Employees: function(EmployeesService){
                        return EmployeesService.query();
                    }
                }
            })
            .state('new', {
                url: '/new',
                templateUrl: "assets/html/new.html",
                controller: "NewCtrl"
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: "assets/html/edit.html",
                controller: "EditCtrl",
                resolve: {
                    Employee: function($stateParams, $q, EmployeesService){
                        var deferred = $q.defer();
                        EmployeesService.get({id: $stateParams.id}).$promise
                            .then(function(data){
                                data.startDate = new Date(data.startDate);
                                deferred.resolve(data);
                            })
                            .catch(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    }
                }
            })
            .state('chart', {
                url: '/chart',
                templateUrl: "assets/html/chart.html",
                controller: "ChartCtrl",
                resolve: {
                    Employees: function($q, EmployeesService){

                        var deferred = $q.defer();
                        EmployeesService.query().$promise
                            .then(function(data){
                                deferred.resolve(data);
                            })
                            .catch(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
//                        return EmployeesService.query();
                    }
                }
            });

        $locationProvider.html5Mode(true);
    })
    .factory('EmployeesService', function ($resource) {
        return $resource('/api/employees/:id', {id: '@_id'},{'update': { method:'PUT' }});
    });