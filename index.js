transactions = require("./2016-10-18-exported_transactions.json").transactions

// for (transaction of transactions) {
// 	if (transaction.bookkeeping_type == "credit") {
// 		console.log(transaction.times.when_received);
// 	}
// }


var sumTransactionsForLatestNDays = function(transactions, days) {
	var sum = 0;
	now = new Date();
	nDaysAgo = now - 1000 * 60 * 60 * 24 * days
	for (transaction of transactions) {
		if (transaction.times.when_received >= nDaysAgo) {
			if (transaction.bookkeeping_type == "credit") {
				sum += transaction.amounts.amount;
			} else {
				sum -= transaction.amounts.amount;
			}
		}
	}
	return (sum / 10000);
}

for (n of[30, 60, 90, 180, 365]) {
	console.log("Over the past", n, "days, your net worth has changed by " + (sumTransactionsForLatestNDays(transactions, n) / 30).toFixed(2), "per day");
}

sumTransactionsForLatestNDays(transactions, 30)
