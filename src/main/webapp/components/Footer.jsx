import React from 'react';
import { Grid, Nav, NavItem } from 'react-bootstrap';

function Footer(/*props*/) {
  return (
    <footer>
      <Grid>
        <Nav justified>
          <NavItem
            eventKey={1}>
            Privacy Policy
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
          <NavItem
            eventKey={3}>
            Other External links
          </NavItem>
        </Nav>
      </Grid>
    </footer>
  );
}

export default Footer;