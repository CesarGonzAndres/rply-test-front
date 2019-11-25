import React, { PureComponent, Fragment } from 'react';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import './scss/layout.scss';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

axios.defaults.baseURL = 'http://ec2-18-223-255-90.us-east-2.compute.amazonaws.com:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/productDetails/:productSKU" component={ProductDetails} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;

