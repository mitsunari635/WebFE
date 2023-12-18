import React, { Component, useState } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../HomePage/HomeHeader";
import HomeFooter from "../../../HomePage/HomeFooter";
import "../OrderedProductPage.scss";
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router';

class RollPaperPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPrintedPapers: [],
    };
  }

  componentDidMount() {
    this.props.loadPrintedPaper();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.printedPapersRedux !== this.props.printedPapersRedux) {
            this.setState({
                arrPrintedPapers: this.props.printedPapersRedux
            })
        }
    }

  handleViewDetailProduct = (product) => {
        if (this.props.history) {
            this.props.history.push(`/detail-product/${product.id}`)
        }
    }

  render() {
    let arrPrintedPapers = this.state.arrPrintedPapers;
    return (
      <>
        <HomeHeader isShow={false} />
        <div className="product-page">
                <div className="product-content">
                    <div className="product-header">
                        <span className="title-section">Hàng đặt</span>
                    </div>

                    <div className="searchBar">
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        </div>
                    </div>

                    <div className="product-type">
                      <div className="type-change" onClick={() => this.toProductPage()}>Tất cả giấy</div>
                      <div className="type-change" onClick={() => this.moveToRollPaperPage()}>Giấy cuộn</div>
                      <div className="type-change" onClick={() => this.moveToPerforatedPaperPage()}>Giấy đục lỗ liên tục</div>
                      <div className="type-change" onClick={() => this.moveToPhotoPaperPage()}>Giấy photocopy</div>
                      {/* <div className="type-change" onClick={() => this.moveToPrintedPaperPage()}>Giấy in</div> */}
                    </div>

                    <div className="product-body">
                            {arrPrintedPapers && arrPrintedPapers.length > 0
                                && arrPrintedPapers.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let name = `${item.name}`;
                                    let price = `${item.price}`;
                                    let calType = `${item.describe}`;
                                    // let discount = `${item.discount}`
                                    return (
                                        <div className="slide-product" key={index} onClick={() => this.handleViewDetailProduct(item)}>
                                            <div className="prod-img-container">
                                                <img src={imageBase64} alt="prod-img" />
                                            </div>
                                            <div className="product-detail">
                                                <div className="product-name">{name}</div>
                                                <div className="product-price">
                                                    Giá cả liên hệ
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
     printedPapersRedux: state.product.printedPapers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrintedPaper: () => dispatch(actions.fetchPrintedPaper())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RollPaperPage));
