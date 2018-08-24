import React, {Component} from "react";
import {ButtonToolbar, Navbar, Button} from "react-bootstrap";

class Header extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const {isAuthenticated} = this.props.auth;

    return (<div>
      <Navbar fluid="fluid">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Eagle</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight="pullRight">
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.goTo.bind(this, "home")}>Home</Button>
              {!isAuthenticated() && (<Button id="qsFormBtn" bsStyle="warning" onClick={this.goTo.bind(this, "form")}>Form</Button>)}              
              {!isAuthenticated() && (<Button id="qsTaskerBtn" bsStyle="success" onClick={this.goTo.bind(this, "tasker")}>Tasker</Button>)}
              {!isAuthenticated() && (<Button id="qsLoginBtn" bsStyle="primary" onClick={this.login.bind(this)}>Log In</Button>)}
              {isAuthenticated() && (<Button id="qsLogoutBtn" bsStyle="danger" onClick={this.logout.bind(this)}>Log Out</Button>)}
            </ButtonToolbar>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </div>);
  }
}

export default Header;
