import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/index.scss';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
