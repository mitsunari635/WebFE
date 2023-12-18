import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageOrder.scss";
import { Button, Modal, Table } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import logo from "../../../assets/LOGO LIEN SON.png";
import soundFile from "../../../assets/soundEffect.mp3";

class TableManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderRedux: [],
      statusArr: [],
      statusID: "",
      showModal: false,
      orderNumber: "",
      address: "",
      time: "",
      preTotal: 0,
      vat: 0,
      shipFee: 0,
      discount: 0,
      couponDiscount: 0,
      totalPrice: 0,
      fullName: "",
      phoneNumber: "",
      payment: "",
      billPrinted: "",
      discount: 0,
      shipFee: 0,

      newOrders: [],
      statusNum: 0,
    };
  }
  componentDidMount() {
    this.props.fetchOrderRedux();
    this.props.fetchStatusRedux();
    this.props.checkNewOrder();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listOrders !== this.props.listOrders) {
      this.setState({
        orderRedux: this.props.listOrders,
      });
    }

    // if (prevState.orderRedux !== this.state.orderRedux) {
    //   const audio = new Audio(soundFile);
    //   audio.play();
    // }

    if (prevProps.listDetail !== this.props.listDetail) {
      this.setState({
        detailProduct: this.props.listDetail,
      });
    }

    if (prevProps.listStatus !== this.props.listStatus) {
      // let arrStatus = this.props.statusRedux;
      this.setState({
        statusArr: this.props.listStatus,
        // status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
      });
    }

    if (prevProps.listNewOrders !== this.props.listNewOrders) {
      this.setState({
        newOrders: this.props.listNewOrders,
      });
    }
  }
  calcShipFee(preTotal) {
    if (preTotal <= 5000000) {
      return 35000;
    }
    if (5000000 < preTotal) {
      if (10000000 < preTotal) {
        return 0;
      }
      return 20000;
    }
  }
  checkStatus(statusId, statusList) {
    const matchedItem = statusList.find((item) => item.keyMap === statusId);
    const valueVi = matchedItem ? matchedItem.valueVi : null;
    return valueVi;
  }
  handleEditOrder = (orderInfo) => {};
  handleDeleteOrder = (item) => {
    let orderInfo = {};
    orderInfo.id = item.id;
    orderInfo.orderNumber = item.orderNumber;
    this.props.deleteOrder(orderInfo);
  };

  close = () => {
    this.setState({ showModal: false });
  };

  handleEsc = (e) => {
    if (e.key === "esc") {
      this.setState({
        showModal: false,
      });
    }
  };

  open = (item) => {
    this.props.userByNumber(item.orderNumber);
    this.props.detailByNumber(item.orderNumber);
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString("vi-VN");
    this.setState({
      showModal: true,
      preTotal: item.preTotal,
      shipFee: item.shipFee,
      discount: item.discount,
      couponDiscount: item.couponDiscount,
      totalPrice: item.totalPrice,
      payment: item.payment,
      address: item.address,
      orderNumber: item.orderNumber,
      vat: item.vat,
      date: formattedDate,
      billPrinted: item.billPrinted,
    });
  };

  checkRoll = (value) => {
    if (value === "cuộn") {
      return true;
    } else {
      return false;
    }
  };

  handleEditOrderStatus = (item, e) => {
    this.props.editOrderStatus({
      id: item.id,
      statusID: e.target.value,
    });
  };

  render() {
    let arrOrder = this.state.orderRedux;
    let arrDetail = this.props.listDetail;
    let userInfo = this.props.detailUser;
    let status = this.state.statusArr;
    let statusNum = this.state.statusNum;
    const totalAmount = arrDetail.reduce(
      (total, item) => total + item.amount,
      0
    );
    return (
      <React.Fragment>
        <table id="TableManageOrder">
          <tbody>
            <tr>
              <th>Mã hóa đơn</th>
              <th>Ngày đặt:</th>
              <th>Hình thức thanh toán:</th>
              <th>Chọn in hóa đơn:</th>
              <th>Trạng thái:</th>
              <th>Hành động</th>
            </tr>
            {arrOrder &&
              arrOrder.length > 0 &&
              arrOrder.map((item, index) => {
                let orderDate = new Date(item.createdAt);
                let formattedOrderDate = orderDate.toLocaleDateString("vi-VN");
                let formattedOrderTime = orderDate.toLocaleTimeString("vi-VN");
                return (
                  <tr key={index}>
                    <td>{item.orderNumber}</td>
                    <td>
                      {formattedOrderDate}
                      <br />
                      {formattedOrderTime}
                    </td>
                    <td>{item.payment}</td>
                    <td>{item.billPrinted}</td>
                    <td>
                      <select
                        value={item.statusID}
                        onChange={(e) => this.handleEditOrderStatus(item, e)}
                      >
                        {status &&
                          status.length > 0 &&
                          status.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {item.valueVi}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => this.open(item)}>Chi tiết</button>
                      <button
                        onClick={() => this.handleDeleteOrder(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.showModal}
          centered
        >
          <Modal.Body>
            <div
              className="container"
              id="order"
              onKeyDown={(e) => this.handleEsc(e)}
            >
              <div
                className="container-fluid d-flex flex-column mt-2 border border-dark"
                style={{ maxWidth: "780px" }}
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
                      <div>
                        Đ/c: 34 Nguyễn Bỉnh Khiêm, P.Đa Kao, Q.1, TP.HCM
                      </div>
                      <div>
                        Điện thoại: (028) 39.100.555 - Hotline: 0903.539.536
                      </div>
                    </div>
                  </div>

                  <div className="col-4 d-flex flex-column justify-content-around">
                    <h4
                      className="font-weight-bold text-center"
                      style={{ color: "#354b9c" }}
                    >
                      HÓA ĐƠN TẠM TÍNH
                    </h4>
                    <div className="text-center">Ngày: {this.state.date}</div>
                    <div className="text-center font-weight-bold">
                      Mã hóa đơn: {this.state.orderNumber}
                    </div>
                  </div>
                </div>
                {this.state.billPrinted === "Có" && (
                  <div className="border-bottom border-dark">
                    <div className="row text-danger d-flex">
                      <div className="col-9 font-weight-bold">
                        THÔNG TIN XUẤT HÓA ĐƠN
                      </div>
                      <div className="col-3 small font-weight-bold">
                        Xuất hóa đơn VAT: {this.state.billPrinted}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-9">
                        Tên công ty: {userInfo.companyName}
                      </div>
                      <div className="col-3">MST: {userInfo.taxNumber}</div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        Địa chỉ công ty: {userInfo.companyAddress}
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex flex-column">
                  <div className="border-bottom border-dark">
                    <div className="row">
                      <div className="col-9">
                        Tên người đặt hàng: {userInfo.fullName}
                      </div>
                      <div className="col-3">SĐT: {userInfo.phoneNumber}</div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        Địa chỉ giao hàng: {this.state.address}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-9">
                        {this.state.payment === "Tiền mặt" && (
                          <div>
                            <div>
                              Phương thức thanh toán:
                              {this.state.payment}
                            </div>
                            <div className="text-primary small">
                              (Quý khách thanh toán cho người vận chuyển sau khi
                              nhận và kiểm tra hàng)
                            </div>
                          </div>
                        )}

                        {this.state.payment === "Chuyển khoản" && (
                          <div>
                            <div>
                              Phương thức thanh toán:
                              {this.state.payment}
                            </div>
                            <div className="text-primary small">
                              (Quý khách thanh toán theo số tài khoản
                              037-1001-888888 NH Vietcombank - CN Tân Định)
                              <br />
                              (Cú pháp "Số điện thoại _ Mã hóa đơn")
                            </div>
                          </div>
                        )}
                      </div>
                      {this.state.billPrinted === "Không" && (
                        <div className="col-3 text-danger">
                          Xuất hóa đơn VAT: {this.state.billPrinted}
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
                        const item = arrDetail && arrDetail[index];
                        if (item) {
                          return (
                            <tr key={index} className="text-center">
                              <th scope="row" className="col-1">
                                {index + 1}
                              </th>
                              {this.checkRoll(item.type) && (
                                <td className="text-left col-7">
                                  {item.productName}
                                </td>
                              )}
                              {!this.checkRoll(item.type) && (
                                <td className="text-left col-7">
                                  {item.productName}({item.form})
                                </td>
                              )}
                              <td className="col-1">{item.amount}</td>
                              <td className="text-right col-1">
                                <CurrencyFormat
                                  value={item.prePrice / item.amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </td>
                              <td className="text-right col-2">
                                <CurrencyFormat
                                  value={item.prePrice}
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
                        <td scope="col">{totalAmount}</td>
                        <td></td>
                        <td className="text-right" scope="col">
                          <CurrencyFormat
                            value={this.state.preTotal}
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
                            value={this.state.vat}
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
                            value={this.state.shipFee}
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
                            value={this.state.couponDiscount}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp; VNĐ
                        </td>
                      </tr>

                      {this.state.discount !== 0 && (
                        <tr>
                          <td></td>
                          <td className="text-right text-danger">
                            Chiết khấu:
                          </td>
                          <td></td>
                          <td></td>
                          <td className="text-right text-danger">
                            <span>-</span>
                            <CurrencyFormat
                              value={this.state.discount}
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
                          <h5 className="font-weight-bold">
                            Tổng tiền thanh toán:
                          </h5>
                        </td>
                        <td></td>
                        <td className="text-right" colSpan={2}>
                          <h5 className="font-weight-bold">
                            <CurrencyFormat
                              value={this.state.totalPrice}
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
                      (Trong vòng 3 ngày kể từ ngày nhận được hàng, nếu quý
                      khách không phản hồi về sản phẩm, chúng tôi tiến hành xuất
                      hóa đơn VAT và sản phẩm sẽ không được đổi trả lại)
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div
              className="container d-flex justify-content-center"
              style={{ maxWidth: "790px" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                In hóa đơn
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.close()}
              >
                Đóng
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listOrders: state.order.orders,
    listDetail: state.order.detailOrders,
    detailUser: state.order.userName,
    listStatus: state.order.statusList,
    listNewOrders: state.order.newOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderRedux: () => dispatch(actions.fetchOrderStart()),
    fetchStatusRedux: () => dispatch(actions.fetchStatusStart()),
    deleteOrder: (orderInfo) => dispatch(actions.deleteOrderStart(orderInfo)),
    detailByNumber: (orderNumber) =>
      dispatch(actions.detailByNumber(orderNumber)),
    userByNumber: (orderNumber) =>
      dispatch(actions.UserByNumberStart(orderNumber)),
    getStatusStart: () => dispatch(actions.fetchStatusStart()),
    editOrderStatus: (data) => dispatch(actions.editOrderStatusFunc(data)),
    checkNewOrder: () => dispatch(actions.handleCheckNewOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageOrder);
