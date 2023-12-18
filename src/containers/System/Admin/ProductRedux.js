import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ProductRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageProduct from "./TableManageProduct";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";

class ProductRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockArr: [],
      previewImgUrl: "",
      secondPreviewImgUrl: "",
      thirdPreviewImgUrl: "",

      name: "",
      price: "",
      discount: "0",
      stock: "",
      describe: "",
      type: "",
      image: "",
      secondImage: "",
      thirdImage: "",

      action: "",
      productEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getStockStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.stockRedux !== this.props.stockRedux) {
      let arrStocks = this.props.stockRedux;
      this.setState({
        stockArr: this.props.stockRedux,
        stock: arrStocks && arrStocks.length > 0 ? arrStocks[0].keyMap : "",
      });
    }

    if (prevProps.listProducts !== this.props.listProducts) {
      let arrStocks = this.props.stockRedux;
      this.setState({
        name: "",
        price: "",
        discount: "0",
        describe: "",
        stock: arrStocks && arrStocks.length > 0 ? arrStocks[0].keyMap : "",
        type: "",
        image: "",
        secondImage: "",
        thirdImage: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: "",
        secondPreviewImgUrl: "",
        thirdPreviewImgUrl: "",
      });
    }
  }

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

  handleOnChangeSecondImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let secondBase64 = await CommonUtils.getBase64(file);
      let secondObjectUrl = URL.createObjectURL(file);
      this.setState({
        secondPreviewImgUrl: secondObjectUrl,
        secondImage: secondBase64,
      });
    }
  };

  handleOnChangeThirdImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let thirdBase64 = await CommonUtils.getBase64(file);
      let thirdObjectUrl = URL.createObjectURL(file);
      this.setState({
        thirdPreviewImgUrl: thirdObjectUrl,
        thirdImage: thirdBase64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  openPreviewSecondImage = () => {
    if (!this.state.secondPreviewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  openPreviewThirdImage = () => {
    if (!this.state.thirdPreviewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveProduct = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create
      this.props.createNewProduct({
        name: this.state.name,
        price: this.state.price,
        discount: this.state.discount,
        describe: this.state.describe,
        stockId: this.state.stock,
        type: this.state.type,
        image: this.state.image,
        secondImage: this.state.secondImage,
        thirdImage: this.state.thirdImage,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit
      this.props.editProductRedux({
        id: this.state.productEditId,
        name: this.state.name,
        price: this.state.price,
        discount: this.state.discount,
        describe: this.state.describe,
        stockId: this.state.stock,
        type: this.state.type,
        image: this.state.image,
        secondImage: this.state.secondImage,
        thirdImage: this.state.thirdImage,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "price", "describe", "type"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Thông tin không được để trống: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditProductFromParent = (product) => {
    let imageBase64 = "";
    let secondImageBase64 = "";
    let thirdImageBase64 = "";
    if (product.image) {
      imageBase64 = new Buffer.from(product.image, "base64").toString("binary");
    }
    if (product.secondImage) {
      secondImageBase64 = new Buffer.from(
        product.secondImage,
        "secondBase64"
      ).toString("binary");
    }
    if (product.thirdImage) {
      thirdImageBase64 = new Buffer.from(
        product.thirdImage,
        "thirdBase64"
      ).toString("binary");
    }

    this.setState({
      name: product.name,
      price: product.price,
      discount: product.discount,
      describe: product.describe,
      stock: product.stockId,
      type: product.type,
      image: imageBase64,
      secondImage: secondImageBase64,
      thirdImage: thirdImageBase64,
      previewImgUrl: imageBase64,
      secondPreviewImgUrl: secondImageBase64,
      thirdPreviewImgUrl: thirdImageBase64,
      action: CRUD_ACTIONS.EDIT,
      productEditId: product.id,
    });
  };

  render() {
    let stocks = this.state.stockArr;
    let { name, price, discount, describe, stock, type } = this.state;

    return (
      <div className="product-redux-container">
        <div className="title">Quản lý sản phẩm</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm sản phẩm</div>
              <div className="col-4">
                <label>Tên sản phẩm: </label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                // disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                />
              </div>

              <div className="col-4">
                <label>Giá tiền: </label>
                <input
                  className="form-control"
                  type="text"
                  value={price}
                  onChange={(event) => {
                    this.onChangeInput(event, "price");
                  }}
                />
              </div>

              <div className="col-4">
                <label>Giá khuyến mãi: </label>
                <input
                  className="form-control"
                  type="text"
                  value={discount}
                  onChange={(event) => {
                    this.onChangeInput(event, "discount");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Loại giấy: </label>
                <input
                  className="form-control"
                  type="text"
                  value={type}
                  onChange={(event) => {
                    this.onChangeInput(event, "type");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Kho chứa: </label>
                <select
                  className="form-control"
                  value={stock}
                  onChange={(event) => {
                    this.onChangeInput(event, "stock");
                  }}
                >
                  {stocks &&
                    stocks.length > 0 &&
                    stocks.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-6">
                <label>Đơn vị tính: </label>
                <input
                  className="form-control"
                  type="text"
                  value={describe}
                  onChange={(event) => {
                    this.onChangeInput(event, "describe");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Hình ảnh 1: </label>
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
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>

              <div className="col-3">
                <label>Hình ảnh 2: </label>
                <div className="preview-img-container">
                  <input
                    id="secondPreviewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeSecondImage(event)}
                  />
                  <label className="label-upload" htmlFor="secondPreviewImg">
                    Tải ảnh<i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.secondPreviewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewSecondImage()}
                  ></div>
                </div>
              </div>

              <div className="col-3">
                <label>Hình ảnh 3: </label>
                <div className="preview-img-container">
                  <input
                    id="thirdPreviewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeThirdImage(event)}
                  />
                  <label className="label-upload" htmlFor="thirdPreviewImg">
                    Tải ảnh<i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.thirdPreviewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewThirdImage()}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveProduct()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu"}
                </button>
              </div>

              <div className="col-12">
                <TableManageProduct
                  handleEditProductFromParent={this.handleEditProductFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            nextSrc={this.state.secondPreviewImgUrl}
            prevSrc={this.state.thirdPreviewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockRedux: state.product.stocks,

    isLoadingStock: state.product.isLoadingStock,
    listProducts: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStockStart: () => dispatch(actions.fetchStockStart()),
    createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
    fetchProductRedux: () => dispatch(actions.fetchAllProductStart()),
    editProductRedux: (data) => dispatch(actions.editProduct(data)),

    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRedux);
