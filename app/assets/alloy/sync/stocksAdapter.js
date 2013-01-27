
module.exports.sync = function(model, method, options) {

    switch (method) {

        case "read":

            if (model.id) {
            	options.error('read singular not implemented');
            	return;
            }
            
            
            var get = Ti.Network.createHTTPClient();
            get.onerror = function(e) {
            	options.error(e);
            };
            get.onload = function(data) {

            	var lines = this.responseText.split("\n");
            	
            	var results = [];
    		
            	for (var i in lines) {
            		
            		var parts = CSVtoArray(lines[i]);
            		
            		results.push({
            			company: parts[0],
            			symbol: parts[1],
            			price: parts[2]
            		});
            	}

            	options.success(results);
            };
			var url = "http://download.finance.yahoo.com/d/quotes.csv?s=%40%5EDJI,GOOG&f=nsl1op&e=.csv";
			get.open('GET', url);
			get.send();
            
            break;
            
            
        case "create":
            options.error('create not implemented');
            break;
        case "update":
            options.error('update not implemented');
            break;
        case "delete":
            options.error('delete not implemented');
            break;
    }
}



// Return array of string values, or NULL if CSV string not well formed.
function CSVtoArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
};

