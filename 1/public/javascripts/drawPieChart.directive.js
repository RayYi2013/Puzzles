/**
 * Created by ray on 2014-10-25.
 */

angular.module('app')
    .directive('drawPieChart', function () {
        // return the directive link function. (compile function not needed)
        return function (scope, element, attrs) {

            var container = $(element).attr("id");

            // watch the expression, and update the UI on change.
            scope.$watch('data', function () {
                drawPlot();
            }, true);



            var drawPlot = function () {
                var chart;
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: container
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Department'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
//                    plotOptions: {
//                        pie: {
//                            dataLabels: {
//                                enabled: false
//                            }
//                        }
//                    },
                    series: [{
                        type: 'pie',
                        name: 'Department',
                        data: scope.data
                    }]
                });
            }

;

        }
    });



//    .directive('hcPie', function () {
//        return {
//            restrict: 'C',
//            replace: true,
//            scope: {
//                items: '='
//            },
//            controller: function ($scope, $element, $attrs) {
//                console.log(2);
//
//            },
//            template: '<div id="container" style="margin: 0 auto">not working</div>',
//            link: function (scope, element, attrs) {
//                console.log(3);
//                var chart = new Highcharts.Chart({
//                    chart: {
//                        renderTo: 'container',
//                        plotBackgroundColor: null,
//                        plotBorderWidth: null,
//                        plotShadow: false
//                    },
//                    title: {
//                        text: 'Department'
//                    },
//                    tooltip: {
//                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//                        percentageDecimals: 1
//                    },
//                    plotOptions: {
//                        pie: {
//                            allowPointSelect: true,
//                            cursor: 'pointer',
//                            dataLabels: {
//                                enabled: true,
//                                color: '#000000',
//                                connectorColor: '#000000',
//                                formatter: function () {
//                                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
//                                }
//                            }
//                        }
//                    },
//                    series: [{
//                        type: 'pie',
//                        name: 'Department share',
//                        data: scope.data
//                    }]
//                });
//                scope.$watch("items", function (newValue) {
//                    chart.series[0].setData(newValue, true);
//                }, true);
//
//            }
//        }
//    });