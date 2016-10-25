var sumTransactionsForLatestNDays = function(fileData, days) {
	var sum = 0;
	var now = new Date();
	var nDaysAgo = now - 1000 * 60 * 60 * 24 * days;
	for (var transaction of fileData.transactions) {
		if (transaction.times.when_received >= nDaysAgo) {
			if (transaction.bookkeeping_type == "credit") {
				sum += transaction.amounts.amount;
			} else {
				sum -= transaction.amounts.amount;
			}
		}
	}
	return ((sum / 10000) / days).toFixed(2); // per day
};

module.exports = sumTransactionsForLatestNDays;
