/**
 * Created by ray on 2014-10-25.
 */
angular.module('app')
    .controller('ChartCtrl', function ($scope,$state,Employees,EmployeesService) {
        var data = {};

        angular.forEach(Employees, function(value, key) {
            var name = value.department;
//            data[name] = (data[name]++) || 1;
            if(data[name]){
                data[name]++;
            }
            else{
                data[name] =  1;

            }
//            console.log(name + ':' + data[name]);
        });

        var items = [];
        angular.forEach(data, function(value, key) {
            if(key && value){
                items.push([key,value]);
//                console.log(key + ':' + value);

            }
        });




        console.dir(items);
        $scope.data = items;
//        items = [
//            ['ideas1', 1],
//            ['ideas2', 8],
//            ['ideas3', 5]
//        ];
//        chart.series[0].setData(items, true);

//        console.dir(chart);
//        $scope.data = chart;


    });
