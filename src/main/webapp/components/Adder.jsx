//Shows examples of Bootstrap form input functions

import React, { Component } from 'react';
import {Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Feedback, Well} from 'react-bootstrap';
import axios from 'axios';
import config from '../config.js';

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
        	<div>
		      <form>
		        <FormGroup
		          controlId="formFieldOne"
		          validationState={this.getValidationFieldOne()}
		        >
		          <ControlLabel>Field One</ControlLabel>
		          <FormControl
		            type="text"
		            value={this.state.fieldOne}
		            placeholder="Enter Number"
		            onChange={this.handleChangeFieldOne}
		          />
		          <FormControl.Feedback />
		          <HelpBlock>Validation is based on number length.</HelpBlock>
		        </FormGroup>
		        <FormGroup
		          controlId="formFieldTwo"
		          validationState={this.getValidationFieldTwo()}
		        >
		          <ControlLabel>Field Two</ControlLabel>
		          <FormControl
		            type="text"
		            value={this.state.fieldTwo}
		            placeholder="Enter Number"
		            onChange={this.handleChangeFieldTwo}
		          />
		          <FormControl.Feedback />
		          <HelpBlock>Validation is based on number length.</HelpBlock>
		        </FormGroup>
		      </form>
		      <Well bsSize="large">{this.state.result}</Well>
		    </div>
        );
    }
}

export default Adder;