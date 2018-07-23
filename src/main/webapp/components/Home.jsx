import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";

class Home extends Component {
	login() {
		this.props.auth.login();
	}
	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<Grid>
				<Row>
					<Col xs={12} md={12}>
					<h4>Home</h4>
					{
						isAuthenticated() && (
							<p>You are logged in!</p>
						)
					}
					{
						!isAuthenticated() && (
							<p>You are not logged in! Please{' '}<a style={{ cursor: 'pointer' }} onClick={this.login.bind(this)}>Log In</a>{' '}to continue.</p>
						)
					}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Home;