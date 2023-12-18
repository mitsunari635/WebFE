import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Tab from "./Section/Tab";
import Banner from "./Section/Banner";
import RollPaper from "./Section/RollPaper";
import PhotoPaper from "./Section/PhotoPaper";
import PerforatedPaper from "./Section/PerforatedPaper";
import ContactWays from "./Section/ContactWays";
import HomeFooter from "./HomeFooter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-chat-elements/dist/main.css";
import { Modal } from "react-bootstrap";
import popupImg from "./../../assets/popup-img.png";
import MessengerCustomerChat from "react-messenger-customer-chat";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleEsc = (e) => {
    if (e.key === "esc") {
      this.setState({
        show: false,
      });
    }
  };

  render() {
    let settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: false,
      lazyLoad: true,
    };

    let show = this.state.show;

    return (
      <React.Fragment>
        <HomeHeader />
        <Modal show={show} onHide={() => this.handleClose()}>
          <Modal.Body>
            <div>
              <div
                style={{ cursor: "pointer" }}
                variant="dark"
                onClick={() => this.handleClose()}
                onKeyDown={(e) => this.handleEsc(e)}
              >
                X
              </div>
              <div>
                <img
                  loading="lazy"
                  src={popupImg}
                  alt="prod-img"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Tab />
        <Banner />

        {/* <Introduction /> */}
        <RollPaper settings={settings} />
        <PhotoPaper settings={settings} />
        <PerforatedPaper settings={settings} />
        {/* <PrintedPaper settings={settings} /> */}
        <ContactWays />
        <MessengerCustomerChat
          style={{ zIndex: "1005" }}
          pageId="107982132101958"
          appId="1394267744520974"
        />
        <HomeFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
