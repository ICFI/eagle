import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Callback from './components/Callback';
import Protected from './components/Protected';
import Movies from './components/Movies';
import Auth from './Auth';
import history from './history';
import './App.css';

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
                    <Helmet>
                        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css" />
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
                    </Helmet>
                    <Route render={(props) => <Header auth={auth} {...props} />} />
                    <Switch>
                        <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
                        <Route exact path="/home" render={(props) => <Home auth={auth} {...props} />} />
                        <Route exact path="/movies" render={(props) => <Movies auth={auth} {...props} />} />
                        <Route
                            exact
                            path="/protected"
                            render={props =>
                            auth.isAuthenticated() ? (
                                <Protected exact {...props} />
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
                </div>
            </Router>
        );
    }
}

export default App;