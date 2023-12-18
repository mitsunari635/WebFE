import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import logo from "../../../assets/LOGO 30 NĂM - moi.jpg";
import { getDetailInforNewsById } from "../../../services/newsService";

class NewsDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailNews: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforNewsById(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailNews: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevStat, snapshot) {
    if (this.props.match && this.props.match.params) {
      const { id: prevId } = prevProps.match.params;
      const { id, name } = this.props.match.params;

      // Check if the product ID or name has changed
      if (id !== prevId) {
        this.setState({
          detailProduct: this.fetchNewsDetails(id),
        });
      }
    }
  }

  async fetchProductDetails(id) {
    let res = await getDetailInforNewsById(id);
    if (res && res.errCode === 0) {
      this.setState({
        detailNews: res.data,
      });
    }
  }

  render() {
    let detailNews = this.state.detailNews;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="container-fluid d-flex my-3">
          <img
            loading="lazy"
            src={detailNews.image}
            alt="prod-img"
            style={{
              maxWidth: "500px",
              maxHeight: "350px",
            }}
          />
          <div>
            <h5 className="text-center text-primary font-weight-bold">
              {detailNews.name}
            </h5>
            <div className="container d-flex flex-column ">
              <h5>
                {detailNews &&
                  detailNews.Markdown &&
                  detailNews.Markdown.contentHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailNews.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </h5>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsDetailPage)
);
