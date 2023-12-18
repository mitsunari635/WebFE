import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import logo from "../../assets/LOGO LIEN SON.png";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import SearchBarApp from "./SearchBar/SearchBarApp";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({
        cartList: this.props.cartItems,
      });
      // Store cartList in local storage
      localStorage.setItem("cartNumber", this.props.cartItems.length);
    }
  }

  componentDidMount() {
    // Retrieve cartList from local storage
    const cartNumber = localStorage.getItem("cartNumber");
    if (cartNumber) {
      this.setState({
        cartList: this.props.cartItems,
      });
    }
  }

  moveToCart = () => {
    this.props.history.push(`/gio-hang`);
  };

  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/trang-chu`);
    }
  };

  render() {
    let cartNumber = this.state.cartList.length;
    return (
      <div className="container-fluid home-header-container">
        <div className="row">
          <div className="col-6 d-flex">
            <img
              className="embed-responsive-item img-fluid"
              src={logo}
              alt="logo"
              onClick={() => this.returnHome()}
              style={{ width: "15%", height: "100%" }}
            />

            <div className="container-fluid d-flex flex-column justify-content-around">
              <h4 className="text-uppercase font-weight-bold">
                Công ty TNHH Giấy vi tính Liên Sơn
              </h4>
              <h6>Địa chỉ: 34 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM</h6>
              <h6>Tel: (028)39.100.555 - (024)3636.4646</h6>
            </div>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-end">
            <div className="col-6">
              <SearchBarApp />
            </div>
            <div
              className="col-1 d-flex flex-wrap align-content-center justify-content-between rounded to-cart-button"
              onClick={() => this.moveToCart()}
            >
              <i className="fas fa-shopping-cart pt-1"></i>
              <div>{cartNumber}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    allProductPageRedux: state.product.allProductsPage,
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProductPage: () => dispatch(actions.fetchAllProductPage()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
