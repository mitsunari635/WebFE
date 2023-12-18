import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import "./NewsPage.scss";
import * as actions from "../../../store/actions";

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNews: [],
    };
  }

  async componentDidMount() {
    this.props.loadAllDetailNews();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allNewsPageRedux !== this.props.allNewsPageRedux) {
      this.setState({
        arrNews: this.props.allNewsPageRedux,
      });
    }
  }

  toNewsDetail = (news) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-tin-tuc/${news.id}`);
    }
  };

  toNewsReplicaDetail = () => {
    if (this.props.history) {
      this.props.history.push(`/hoi-nghi-drupa`);
    }
  };
  render() {
    let arrNews = this.state.arrNews;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div
          className="container-fluid d-flex flex-column"
          style={{ backgroundColor: "#fafafa" }}
        >
          <div className="title">Tin tức</div>
          {arrNews &&
            arrNews.length > 0 &&
            arrNews.map((item, index) => {
              console.log(arrNews);
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer.from(item.image, "base64").toString(
                  "binary"
                );
              }
              let name = `${item.name}`;
              let description = `${item.Markdown.description}`;
              return (
                <div
                  key={index}
                  className="container-fluid d-flex mb-5"
                  onClick={() => this.toNewsDetail(item)}
                >
                  <div className="col-1 embed-responsive embed-responsive-1by1">
                    <img
                      loading="lazy"
                      src={imageBase64}
                      alt="prod-img"
                      className="embed-responsive-item img-fluid"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="col" style={{ backgroundColor: "white" }}>
                    <h5 className="text-left" style={{ color: "#354b9c" }}>
                      {name}
                    </h5>
                    <div>
                      {description} &nbsp;
                      <span
                        className="text-primary"
                        onClick={() => this.toNewsDetail(item)}
                        style={{ cursor: "pointer" }}
                      >
                        Xem thêm
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allNewsPageRedux: state.news.allDetailNews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllDetailNews: () => dispatch(actions.fetchAllDetailNews()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsPage)
);
