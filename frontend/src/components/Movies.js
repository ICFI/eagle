import React, { Component } from 'react';
import { Table, Grid, Row, Col } from "react-bootstrap";

class Movies extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.performSearch("marvel")
    }
    
	performSearch(searchTerm) {
		const urlString = "https://api.themoviedb.org/3/search/movie?query=" + searchTerm + "&api_key=1b5adf76a72a13bad99b8fc0c68cb085"

		fetch(urlString)
			.then(res => res.json())
			.then((result) => {
				const results = result.results
				var movieRows = []

				results.forEach((movie) => {
					const movieRow = <tr><td>{movie.id}</td><td>{movie.title}</td><td>{movie.release_date}</td></tr>
					movieRows.push(movieRow)
				})

				this.setState({
					isLoaded: true,
					rows: movieRows
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
            <Grid fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Release Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Movies;