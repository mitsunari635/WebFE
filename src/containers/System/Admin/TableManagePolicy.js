import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManagePolicy.scss";
import * as actions from "../../../store/actions";

// import style manually
import "react-markdown-editor-lite/lib/index.css";
// Finish!

class TableManagePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchPolicyRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listPolicy !== this.props.listPolicy) {
      this.setState({
        policyRedux: this.props.listPolicy,
      });
    }
  }

  handleDeletePolicy = (policy) => {
    this.props.deletePolicyRedux(policy.id);
  };

  handleEditPolicy = (policy) => {
    this.props.handleEditPolicyFromParent(policy);
  };

  render() {
    let arrPolicy = this.state.policyRedux;
    return (
      <React.Fragment>
        <table id="TableManagePolicy">
          <tbody>
            <tr>
              <th>Tên chính sách</th>
              <th>Loại chính sách</th>
              <th>Hành động</th>
            </tr>
            {arrPolicy &&
              arrPolicy.length > 0 &&
              arrPolicy.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditPolicy(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeletePolicy(item)}
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
    listPolicy: state.policy.policies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
    deletePolicyRedux: (id) => dispatch(actions.deletePolicy(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePolicy);
