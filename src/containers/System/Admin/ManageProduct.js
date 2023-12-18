import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageProduct.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforProduct } from "../../../services/productService";
import { CRUD_ACTIONS } from "../../../utils";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
      listProduct: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDetailProduct();
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
    if (prevProps.allDetailProduct !== this.props.allDetailProduct) {
      let dataSelect = this.buildDataInputSelect(this.props.allDetailProduct);
      this.setState({
        listProduct: dataSelect,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
      // contentHTML: text,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailProduct({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      productId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });

    this.setState({
      selectedOption: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      hasOldData: false,
      productId: "",
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforProduct(selectedOption.value);
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
      <div className="manage-product-container">
        <div className="title">Thêm thông tin sản phẩm</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn sản phẩm</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listProduct}
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
        <div className="manage-product-edit">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() =>
            this.handleSaveContentMarkdown()
          }
          className={
            hasOldData === true
              ? "save-detail-product"
              : "create-detail-product"
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
    allDetailProduct: state.product.allDetailProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDetailProduct: (id) => dispatch(actions.fetchAllDetailProduct()),
    saveDetailProduct: (data) => dispatch(actions.saveDetailProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
