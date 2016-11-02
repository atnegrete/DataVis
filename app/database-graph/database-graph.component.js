

angular
    .module('databaseGraph')
    .component('databaseGraphComponent', {
        templateUrl: 'database-graph/database-graph.template.html',
        controller: function databaseGraphController() {

            var color = d3.scale.category20();

            this.options = {
                chart: {
                    type: 'forceDirectedGraph',
                    height: 600,
                    width: (function(){ return nv.utils.windowSize().width - 450 })(),
                    margin:{top: 20, right: 20, bottom: 20, left: 20},
                    color: function(d){
                        return color(d.group)
                    },
                    nodeExtras: function(node) {
                        node && node
                            .append("text")
                            .attr("dx", 8)
                            .attr("dy", ".35em")
                            .text(function(d) { return d.name })
                            .style('font-size', '10px');
                    }
                }
            };

            this.data = {
                "nodes": [
                    {"name": "Napoleon", "group": 1},
                    {"name": "Myriel", "group": 2}
                ],
                "links": [

                ]};

            this.dataSP = {
                "nodes": [
                    {"name": "Myriel", "group": 0},
                    {"name": "Napoleon", "group": 1},
                    {"name": "Mlle.Baptistine", "group": 1},
                    {"name": "Mme.Magloire", "group": 1}
                ],
                "links": [
                    {"source": 0, "target": 2, "value": 10},
                    {"source": 1, "target": 3, "value": 150}
                ]
            };

            this.addNode = function(n){
                var node = this.data["nodes"];
                node.push(angular.copy(n));
                console.log(n);
                console.log(node);
                n.name = null;
                n.group = null;
            };

            this.addRel = function(l){
                console.log(l);
            };
        }
    });