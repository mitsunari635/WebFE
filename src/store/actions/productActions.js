import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewProductFunc,
  getAllProducts,
  deleteProductFunc,
  editProductFunc,
  getRollPaperService,
  getPhotoPaperService,
  getPerforatedPaperService,
  getPrintedPaperService,
  getPrintedFormService,
  getPrintedRollService,
  getEnvelopeService,
  getPackageService,
  getAllDetailProduct,
  saveDetailProductService,
  getAllProductPageService,
  getLabelStampService,
  getDocumentService,
  getImportExportService,
  getStampService,
  getSeaAirBillService,
  getExpressService,
  getPaycheckService,
  getAtmBillService,
  getEdcBillService,
  getOtherPrintService,
} from "../../services/productService";
import { toast } from "react-toastify";

export const fetchStockStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_STOCK_START,
      });

      let res = await getAllCodeService("STOCK");
      if (res && res.errCode === 0) {
        dispatch(fetchStockSuccess(res.data));
      } else {
        dispatch(fetchStockFailed());
      }
    } catch (e) {
      dispatch(fetchStockFailed());
      console.log("fetchStockStart error", e);
    }
  };
};

export const fetchStockSuccess = (stockData) => ({
  type: actionTypes.FETCH_STOCK_SUCCESS,
  data: stockData,
});

export const fetchStockFailed = () => ({
  type: actionTypes.FETCH_STOCK_FAILED,
});

export const createNewProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewProductFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo sản phẩm thành công");
        dispatch(saveProductSuccess());
        dispatch(fetchAllProductStart());
      } else {
        dispatch(saveProductFailed());
      }
    } catch (e) {
      dispatch(saveProductFailed());
      console.log("saveProductFailed error", e);
    }
  };
};

export const saveProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});

export const saveProductFailed = () => ({
  type: actionTypes.CREATE_PRODUCT_FAILED,
});

export const fetchAllProductStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllProducts("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllProductSuccess(res.products));
      } else {
        toast.success("Lấy sản phẩm thất bại");
        dispatch(fetchAllProductFailed());
      }
    } catch (e) {
      toast.success("Lấy sản phẩm thất bại");
      dispatch(fetchAllProductFailed());
      console.log("fetchAllProductFailed error", e);
    }
  };
};

export const fetchAllProductSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
  products: data,
});

export const fetchAllProductFailed = () => ({
  type: actionTypes.FETCH_ALL_PRODUCT_FAILED,
});

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductFunc(productId);
      if (res && res.errCode === 0) {
        toast.success("Xóa sản phẩm thành công");
        dispatch(deleteProductSuccess());
        dispatch(fetchAllProductStart());
      } else {
        toast.error("Xóa sản phẩm thất bại");
        dispatch(deleteProductFailed());
      }
    } catch (e) {
      dispatch(deleteProductFailed());
      console.log("deleteProductFailed error", e);
    }
  };
};

export const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
  type: actionTypes.DELETE_PRODUCT_FAILED,
});

export const editProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editProductFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật sản phẩm thành công");
        dispatch(editProductSuccess());
        dispatch(fetchAllProductStart());
      } else {
        toast.error("Cập nhật sản phẩm thất bại");
        dispatch(editProductFailed());
      }
    } catch (e) {
      toast.error("Cập nhật sản phẩm thất bại");
      dispatch(editProductFailed());
      console.log("editProductFailed error", e);
    }
  };
};

export const editProductSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductFailed = () => ({
  type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const fetchRollPaper = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getRollPaperService(20);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ROLL_PAPER_SUCCESS,
          dataRollPaper: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ROLL_PAPER_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch roll paper failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ROLL_PAPER_FAILED,
      });
    }
  };
};

export const fetchPhotoPaper = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPhotoPaperService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PHOTO_PAPER_SUCCESS,
          dataPhotoPaper: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PHOTO_PAPER_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch roll paper failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PHOTO_PAPER_FAILED,
      });
    }
  };
};

export const fetchPerforatedPaper = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPerforatedPaperService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PERFORATED_PAPER_SUCCESS,
          dataPerforatedPaper: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PERFORATED_PAPER_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch roll paper failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PERFORATED_PAPER_FAILED,
      });
    }
  };
};

