import ReactDOM from 'react-dom';
import './bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import React from 'react';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();