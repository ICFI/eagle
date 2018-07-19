import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import config from '../config';

class Movies extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.performSearch("marvel")
	}
    
	performSearch(searchTerm) {
		const urlString = "https://" + config.themoviedb.domain + "/3/search/movie?query=" + searchTerm + "&api_key=" + config.themoviedb.api_key

		fetch(urlString)
			.then(res => res.json())
			.then((result) => {
				const results = result.results

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
				<TableHeaderColumn isKey dataField='id' dataSort={ true }>Product ID</TableHeaderColumn>
				<TableHeaderColumn dataField='title'dataSort={ true }>Product Name</TableHeaderColumn>
				<TableHeaderColumn dataField='release_date' dataSort={ true }>Product Price</TableHeaderColumn>
			</BootstrapTable>
        );
    }
}

export default Movies;