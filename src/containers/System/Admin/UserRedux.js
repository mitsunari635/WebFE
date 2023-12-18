import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      previewImgUrl: "",

      email: "",
      password: "",
      fullName: "",
      receiveAddress: "",
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      taxNumber: "",
      gender: "",
      role: "",
      image: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;

      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        fullName: "",
        receiveAddress: "",
        companyName: "",
        companyAddress: "",
        phoneNumber: "",
        taxNumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        image: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: "",
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

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        receiveAddress: this.state.receiveAddress,
        companyName: this.state.companyName,
        companyAddress: this.state.companyAddress,
        phoneNumber: this.state.phoneNumber,
        taxNumber: this.state.taxNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        receiveAddress: this.state.receiveAddress,
        companyName: this.state.companyName,
        companyAddress: this.state.companyAddress,
        phoneNumber: this.state.phoneNumber,
        taxNumber: this.state.taxNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "fullName",
      "receiveAddress",
      "phoneNumber",
      // "companyName",
      // "companyAddress",
      // "taxNumber",
    ];
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

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "123456",
      fullName: user.fullName,
      receiveAddress: user.receiveAddress,
      companyName: user.companyName,
      companyAddress: user.companyAddress,
      phoneNumber: user.phoneNumber,
      taxNumber: user.taxNumber,
      gender: user.gender,
      role: user.roleId,
      image: "",
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let {
      email,
      password,
      fullName,
      receiveAddress,
      companyName,
      companyAddress,
      taxNumber,
      phoneNumber,
      gender,
      role,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">Quản lý người dùng</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm người dùng</div>
              <div className="col-3">
                <label>Email: </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                // disabled={
                //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                // }
                />
              </div>

              <div className="col-3">
                <label>Mật khẩu: </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                // disabled={
                //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                // }
                />
              </div>

              <div className="col-3">
                <label>Họ, tên : </label>
                <input
                  className="form-control"
                  type="text"
                  value={fullName}
                  onChange={(event) => {
                    this.onChangeInput(event, "fullName");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Địa chỉ nhận hàng : </label>
                <input
                  className="form-control"
                  type="text"
                  value={receiveAddress}
                  onChange={(event) => {
                    this.onChangeInput(event, "receiveAddress");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Tên công ty: </label>
                <input
                  className="form-control"
                  type="text"
                  value={companyName}
                  onChange={(event) => {
                    this.onChangeInput(event, "companyName");
                  }}
                />
              </div>

              <div className="col-9">
                <label>Địa chỉ công ty: </label>
                <input
                  className="form-control"
                  type="text"
                  value={companyAddress}
                  onChange={(event) => {
                    this.onChangeInput(event, "companyAddress");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Mã số thuế: </label>
                <input
                  className="form-control"
                  type="text"
                  value={taxNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "taxNumber");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Số điện thoại: </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>

              <div className="col-3">
                <label>Giới tính: </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>Vai trò: </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>Hình ảnh: </label>
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

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu"}
                </button>
              </div>

              <div className="col-12">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,

    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
