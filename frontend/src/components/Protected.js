import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";

class Protected extends Component {
  render() {
    return (
		<Grid fluid>
			<Row>
				<Col xs={12} md={12}>
				<h4>Protected Page</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie arcu a urna hendrerit congue. Nullam et sapien massa. Donec gravida commodo leo, at maximus ante pellentesque et. Phasellus ultrices id ipsum porttitor fermentum. Nulla at gravida arcu, id gravida ipsum. Pellentesque eleifend augue ac faucibus consequat. Sed tincidunt mauris eget ex congue elementum. Nam convallis enim lacus, ac pharetra metus mattis at. Aliquam erat volutpat. Suspendisse eu dignissim tellus. Phasellus sodales ligula dui, et ullamcorper metus imperdiet mollis. Nulla viverra nec justo sed scelerisque.</p>
				<p>Fusce quis maximus tortor, nec pellentesque ante. Phasellus vitae convallis diam, ac iaculis leo. Quisque nunc mi, luctus ut feugiat id, sollicitudin ut est. Integer ut erat finibus, ornare ante in, bibendum dolor. Vestibulum dictum lacinia ante, hendrerit eleifend massa volutpat vitae. Praesent aliquet, libero tempor egestas vehicula, augue ante consequat enim, quis efficitur mi dui in lacus. Sed finibus orci tellus, et sagittis risus tempor a. Ut fringilla consectetur tincidunt. Aenean sodales placerat dui ac dictum. Morbi ultrices purus ac maximus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
				<p>Vestibulum id aliquam eros. Nulla consectetur nisi ut metus vehicula, non commodo arcu fringilla. Nunc dignissim rhoncus enim, ut facilisis nulla tempor id. Pellentesque a nisi quis purus bibendum consequat. Quisque lacus dui, volutpat nec quam id, dictum porttitor lorem. Mauris eu ultricies dui. Etiam vulputate scelerisque odio, ac dapibus augue feugiat vitae. Praesent posuere pharetra dolor, feugiat consectetur odio hendrerit eu. Mauris pharetra turpis tincidunt, ornare velit sit amet, cursus diam. Cras non tempus ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu porta lacus, vitae convallis leo. In vehicula nulla id leo finibus, at egestas nunc imperdiet. Quisque at varius odio.</p>
				</Col>
			</Row>
		</Grid>
    );
  }
}

export default Protected;