import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import Popup from "reactjs-popup";
import { sendContactEmail } from "../../../services/userService";
import "./PopupForm.scss";

const PopupForm = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [coName, setCoName] = useState("");
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");

  function checkValidateInput() {
    let isValid = true;
    let arrCheck = ["name", "phone", "coName", "content"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (![arrCheck[i]]) {
        isValid = false;
        toast.error("Thông tin không được để trống");
        break;
      }
    }
    return isValid;
  }

  async function handleSendEmail() {
    let isValid = checkValidateInput();
    if (isValid === false) return;

    let res = await sendContactEmail({
      name: name,
      company: coName,
      phone: phone,
      content: content,
      image: image,
      previewImgUrl: previewImgUrl,
    });

    if (res && res.errCode === 0) {
      toast.success("Email đã gửi");
    } else {
      toast.error(`Không thể gửi Email`);
    }
  }

  async function handleOnChangeImage(event) {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setImage(base64);
      setPreviewImgUrl(objectUrl);
    }
  }

  return (
    <>
      <Popup
        trigger={
          <button className="contact-button">
            <i className="fas fa-envelope"></i>
            <span className="order">Liên hệ đặt hàng</span>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="alert-overlay">
            <div className="contact-order">
              <div className="col-12 header">
                <span>Liên hệ đặt hàng</span>
                <button className="close" onClick={close}>
                  &times;
                </button>
              </div>
              <div className="col-12 body">
                <div className="row first-row">
                  <div className="col-4">
                    <label>
                      Họ tên người đặt hàng:
                      <span>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>

                  <div className="col-4">
                    <label>
                      Tên công ty:
                      <span>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={coName}
                      onChange={(event) => setCoName(event.target.value)}
                      required
                    />
                  </div>

                  <div className="col-4">
                    <label>
                      Số điện thoại:
                      <span>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="tel"
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row second-row">
                  <div className="col-12">
                    <label>
                      Nội dung:
                      <span>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                      type="text"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="row third-row">
                  <div className="col-4">
                    <div className="preview-img-container">
                      <input
                        id="previewImg"
                        type="file"
                        hidden
                        onChange={(event) => handleOnChangeImage(event)}
                      />
                      <label>Hình ảnh đính kèm: </label>
                      <label className="label-upload" htmlFor="previewImg">
                        Tải ảnh<i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-img"
                        style={{
                          backgroundImage: `url(${previewImgUrl})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-8 d-flex align-items-end">
                    <button
                      className="button"
                      onClick={() => {
                        handleSendEmail();
                        setName("");
                        setCoName("");
                        setPhone("");
                        setContent("");
                        setImage("");
                        setPreviewImgUrl("");
                        close();
                      }}
                    >
                      Gửi E-mail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupForm);
