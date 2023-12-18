import React, { Component } from "react";
import { connect } from "react-redux";
// import "./TableManageNews.scss";
import * as actions from "../../../store/actions";

// Finish!

class TableManageNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchNewsRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listNews !== this.props.listNews) {
      this.setState({
        newsRedux: this.props.listNews,
      });
    }
  }

  handleDeleteNews = (news) => {
    this.props.deleteNewsRedux(news.id);
  };

  handleEditNews = (news) => {
    this.props.handleEditNewsFromParent(news);
  };

  render() {
    let arrNews = this.state.newsRedux;
    return (
      <React.Fragment>
        <table id="TableManageNews" className="table">
          <tbody>
            <tr>
              <th>Tên tin tức</th>
              <th>Hành động</th>
            </tr>

            {arrNews &&
              arrNews.length > 0 &&
              arrNews.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <button
                        ref={this.myRef}
                        onClick={() => this.handleEditNews(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteNews(item)}
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
    listNews: state.news.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsRedux: () => dispatch(actions.fetchAllNewsStart()),
    deleteNewsRedux: (id) => dispatch(actions.deleteNews(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageNews);
