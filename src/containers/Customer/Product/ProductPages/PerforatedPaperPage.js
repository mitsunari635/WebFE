import React, { Component, useState } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import Tab from "../../../HomePage/Section/Tab";
import ContactWays from "../../../HomePage/Section/ContactWays";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import CurrencyFormat from "react-currency-format";
import { toInteger } from "lodash";

class PerforatedPaperPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPerforatedPapers: [],
      amount: toInteger(1),
      form: "không chia",
    };
  }

  componentDidMount() {
    this.props.loadPerforatedPaper();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.perforatedPapersRedux !== this.props.perforatedPapersRedux) {
      this.setState({
        arrPerforatedPapers: this.props.perforatedPapersRedux,
      });
    }
  }

  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-san-pham/${product.id}`);
    }
  };

  moveToRollPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-cuon`);
    }
  };

  moveToPerforatedPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-dllt`);
    }
  };

  moveToPhotoPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-photo`);
    }
  };

  moveToPrintedPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-in`);
    }
  };

  toProductPage = () => {
    if (this.props.history) {
      this.props.history.push(`/san-pham`);
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
    let arrPerforatedPapers = this.state.arrPerforatedPapers;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">
                Giấy carbonless liên tục đục lỗ
              </span>
            </div>

            <div className="product-type-above">
              {/* <div className="type-change" onClick={() => this.toProductPage()}>
                Tất cả sản phẩm
              </div> */}
              <div
                className="type-change"
                onClick={() => this.moveToRollPaperPage()}
              >
                Giấy cuộn
              </div>
              <div
                className="type-change"
                onClick={() => this.moveToPerforatedPaperPage()}
              >
                Giấy carbonless liên tục đục lỗ
              </div>
              <div
                className="type-change"
                onClick={() => this.moveToPhotoPaperPage()}
              >
                Giấy photocopy
              </div>
              {/* <div className="type-change" onClick={() => this.moveToPrintedPaperPage()}>Giấy in</div> */}
            </div>

            <div className="product-body">
              {arrPerforatedPapers &&
                arrPerforatedPapers.length > 0 &&
                arrPerforatedPapers.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  let name = `${item.name}`;
                  let price = `${item.price}`;
                  let calType = `${item.describe}`;
                  let type = `${item.type}`;
                  // let discount = `${item.discount}`
                  return (
                    <div className="slide-product" key={index}>
                      <div className="prod-img-container">
                        <img
                          src={imageBase64}
                          alt="prod-img"
                          onClick={() => this.handleViewDetailProduct(item)}
                        />
                      </div>
                      <div className="product-detail">
                        <div
                          className="product-name"
                          onClick={() => this.handleViewDetailProduct(item)}
                        >
                          {name}
                        </div>
                        {type !== "đl5l" && (
                          <div className="product-price">
                            <CurrencyFormat
                              value={price}
                              displayType={"text"}
                              thousandSeparator={true}
                              className="text-danger"
                            />
                            <div className="product-calculate-type text-danger">
                              {calType}
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
                        )}

                        {type === "đl5l" && (
                          <div className="product-price text-danger text-uppercase">
                            Liên hệ đặt hàng
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <ContactWays />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    perforatedPapersRedux: state.product.perforatedPapers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPerforatedPaper: () => dispatch(actions.fetchPerforatedPaper()),
    addToCart: (cartItem) => dispatch(actions.addToCart(cartItem)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PerforatedPaperPage)
);
