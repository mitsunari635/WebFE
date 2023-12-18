import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>Họ, tên </th>
            <th>Địa chỉ nhận hàng</th>
            <th>Số điện thoại</th>
            <th>Mã số thuế</th>
            <th>Tên công ty</th>
            <th>Địa chỉ công ty</th>
            <th>Hóa đơn</th>
            <th>Hành động</th>
          </tr>
          {arrUsers &&
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.fullName}</td>
                  <td>{item.receiveAddress}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.taxNumber}</td>
                  <td>{item.companyName}</td>
                  <td>{item.companyAddress}</td>
                  <td>{item.orderNumber}</td>
                  <td>
                    <button
                      onClick={() => this.handleEditUser(item)}
                      className="btn-edit"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      onClick={() => this.handleDeleteUser(item)}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
