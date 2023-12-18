import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailProduct.scss";
import { getDetailInforProduct } from "../../../services/productService";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-toastify";
import {
  sendContactEmail,
  sendRequestEmail,
} from "../../../services/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { toInteger } from "lodash";
import "react-image-lightbox/style.css";
import { CommonUtils } from "../../../utils";
import Zalo from "../../../assets/zalo-logo.png";
import PopupForm from "./PopupForm";
import RollPaper from "../../HomePage/Section/RollPaper";
import PhotoPaper from "../../HomePage/Section/PhotoPaper";
import PerforatedPaper from "../../HomePage/Section/PerforatedPaper";

class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailProduct: {},
      amount: toInteger(1),
      mainImg: "",
      form: "không chia",

      email: "",
      name: "",
      company: "",
      phone: "",
      content: "",
      previewImgUrl: "",
      image: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforProduct(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailProduct: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevStat, snapshot) {
    if (this.props.match && this.props.match.params) {
      const { id: prevId, name: prevName } = prevProps.match.params;
      const { id, name } = this.props.match.params;

      // Check if the product ID or name has changed
      if (id !== prevId || name !== prevName) {
        this.setState({
          form: "không chia",
          detailProduct: this.fetchProductDetails(id, name),
          mainImg: "",
          amount: 1,
        });
      }
    }
  }

  async fetchProductDetails(id, name) {
    let res;
    if (id) {
      res = await getDetailInforProduct(id);
    } else if (name) {
      res = await getDetailInforProduct(name);
    }
    if (res && res.errCode === 0) {
      this.setState({
        detailProduct: res.data,
      });
    }
  }

  handleChangeCustom = (event) => {
    this.setState({
      form: event.target.value,
    });
  };

  handleMoveToCart = () => {
    let { detailProduct, amount, form } = this.state;
    const cartItem = {
      detailProduct,
      amount,
      form,
    };

    this.props.addToCart(cartItem);
  };

  checkType = (value) => {
    let typeCheck = [
      "in",
      "mẫu in",
      "cuộn in",
      "bao bì",
      "bao thư",
      "tem",
      "nhãn",
      "chứng từ",
      "phiếu xuất kho",
      "phiếu nhập kho",
      "bill chuyển phát nhanh",
      "bill sea",
      "bill air",
      "hóa đơn atm",
      "hóa đơn edc",
      "phiếu lương",
      "khác",
      "đl5l",
    ];
    for (let i = 0; i < typeCheck.length; i++) {
      if (value === typeCheck[i]) {
        return false;
      }
    }
    return true;
  };

  checkDl5l = (value) => {
    let typeCheck = "đl5l";
    if (value === typeCheck) {
      return true;
    } else {
      return false;
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleChangeImage = (e) => {
    this.setState({
      mainImg: e.target.src,
    });
  };

  incNum = () => {
    let amount = this.state.amount;
    this.setState({
      amount: amount + 1,
    });
  };
  decNum = () => {
    let amount = this.state.amount;
    if (amount > 1) {
      this.setState({
        amount: amount - 1,
      });
    }
  };
  handleChange = (e) => {
    if (e.target.value >= 1) {
      this.setState({
        amount: toInteger(e.target.value),
      });
    } else {
      this.setState({
        amount: "",
      });
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

  handleCallPhone = () => {};

  handleSendPhoneEmail = async () => {
    let res = await sendRequestEmail({
      phone: this.state.phone,
    });

    if (res && res.errCode === 0) {
      toast.success("Yêu cầu đã gửi");
    } else {
      toast.error(`Vui lòng nhập số điện thoại để chúng tôi gọi lại quý khách`);
    }
  };

  render() {
    let { name, phone, content, company, image } = this.state;
    let { mainImg } = this.state;
    let { detailProduct } = this.state;
    let { amount, form } = this.state;
    let settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
    };

    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="product-detail-container">
          <div className="product-image">
            <div className="product-image-main">
              {mainImg !== "" && <img src={mainImg} alt="mainImg" />}
              {mainImg === "" && (
                <img src={detailProduct.image} alt="mainImg" />
              )}
            </div>
            <div className="product-image-option">
              <div className="option-image">
                <img
                  src={detailProduct.image}
                  alt="firstImg"
                  onClick={(e) => this.handleChangeImage(e)}
                />
              </div>

              {detailProduct.secondImage && (
                <div className="option-image">
                  <img
                    src={detailProduct.secondImage}
                    alt="secondImg"
                    onClick={(e) => this.handleChangeImage(e)}
                  />
                </div>
              )}

              {detailProduct.thirdImage && (
                <div className="option-image">
                  <img
                    src={detailProduct.thirdImage}
                    alt="thirdImg"
                    onClick={(e) => this.handleChangeImage(e)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="product-detail">
            <div className="product-info">
              <div className="product-name">{detailProduct.name}</div>
              {this.checkType(detailProduct.type) && (
                <div className="product-price">
                  Đơn giá: &nbsp;
                  <div className="price-number">
                    <CurrencyFormat
                      value={detailProduct.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </div>
                  {detailProduct.describe}
                </div>
              )}
              {!this.checkType(detailProduct.type) && (
                <div className="product-price">
                  <div className="price-number">{detailProduct.describe}</div>
                </div>
              )}

              <div className="product-describe">
                {detailProduct &&
                  detailProduct.Markdown &&
                  detailProduct.Markdown.contentHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailProduct.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </div>
            </div>

            <div className="product-selection">
              {detailProduct.type === "đllt" && (
                <div className="product-option">
                  <span>Chọn hình thức:</span>
                  <select
                    defaultValue="không chia"
                    onChange={this.handleChangeCustom}
                  >
                    <option value="không chia">Không chia</option>
                    <option value="chia đôi">Chia đôi</option>
                  </select>
                </div>
              )}

              {this.checkType(detailProduct.type) && (
                <div className="product-amount">
                  <span>Số lượng:</span>
                  <div className="amount">
                    <div className="decrease">
                      <button type="button" onClick={this.decNum}>
                        -
                      </button>
                    </div>
                    <input
                      type="number"
                      className="amount-number"
                      value={amount}
                      onChange={(e) => this.handleChange(e)}
                    />
                    <div className="increase">
                      <button type="button" onClick={this.incNum}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {this.checkType(detailProduct.type) && (
              <div className="cart-contact">
                <button
                  className="button-add-cart"
                  onClick={this.handleMoveToCart}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <div className="order">Thêm vào giỏ hàng</div>
                </button>

                <button className="button-phone" onClick={this.handleCallPhone}>
                  <i className="fas fa-phone"></i>
                  <div className="phone">0903539536</div>
                </button>

                <button className="button-zalo" onClick={this.handleCallZalo}>
                  <img src={Zalo}></img>
                  <div className="zalo">0903539536</div>
                </button>
              </div>
            )}

            {!this.checkType(detailProduct.type) &&
              !this.checkDl5l(detailProduct.type) && (
                <div className="cart-contact">
                  <PopupForm />

                  <button
                    className="button-phone"
                    onClick={this.handleCallPhone}
                  >
                    <i className="fas fa-phone"></i>
                    <div className="phone">0908336077</div>
                  </button>

                  <button className="button-zalo" onClick={this.handleCallZalo}>
                    <img src={Zalo}></img>
                    <div className="zalo">0908336077</div>
                  </button>
                </div>
              )}

            {this.checkDl5l(detailProduct.type) && (
              <div className="cart-contact">
                <PopupForm />

                <button className="button-phone" onClick={this.handleCallPhone}>
                  <i className="fas fa-phone"></i>
                  <div className="phone">0903539536</div>
                </button>

                <button className="button-zalo" onClick={this.handleCallZalo}>
                  <img src={Zalo}></img>
                  <div className="zalo">0903539536</div>
                </button>
              </div>
            )}

            <div className="request-contact">
              <div className="request-form">
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại để chúng tôi gọi lại"
                  pattern="[0-9]{10}"
                  required
                  value={phone}
                  onChange={(event) => {
                    this.onChangeInput(event, "phone");
                  }}
                ></input>
              </div>

              <button
                className="request-button"
                onClick={() => {
                  this.handleSendPhoneEmail();
                  this.setState({ phone: "" });
                }}
              >
                Yêu cầu gọi lại
              </button>
            </div>
          </div>
        </div>
        {!this.checkType && (
          <div>
            <RollPaper settings={settings} />
            <PhotoPaper settings={settings} />
            <PerforatedPaper settings={settings} />
          </div>
        )}
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailProduct: state.detailProduct,
    amount: state.amount,
    form: state.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cartItem) => dispatch(actions.addToCart(cartItem)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
);
