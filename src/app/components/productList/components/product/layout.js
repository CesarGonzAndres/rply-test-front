import React, { Fragment, PureComponent } from 'react';

import Carousel from './components/carousel';
import { Link } from "react-router-dom";
import './styles.scss';

class Product extends PureComponent {
  render() {
    const { productData, handleAppStatus, loading } = this.props;
    return (
      <div className="mr-4 mb-2">
        <div className="cardStyle card">
          {
            !productData && <div className="loader" />
          }
        {productData && 
          <Fragment>
              <Link to={`/productDetails/${productData.partNumber}`}>
              <Carousel loading={loading} className="pointer" images={productData.images} handleAppStatus={handleAppStatus} productData={productData} /></Link>
              <div className="card-body mt-1">
                <h5 className="card-title mb-0">{productData.attributes[0].value}</h5>
                <p className="card-text mb-0">{productData.name}</p>
                <div className="column start">
                  <del><small className="text-muted">{productData.prices.formattedListPrice}</small></del>
                  <small className="text-muted">{productData.prices.formattedOfferPrice}</small>
                  <small className="text-muted">{productData.prices.formattedCardPrice}</small>
                </div>
              </div>
          </Fragment>
        }
      </div>
    </div>
    );
  }
}

export default Product;

