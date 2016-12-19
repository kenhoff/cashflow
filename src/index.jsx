import React from "react";
import ReactDOM from "react-dom";
import FileReaderInput from "react-file-reader-input";
import sampleData from "../sample-data.js";
import algorithm from "./algorithm.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "awaitingFile",
			results: []
		};
		this.handleNewFiles = this.handleNewFiles.bind(this);
		this.useSampleFile = this.useSampleFile.bind(this);
		this.processData = this.processData.bind(this);
	}
	render() {

		var errorMessage;
		if (this.state.errorMessage) {
			errorMessage = (
				<div className="error">{this.state.errorMessage}</div>
			);
		} else {
			errorMessage = (null);
		}

		var filepickerHTML = (
			<div className="filePicker">
				{errorMessage}
				{"To get started, "}
				<FileReaderInput onChange={this.handleNewFiles}>
					<span className="uploadLink">upload your transaction history</span>
				</FileReaderInput>
				{" or "}
				<span className="uploadLink" onClick={this.useSampleFile}>use a sample file</span>.
			</div>
		);

		var resultsHTML = (
			<div className="results-section">
				<div className="results">
					{this.state.results.map(function(result) {
						if (result.changePerDay >= 0) {
							return (
								<div key={result.days} className="positiveResult">
									<p>{result.days + " days"}</p>
									<p className="amount">{`$${result.changePerDay}`}</p>
									<p>per day</p>
								</div>
							);
						} else {
							return (
								<div key={result.days} className="negativeResult">
									<p>{result.days + " days"}</p>
									<p className="amount">{`-$${result.changePerDay * -1}`}</p>
									<p>per day</p>
								</div>
							);
						}
					})}
				</div>
				<div className="uploadLink" onClick={() => {
					this.setState({status: "awaitingFile"});
				}}>Reset</div>
			</div>
		);

		switch (this.state.status) {
			case "awaitingFile":
				return filepickerHTML;
			case "fileProcessed":
				return resultsHTML;
			default:
				return (
					<div></div>
				);
		}
	}
	handleNewFiles(e, results) {
		// console.log(results[0][1]); // <-- File object
		var reader = new FileReader();
		reader.readAsText(results[0][1]);
		reader.addEventListener("loadend", () => {
			// reader.result contains the contents of blob as text
			// console.log(reader.result) // <-- string of the file
			try {
				let fileData = JSON.parse(reader.result);
				this.processData(fileData);
			} catch (e) {
				this.setState({status: "awaitingFile", errorMessage: "Hmm...that doesn't look like a valid JSON file."});
			}
		});
	}
	useSampleFile() {
		this.processData(sampleData);
	}
	processData(fileData) {
		try {
			let results = [30, 60, 90, 180, 365].map(function(n) {
				return {
					days: n,
					changePerDay: algorithm(fileData, n)
				};
			});
			this.setState({status: "fileProcessed", results});
		} catch (e) {
			this.setState({errorMessage: "Hmmm...we're having trouble parsing your JSON. Are you sure that you've exported your transactions from bank.simple.com in JSON format?", status: "awaitingFile"});
		}
	}
}

ReactDOM.render((
	<App></App>
), document.getElementById("app"));
