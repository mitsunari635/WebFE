import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";

class PrintedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPrintedForms: [],
    };
  }

  componentDidMount() {
    this.props.loadPrintedForm();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.printedFormsRedux !== this.props.printedFormsRedux) {
      this.setState({
        arrPrintedForms: this.props.printedFormsRedux,
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

  toLabelPage = () => {
    if (this.props.history) {
      this.props.history.push(`/tem-nhan`);
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

  toPrintedFormPage = () => {
    if (this.props.history) {
      this.props.history.push(`/mau-in`);
    }
  };
  toPrintedPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-in`);
    }
  };

  render() {
    let arrPrintedForms = this.state.arrPrintedForms;
    return (
      <>
        <HomeHeader isShow={false} />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Mẫu in</span>
            </div>

            <div className="product-type">
              <div
                className="type-change"
                onClick={() => this.toPrintedPaperPage()}
              >
                Giấy in
              </div>
              <div
                className="type-change"
                onClick={() => this.toPrintedFormPage()}
              >
                Mẫu in
              </div>
              <div
                className="type-change"
                onClick={() => this.toPrintedRollPage()}
              >
                Cuộn in
              </div>
              <div className="type-change" onClick={() => this.toLabelPage()}>
                Tem nhãn
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
              {arrPrintedForms &&
                arrPrintedForms.length > 0 &&
                arrPrintedForms.map((item, index) => {
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
    printedFormsRedux: state.product.printedForms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrintedForm: () => dispatch(actions.fetchPrintedForm()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrintedForm)
);
