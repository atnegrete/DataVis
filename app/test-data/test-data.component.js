/**
 * Created by Tbyacoub on 10/27/2016.
 */

angular
    .module('testData')
    .component('testData', {
        templateUrl: 'test-data/test-data.template.html',
        controller: function testData(){
            this.tableHeaders = ['#', 'Header1', 'Header2', 'Header3', 'Header4'];
            this.tableData = [
                {
                    h1: '1,001',
                    h2: 'Lorem',
                    h3: 'ipsum',
                    h4: 'dolor',
                    h5: 'sit'
                },
                {
                    h1: '1,002',
                    h2: 'amet',
                    h3: 'consectetur',
                    h4: 'adipiscing',
                    h5: 'elit'
                },
                {
                    h1: '1,003',
                    h2: 'Integer',
                    h3: 'nec',
                    h4: 'odio',
                    h5: 'Praesent'
                },
                {
                    h1: '1,001',
                    h2: 'Lorem',
                    h3: 'ipsum',
                    h4: 'dolor',
                    h5: 'sit'
                },
                {
                    h1: '1,002',
                    h2: 'amet',
                    h3: 'consectetur',
                    h4: 'adipiscing',
                    h5: 'elit'
                },
                {
                    h1: '1,003',
                    h2: 'Integer',
                    h3: 'nec',
                    h4: 'odio',
                    h5: 'Praesent'
                },
                {
                    h1: '1,001',
                    h2: 'Lorem',
                    h3: 'ipsum',
                    h4: 'dolor',
                    h5: 'sit'
                },
                {
                    h1: '1,002',
                    h2: 'amet',
                    h3: 'consectetur',
                    h4: 'adipiscing',
                    h5: 'elit'
                },
                {
                    h1: '1,003',
                    h2: 'Integer',
                    h3: 'nec',
                    h4: 'odio',
                    h5: 'Praesent'
                }
            ]
        }
    });