import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./PolicyRedux.scss";
import TableManagePolicy from "./TableManagePolicy";
import { CRUD_ACTIONS } from "../../../utils";

class PolicyRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",

      action: "",
      policyEditId: "",
    };
  }

  async componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listPolicy !== this.props.listPolicy) {
      this.setState({
        name: "",
        type: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handleSavePolicy = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create
      this.props.createNewPolicy({
        name: this.state.name,
        type: this.state.type,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit
      this.props.editPolicyRedux({
        id: this.state.policyEditId,
        name: this.state.name,
        type: this.state.type,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Thông tin không được để trống: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditPolicyFromParent = (policy) => {
    this.setState({
      name: policy.name,
      type: policy.type,
      action: CRUD_ACTIONS.EDIT,
      policyEditId: policy.id,
    });
  };

  render() {
    let { name, type } = this.state;

    return (
      <div className="Policy-redux-container">
        <div className="title">Quản lý chính sách</div>
        <div className="body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm chính sách</div>
              <div className="col-4">
                <label>Tên chính sách: </label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                // disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                />
              </div>

              <div className="col-3">
                <label>Loại chính sách: </label>
                <input
                  className="form-control"
                  type="text"
                  value={type}
                  onChange={(event) => {
                    this.onChangeInput(event, "type");
                  }}
                />
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSavePolicy()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Lưu"}
                </button>
              </div>

              <div className="col-12">
                <TableManagePolicy
                  handleEditPolicyFromParent={this.handleEditPolicyFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listPolicy: state.policy.policies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPolicy: (data) => dispatch(actions.createNewPolicy(data)),
    fetchPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
    editPolicyRedux: (data) => dispatch(actions.editPolicy(data)),

    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyRedux);
