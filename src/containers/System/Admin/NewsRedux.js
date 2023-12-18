import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import "./NewsRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageNews from "./TableManageNews";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";

class NewsRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgUrl: "",

      name: "",
      image: "",

      action: "",
      newsEditId: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listNews !== this.props.listNews) {
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

  handleSaveNews = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create
      this.props.createNewNews({
        name: this.state.name,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit
      this.props.editNewsRedux({
        id: this.state.newsEditId,
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

  handleEditNewsFromParent = (News) => {
    let imageBase64 = "";
    if (News.image) {
      imageBase64 = new Buffer.from(News.image, "base64").toString("binary");
    }

    this.setState({
      name: News.name,
      image: imageBase64,
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      newsEditId: News.id,
    });
  };

  render() {
    let { name } = this.state;

    return (
      <div className="News-redux-container">
        <div className="title">Quản lý tin tức</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm tin tức</div>
              <div className="col-12">
                <label>Tên tin tức: </label>
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
                  onClick={() => this.handleSaveNews()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu"}
                </button>
              </div>

              <div className="col-12">
                <TableManageNews
                  handleEditNewsFromParent={this.handleEditNewsFromParent}
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
    listNews: state.news.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewNews: (data) => dispatch(actions.createNewNews(data)),
    fetchNewsRedux: () => dispatch(actions.fetchAllNewsStart()),
    editNewsRedux: (data) => dispatch(actions.editNews(data)),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsRedux);
