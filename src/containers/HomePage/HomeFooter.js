import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import { getDetailInforPolicy } from "../../services/policyService";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrAllPolicy: [],
    };
  }

  componentDidMount() {
    this.props.loadAllPolicyPage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allPolicyPageRedux !== this.props.allPolicyPageRedux) {
      this.setState({
        arrAllPolicy: this.props.allPolicyPageRedux,
      });
    }

    if (this.props.match && this.props.match.params) {
      const { id: prevId } = prevProps.match.params;
      const { id } = this.props.match.params;

      // Check if the product ID or name has changed
      if (id !== prevId) {
        this.fetchProductDetails(id);
      }
    }
  }

  async fetchProductDetails(id) {
    let res = await getDetailInforPolicy(id);
    if (res && res.errCode === 0) {
      this.setState({
        detailPolicy: res.data,
      });
    }
  }

  handleViewDetailPolicy = (policy) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-chinh-sach/${policy.id}`);
    }
  };

  render() {
    let arrAllPolicy = this.state.arrAllPolicy;
    return (
      <div className="container-fluid home-footer-container">
        <div className="row py-1">
          <div className="col">
            <div className="container-fluid">
              <h4 className="font-weight-bold text-uppercase">
                Giới thiệu công ty
              </h4>
              <div className="col d-flex flex-column justify-content-between">
                <span>
                  Công ty TNHH Giấy Vi Tính Liên Sơn thành lập từ năm 1993, là
                  Doanh nghiệp được Bộ Tài Chính và Tổng Cục Thuế cấp giấy phép
                  cung cấp giải pháp hóa đơn điện tử, phiếu xuất kho điện tử,
                  chứng từ thuế thu nhập cá nhân điện tử, in vé, bill và các
                  loại biểu mẫu mang tính đặc thù, bảo mật cao. Công ty TNHH
                  Giấy Vi Tính Liên Sơn hoạt động kinh doanh trong nhiều lĩnh
                  vực, bao gồm:
                </span>
                <span>
                  &#x261B;Sản xuất - cung cấp các loại giấy in vi tính đục lỗ
                  liên tục, giấy Photocopy, giấy Carbonless tự nhân bản, giấy in
                  decal, giấy in nhiệt Thermal, giấy ATM, giấy cho máy thanh
                  toán thẻ ghi nợ Visa, Master Card, giấy dùng cho hệ thống máy
                  lấy số thứ tự xếp hàng tự động.
                </span>
                <span>
                  &#x261B;Phân phối các loại giấy Photocopy A0, A1, A3, A4 từ
                  các thương hiệu IK Natural, Double A, Number 1, Multipurpose,
                  Excel Pro, …và giấy cuộn A0, A1 chất lượng cao để sử dụng in
                  cho các bản vẽ thiết kế và đồ họa.
                </span>
                <span>
                  &#x261B;Cung cấp giải pháp hoá đơn điện tử và chữ ký số.
                </span>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="container-fluid">
              <h4 className="font-weight-bold text-uppercase">
                Công ty TNHH Giấy vi tính Liên Sơn
              </h4>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Trụ sở:</div>
                <div className="col d-flex flex-column">
                  <span>34 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM</span>
                  <span>Tel: (028)39.100.555</span>
                  <span>
                    ĐKKD số: 0301452923; Sở KHĐT TP.HCM cấp ngày 24/11/1993
                  </span>
                  <span>Website: www.lienson.vn - Email: info@lienson.vn</span>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Hà Nội:</div>
                <div className="col d-flex flex-column">
                  <span>
                    780 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, TP. Hà Nội
                  </span>
                  <span>Tel: (024)3636.4646</span>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Đà Nẵng:</div>
                <div className="col d-flex flex-column">
                  <span>29 Phạm Nhữ Tăng, Quận Thanh Khê, TP. Đà Nẵng</span>
                  <span>Tel: 0905.867.889 - 0913.884.207</span>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Tây Ninh:</div>
                <div className="col d-flex flex-column">
                  <span>302 Đường Tua Hai, KP2, Phường 1, TP. Tây Ninh</span>
                  <span>Tel: (0276)3.818.181 - 0913.884.207</span>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Đồng Nai:</div>
                <div className="col d-flex flex-column">
                  <span>139 CMT8, P. Hòa Bình, TP. Biên Hòa</span>
                  <span>Tel: (0251)384.2383</span>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 font-weight-bold">Bình Dương:</div>
                <div className="col d-flex flex-column">
                  <span>
                    35 Thích Quảng Đức, KP.2, P. Phú Hòa, TX. Thủ Dầu Một
                  </span>
                  <span>Tel: (0274)3844.118</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="container-fluid">
              <h4 className="font-weight-bold text-uppercase">Chính sách</h4>
              {arrAllPolicy &&
                arrAllPolicy.length > 0 &&
                arrAllPolicy.map((item, index) => {
                  let name = `${item.name}`;
                  return (
                    <div
                      className="col d-flex flex-column justify-content-between policy-nav"
                      key={index}
                      onClick={() => this.handleViewDetailPolicy(item)}
                    >
                      <span>{name}</span>
                    </div>
                  );
                })}
            </div>

            <div className="container-fluid mt-3">
              <div className="social d-flex justify-content-center">
                <a href="https://www.facebook.com/congtygiayvitinhlienson">
                  <i className="fab fa-facebook-f fb text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row copyrights-container">
          <div className="container-fluid text-center">
            <span>&copy; LienSon, 2023.</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPolicyPageRedux: state.policy.allPoliciesPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllPolicyPage: () => dispatch(actions.fetchAllPolicyPage()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
