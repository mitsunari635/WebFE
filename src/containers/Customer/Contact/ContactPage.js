import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import "./ContactPage.scss";
import { withRouter } from "react-router";
import logo from "../../../assets/LOGO LIEN SON.png";
import { sendContactEmail } from "../../../services/userService";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone: "",
      content: "",
      company: "",
      image: "",
      previewImgUrl: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSendEmail = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let res = await sendContactEmail({
      name: this.state.name,
      company: this.state.company,
      email: this.state.email,
      phone: this.state.phone,
      content: this.state.content,
    });

    if (res && res.errCode === 0) {
      toast.success("Email sent");
    } else {
      toast.error(`Can't send email`);
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSendEmail = async () => {
    let isValid = this.checkValidate();
    if (isValid === false) return;

    let res = await sendContactEmail({
      name: this.state.name,
      company: this.state.company,
      phone: this.state.phone,
      content: this.state.content,
      image: this.state.image,
      previewImgUrl: this.state.previewImgUrl,
    });

    if (res && res.errCode === 0) {
      toast.success("Email đã gửi");
      this.setState({
        name: "",
        company: "",
        phone: "",
        content: "",
        image: "",
        previewImgUrl: "",
      });
    } else {
      toast.error(`Không thể gửi Email`);
    }
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        image: base64,
      });
    }
  };

  checkValidate = () => {
    if (this.state.name) {
      if (this.state.name.length > 40) {
        toast.error(
          "Họ tên quý khách không được quá 40 ký tự. Xin hãy nhập lại"
        );
        return false;
      }
      if (this.state.name.match("[0-9]")) {
        toast.error("Họ tên quý khách không được chứa số. Xin hãy nhập lại");
        return false;
      }
    } else {
      toast.error("Xin hãy nhập họ tên quý khách");
      return false;
    }
    if (this.state.phone) {
      if (this.state.phone.length !== 10) {
        toast.error(
          "Số điện thoại quý khách phải có đúng 10 số. Xin hãy nhập lại"
        );
        return false;
      }
      if (this.state.phone.match("[^0-9]")) {
        toast.error(
          "Số điện thoại quý khách chỉ được chứa số. Xin hãy nhập lại"
        );
        return false;
      }
    } else {
      toast.error("Xin hãy nhập số điện thoại quý khách");
      return false;
    }
    if (!this.state.content) {
      toast.error("Nội dung không được để trống");
      return false;
    }
  };

  render() {
    let { company, name, phone, content } = this.state;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="contact-container container-fluid">
          <div className="container-fluid d-flex justify-content-center my-2">
            <img
              src={logo}
              alt="prod-img"
              style={{ width: "10%", height: "10%" }}
            />

            <div className="ml-4">
              <h4 className="font-weight-bold text-uppercase">
                Công ty TNHH Giấy vi tính Liên Sơn
              </h4>
              <h6>Trụ sở: 34 Nguyễn Bỉnh Khiêm, Quận 1, TP. Hồ CHí Minh</h6>
              <h6>SĐT: (028) 39.100.555 _ (024) 3636.4646 - MST: 0301452923</h6>
              <h6>E-mail: info@lienson.vn - Website: www.lienson.vn</h6>
              <h6>
                Số tài khoản: 037 1001 888888 tại NH Vietcombank - CN Tân Định
              </h6>
            </div>
          </div>
          <div className=" container-fluid rounded-top border-top border-right border-left border-dark pb-4">
            <div className="container-fluid ">
              <div className="title">
                <h3 className="font-weight-bold">Liên hệ qua E-mail</h3>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <label>
                    Họ tên người đặt hàng:
                    <span>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      this.onChangeInput(event, "name");
                    }}
                  />
                </div>
                <div className="col">
                  <label>Tên công ty:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={company}
                    onChange={(event) => {
                      this.onChangeInput(event, "company");
                    }}
                  />
                </div>
                <div className="col">
                  <label>
                    Số điện thoại:
                    <span>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(event) => {
                      this.onChangeInput(event, "phone");
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>
                    Nội dung:
                    <span>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(event) => {
                      this.onChangeInput(event, "content");
                    }}
                    type="text"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <label>Hình ảnh đính kèm: </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh<i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="col d-flex align-items-end">
                  <button
                    className="p-2"
                    onClick={() => this.handleSendEmail()}
                  >
                    Gửi E-mail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactPage)
);
