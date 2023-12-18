import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import { withRouter } from "react-router";
import Zalo from "../../../assets/zalo-logo.png";
import ZaloQR from "../../../assets/zaloQR.jpg";

class ContactWays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhone: false,
      showZalo: false,
    };
  }

  componentDidMount() {}

  handleIconClick = () => {
    this.setState({ showInfo: true });
  };

  render() {
    let showPhone = this.state.showPhone;
    let showZalo = this.state.showZalo;
    return (
      <div className="contact-ways d-flex flex-column align-items-start">
        <div
          className="d-flex align-items-center "
          onMouseEnter={() => this.setState({ showPhone: true })}
          onMouseLeave={() => this.setState({ showPhone: false })}
        >
          <div className="phone my-3 mr-1">
            <a href="tel:+840903539536">
              <i className="fas fa-phone" alt="0903539536"></i>
            </a>
          </div>
          {showPhone && (
            <div className="phone-number d-flex align-items-center">
              <div className="mr-1">
                <i className="fas fa-phone" alt="0903539536"></i>
              </div>
              <div>
                <span className="contact-number">0903.539.536</span>
              </div>
            </div>
          )}
        </div>
        <div
          className="d-flex align-items-center "
          onMouseEnter={() => this.setState({ showZalo: true })}
          onMouseLeave={() => this.setState({ showZalo: false })}
        >
          <div className="zalo my-3 mr-1">
            <img loading="lazy" src={Zalo} alt="prod-img" />
          </div>
          {showZalo && (
            <div className="zalo-number d-flex align-items-center">
              <div className="mr-1">
                <img src={ZaloQR} alt="0903539536" />
              </div>
              <div>
                <span className="contact-number">0903.539.536</span>
              </div>
            </div>
          )}
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(ContactWays)
);
