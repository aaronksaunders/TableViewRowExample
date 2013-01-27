exports.definition = {
 
    config: {
        "columns": {
        	company: "String",
        	symbol: "String",
        	price: "number"
        },
        "defaults": {
        },
        "adapter": {
            "type": "stocksAdapter",
            "collection_name": "Stocks"
        }
    },      
 
    extendModel: function(Model) {      
        _.extend(Model.prototype, {
 
            // extended functions go here
 
        }); // end extend
 
        return Model;
    },
 
 
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {
 
            // extended functions go here           

        }); // end extend
 
        return Collection;
    }
 
}