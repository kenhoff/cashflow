import React from "react";
import ReactDOM from "react-dom";
import FileReaderInput from "react-file-reader-input";
import sampleData from "../2016-10-22-exported_transactions.json";
import algorithm from "./algorithm.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "awaitingFile"
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
			<div>
				{errorMessage}
				{"To get started, "}
				<FileReaderInput onChange={this.handleNewFiles}>
					<span className="uploadLink">upload your transaction history</span>
				</FileReaderInput>
				{" or "}
				<span className="uploadLink" onClick={this.useSampleFile}>use a sample file</span>.
			</div>
		);

		switch (this.state.status) {
			case "awaitingFile":
				return filepickerHTML;
			default:
				return (
					<div></div>
				);
		}
	}
	handleNewFiles(e, results) {
		// console.log(results[0][1]); // <-- File
		var reader = new FileReader();
		reader.readAsText(results[0][1]);
		reader.addEventListener("loadend", () => {
			// reader.result contains the contents of blob as a typed array
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
		for (var n of[30,
			60,
			90,
			180,
			365]) {
			console.log("Over the past", n, "days, your net worth has changed by", algorithm(fileData, n), "per day");
		}
	}
}

ReactDOM.render((
	<App></App>
), document.getElementById("app"));