export const fetchPrintedPaper = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPrintedPaperService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRINTED_PAPER_SUCCESS,
          dataPrintedPaper: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRINTED_PAPER_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch printed paper failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PRINTED_PAPER_FAILED,
      });
    }
  };
};

export const fetchPrintedForm = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPrintedFormService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRINTED_FORM_SUCCESS,
          dataPrintedForm: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRINTED_FORM_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch printed form failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PRINTED_FORM_FAILED,
      });
    }
  };
};

export const fetchPrintedRoll = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPrintedRollService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRINTED_ROLL_SUCCESS,
          dataPrintedRoll: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRINTED_ROLL_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch printed roll failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PRINTED_ROLL_FAILED,
      });
    }
  };
};

export const fetchPackage = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPackageService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PACKAGE_SUCCESS,
          dataPackage: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PACKAGE_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PACKAGE_FAILED,
      });
    }
  };
};

export const fetchEnvelope = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getEnvelopeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ENVELOPE_SUCCESS,
          dataEnvelope: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ENVELOPE_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ENVELOPE_FAILED,
      });
    }
  };
};

export const fetchLabelStamp = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getLabelStampService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_LABEL_STAMP_SUCCESS,
          dataLabel: res.data,
          dataStamp: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LABEL_STAMP_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_LABEL_STAMP_FAILED,
      });
    }
  };
};

export const fetchDocument = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDocumentService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_SUCCESS,
          dataDocument: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_DOCUMENT_FAILED,
      });
    }
  };
};

export const fetchImportExport = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getImportExportService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_IMPORT_EXPORT_SUCCESS,
          dataImport: res.data,
          dataExport: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_IMPORT_EXPORT_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_IMPORT_EXPORT_FAILED,
      });
    }
  };
};

export const fetchExpress = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getExpressService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EXPRESS_SUCCESS,
          dataExpress: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EXPRESS_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_EXPRESS_FAILED,
      });
    }
  };
};

export const fetchSeaAirBill = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getSeaAirBillService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SEA_AIR_BILL_SUCCESS,
          dataSeaBill: res.data,
          dataAirBill: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SEA_AIR_BILL_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_SEA_AIR_BILL_FAILED,
      });
    }
  };
};

export const fetchPaycheck = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPaycheckService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PAYCHECK_SUCCESS,
          dataPaycheck: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PAYCHECK_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_PAYCHECK_FAILED,
      });
    }
  };
};

export const fetchAtmBill = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAtmBillService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ATM_BILL_SUCCESS,
          dataAtmBill: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ATM_BILL_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ATM_BILL_FAILED,
      });
    }
  };
};

export const fetchEdcBill = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getEdcBillService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EDC_BILL_SUCCESS,
          dataEdcBill: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EDC_BILL_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_EDC_BILL_FAILED,
      });
    }
  };
};

export const fetchOtherPrint = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getOtherPrintService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_OTHER_PRINT_SUCCESS,
          dataOtherPrint: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_OTHER_PRINT_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_OTHER_PRINT_FAILED,
      });
    }
  };
};

export const fetchStamp = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getStampService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_STAMP_SUCCESS,
          dataStamp: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_STAMP_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch label failed: ", e);
      dispatch({
        type: actionTypes.FETCH_STAMP_FAILED,
      });
    }
  };
};

export const fetchAllProductPage = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllProductPageService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_PAGE_SUCCESS,
          dataAllProduct: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_PAGE_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch roll paper failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_PRODUCT_PAGE_FAILED,
      });
    }
  };
};

export const fetchAllDetailProduct = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDetailProduct();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DETAIL_PRODUCT_SUCCESS,
          dataAllDetailProduct: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DETAIL_PRODUCT_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch all detail product failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DETAIL_PRODUCT_FAILED,
      });
    }
  };
};

export const saveDetailProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailProductService(data);
      if (res && res.errCode === 0) {
        toast.success("Save detail product success");
        dispatch({
          type: actionTypes.SAVE_DETAIL_PRODUCT_SUCCESS,
        });
      } else {
        toast.error("Save detail product fail");
        dispatch({
          type: actionTypes.SAVE_DETAIL_PRODUCT_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save detail product fail");
      dispatch({
        type: actionTypes.SAVE_DETAIL_PRODUCT_FAILED,
      });
    }
  };
};
// let res1 = await getProductHomeService('');
