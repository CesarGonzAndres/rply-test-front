import React, { PureComponent } from 'react';

import Product from './layout';
import axios from 'axios';

class ProductContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      previewImages: [], 
      loading: true
    };
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await axios.get(`/api/product?productSKU=${this.props.product.productSKU}`)
      .then((response) => {
        const info = response.data.data;
        this.setState({ 
          productData: JSON.parse(info), 
          loading: false
        });
      });
  }

  render() {
    const { productData, loading } = this.state;
    const { handleAppStatus } = this.props;
    return (
      <Product productData={productData} loading={loading} handleAppStatus={handleAppStatus} />
    );
  }
}

export default ProductContainer;
