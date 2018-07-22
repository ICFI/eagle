import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import config from '../config.js';

class Movies extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.performSearch()
	}
    
	performSearch() {
		const urlString = config.api.url

		fetch(urlString)
			.then(res => res.json())
			.then((result) => {
				const results = result

				this.setState({
					isLoaded: true,
					rows: results
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
    }
    
    render() {
        return (
			<BootstrapTable data={this.state.rows} striped hover>
				<TableHeaderColumn isKey dataField='id' dataSort={ true }>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='title' dataSort={ true }>Title</TableHeaderColumn>
				<TableHeaderColumn dataField='rating' dataSort={ true }>Rating</TableHeaderColumn>
			</BootstrapTable>
        );
    }
}

export default Movies;