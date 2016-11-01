
angular
    .module('barGraph')
    .component('barGraphComponent', {
        templateUrl: 'bar-graph/bar-graph.template.html',
        controller: function barGraphController(){

            this.x_axis_name = "X axis";
            this.y_axis_name = "Y axis";

            this.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: this.x_axis_name
                    },
                    yAxis: {
                        axisLabel: this.y_axis_name,
                        axisLabelDistance: -10
                    }
                }
            };

            this.data = [{key: "Cumulative Return", values: []}];

            this.update = function (d) {
                this.data[0]["values"].push(angular.copy(d));
                d.value = null;
                d.label = null;
            };

            this.edit = function (td) {
              console.log(td[parent]);
            };
        }
    });