angular
    .module('pieChart')
    .component('pieChartComponent', {
        templateUrl: 'pie-chart/pie-chart.template.html',
        controller: function pieChartController($scope) {
            this.clear = {};

            this.all_data = [];
            this.data = [];
            this.sub_category_data = [];
            this.temp_data = [];

            this.categories = [
                {key:"Utilities", values:["Water", "Electricity"]},
                {key:"Insurances", values:["car", "home"]},
                {key:"Entertainment", values:[]},
                {key:"Medical", values:[]}
            ];

            this.update = function(payment) {
                console.log("Updating");
                this.all_data.push(payment);
                var parent_category = this.findParentCategory(payment.category, this.categories);

                if(this.keyExists(parent_category, this.data, payment.amount)){
                    /* Here payment.category is a Subcategory */
                    this.sub_category_data.push({key: payment.category, y: payment.amount});
                }else{
                    this.data.push({key: parent_category, y: payment.amount});
                    /* Here payment.category is a Subcategory */
                    this.sub_category_data.push({key: payment.category, y: payment.amount});
                }

                /* Temporary - Only to easily display data being added on screen */
                $scope.payment = {};
                $scope.all_data = this.all_data;
                $scope.data = this.data;
                $scope.sub_category_data = this.sub_category_data;
            };

            this.options = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,

                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    },
                    useInteractiveGuideline: true,
                    interactiveLayer: {
                        dispatch: {
                            elementMousemove: function(e) {
                                console.log(e.mouseX + " " + e.mouseY + " " + e.pointXValue);
                            },
                            elementClick: function(e) {
                                console.log(e.mouseX + " " + e.mouseY + " " + e.pointXValue);
                            }
                        }
                    }, 
                                    
                    pie: {
                        dispatch: {
                            elementClick: function(e) {
                                console.log(e);
                                alert("Selected: " + e.data.key);
                                changeToSingleCategory(e.data.key);
                            },
                        }
                    }
                }
            };

            this.addCategory = function (category_to_add){
                console.log("Adding category: " + category_to_add);
                this.categories.push({key:category_to_add.name, values:[]});
            };


            /* FUNCTION IS BROKEN - NEED TO FIX */
            changeToSingleCategory = function(category){
                // First keep store the current data so we can use it later.
                this.temp_data = this.data; 
                sub_category_data = this.sub_category_data;
                categories = this.categories;
                console.log(data);
                for(var i = 0; i < categories.length; i++){
                    var current_category = categories[i].key;
                    if(current_category == category){
                        // Loop through every sub category.
                        for(var j = 0; j < sub_category_data.length; j++){
                            // Loop through all the values of the categories and see if they match as parent for the sub category.
                            for(var k = 0; k < category[i].values.length; k ++){
                                if(sub_category_data[j].key == category[i].values[k]){
                                    retData.push({key:sub_category_data[j].key, y: sub_category_data[j].value});
                                }
                            }
                        }
                    }
                }
            }

            /* Finds the Category for the Given category, or retuns an error. */
            this.findParentCategory = function findParentCategory(sub_category, categories){
                for(var i = 0; i < categories.length; i++){
                    var parent_category = categories[i].key;
                    for(var j = 0; j < categories[i].values.length; j++){
                        var current = categories[i].values[j];
                        if(current == sub_category){
                            return parent_category;
                        }
                    }
                }
                return "ERROR CATEGORY NOT FOUND";
            }

            /* Checks to see if the parent_category is already in the data (aka - prevents duplicates)*/
            this.keyExists = function(parent_category, data, toAdd){
                var ret = false;
                data.forEach(function(element){
                    if(element.key == parent_category){
                        element.y += toAdd;
                        ret = true;
                    }
                });
                return ret;
            }

        }
    });

