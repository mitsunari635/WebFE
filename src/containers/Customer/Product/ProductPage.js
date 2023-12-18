import React, { Component, useState } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import "./ProductPage.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import CurrencyFormat from "react-currency-format";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrAllProducts: [],
    };
  }

  componentDidMount() {
    this.props.loadAllProductPage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allProductPageRedux !== this.props.allProductPageRedux) {
      this.setState({
        arrAllProducts: this.props.allProductPageRedux,
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

  // handleSearch = (inputName) => {
  //     if()
  // }

  render() {
    let arrAllProducts = this.state.arrAllProducts;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Tất cả sản phẩm</span>
            </div>

            <div className="product-type-above">
              <div className="type-change" onClick={() => this.toProductPage()}>
                Tất cả sản phẩm
              </div>
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
              {arrAllProducts &&
                arrAllProducts.length > 0 &&
                arrAllProducts.map((item, index) => {
                  let imageBase64 = "";
                  let secondImageBase64 = "";
                  let thirdImageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  if (item.secondImage) {
                    secondImageBase64 = new Buffer.from(
                      item.secondImage,
                      "base64"
                    ).toString("binary");
                  }
                  if (item.thirdImage) {
                    thirdImageBase64 = new Buffer.from(
                      item.thirdImage,
                      "base64"
                    ).toString("binary");
                  }
                  let name = `${item.name}`;
                  let price = `${item.price}`;
                  let calType = `${item.describe}`;
                  // let discount = `${item.discount}`
                  return (
                    <div
                      className="slide-product"
                      key={index}
                      onClick={() => this.handleViewDetailProduct(item)}
                    >
                      <div className="prod-img-container">
                        <img src={imageBase64} alt="prod-img" />
                      </div>
                      <div className="product-detail">
                        <div className="product-name">{name}</div>
                        <div className="product-price">
                          <CurrencyFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          <div className="product-calculate-type">
                            {calType}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProductPageRedux: state.product.allProductsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProductPage: () => dispatch(actions.fetchAllProductPage()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
