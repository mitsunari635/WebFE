import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailCart.scss";
import CurrencyFormat from "react-currency-format";
import { toInteger } from "lodash";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { addToOrder } from "../../../store/actions";
import { sendOrderEmail } from "../../../services/userService";

const DetailCart = ({ cartItems, SaveToOrder }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [customerPhone, setCustomerPhone] = useState(null);
  const [receiveAddress, setReceiveAdress] = useState(null);
  const [customerCo, setCustomerCo] = useState(null);
  const [customerTax, setCustomerTax] = useState(null);
  const [customerCoAddress, setCustomerCoAddress] = useState(null);

  const [couponConfirmed, setCouponConfirmed] = useState(false);

  const [show, setShow] = useState(false);

  const [isPopup, setIsPopup] = useState(true);

  const [item, setItem] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const generatedOrderNumber = randomNumber();

  const dispatch = useDispatch();

  const orderItem = cartItems.map((item, index) => {
    return {
      name: item.detailProduct ? item.detailProduct.name : item.item.name,
      amount: item.amount,
      price: item.detailProduct ? item.detailProduct.price : item.item.price,
      form: item.form,
      total:
        item.amount *
        (item.detailProduct ? item.detailProduct.price : item.item.price),
      type: item.detailProduct ? item.detailProduct.type : item.item.type,
    };
  });
  const totalAmount = cartItems
    .map((item) => {
      return item.amount;
    })
    .reduce((a, b) => a + b, 0);
  const preTotal = cartItems
    .map((item) => {
      return (
        item.amount *
        (item.detailProduct ? item.detailProduct.price : item.item.price)
      );
    })
    .reduce((a, b) => a + b, 0);
  const vat = (preTotal * 8) / 100;
  const discount = calcDiscount(preTotal);
  const shipFee = calcShipFee(preTotal);
  const couponDiscount = calcCouponDiscount(preTotal);
  const finalTotal = couponConfirmed
    ? preTotal + vat + shipFee - discount - couponDiscount
    : preTotal + vat + shipFee - discount;
  const history = useHistory();

  const coupon = "freeship";

  function randomNumber() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.random() * charactersLength);
      counter += 1;
    }
    return result;
  }

  function checkOrderNumber() {
    if (orderNumber === null) {
      setOrderNumber(generatedOrderNumber);
      return generatedOrderNumber;
    } else {
      return orderNumber;
    }
  }

  function handleRemove(index) {
    // Check if the index is already deleted.
    if (index > cartItems.length) {
      // If the index is already deleted, set it to the previous index.
      index -= 1;
    }
    cartItems.splice(index, 1);
    setItem([...cartItems]);
    localStorage.setItem("cartNumber", cartItems.length);
  }

  function incNum(item) {
    item.amount += 1;
    setItem(item.amount);
  }

  function decNum(item) {
    if (item.amount > 1) {
      item.amount -= 1;
      setItem(item.amount);
    }
  }

  function handleChange(index, e) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].amount = parseInt(e.target.value);
    setItem(updatedCartItems);
  }

  function checkValidate() {
    if (selectedOption === "Có") {
      if (!customerCo) {
        toast.error("Tên công ty không được để trống");
      } else if (!customerTax) {
        toast.error("Mã số thuế không được để trống");
      } else if (!/^[0-9]{1,13}$/.test(customerTax)) {
        toast.error("Mã số thuế không phù hợp. Xin hãy nhập lại");
      } else if (customerTax.length > 13) {
        toast.error("Mã số thuế không được quá 13 số");
      } else if (!customerCoAddress) {
        toast.error("Địa chỉ công ty không được để trống");
      } else if (!customerEmail) {
        toast.error("E-mail không được để trống");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        toast.error("E-mail của quý khách không phù hợp. Xin hãy nhập lại");
      } else {
        setShow(true);
      }
    } else {
      if (!customerName) {
        toast.error("Tên người mua không được để trống");
      } else if (/^[0-9\s.,!?]*$/.test(customerName)) {
        toast.error("Tên không phù hợp. Xin hãy nhập lại");
      } else if (!customerPhone) {
        toast.error("Số điện thoại không được để trống");
      } else if (!/^[0-9]{1,12}$/.test(customerPhone)) {
        toast.error("Số điện thoại không phù hợp. Xin hãy nhập lại");
      } else if (customerPhone.length < 10) {
        toast.error("Số điện thoại không được ít hơn 10 số");
      } else if (customerPhone.length > 12) {
        toast.error("Số điện thoại không được quá 12 số");
      } else if (!receiveAddress) {
        toast.error("Địa chỉ nhận hàng không được để trống");
      } else {
        setShow(true);
      }
    }
  }

  function handleConfirmOrder() {
    if (!selectedMethod) {
      toast.error("Xin chọn phương thức thanh toán");
    } else if (!selectedOption) {
      toast.error("Xin chọn tùy chọn in hóa đơn");
    } else {
      checkValidate();
    }
  }

  function handleMoveToOrder() {
    const orderDetails = {
      orderItem,
      generatedOrderNumber,
      customerName,
      customerPhone,
      receiveAddress,
      customerTax,
      customerCo,
      customerCoAddress,
      customerEmail,
      selectedMethod,
      selectedOption,
      preTotal,
      vat,
      discount,
      finalTotal,
      totalAmount,
      shipFee,
      couponDiscount,
    };
    dispatch(addToOrder(orderDetails));
  }

  async function handleSendEmail() {
    let isValid = checkValidate();
    if (isValid === false) return;

    await sendOrderEmail({
      name: customerName,
      phone: customerPhone,
      orderNumber: generatedOrderNumber,
    });
  }

  function handleSaveToOrder() {
    const description = [];
    const orderNumber = checkOrderNumber();
    if (cartItems && cartItems.length > 0) {
      cartItems.map((item, index) => {
        let object = {};
        object.orderNumber = orderNumber;
        object.productName = item.detailProduct?.name || item.item.name;
        object.amount = item.amount;
        object.prePrice =
          item.amount *
          (item.detailProduct ? item.detailProduct.price : item.item.price);
        object.form = item.form;
        object.type = item.detailProduct?.type || item.item.type;
        description.push(object);
      });
    }
    SaveToOrder({
      orderNumber: orderNumber,
      statusID: "S1",
      email: customerEmail,
      fullName: customerName,
      phoneNumber: customerPhone,
      taxNumber: customerTax,
      receiveAddress: receiveAddress,
      companyName: customerCo,
      companyAddress: customerCoAddress,
      description: description,
      preTotal: preTotal,
      vat: vat,
      shipFee: shipFee,
      totalPrice: finalTotal,
      discount: discount,
      payments: selectedMethod,
      billPrinted: selectedOption,
      couponDiscount: couponDiscount,
    });
    setItem(cartItems);
    // toast.success("Đặt hàng thành công");
    handleMoveToOrder();
    handleSendEmail();
    cartItems.splice(0, cartItems.length);
    history.push("/hoa-don");
  }

  function calcDiscount(preTotal) {
    if (preTotal < 5000000) {
      return 0;
    }
    if (5000000 <= preTotal) {
      if (10000000 <= preTotal) {
        if (20000000 <= preTotal) {
          return preTotal * (5 / 100);
        }
        return preTotal * (3 / 100);
      }
      return preTotal * (1 / 100);
    }
  }

  function calcShipFee(preTotal) {
    if (preTotal < 10000000) {
      return 35000;
    } else {
      if (preTotal < 20000000) {
        return 20000;
      } else {
        return 0;
      }
    }
  }

  function calcCouponDiscount(preTotal) {
    if (preTotal < 1000000) {
      return 0;
    } else {
      return toInteger(shipFee);
    }
  }

  function handleChangeCustom(e) {
    cartItems &&
      cartItems.length > 0 &&
      cartItems.map((item) => {
        item.form = e.target.value;
      });
  }

  function handleCheckCoupon(event) {
    let check = event.target.value;
    if (event.key === "Enter") {
      if (check === coupon) {
        setCouponConfirmed(true);
      } else {
        toast.error("Coupon không tồn tại");
      }
    }
  }

  function toProductPage() {
    history.push("/san-pham");
  }

  function toRollPaperPage() {
    history.push("/giay-cuon");
  }

  function toPerforatedPage() {
    history.push("/giay-dllt");
  }

  function toPhotoPage() {
    history.push("/giay-photo");
  }
  return (
    <>
      <HomeHeader />
      <Tab />
      {cartItems.length === 0 && (
        <div className="container">
          <div className="cart-title">Giỏ hàng</div>
          <div className="cart-empty-container">
            <div className="empty-cart">Không có sản phẩm trong giỏ hàng</div>
            <div className="return-pages">
              {/* <button onClick={toProductPage}>Xem tất cả sản phẩm</button> */}
              <button onClick={toRollPaperPage}>Xem giấy cuộn</button>
              <button onClick={toPerforatedPage}>
                Xem giấy đục lỗ liên tục
              </button>
              <button onClick={toPhotoPage}>Xem giấy photocopy</button>
            </div>
          </div>
        </div>
      )}
      {cartItems.length !== 0 && (
        <div className="container">
          <div className="cart-title">Giỏ hàng</div>
          <div className="cart-detail-container">
            <div className="cart-product-container">
              {cartItems.map((item, index) => {
                const itemTotalPrice =
                  item.amount *
                  (item.detailProduct
                    ? item.detailProduct.price
                    : item.item.price);
                return (
                  <div className="item-container" key={index}>
                    <div className="item-img">
                      <img
                        src={
                          item.detailProduct
                            ? item.detailProduct.image
                            : Buffer.from(item.item.image, "base64").toString(
                                "binary"
                              )
                        }
                      />
                    </div>

                    <div className="item-detail">
                      <div className="name">
                        {item.detailProduct
                          ? item.detailProduct.name
                          : item.item.name}
                      </div>
                      <div className="amount">
                        <span>Số lượng:</span>
                        <span className="decrease">
                          <button type="button" onClick={() => decNum(item)}>
                            -
                          </button>
                        </span>
                        <input
                          type="number"
                          className="amount-number"
                          value={item.amount}
                          onChange={(e) => handleChange(index, e)}
                        />
                        <span className="increase">
                          <button type="button" onClick={() => incNum(item)}>
                            +
                          </button>
                        </span>
                      </div>
                      {item.detailProduct
                        ? item.detailProduct.type === "đllt"
                        : item.item.type === "đllt" && (
                            <div className="form">
                              Hình thức: {item.form}
                              {/* <select
                              defaultValue={item.form}
                              onChange={(e) => handleChangeCustom(e)}
                            >
                              <option value="không chia">Không chia</option>
                              <option value="chia đôi">Chia đôi</option>
                            </select> */}
                            </div>
                          )}
                      <div className="item-total-price">
                        Thành tiền:
                        <CurrencyFormat
                          className="price-number"
                          value={itemTotalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <div className="currency">VNĐ</div>
                      </div>
                    </div>

                    <div className="delete-btn">
                      <button onClick={() => handleRemove(index)}>Xóa</button>
                    </div>
                  </div>
                );
              })}
              <div className="cart-summary">
                <div className="total-price">
                  <span className="total-text">Tạm tính:</span>
                  <span className="total-number">
                    <CurrencyFormat
                      value={preTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span className="total-currency">VNĐ</span>
                  </span>
                </div>

                <div className="vat">
                  <span className="vat-text">Thuế VAT (8%):</span>
                  <span className="vat-number">
                    <CurrencyFormat
                      value={vat}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span className="vat-currency">VNĐ</span>
                  </span>
                </div>

                <div className="shipFee">
                  <span className="ship-text">Phí vận chuyển:</span>
                  <span className="ship-number">
                    <CurrencyFormat
                      value={shipFee}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span className="ship-currency">VNĐ</span>
                  </span>
                  {/* {shipFee === 0 && (
                    <span className="ship-number">
                      <span className="ship-currency">Miễn phí</span>
                    </span>
                  )} */}
                </div>

                {preTotal >= toInteger(1000000) && (
                  <div className="coupon">
                    <span className="coupon-text">Mã giảm giá:</span>
                    {!couponConfirmed && (
                      <span className="coupon-input">
                        <input
                          type="text"
                          onKeyDown={(event) => handleCheckCoupon(event)}
                        />
                      </span>
                    )}

                    {couponConfirmed && (
                      <span className="coupon-number">
                        <span>-</span>
                        <CurrencyFormat
                          value={couponDiscount}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span className="coupon-currency">VNĐ</span>
                      </span>
                    )}
                  </div>
                )}

                {discount !== 0 && (
                  <div className="discount">
                    <span className="discount-text">Chiết khấu:</span>
                    <span className="discount-number">
                      <span>-</span>
                      <CurrencyFormat
                        value={discount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      <span className="discount-currency">VNĐ</span>
                    </span>
                  </div>
                )}

                <div className="final">
                  <span className="final-text">Tổng tiền thanh toán:</span>
                  <span className="final-number">
                    <CurrencyFormat
                      value={finalTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span className="final-currency">VNĐ</span>
                  </span>
                </div>
              </div>
              <button
                className="commit-btn"
                onClick={() => handleConfirmOrder(selectedOption)}
              >
                Đặt hàng
              </button>
            </div>

            <div className="cart-option-container">
              <div className="cart-payment">
                <div className="payment-choose">
                  <div className="payment-text">Phương thức thanh toán:</div>
                  <div className="payment-method">
                    <select
                      defaultValue="option"
                      onChange={(e) => setSelectedMethod(e.currentTarget.value)}
                    >
                      Chọn phương thức trả tiền
                      <option value="option" hidden>
                        Phương thức
                      </option>
                      <option value="Tiền mặt">Tiền mặt</option>
                      <option value="Chuyển khoản">Chuyển khoản</option>
                    </select>
                  </div>
                </div>
                {selectedMethod === "Tiền mặt" && (
                  <div className="cashPay">
                    <span>
                      Quý khách sẽ tiến hành thanh toán cho người vận chuyển sau
                      khi nhận và kiểm tra hàng
                    </span>
                  </div>
                )}
                {selectedMethod === "Chuyển khoản" && (
                  <div className="bankPay">
                    <span>
                      Quý khách vui lòng thanh toán theo số tài khoản sau:
                    </span>
                    <span>
                      Số tài khoản: 037-1001-888888 <br />
                      Ngân hàng Vietcombank - CN Tân Định
                    </span>
                    <span>
                      Cú pháp: Số điện thoại _ Mã hóa đơn <br />
                      (Mã hóa đơn lấy tại hóa đơn tạm tính sau khi xác nhận đặt
                      hàng)
                    </span>
                  </div>
                )}
              </div>

              <div className="bill-export">
                <div className="bill-option-select">
                  <div className="bill-text">
                    Xuất hóa đơn giá trị gia tăng:
                  </div>
                  <div className="bill-option">
                    <select
                      style={{ textAlign: "center" }}
                      defaultValue="method"
                      onChange={(e) => setSelectedOption(e.currentTarget.value)}
                    >
                      <option value="method" hidden>
                        Tùy chọn
                      </option>
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                    </select>
                  </div>
                </div>
                {selectedOption === "Có" && (
                  <div className="info-form">
                    <div className="form-title">
                      Phiếu nhập thông tin khách hàng
                    </div>
                    <div className="second-form">
                      <div className="col-6">
                        <label>Tên công ty:</label>
                        <span>*</span>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerCo(e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <label>Mã số thuế:</label>
                        <span>*</span>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerTax(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="second-form-below">
                      <div className="col-12">
                        <label>Địa chỉ công ty:</label>
                        <span>*</span>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerCoAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="first-form">
                      <div className="col-4">
                        <label>
                          E-mail:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <label>
                          Tên người mua:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <label>
                          Số điện thoại:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first-form-below">
                      <div className="col-12">
                        <label>
                          Địa chỉ nhận hàng:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setReceiveAdress(e.target.value)}
                        />
                        <div>
                          (Ngoài kv TP.HCM, chúng tôi sẽ liên hệ quý khách để
                          báo giá vận chuyển)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOption === "Không" && (
                  <div className="info-form">
                    <div className="form-title">
                      Phiếu nhập thông tin khách hàng
                    </div>
                    <div className="first-form">
                      <div className="col-4">
                        <label>E-mail:</label>
                        <input
                          className="form-control"
                          type="email"
                          onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <label>
                          Tên người mua:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <label>
                          Số điện thoại
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first-form-below">
                      <div className="col-12">
                        <label>
                          Địa chỉ giao hàng:
                          <span>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setReceiveAdress(e.target.value)}
                        />
                        <div>
                          (Ngoài kv TP.HCM, chúng tôi sẽ liên hệ quý khách để
                          báo giá vận chuyển)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {show && (
            <div className="alert-overlay">
              <Alert
                show={show}
                variant="warning"
                transition="true"
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "1000",
                  textAlign: "center",
                  transition: "step-start",
                }}
              >
                <Alert.Heading style={{ textAlign: "center" }}>
                  Lưu ý
                </Alert.Heading>
                <p style={{ textAlign: "center" }}>
                  Xin quý khách vui lòng kiểm tra lại danh sách sản phẩm đã đặt
                  và thông tin đặt hàng trước khi xác nhận. Sau khi xác nhận giỏ
                  hàng sẽ tự động xóa.
                </p>
                <p style={{ textAlign: "center" }}>Xin cảm ơn quý khách</p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={() => handleSaveToOrder()}
                    variant="outline-success"
                  >
                    Xác nhận
                  </Button>

                  <Button
                    onClick={() => setShow(false)}
                    variant="outline-danger"
                  >
                    Trở lại
                  </Button>
                </div>
              </Alert>
            </div>
          )}
        </div>
      )}
      <HomeFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SaveToOrder: (cartItems) => dispatch(actions.SaveToOrder(cartItems)),
    addToOrder: (orderDetails) => dispatch(actions.addToOrder(orderDetails)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailCart)
);
