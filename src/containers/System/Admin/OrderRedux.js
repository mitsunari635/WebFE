import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actions from '../../../store/actions';
import TableManageOrder from "./TableManageOrder";

class OrderRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="title">Quản lý đơn hàng</div>
          <div className="body">
            <div className="row">
              <div className="col-12 my-3">Danh sách đơn hàng:</div>
              <TableManageOrder></TableManageOrder>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(OrderRedux);
