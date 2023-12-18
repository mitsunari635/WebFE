import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../ProductPage.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import Tab from "../../../HomePage/Section/Tab";
import ContactOrders from "../../../HomePage/Section/ContactOrders";

class Express extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrExpresses: [],
    };
  }

  componentDidMount() {
    this.props.loadExpress();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ExpressesRedux !== this.props.ExpressesRedux) {
      this.setState({
        arrExpresses: this.props.ExpressesRedux,
      });
    }
  }

  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-san-pham/${product.id}`);
    }
  };

  toLabelStampPage = () => {
    if (this.props.history) {
      this.props.history.push(`/nhan-tem`);
    }
  };

  toPrintedRollPage = () => {
    if (this.props.history) {
      this.props.history.push(`/cuon-in`);
    }
  };

  toImportExportPage = () => {
    if (this.props.history) {
      this.props.history.push(`/phieu-xuat-nhap-kho`);
    }
  };

  toExpressPage = () => {
    if (this.props.history) {
      this.props.history.push(`/bill-chuyen-phat-nhanh`);
    }
  };

  toPaycheckPage = () => {
    if (this.props.history) {
      this.props.history.push(`/phieu-luong`);
    }
  };

  toSeaAirBillPage = () => {
    if (this.props.history) {
      this.props.history.push(`/bill-sea-air`);
    }
  };

  toAtmBillPage = () => {
    if (this.props.history) {
      this.props.history.push(`/bill-atm`);
    }
  };

  toEdcBillPage = () => {
    if (this.props.history) {
      this.props.history.push(`/bill-edc`);
    }
  };

  toOtherPrintPage = () => {
    if (this.props.history) {
      this.props.history.push(`/mau-in-khac`);
    }
  };
  toDocumentPage = () => {
    if (this.props.history) {
      this.props.history.push(`/chung-tu`);
    }
  };

  render() {
    let arrExpresses = this.state.arrExpresses;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-page">
          <div className="product-content">
            <div className="product-header">
              <span className="title-section">Bill chuyển phát nhanh</span>
            </div>

            <div className="product-type-above">
              <div
                className="type-change"
                onClick={() => this.toPrintedRollPage()}
              >
                Cuộn in
              </div>
              <div
                className="type-change"
                onClick={() => this.toLabelStampPage()}
              >
                Nhãn / tem
              </div>
              <div
                className="type-change"
                onClick={() => this.toDocumentPage()}
              >
                Chứng từ
              </div>
              <div
                className="type-change"
                onClick={() => this.toImportExportPage()}
              >
                Phiếu xuất / nhập kho
              </div>
              <div
                className="type-change"
                onClick={() => this.toPaycheckPage()}
              >
                Phiếu lương
              </div>
            </div>
            <div className="product-type-below">
              <div className="type-change" onClick={() => this.toExpressPage()}>
                Bill chuyển phát nhanh
              </div>
              <div
                className="type-change"
                onClick={() => this.toSeaAirBillPage()}
              >
                Bill SEA / AIR
              </div>
              <div className="type-change" onClick={() => this.toAtmBillPage()}>
                Hóa đơn ATM
              </div>
              <div className="type-change" onClick={() => this.toEdcBillPage()}>
                Hóa đơn EDC / cà thẻ
              </div>
              <div
                className="type-change"
                onClick={() => this.toOtherPrintPage()}
              >
                Mẫu in khác
              </div>
            </div>

            <div className="product-body">
              {arrExpresses &&
                arrExpresses.length > 0 &&
                arrExpresses.map((item, index) => {
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
                        <div className="product-price text-danger">
                          Liên hệ đặt hàng
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <ContactOrders />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ExpressesRedux: state.product.expresses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadExpress: () => dispatch(actions.fetchExpress()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Express)
);