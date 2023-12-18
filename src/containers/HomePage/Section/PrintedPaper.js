import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
// Import css files
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class PrintedPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPrintedPapers: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.printedPapersRedux !== this.props.printedPapersRedux) {
      this.setState({
        arrPrintedPapers: this.props.printedPapersRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadPrintedPaper();
  }

  moveToPrintedPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-in`);
    }
  };

  render() {
    let arrPrintedPapers = this.state.arrPrintedPapers;
    return (
      <div className="section-product">
        <div className="product-content">
          <div className="product-header">
            <span className="title-section">Mẫu in</span>
            <button
              className="btn-section"
              onClick={() => this.moveToPrintedPaperPage()}
            >
              Xem thêm
            </button>
          </div>

          <div className="product-body">
            <Slider {...this.props.settings}>
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
                  return (
                    <div className="slide-product" key={index}>
                      <div className="prod-img-container">
                        <img loading="lazy" src={imageBase64} alt="prod-img" />
                      </div>
                      <div className="product-detail">
                        <div className="product-name">{name}</div>
                        <div className="product-price">Giá cả liên hệ</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    printedPapersRedux: state.product.printedPapers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrintedPaper: () => dispatch(actions.fetchPrintedPaper()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrintedPaper)
);
