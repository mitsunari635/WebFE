import React, { Component } from "react";
import { connect } from "react-redux";
// import "./TableManageBanner.scss";
import * as actions from "../../../store/actions";

// Finish!

class TableManageBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchBannerRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listBanners !== this.props.listBanners) {
      this.setState({
        bannersRedux: this.props.listBanners,
      });
    }
  }

  handleDeleteBanner = (Banner) => {
    this.props.deleteBannerRedux(Banner.id);
  };

  handleEditBanner = (Banner) => {
    this.props.handleEditBannerFromParent(Banner);
  };

  render() {
    let arrBanners = this.state.bannersRedux;
    return (
      <React.Fragment>
        <table id="TableManageBanner" className="table">
          <tbody>
            <tr>
              <th>Tên banner</th>
              <th>Hành động</th>
            </tr>

            {arrBanners &&
              arrBanners.length > 0 &&
              arrBanners.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <button
                        ref={this.myRef}
                        onClick={() => this.handleEditBanner(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteBanner(item)}
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
    listBanners: state.banner.banners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBannerRedux: () => dispatch(actions.fetchAllBannerStart()),
    deleteBannerRedux: (id) => dispatch(actions.deleteBanner(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBanner);
