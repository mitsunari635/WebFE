import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePolicy.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { markdownItTable } from "markdown-it-table";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforPolicy } from "../../../services/policyService";
import { CRUD_ACTIONS } from "../../../utils";

// Initialize a markdown parser
let mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(markdownItTable);

class ManagePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
      listPolicy: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDetailPolicy();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let label = `${item.name}`;
        object.label = label;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDetailPolicy !== this.props.allDetailPolicy) {
      let dataSelect = this.buildDataInputSelect(this.props.allDetailPolicy);
      this.setState({
        listPolicy: dataSelect,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailPolicy({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      policyId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });

    this.setState({
      selectedOption: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      hasOldData: false,
      policyId: "",
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforPolicy(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-policy-container">
        <div className="title">Thêm thông tin chính sách</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn chính sách</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listPolicy}
            />
          </div>

          {/* <div className="content-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div> */}
        </div>
        <div className="manage-policy-edit">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true ? "save-detail-policy" : "create-detail-policy"
          }
        >
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDetailPolicy: state.policy.allDetailPolicy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDetailPolicy: () => dispatch(actions.fetchAllDetailPolicy()),
    saveDetailPolicy: (data) => dispatch(actions.saveDetailPolicy(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePolicy);
