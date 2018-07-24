import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Callback from './components/Callback.jsx';
import Movies from './components/Movies.jsx';
import Adder from './components/Adder.jsx';
import Auth from './Auth.js';
import history from './history';

//Styles override
import './styles/main.css';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Route render={(props) => <Header auth={auth} {...props} />} />
                    <Switch>
                        <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
                        <Route exact path="/home" render={(props) => <Home auth={auth} {...props} />} />
                        <Route
                            exact
                            path="/movies"
                            render={props =>
                            auth.isAuthenticated() ? (
                                <Movies exact {...props} />
                            ) : (
                                <Redirect to="/home"/>
                            )
                            }
                        />
                        <Route
                            exact
                            path="/adder"
                            render={props =>
                            auth.isAuthenticated() ? (
                                <Adder exact {...props} />
                            ) : (
                                <Redirect to="/home"/>
                            )
                            }
                        />
                        <Redirect to="/home"/>
                    </Switch>
                    <Route path="/callback" render={(props) => {
                        handleAuthentication(props);
                        return <Callback {...props} /> 
                    }}/>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;