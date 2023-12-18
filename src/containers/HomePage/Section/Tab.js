import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import { withRouter } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import Popup from "reactjs-popup";

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/trang-chu`);
    }
  };

  toProductPage = () => {
    if (this.props.history) {
      this.props.history.push(`/san-pham`);
    }
  };

  toContactPage = () => {
    if (this.props.history) {
      this.props.history.push(`/lien-he`);
    }
  };

  toNewsPage = () => {
    if (this.props.history) {
      this.props.history.push(`/tin-tuc`);
    }
  };

  toPrintPaperPage = () => {
    if (this.props.history) {
      this.props.history.push(`/giay-in`);
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

  toPrintedRollPage = () => {
    if (this.props.history) {
      this.props.history.push(`/cuon-in`);
    }
  };

  toLabelStampPage = () => {
    if (this.props.history) {
      this.props.history.push(`/nhan-tem`);
    }
  };

  toStampPage = () => {
    if (this.props.history) {
      this.props.history.push(`/tem`);
    }
  };

  toDocumentPage = () => {
    if (this.props.history) {
      this.props.history.push(`/chung-tu`);
    }
  };

  toExpressPage = () => {
    if (this.props.history) {
      this.props.history.push(`/bill-chuyen-phat-nhanh`);
    }
  };
  toImportExportPage = () => {
    if (this.props.history) {
      this.props.history.push(`/phieu-xuat-nhap-kho`);
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

  handleDropdownToggle = (isOpen, event, metadata) => {
    this.setState({ dropdownActive: isOpen });
  };

  render() {
    return (
      <div className="menu tab-container container-fluid d-flex text-center align-items-center text-uppercase  p-1">
        <div className="menu-item tab col">
          <h5 className="m-0" onClick={() => this.returnHome()}>
            Trang chủ
          </h5>
        </div>

        <Popup
          trigger={
            <div className="menu-item tab col">
              <h5 className="m-0">In biểu mẫu</h5>
            </div>
          }
          position="bottom"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={100}
          mouseEnterDelay={0}
          contentStyle={{ padding: "3px", border: "none", fontSize: "20px" }}
          arrow={false}
        >
          <div className="tab-nav-container">
            <div className="tab-child">
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toPrintedRollPage();
                }}
              >
                Cuộn in
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toLabelStampPage();
                }}
              >
                Nhãn / tem
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toDocumentPage();
                }}
              >
                Chứng từ
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toImportExportPage();
                }}
              >
                Phiếu xuất / nhập kho
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toPaycheckPage();
                }}
              >
                Phiếu lương
              </div>

              <div
                className="tab-nav col"
                onClick={() => {
                  this.toSeaAirBillPage();
                }}
              >
                Bill SEA / AIR
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toAtmBillPage();
                }}
              >
                Hóa đơn ATM
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toEdcBillPage();
                }}
              >
                Hóa đơn EDC / cà thẻ
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.toExpressPage();
                }}
              >
                Bill chuyển phát nhanh
              </div>

              <div
                className="tab-nav col"
                onClick={() => {
                  this.toOtherPrintPage();
                }}
              >
                Mẫu in khác
              </div>
            </div>
          </div>
        </Popup>

        <Popup
          trigger={
            <div className="menu-item tab col">
              <h5 className="m-0">Sản phẩm</h5>
            </div>
          }
          position="bottom"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={100}
          mouseEnterDelay={0}
          contentStyle={{ padding: "3px", border: "none", fontSize: "20px" }}
          arrow={false}
        >
          <div className="tab-nav-container">
            <div className="tab-child ">
              <div
                className="tab-nav col"
                onClick={() => {
                  this.moveToRollPaperPage();
                }}
              >
                Giấy cuộn
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.moveToPerforatedPaperPage();
                }}
              >
                Giấy carbonless liên tục đục lỗ
              </div>
              <div
                className="tab-nav col"
                onClick={() => {
                  this.moveToPhotoPaperPage();
                }}
              >
                Giấy photocopy
              </div>
            </div>
          </div>
        </Popup>
        <div className="tab col">
          <h5 className="m-0" onClick={() => this.toNewsPage()}>
            Tin tức
          </h5>
        </div>
        <div className="tab col">
          <h5 className="m-0" onClick={() => this.toContactPage()}>
            Liên hệ
          </h5>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tab));
