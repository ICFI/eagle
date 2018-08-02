//Shows examples of Bootstrap form input functions

import React, { Component } from 'react';
import {Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Feedback, Well} from 'react-bootstrap';
import axios from 'axios';
import config from '../config.js';
import '../styles/main.css';

class Adder extends Component {
	constructor(props) {
		super(props);

		this.handleChangeFieldOne = this.handleChangeFieldOne.bind(this);
		this.handleChangeFieldTwo = this.handleChangeFieldTwo.bind(this);

		this.state = {
			fieldOne: '',
			fieldTwo: '',
			result: ''
		};
	}

	componentDidMount() {
		//
    }

    componentDidUpdate(prevProps, prevState)
    {
    	//
    }

    handleChangeFieldOne(e) {
    	this.setState({ fieldOne: e.target.value });

    	// const added = this.state.fieldOne + " + " + this.state.fieldTwo;
    	// this.setState({result: added});
  	}

  	handleChangeFieldTwo(e) {
    	this.setState({ fieldTwo: e.target.value });

    	const added = this.state.fieldOne + " + " + e.target.value;
    	this.setState({result: added});
  	}

  	getValidationFieldOne() {
	    const length = this.state.fieldOne.length;
	    this.validate(length);
  	}

  	getValidationFieldTwo() {
	    const length = this.state.fieldTwo.length;
	    this.validate(length);
  	}

  	validate(length) {
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else if (length > 0) return 'error';

	    return null;
  	}

    render() {

        return (

		<div class="content-box">
        <h1>Day Counter</h1>
        <p>Welcome to Day Counter. Enter a start and end date to count the number of days in-between. </p>
	        <div class="row">
	            <div class="col-md-6">
	                <form>
	                    <div class="form-group">
	                        <label>START DATE:</label>
	                        <input type="date" class="form-control" placeholder="DD/MM/YYYY"/>
	                                  <FormControl
            type="date"
            value={this.state.value}
            placeholder="Enter text"/>
	                    </div> 
	                </form>
	            </div> 
	            <div class="col-md-6">
	                <form>
	                    <div class="form-group">
	                        <label>END DATE:</label>
	                        <input type="date" class="form-control" placeholder="DD/MM/YYYY"/>
	                    </div> 
	                </form>
	            </div> 
	            <div class="col-md-12">
	                <button class="btn btn-primary" type="submit">SUBMIT</button>
	            </div> 
	        </div> 
    	</div> 
        );
    }
}

export default Adder;