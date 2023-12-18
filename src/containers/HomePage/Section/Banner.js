import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../../assets/slider-img-1.png";
import img2 from "../../../assets/slider-img-2.png";
import img3 from "../../../assets/slider-img-3.png";
import * as actions from "../../../store/actions";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBanner: [],
    };
  }

  componentDidMount() {
    this.props.loadAllBannerPage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allBannerPageRedux !== this.props.allBannerPageRedux) {
      this.setState({
        arrBanner: this.props.allBannerPageRedux,
      });
    }
  }

  render() {
    let settings = {
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
    };

    let arrBanner = this.state.arrBanner;

    return (
      <div>
        <Slider {...settings}>
          {arrBanner &&
            arrBanner.length > 0 &&
            arrBanner.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer.from(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="container-fluid" key={index}>
                  <img src={imageBase64} alt="banner-img"></img>;
                </div>
              );
            })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,

    allBannerPageRedux: state.banner.allBannerPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllBannerPage: () => dispatch(actions.fetchAllBannerPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
