import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import "./BannerRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageBanner from "./TableManageBanner";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";

class BannerRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgUrl: "",

      name: "",
      image: "",

      action: "",
      bannerEditId: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listBanners !== this.props.listBanners) {
      this.setState({
        name: "",
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

  handleSaveBanner = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create
      this.props.createNewBanner({
        name: this.state.name,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit
      this.props.editBannerRedux({
        id: this.state.bannerEditId,
        name: this.state.name,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name"];
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

  handleEditBannerFromParent = (banner) => {
    let imageBase64 = "";
    if (banner.image) {
      imageBase64 = new Buffer.from(banner.image, "base64").toString("binary");
    }

    this.setState({
      name: banner.name,
      image: imageBase64,
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      bannerEditId: banner.id,
    });
  };

  render() {
    let { name } = this.state;

    return (
      <div className="Banner-redux-container">
        <div className="title">Quản lý banner</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm banner</div>
              <div className="col-12">
                <label>Tên banner: </label>
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

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveBanner()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu"}
                </button>
              </div>

              <div className="col-12">
                <TableManageBanner
                  handleEditBannerFromParent={this.handleEditBannerFromParent}
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
    listBanners: state.banner.banners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBanner: (data) => dispatch(actions.createNewBanner(data)),
    fetchBannerRedux: () => dispatch(actions.fetchAllBannerStart()),
    editBannerRedux: (data) => dispatch(actions.editBanner(data)),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerRedux);
