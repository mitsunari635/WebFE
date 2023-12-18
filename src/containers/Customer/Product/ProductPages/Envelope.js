import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import Tab from "../../../HomePage/Section/Tab";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";

class Envelope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrEnvelopes: [],
    };
  }

  componentDidMount() {
    this.props.loadEnvelope();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.envelopesRedux !== this.props.envelopesRedux) {
      this.setState({
        arrEnvelopes: this.props.envelopesRedux,
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
    let arrEnvelopes = this.state.arrEnvelopes;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Bao thư</span>
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
              {arrEnvelopes &&
                arrEnvelopes.length > 0 &&
                arrEnvelopes.map((item, index) => {
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
    envelopesRedux: state.product.envelopes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEnvelope: () => dispatch(actions.fetchEnvelope()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Envelope)
);
