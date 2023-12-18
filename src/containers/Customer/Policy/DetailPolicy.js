import React, { Component, useState } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailPolicy.scss";
import { getDetailInforPolicy } from "../../../services/policyService";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import Tab from "../../HomePage/Section/Tab";

class DetailPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPolicy: {},
      arrAllPolicy: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforPolicy(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailPolicy: res.data,
        });
      }
    }

    this.props.loadAllPolicyPage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allPolicyPageRedux !== this.props.allPolicyPageRedux) {
      this.setState({
        arrAllPolicy: this.props.allPolicyPageRedux,
      });
    }

    if (this.props.match && this.props.match.params) {
      const { id: prevId } = prevProps.match.params;
      const { id } = this.props.match.params;

      // Check if the product ID or name has changed
      if (id !== prevId) {
        this.fetchProductDetails(id);
      }
    }
  }

  async fetchProductDetails(id) {
    let res = await getDetailInforPolicy(id);
    if (res && res.errCode === 0) {
      this.setState({
        detailPolicy: res.data,
      });
    }
  }

  handleViewDetailPolicy = (policy) => {
    if (this.props.history) {
      this.props.history.push(`/chi-tiet-chinh-sach/${policy.id}`);
    }
  };

  render() {
    let { detailPolicy } = this.state;
    let arrAllPolicy = this.state.arrAllPolicy;
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="container">
          <div className="policy-detail-container">
            <div className="policy-choice">
              {arrAllPolicy &&
                arrAllPolicy.length > 0 &&
                arrAllPolicy.map((item, index) => {
                  let name = `${item.name}`;
                  return (
                    <div
                      className="policy"
                      key={index}
                      onClick={() => this.handleViewDetailPolicy(item)}
                    >
                      <div className="policy-name">{name}</div>
                    </div>
                  );
                })}
            </div>
            <div className="policy-detail">
              <div className="policy-describe">
                {detailPolicy &&
                  detailPolicy.Markdown &&
                  detailPolicy.Markdown.contentHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailPolicy.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPolicyPageRedux: state.policy.allPoliciesPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllPolicyPage: () => dispatch(actions.fetchAllPolicyPage()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailPolicy)
);
