import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import Tab from "../../../HomePage/Section/Tab";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";

class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPackages: [],
    };
  }

  componentDidMount() {
    this.props.loadPackage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.packagesRedux !== this.props.packagesRedux) {
      this.setState({
        arrPackages: this.props.packagesRedux,
      });
    }
  }

  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-san-pham/${product.id}`);
    }
  };

  toPrintedRollPage = () => {
    if (this.props.history) {
      this.props.history.push(`/cuon-in`);
    }
  };

  toPackagePage = () => {
    if (this.props.history) {
      this.props.history.push(`/bao-bi`);
    }
  };

  toEnvelopePage = () => {
    if (this.props.history) {
      this.props.history.push(`/bao-thu`);
    }
  };
  toPrintedPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-in`);
    }
  };

  render() {
    let arrPackages = this.state.arrPackages;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Bao bì</span>
            </div>

            <div className="product-type-above">
              <div
                className="type-change"
                onClick={() => this.toPrintedPaperPage()}
              >
                Giấy in
              </div>
              <div
                className="type-change"
                onClick={() => this.toPrintedRollPage()}
              >
                Cuộn in
              </div>
              <div className="type-change" onClick={() => this.toPackagePage()}>
                Bao bì
              </div>
              <div
                className="type-change"
                onClick={() => this.toEnvelopePage()}
              >
                Bao thư
              </div>
            </div>

            <div className="product-body">
              {arrPackages &&
                arrPackages.length > 0 &&
                arrPackages.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  let name = `${item.name}`;
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
                        <div className="product-price">Giá cả liên hệ</div>
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
    packagesRedux: state.product.packages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPackage: () => dispatch(actions.fetchPackage()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Package)
);
