import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import { withRouter } from "react-router";
import Zalo from "../../../assets/zalo-logo.png";
import ZaloQR from "../../../assets/zaloQR.jpg";
import MessengerCustomerChat from "react-messenger-customer-chat";

class ContactOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhone: false,
      showZalo: false,
    };
  }

  componentDidMount() {
    // Load Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  handleIconClick = () => {
    this.setState({ showInfo: true });
  };

  handleMessengerChat = () => {
    var chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "174767939045458");
    chatbox.setAttribute("attribution", "biz_inbox");
  };

  render() {
    let showPhone = this.state.showPhone;
    let showZalo = this.state.showZalo;
    return (
      <div className="contact-ways d-flex flex-column align-items-end">
        <div
          className="d-flex align-items-center "
          onMouseEnter={() => this.setState({ showPhone: true })}
          onMouseLeave={() => this.setState({ showPhone: false })}
        >
          {showPhone && (
            <div className="phone-number d-flex align-items-center">
              <div className="mr-1">
                <i className="fas fa-phone" alt="0908336077"></i>
              </div>
              <div>
                <span className="contact-number">0908.336.077</span>
              </div>
            </div>
          )}

          <div className="phone my-3 ml-1">
            <a href="tel:+840908336077">
              <i className="fas fa-phone" alt="0908336077"></i>
            </a>
          </div>
        </div>

        <div
          className="d-flex align-items-center "
          onMouseEnter={() => this.setState({ showZalo: true })}
          onMouseLeave={() => this.setState({ showZalo: false })}
        >
          {showZalo && (
            <div className="zalo-number d-flex align-items-center">
              <div className="mr-1">
                <img src={ZaloQR} alt="0908336077" />
              </div>
              <div>
                <span className="contact-number">0908.336.077</span>
              </div>
            </div>
          )}

          <div className="zalo my-3 ml-1">
            <img loading="lazy" src={Zalo} alt="prod-img" />
          </div>
        </div>

        {/* <div
          className="fb"
          id="fb-customer-chat"
          onClick={this.handleMessengerChat}
        >
          <i class="fab fa-facebook-messenger"></i>
        </div>

        <MessengerCustomerChat
          pageId="174767939045458"
          appId="1394267744520974"
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactOrders)
);
