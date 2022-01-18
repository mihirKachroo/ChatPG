import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
