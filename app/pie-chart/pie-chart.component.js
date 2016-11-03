angular
    .module('pieChart')
    .component('pieChartComponent', {
        templateUrl: 'pie-chart/pie-chart.template.html',
        controller: function pieChartController($scope) {
            this.clear = {};
            this.current = "all";
            this.all_data = [];
            this.data = [];
            this.temp_data = [];
            this.sub_category_data = [];

            this.categories = [
                {key:"Utilities", values:["Water", "Electricity"]},
                {key:"Insurances", values:["car", "home"]},
                {key:"Entertainment", values:[]},
                {key:"Medical", values:[]}
            ];

            /* Adds a new payment to the data arrays */
            this.update = function(payment) {
                if(this.current != "all"){this.data = getCategoryData();}
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
                sub_category_data : [],
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
                    pie: {
                        dispatch: {
                            elementClick: function(e) {
                                console.log(e);
                                alert("Selected: " + e.data.key);
                                //changeToSingleCategory(e.data.key);
                            },
                        }
                    }
                }
            };

            /* Adds a new category */
            this.addCategory = function (category_to_add){
                this.categories.push({key:category_to_add.name, values:[]});
            };

            /* Changes pie chart to given sub Category or 'all' to change to view all categories */
            this.changePieChart = function(change_to){
                if(change_to == "all"){
                    this.current = change_to;
                    this.data = this.getCategoryData();
                }else{
                    var change_to_name = change_to.cat.key;
                    this.changeToSingleCategory(change_to_name);
                }
            }

            /* Changes pie-chart to given category */
            this.changeToSingleCategory = function(category){
                // First keep store the current data so we can use it later.
                retData = [];
                for(var i = 0; i < this.categories.length; i++){
                    var current_category = this.categories[i].key;
                    if(current_category == category){
                        // Loop through every sub category.
                        for(var j = 0; j < this.sub_category_data.length; j++){
                            // Loop through all the values of the categories and see if they match as parent for the sub category.
                            for(var k = 0; k < this.categories[i].values.length; k ++){
                                if(this.sub_category_data[j].key == this.categories[i].values[k]){
                                    retData.push({key:this.sub_category_data[j].key, y: this.sub_category_data[j].y});
                                }
                            }
                        }
                    }
                }
                this.data = retData;
                this.current = category;
            }

            /* Changes main data to main categories, used when adding a payment and when changing to View All */
            this.getCategoryData = function(){
                var temp = [];
                for(var i = 0; i < this.all_data.length; i++){
                    var cur = this.all_data[i];
                    var parent_category = this.findParentCategory(cur.category,this.categories);
                    if(! this.keyExists(parent_category, temp, cur.amount)){
                        temp.push({key: parent_category , y: cur.amount});
                    }
                }
                return temp;
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

            /* Add sub category to parent category */
            /* TO DO : Need to catch duplicates before they throw ngRepeat dupes error */
            this.addSubCategory = function(sub_category){
                var parent = sub_category.parent;
                for(var i = 0; i < this.categories.length; i ++){
                    if(this.categories[i].key == parent){
                        this.categories[i].values.push(sub_category.name);
                    }
                }
            }


        }
    });

