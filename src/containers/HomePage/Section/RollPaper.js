import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
// Import css files
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import CurrencyFormat from "react-currency-format";
import { toInteger } from "lodash";

class RollPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRollPapers: [],
      amount: toInteger(1),
      form: "không chia",

      isSliderDragging: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.rollPapersRedux !== this.props.rollPapersRedux) {
      this.setState({
        arrRollPapers: this.props.rollPapersRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadRollPaper();
  }

  handleSliderBeforeChange = () => {
    this.setState({
      isSliderDragging: true,
    });
  };

  handleSliderAfterChange = () => {
    this.setState({
      isSliderDragging: false,
    });
  };

  handleViewDetailProduct = (product) => {
    if (!this.state.isSliderDragging) {
      if (this.props.history) {
        this.props.history.push(`/chi-tiet-san-pham/${product.id}`);
      }
    }
  };

  moveToRollPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-cuon`);
    }
  };

  addToCart = (item) => {
    let { amount, form } = this.state;
    const cartItem = {
      item,
      amount,
      form,
    };

    this.props.addToCart(cartItem);
  };

  render() {
    let arrRollPapers = this.state.arrRollPapers;
    return (
      <div className="container-fluid product-section-container pb-3">
        <div className="container-fluid d-flex justify-content-between align-items-center pt-2 section-header-container">
          <h2 className="font-weight-bold font-size-serif">Giấy cuộn</h2>
          <button
            className="see-more"
            onClick={() => this.moveToRollPaperPage()}
          >
            Xem thêm
          </button>
        </div>
        <div className="container-fluid product-slider-container">
          <Slider
            {...this.props.settings}
            beforeChange={this.handleSliderBeforeChange}
            afterChange={this.handleSliderAfterChange}
          >
            {arrRollPapers &&
              arrRollPapers.length > 0 &&
              arrRollPapers.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer.from(item.image, "base64").toString(
                    "binary"
                  );
                }
                let name = `${item.name}`;
                let price = `${item.price}`;
                let calType = `${item.describe}`;
                return (
                  <div
                    className="container-fluid product-container"
                    key={index}
                  >
                    <div className="embed-responsive embed-responsive-1by1">
                      <img
                        loading="lazy"
                        src={imageBase64}
                        alt="prod-img"
                        className="embed-responsive-item img-fluid"
                        onClick={() => this.handleViewDetailProduct(item)}
                      />
                    </div>
                    <h5 className="font-weight-bold">{name}</h5>
                    <div className="d-flex justify-content-between">
                      <div className="col d-flex align-items-center product-price-container text-danger font-weight-bold">
                        <div>
                          <CurrencyFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </div>
                        <div className="ml-1">{calType}</div>
                      </div>
                      <div className="col-7 d-flex justify-content-center align-items-center">
                        <button
                          className="add-cart-button"
                          onClick={() => this.addToCart(item)}
                        >
                          <i className="fas fa-shopping-cart"></i>
                          <span className="ml-1">Thêm vào giỏ hàng</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    rollPapersRedux: state.product.rollPapers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRollPaper: () => dispatch(actions.fetchRollPaper()),
    addToCart: (cartItem) => dispatch(actions.addToCart(cartItem)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RollPaper)
);
