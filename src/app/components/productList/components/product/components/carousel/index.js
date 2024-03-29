
import React, { PureComponent, Fragment } from 'react';
import Slider from "react-slick";
import './styles.scss';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      defaultImg: 0,
      imageReached: 0,
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        easing: 'linear',
        arrows: false
      }
    };
  };

  render() {
    const { images} = this.props;
    const { settings } = this.state;
    return (
        <Fragment>
            <Slider {...settings}>
            {images.map((image, index) => 
              <div key={index} className="item">
                <img className="card-img-top" src={`http:${image}`} alt="preview" />
              </div>
            )}
            </Slider>
        </Fragment>
    );
  }
}

export default Carousel;
