const algorithm = require("../src/algorithm.js");
const moment = require("moment");
const assert = require("assert");

describe("testing the algorithm", function() {
	describe("a file with 0 transactions", function() {
		var fileData = {
			transactions: []
		};
		it("30 days: $0 per day", function() {
			assert.equal(algorithm(fileData, 30), 0);
		});
		it("60 days: $0 per day", function() {
			assert.equal(algorithm(fileData, 60), 0);
		});
		it("90 days: $0 per day", function() {
			assert.equal(algorithm(fileData, 90), 0);
		});
		it("180 days: $0 per day", function() {
			assert.equal(algorithm(fileData, 180), 0);
		});
		it("365 days: $0 per day", function() {
			assert.equal(algorithm(fileData, 365), 0);
		});
	});
	describe("a file with 1 +$100 transaction that just happened", function() {
		var fileData = {
			transactions: [{
				"amounts": {
					"amount": 1000000
				},
				"times": {
					"when_received": Date.now()
				},
				"bookkeeping_type": "credit"
			}]
		};

		it("30 days: $3.33 per day", function() {
			assert.equal(algorithm(fileData, 30), 3.33);
		});
		it("60 days: $1.66 per day", function() {
			assert.equal(algorithm(fileData, 60), 1.67);
		});
		it("90 days: $1.11 per day", function() {
			assert.equal(algorithm(fileData, 90), 1.11);
		});
		it("180 days: $0.55 per day", function() {
			assert.equal(algorithm(fileData, 180), 0.56);
		});
		it("365 days: $0.28 per day", function() {
			assert.equal(algorithm(fileData, 365), 0.27);
		});
	});
	describe("a file with 1 -$100 transaction that just happened", function() {
		var fileData = {
			transactions: [{
				"amounts": {
					"amount": 1000000
				},
				"times": {
					"when_received": Date.now()
				},
				"bookkeeping_type": "debit"
			}]
		};
		it("30 days: -$3.33 per day", function() {
			assert.equal(algorithm(fileData, 30), -3.33);
		});
		it("60 days: -$1.67 per day", function() {
			assert.equal(algorithm(fileData, 60), -1.67);
		});
		it("90 days: -$1.11 per day", function() {
			assert.equal(algorithm(fileData, 90), -1.11);
		});
		it("180 days: -$0.56 per day", function() {
			assert.equal(algorithm(fileData, 180), -0.56);
		});
		it("365 days: -$0.27 per day", function() {
			assert.equal(algorithm(fileData, 365), -0.27);
		});
	});
	describe("a file with 6 transactions at different intervals", function() {
		var fileData = {
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
		it("30 days: $3.33 per day", function() {
			assert.equal(algorithm(fileData, 30), 3.33);
		});
		it("60 days: -$1.67 per day", function() {
			assert.equal(algorithm(fileData, 60), -1.67);
		});
		it("90 days: $2.22 per day", function() {
			assert.equal(algorithm(fileData, 90), 2.22);
		});
		it("180 days: -$1.11 per day", function() {
			assert.equal(algorithm(fileData, 180), -1.11);
		});
		it("365 days: $0.82 per day", function() {
			assert.equal(algorithm(fileData, 365), 0.82);
		});
	})
});
