import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ProductRedux from "../containers/System/Admin/ProductRedux";
import ManageProduct from "../containers/System/Admin/ManageProduct";
import PolicyRedux from "../containers/System/Admin/PolicyRedux";
import ManagePolicy from "../containers/System/Admin/ManagePolicy";
// import FormRedux from '../containers/System/Admin/FormRedux';
import OrderRedux from "../containers/System/Admin/OrderRedux";
import BannerRedux from "../containers/System/Admin/BannerRedux";
import NewsRedux from "../containers/System/Admin/NewsRedux";
import ManageNews from "../containers/System/Admin/ManageNews";

class System extends Component {
  render() {
    // { this.props.isLoggedIn && <Header /> }

    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              {/* <Route path="/system/user-manage" component={UserManage} /> */}
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/product-redux" component={ProductRedux} />
              <Route path="/system/product-manage" component={ManageProduct} />
              <Route path="/system/policy-redux" component={PolicyRedux} />
              <Route
                path="/system/policy-edit-detail"
                component={ManagePolicy}
              />
              {/* <Route path="/system/form-redux" component={FormRedux} /> */}
              <Route path="/system/order-redux" component={OrderRedux} />
              <Route path="/system/banner-redux" component={BannerRedux} />
              <Route path="/system/news-redux" component={NewsRedux} />
              <Route path="/system/news-detail" component={ManageNews} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
