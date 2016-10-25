const moment = require("moment");

module.exports = {
	transactions: [{
		"amounts": {
			"amount": 1000000
		},
		"times": {
			"when_received": moment().subtract(15, "days").valueOf()
		},
		"bookkeeping_type": "credit"
	}, {
		"amounts": {
			"amount": 2000000
		},
		"times": {
			"when_received": moment().subtract(45, "days").valueOf()
		},
		"bookkeeping_type": "debit"
	}, {
		"amounts": {
			"amount": 3000000
		},
		"times": {
			"when_received": moment().subtract(75, "days").valueOf()
		},
		"bookkeeping_type": "credit"
	}, {
		"amounts": {
			"amount": 4000000
		},
		"times": {
			"when_received": moment().subtract(120, "days").valueOf()
		},
		"bookkeeping_type": "debit"
	}, {
		"amounts": {
			"amount": 5000000
		},
		"times": {
			"when_received": moment().subtract(225, "days").valueOf()
		},
		"bookkeeping_type": "credit"
	}, {
		"amounts": {
			"amount": 6000000
		},
		"times": {
			"when_received": moment().subtract(400, "days").valueOf()
		},
		"bookkeeping_type": "debit"
	}]
};
