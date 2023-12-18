import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import Tab from "../../../HomePage/Section/Tab";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";

class PrintedPaperPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPrintedPapers: [],
    };
  }

  componentDidMount() {
    this.props.loadPrintedPaper();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.printedPapersRedux !== this.props.printedPapersRedux) {
      this.setState({
        arrPrintedPapers: this.props.printedPapersRedux,
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
    let arrPrintedPapers = this.state.arrPrintedPapers;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Giấy in</span>
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
              {arrPrintedPapers &&
                arrPrintedPapers.length > 0 &&
                arrPrintedPapers.map((item, index) => {
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
    printedPapersRedux: state.product.printedPapers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrintedPaper: () => dispatch(actions.fetchPrintedPaper()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrintedPaperPage)
);
