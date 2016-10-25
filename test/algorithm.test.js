const algorithm = require("../src/algorithm.js");
const assert = require("assert");

describe("testing the algorithm", function() {
	describe("a file with 0 transactions", function() {
		var fileData = {
			transactions: []
		};
		it("30 days: $0 per day", function() {
			assert(algorithm(fileData, 30) == 0);
		});
		it("60 days: $0 per day", function() {
			assert(algorithm(fileData, 60) == 0);
		});
		it("90 days: $0 per day", function() {
			assert(algorithm(fileData, 90) == 0);
		});
		it("180 days: $0 per day", function() {
			assert(algorithm(fileData, 180) == 0);
		});
		it("365 days: $0 per day", function() {
			assert(algorithm(fileData, 365) == 0);
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
			assert(algorithm(fileData, 30) == 3.33);
		});
		it("60 days: $1.66 per day", function() {
			assert(algorithm(fileData, 60) == 1.67);
		});
		it("90 days: $1.11 per day", function() {
			assert(algorithm(fileData, 90) == 1.11);
		});
		it("180 days: $0.55 per day", function() {
			assert(algorithm(fileData, 180) == 0.56);
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
			assert(algorithm(fileData, 30) == -3.33);
		});
		it("60 days: -$1.66 per day", function() {
			assert(algorithm(fileData, 60) == -1.67);
		});
		it("90 days: -$1.11 per day", function() {
			assert(algorithm(fileData, 90) == -1.11);
		});
		it("180 days: -$0.55 per day", function() {
			assert(algorithm(fileData, 180) == -0.56);
		});
		it("365 days: -$0.28 per day", function() {
			assert.equal(algorithm(fileData, 365), -0.27);
		});
	});
});
