var stocks = Alloy.Collections.Stock;

stocks.fetch();

$.index.open();

$.tableView.addEventListener('click', function(e) {
	
	var id = e.rowData.model;
	
	var stock = stocks.get(id);
	
	alert(JSON.stringify(stock));
});

