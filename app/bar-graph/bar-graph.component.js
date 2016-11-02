
angular
    .module('barGraph')
    .component('barGraphComponent', {
        templateUrl: 'bar-graph/bar-graph.template.html',
        controller: function barGraphController(){

            this.x_axis_label = "X axis";
            this.y_axis_label = "Y axis";

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
                        return d3.format(",.4f")(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: this.x_axis_label
                    },
                    yAxis: {
                        axisLabel: this.y_axis_label,
                        axisLabelDistance: -10
                    }
                }
            };

            this.data = [{key: "Cumulative Return", values: []}];

            this.update = function(d) {
                if(d == undefined) return;
                if(!d.label.match(/^[0-9a-zA-Z]+$/)) return;
                if(d.value == undefined) return;
                var edited = false;
                var i;
                data = this.data[0]['values'];
                for(i = 0; i < data.length; i++) {
                    if(data[i]["label"] == d.label) {
                        data[i]["value"] = d.value;
                        edited = true;
                    }
                }

                if(!edited) {
                    data.push(angular.copy(d));
                }
                d.value = null;
                d.label = null;
            };

            this.refreshLabels = function(){
                this.options["chart"]["xAxis"]["axisLabel"] = this.x_axis_label;
                this.options["chart"]["yAxis"]["axisLabel"] = this.y_axis_label;
            };

            this.sort = function(st){
                if (st == undefined) return;
                data = this.data[0]['values'];
                data.sort(function(a, b){
                    if (st == "ascending") {
                        return parseFloat(a.value) - parseFloat(b.value);
                    } else {
                        return parseFloat(b.value) - parseFloat(a.value);
                    }
                });
                st = null;
            };
        }
    });