/**
 * Created by tbyacoub on 10/26/2016.
 */

app.config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/', {
            template: '<test-data></test-data>'
        }).when('/barGraph', {
            template: '<bar-graph-component></bar-graph-component>'
        }).when('/pieChart', {
            template: '<pie-chart-component></pie-chart-component>'
        }).when('/dataBase', {
            template: '<database-graph-component></database-graph-component>'
        }).when('/lineGraph', {
            template: '<line-graph-component></line-graph-component>'
        }).otherwise('/');
    }
]);