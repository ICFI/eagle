// Examples of REST interaction and use of Bootstrap Table methods

import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Form, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import config from '../config.js';

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			movie: { title: new String(), rating: new String() }
		};
	}

	componentDidMount() {
		this.performSearch();
    }

    componentDidUpdate()
    {
    	this.performSearch();
    }

    performSearch ()
    {
    	const urlString = config.api.getUrl;
    	axios.get(urlString)
			.then(res => {
				this.setState({ movies : res.data});
			})
			.catch(function (error) {
				console.log(error);
			}
		);
    }

    onDeleteRow(row)
    {
    	const urlString = config.api.deleteUrl;

    	console.log (row);
    	axios.delete(urlString + "/" + row)
	      	.then((result) => {
		      	//Just checking response in dev
		      	console.log(result);
	    	})
	      	.catch(function (error) {
				console.log(error);
			}
		);
    }

    onAddRow(row) {
    	const urlString = config.api.postUrl;
    	const title = row.title;
    	const rating = row.rating;

	    axios.post(urlString, { title, rating })
	      	.then((result) => {
		      	//Just checking response in dev
		      	console.log(result);
	    	})
	      	.catch(function (error) {
				console.log(error);
			}
		);
	}

    render() {
    	const options = {
    		onDeleteRow: this.onDeleteRow,
    		onAddRow: this.onAddRow
  		};
    	const selectRow = {
    		mode: 'checkbox',
    		clickToSelect: true
  		};
        return (
				<BootstrapTable data={this.state.movies} deleteRow selectRow={ selectRow } options={ options } insertRow exportCSV striped hover>
					<TableHeaderColumn hidden hiddenOnInsert dataAlign='left' isKey dataField='id' dataSort={ true }>ID</TableHeaderColumn>
					<TableHeaderColumn dataAlign='left' dataField='title' dataSort={ true }>Title</TableHeaderColumn>
					<TableHeaderColumn dataAlign='left' dataField='rating' dataSort={ true }>Rating</TableHeaderColumn>
				</BootstrapTable>
        );
    }
}

export default Movies;
