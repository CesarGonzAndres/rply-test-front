import React, { PureComponent, Fragment } from 'react';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import './layout.scss';
import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-18-223-255-90.us-east-2.compute.amazonaws.com:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 'list', // details
      productSelected: []
    };
  };

  handleAppStatus = (productData, state) => {
    this.setState({
      status: state,
      productSelected: productData
    });
  }

  render() {
    const { status, productSelected } = this.state;
    return (
      <Fragment>
        {
          status === 'list' && <ProductList handleAppStatus={this.handleAppStatus} />
        }
        {
          status === 'details' && <ProductDetails handleAppStatus={this.handleAppStatus} productSelected={productSelected} />
        }
      </Fragment>
    );
  }
}

export default App;

