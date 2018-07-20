import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {Form, FormControl, InputGroup} from 'react-bootstrap';
import './App.css';

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);

		this.state = {      
			car_1: "",
			car_2: "",
			inputValue: "0.00"
		};
	}

	checkFloat(value) {
		var result = parseFloat(0)

		if(!isNaN(value) && value !== "") {
			result = parseFloat(value)
		}

		return result;
	}

	calculateTotal() {
		this.setState({inputValue: parseFloat(this.checkFloat(this.state.car_1) + this.checkFloat(this.state.car_2)).toFixed(2)});
	}

	handleChange(e) {
		switch(e.target.name) {
			case "car_1":      
				this.setState({
					car_1: e.target.value
				}, () => {
					this.calculateTotal()
				})

				break;
			case "car_2":
				this.setState({
					car_2: e.target.value
				}, () => {
					this.calculateTotal()
				})

				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="App">
				<Helmet>
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
				</Helmet>
				<h1>${this.state.inputValue}</h1>
				<Form>
					<InputGroup>
						<InputGroup.Addon>$</InputGroup.Addon>
						<FormControl type="number" name="car_1" placeholder="0" value={this.state.car_1} onChange={this.handleChange} />
						<InputGroup.Addon>.00</InputGroup.Addon>
					</InputGroup>        
					<InputGroup>
						<InputGroup.Addon>$</InputGroup.Addon>
						<FormControl type="number" name="car_2" placeholder="0" value={this.state.car_2} onChange={this.handleChange} />
						<InputGroup.Addon>.00</InputGroup.Addon>
					</InputGroup>
				</Form>
			</div>
		);
	}
}

export default App
