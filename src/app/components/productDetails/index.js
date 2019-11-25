import React, { PureComponent } from 'react';
import './styles.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import ImagesContainer from './components/imagesContainer';

class ProductDetails extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        easing: 'linear',
        arrows: false,
        swipe: true
      },
    };
  }

  componentDidMount() {
    this.getProductData();
    this.setState({ 
      loading: true,
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  async getProductData() {
    const { match: { params } } = this.props;
    await axios.get(`/api/product?productSKU=${params.productSKU}`)
      .then((response) => {
        const info = response.data.data;
        this.setState({ 
          productSelected: JSON.parse(info), 
          loading: false
        });
    });
  }

  render() {
    const { nav1, nav2, settings, productSelected, loading } = this.state;
    console.log(nav1, nav2);
    return (
      <div className="container">
        <Link to={`/`}>
          <h3 className="pointer mt-4" ><i className="fa fa-arrow-left"></i> Atras</h3>
        </Link>
        {
          loading && <div className="loader" />
        }
        {productSelected && <div className="row">
          <div className="col-md-7 col-sm-12 col-xs-12 mt-4 infoContainer">
            <div className="row">
              <ImagesContainer nav1={nav1} nav2={nav2} images={productSelected.images} settings={settings}  />
            </div>
          </div>
          <div className="container col-md-5 col-sm-12 col-xs-12 mt-4 sideContainer">
            <h5>{productSelected.attributes[0].value}</h5>
            <h3>{productSelected.name}</h3>
            <small className="text-muted">SKU: {productSelected.partNumber}</small>
            <p>{productSelected.shortDescription}</p>
            <div className="container row space-between">
              <small className="text-muted">Normal</small>
              <del><small className="text-muted">{productSelected.prices.formattedListPrice}</small></del>
            </div>
            <div className="container row space-between">
              <small className="text-muted">Internet</small>
              <small className="text-muted">{productSelected.prices.formattedOfferPrice}</small>
            </div>
            <div className="container row space-between">
              <small className="text-muted">Descuento</small>
              <p className="text-muted">{productSelected.prices.discountPercentage}%</p>
            </div>
          </div>
          <div className="accordion full-width mb-3" id="accordionExample">
          <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    DESCRIPCIÓN
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body highlighted-description"> 
                  {
                    <div dangerouslySetInnerHTML={{ __html: productSelected && productSelected.longDescription }} />
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    ESPECIFICACIONES
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  <table className="table table-striped">
                    <tbody>
                      {
                        productSelected && productSelected.attributes.map((attrib, index) => 
                          <tr key={index}>
                            <td>
                              {attrib.name}
                            </td>
                            <td>
                              {attrib.value}
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="btn btn-info collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    GARANTÍA LEGAL Y DEVOLUCIONES
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  <h3>GARANTÍA LEGAL Y DEL FABRICANTE</h3>
                  <p>La Garantía legal establece la cobertura dentro de los 3 primeros meses de adquirido el producto 
                  ante fallas, defectos de fabricación, no tuviera las características o no corresponda a lo informado 
                  al momento de la compra. En Ripley.com puedes retractarte de tu compra en los 10 días contados desde 
                  su recepción. Ver más sobre derecho a retracto.</p>
                  <p>La Garantía del Fabricante hace referencia a un compromiso de cobertura adicional que podría 
                  superar la garantía legal de los 3 primeros meses. Posteriormente, el fabricante es quien será 
                  responsable de recepcionar y velar por la garantía dependiendo de las vigencia y las condiciones 
                  ofrecidas y establecidas en cada caso. Ver más sobre garantía legal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default ProductDetails;
