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
	return (sum / 10000);
};

// for (n of[30, 60, 90, 180, 365]) {
// 	console.log("Over the past", n, "days, your net worth has changed by " + (sumTransactionsForLatestNDays(fileData, n) / 30).toFixed(2), "per day");
// }

export default sumTransactionsForLatestNDays;
