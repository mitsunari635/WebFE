import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
//import Login from '../routes/Login';
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailProduct from "./Customer/Product/DetailProduct";
import DetailCart from "./Customer/Cart/DetailCart";
import ProductPage from "./Customer/Product/ProductPage";
import RollPaperPage from "./Customer/Product/ProductPages/RollPaperPage";
import PerforatedPaperPage from "./Customer/Product/ProductPages/PerforatedPaperPage";
import PrintedPaperPage from "./Customer/Product/ProductPages/PrintedPaperPage";
import PrintedForm from "./Customer/Product/ProductPages/PrintedForm";
import PrintedRoll from "./Customer/Product/PrintedFormPages/PrintedRoll";
import Package from "./Customer/Product/ProductPages/Package";
import Envelope from "./Customer/Product/ProductPages/Envelope";
import PhotoPaperPage from "./Customer/Product/ProductPages/PhotoPaperPage";

import LabelStamp from "./Customer/Product/PrintedFormPages/LabelStamp";
import Stamp from "./Customer/Product/PrintedFormPages/Stamp";
import Document from "./Customer/Product/PrintedFormPages/Document";
import ImportExport from "./Customer/Product/PrintedFormPages/ImportExport";
import Paycheck from "./Customer/Product/PrintedFormPages/Paycheck";
import SeaAirBill from "./Customer/Product/PrintedFormPages/SeaAirBill";
import AtmBill from "./Customer/Product/PrintedFormPages/AtmBill";
import EdcBill from "./Customer/Product/PrintedFormPages/EdcBill";
import OtherPrint from "./Customer/Product/PrintedFormPages/OtherPrint";

import ContactPage from "./Customer/Contact/ContactPage";
import NewsPage from "./Customer/News/NewsPage";
import NewsContentPage from "./Customer/News/NewsContentPage";
import NewsContentReplica from "./Customer/News/NewsContentReplica";
import DetailPolicy from "./Customer/Policy/DetailPolicy";
import DetailOrder from "./Customer/Order/DetailOrder";
import Express from "./Customer/Product/PrintedFormPages/Express";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars
                style={{ height: "100vh", width: "100vw" }}
                location={0}
              >
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.PRODUCT_PAGE} component={ProductPage} />
                  <Route
                    path={path.ROLL_PAPER_PAGE}
                    component={RollPaperPage}
                  />
                  <Route
                    path={path.PERFORATED_PAPER_PAGE}
                    component={PerforatedPaperPage}
                  />
                  <Route
                    path={path.PHOTO_PAPER_PAGE}
                    component={PhotoPaperPage}
                  />
                  <Route
                    path={path.PRINTED_PAPER_PAGE}
                    component={PrintedPaperPage}
                  />
                  <Route
                    path={path.PRINTED_FORM_PAGE}
                    component={PrintedForm}
                  />
                  <Route
                    path={path.PRINTED_ROLL_PAGE}
                    component={PrintedRoll}
                  />
                  <Route path={path.LABEL_STAMP_PAGE} component={LabelStamp} />
                  <Route path={path.DOCUMENT_PAGE} component={Document} />
                  <Route
                    path={path.IMPORT_EXPORT_PAGE}
                    component={ImportExport}
                  />
                  <Route path={path.EXPRESS_PAGE} component={Express} />
                  <Route path={path.PAYCHECK_PAGE} component={Paycheck} />
                  <Route path={path.STAMP_PAGE} component={Stamp} />
                  <Route path={path.SEA_AIR_BILL_PAGE} component={SeaAirBill} />
                  <Route path={path.ATM_BILL_PAGE} component={AtmBill} />
                  <Route path={path.EDC_BILL_PAGE} component={EdcBill} />
                  <Route path={path.OTHER_PRINT_PAGE} component={OtherPrint} />
                  <Route path={path.PACKAGE_PAGE} component={Package} />
                  <Route path={path.ENVELOPE_PAGE} component={Envelope} />
                  <Route path={path.CONTACT_PAGE} component={ContactPage} />
                  <Route path={path.DETAIL_PRODUCT} component={DetailProduct} />
                  <Route path={path.CART} component={DetailCart} />
                  <Route path={path.ORDER} component={DetailOrder} />
                  <Route path={path.DETAIL_POLICY} component={DetailPolicy} />
                  <Route path={path.NEWS_PAGE} component={NewsPage} />
                  <Route
                    path={path.NEWS_CONTENT_PAGE}
                    component={NewsContentPage}
                  />
                  {/* <Route
                    path={path.NEWS_CONTENT_REPLICA}
                    component={NewsContentReplica}
                  /> */}
                </Switch>
              </CustomScrollbars>
            </div>

            {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
