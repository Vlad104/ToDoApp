import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { rootReducer } from './store/index'
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
