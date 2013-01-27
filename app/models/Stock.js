exports.definition = {

    config : {
        "columns" : {
            company : "String",
            symbol : "String",
            price : "number"
        },
        "defaults" : {
        },
        "adapter" : {
            "type" : "stocksAdapter",
            "collection_name" : "Stocks"
        }
    },

    extendModel : function(Model) {
        _.extend(Model.prototype, {

            initialize : function(attributes) {
                this.set({
                    "id" : attributes['idAttribute'] || guid()
                });
            },
            // extended functions go here

        });
        // end extend

        return Model;
    },

    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {

            // extended functions go here

        });
        // end extend

        return Collection;
    }
}

function S4() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
