import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage.scss";
import { withRouter } from "react-router";
import logo from "./../../../assets/LOGO LIEN SON.png";
import popupImg from "./../../../assets/popup-img.png";

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <img src={popupImg} />
          </div>
        </div>
      </React.Fragment>
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
  connect(mapStateToProps, mapDispatchToProps)(Introduction)
);
