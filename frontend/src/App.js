import React, { Component } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './components/Home';
import Callback from './components/Callback';
import Protected from './components/Protected';
import Movies from './components/Movies';
import Auth from './Auth';
import history from './history';

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
            <div>
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