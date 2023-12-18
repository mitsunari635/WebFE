import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageProduct.scss";
import * as actions from "../../../store/actions";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

// Finish!

class TableManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsRedux: [],
      thType: "Loại giấy",
    };
  }

  componentDidMount() {
    this.props.fetchProductRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProducts !== this.props.listProducts) {
      this.setState({
        productsRedux: this.props.listProducts,
      });
    }
  }

  handleDeleteProduct = (product) => {
    this.props.deleteProductRedux(product.id);
  };

  handleEditProduct = (product) => {
    this.props.handleEditProductFromParent(product);
  };

  // changeType = () => {
  //   let typeOrder = ["Loại giấy", "Cuộn", "Đllt", "Photo"]; // Define the order of values
  //   let currentIndex = typeOrder.findIndex((type) => type === this.state.thType); // Get the current index of the current value
  //   let nextIndex = (currentIndex + 1) % typeOrder.length; // Calculate the index of the next value
  //   let nextValue = typeOrder[nextIndex]; // Get the next value based on the index
  //   this.setState({
  //     thType: nextValue,
  //   })
  // }

  render() {
    let customStyles = {
      control: (provided) => ({
        ...provided,
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
        border: "none",
        backgroundColor: "white",
        background: "white",
        color: "black",
      }),
    };

    let typeOrder = [
      "Loại giấy",
      "Cuộn",
      "Đllt",
      "Photo",
      "In",
      "Tem",
      "Nhãn",
      "Chứng từ",
      "Phiếu xuất kho",
      "Phiếu nhập kho",
      "Bill chuyển phát nhanh",
      "Bill sea",
      "Bill air",
      "Hóa đơn atm",
      "Hóa đơn edc",
      "Phiếu lương",
      "Khác",
      "Cuộn in",
    ]; // Define the order of values

    let arrProducts = this.state.productsRedux;
    if (this.state.thType.toLowerCase() !== "loại giấy") {
      arrProducts = arrProducts.filter(
        (item) => item.type.toLowerCase() === this.state.thType.toLowerCase()
      );
    }
    arrProducts.sort((a, b) => a.type.localeCompare(b.type));
    return (
      <React.Fragment>
        <table id="TableManageProduct">
          <tbody>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá niêm yết</th>
              <th>Giá khuyến mãi</th>
              <th>
                <Select
                  className="typeSelector"
                  styles={customStyles}
                  options={typeOrder.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  value={{ value: this.state.thType, label: this.state.thType }}
                  onChange={(selectedOption) =>
                    this.setState({ thType: selectedOption.value })
                  }
                />
              </th>
              <th>Đơn vị tính</th>
              <th>Kho</th>
              <th>Hành động</th>
            </tr>

            {arrProducts &&
              arrProducts.length > 0 &&
              arrProducts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.type}</td>
                    <td>{item.describe}</td>
                    <td>{item.stockId}</td>
                    <td>
                      <button
                        ref={this.myRef}
                        onClick={() => this.handleEditProduct(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteProduct(item)}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductRedux: () => dispatch(actions.fetchAllProductStart()),
    deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
