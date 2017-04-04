import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Home from './Component/Home';
import Cart from './Component/Cart';
import Header from './Component/Header';
import appstate from './Reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(appstate);

class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Header}>
            <IndexRoute component={Home}/>
            <Route path="/cart" component={Cart} ></Route>
          </Route>  
        </Router>
      </Provider>
    );
  }
}

export default App;
