/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { loadCategories } from './actions/categoryActions';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import materialize from 'materialize-css';
import './styles/styles.css'; 

const store = configureStore();
store.dispatch(loadCategories());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));