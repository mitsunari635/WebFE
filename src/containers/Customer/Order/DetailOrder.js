import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailOrder.scss";
import * as actions from "../../../store/actions";
import logo from "../../../assets/LOGO LIEN SON.png";
import CurrencyFormat from "react-currency-format";

const DetailOrder = () => {
  const orderDetails = useSelector((state) => state.cart.orderDetails);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("vi-VN")
  );

  const checkRoll = (value) => {
    if (value === "cuộn") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <HomeHeader />
      <Tab />

      <div className="container" id="order">
        <div
          className="container-fluid d-flex flex-column mt-2 border border-dark"
          style={{ maxWidth: "790px" }}
        >
          <div className="d-flex border-bottom border-dark ">
            <div className="col-8 d-flex justify-content-left">
              <img
                src={logo}
                alt="logo"
                style={{ width: "20%", height: "100%" }}
              />
              <div className="d-flex flex-column justify-content-around ml-2">
                <h5
                  className="font-weight-bold co-name"
                  style={{ color: "#354b9c" }}
                >
                  CÔNG TY TNHH GIẤY VI TÍNH LIÊN SƠN
                </h5>
                <div>Đ/c: 34 Nguyễn Bỉnh Khiêm, P.Đa Kao, Q.1, TP.HCM</div>
                <div>Điện thoại: (028) 39.100.555 - Hotline: 0903.539.536</div>
              </div>
            </div>

            <div className="col-4 d-flex flex-column justify-content-around">
              <h4
                className="font-weight-bold text-center"
                style={{ color: "#354b9c" }}
              >
                HÓA ĐƠN TẠM TÍNH
              </h4>
              <div className="text-center">Ngày: {currentDate}</div>
              <div className="text-center font-weight-bold">
                Mã hóa đơn: {orderDetails.generatedOrderNumber}
              </div>
            </div>
          </div>
          {orderDetails.selectedOption === "Có" && (
            <div className="border-bottom border-dark">
              <div className="row text-danger d-flex">
                <div className="col-9 font-weight-bold">
                  THÔNG TIN XUẤT HÓA ĐƠN
                </div>
                <div className="col-3 small font-weight-bold">
                  Xuất hóa đơn VAT: {orderDetails.selectedOption}
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  Tên công ty: {orderDetails.customerCo}
                </div>
                <div className="col-3">MST: {orderDetails.customerTax}</div>
              </div>
              <div className="row">
                <div className="col-12">
                  Địa chỉ công ty: {orderDetails.customerCoAddress}
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-column">
            <div className="border-bottom border-dark">
              <div className="row">
                <div className="col-9">
                  Tên người đặt hàng: {orderDetails.customerName}
                </div>
                <div className="col-3">SĐT: {orderDetails.customerPhone}</div>
              </div>
              <div className="row">
                <div className="col-12">
                  Địa chỉ giao hàng: {orderDetails.receiveAddress}
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  {orderDetails.selectedMethod === "Tiền mặt" && (
                    <div>
                      <div>
                        Phương thức thanh toán: {orderDetails.selectedMethod}
                      </div>
                      <div className="text-primary small">
                        (Quý khách thanh toán cho người vận chuyển sau khi nhận
                        và kiểm tra hàng)
                      </div>
                    </div>
                  )}

                  {orderDetails.selectedMethod === "Chuyển khoản" && (
                    <div>
                      <div>
                        Phương thức thanh toán:{orderDetails.selectedMethod}
                      </div>
                      <div className="text-primary small">
                        (Quý khách thanh toán theo số tài khoản 037-1001-888888
                        NH Vietcombank - CN Tân Định)
                        <br />
                        (Cú pháp "Số điện thoại _ Mã hóa đơn")
                      </div>
                    </div>
                  )}
                </div>
                {orderDetails.selectedOption === "Không" && (
                  <div className="col-3 text-danger">
                    Xuất hóa đơn VAT: {orderDetails.selectedOption}
                  </div>
                )}
              </div>
            </div>
            <table className="table-borderless table-sm">
              <tbody className="border-bottom border-dark">
                <tr className="text-center border-bottom border-dark">
                  <th scope="col">STT</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">SL</th>
                  <th scope="col" className="text-right">
                    Đơn giá
                  </th>
                  <th scope="col" className="text-right">
                    Thành tiền
                  </th>
                </tr>

                {Array.from({ length: 30 }).map((_, index) => {
                  const item =
                    orderDetails.orderItem && orderDetails.orderItem[index];
                  if (item) {
                    return (
                      <tr key={index} className="text-center">
                        <th scope="row" className="col-1">
                          {index + 1}
                        </th>
                        {checkRoll(item.type) && (
                          <td className="text-left col-7">{item.name}</td>
                        )}
                        {!checkRoll(item.type) && (
                          <td className="text-left col-7">
                            {item.name}({item.form})
                          </td>
                        )}
                        <td className="col-1">{item.amount}</td>
                        <td className="text-right col-1">
                          <CurrencyFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </td>
                        <td className="text-right col-2">
                          <CurrencyFormat
                            value={item.total}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp; VNĐ
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                })}
              </tbody>

              <tbody className="border-bottom border-dark">
                <tr className="text-center">
                  <td></td>
                  <td className="text-right" scope="col">
                    Tổng:
                  </td>
                  <td scope="col">{orderDetails.totalAmount}</td>
                  <td></td>
                  <td className="text-right" scope="col">
                    <CurrencyFormat
                      value={orderDetails.preTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    &nbsp; VNĐ
                  </td>
                </tr>

                <tr className="text-center">
                  <td></td>
                  <td className="text-right">VAT(8%):</td>
                  <td></td>
                  <td></td>
                  <td className="text-right">
                    <CurrencyFormat
                      value={orderDetails.vat}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    &nbsp; VNĐ
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td className="text-right">Phí vận chuyển:</td>
                  <td></td>
                  <td></td>
                  <td className="text-right">
                    <CurrencyFormat
                      value={orderDetails.shipFee}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    &nbsp; VNĐ
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td className="text-right text-danger">Mã giảm giá:</td>
                  <td></td>
                  <td></td>
                  <td className="text-right text-danger">
                    <span>-</span>
                    <CurrencyFormat
                      value={orderDetails.couponDiscount}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    &nbsp; VNĐ
                  </td>
                </tr>

                {orderDetails.discount !== 0 && (
                  <tr>
                    <td></td>
                    <td className="text-right text-danger">Chiết khấu:</td>
                    <td></td>
                    <td></td>
                    <td className="text-right text-danger">
                      <span>-</span>
                      <CurrencyFormat
                        value={orderDetails.discount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      &nbsp; VNĐ
                    </td>
                  </tr>
                )}

                <tr>
                  <td></td>
                  <td className="text-right text-uppercase">
                    <h5 className="font-weight-bold">Tổng tiền thanh toán:</h5>
                  </td>
                  <td></td>
                  <td className="text-right" colSpan={2}>
                    <h5 className="font-weight-bold">
                      <CurrencyFormat
                        value={orderDetails.finalTotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        className="total-value"
                      />
                      &nbsp; VNĐ
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <div className="text-uppercase font-weight-bold">
                Xin cảm ơn quý khách đã mua hàng
              </div>
              <div className="small">
                (Trong vòng 3 ngày kể từ ngày nhận được hàng, nếu quý khách
                không phản hồi về sản phẩm, chúng tôi tiến hành xuất hóa đơn VAT
                và sản phẩm sẽ không được đổi trả lại)
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <div
        className="container d-flex justify-content-end my-2"
        style={{ maxWidth: "790px" }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => window.print()}
        >
          In hóa đơn
        </button>
      </div>

      <HomeFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    orderDetails: state.cart.orderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToOrder: (orderDetails, orderProducts) =>
      dispatch(actions.addToOrder(orderDetails, orderProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder);
