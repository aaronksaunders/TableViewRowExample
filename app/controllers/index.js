var stocks = Alloy.Collections.Stock;

stocks.fetch();

$.index.open();

$.tableView.addEventListener('click', function(e) {
	
	alert(JSON.stringify(e.rowData));
});

