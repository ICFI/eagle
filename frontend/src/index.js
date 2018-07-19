import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import React from 'react';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();