import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingStock: false,
  stocks: [],
  products: [],
  rollPapers: [],
  perforatedPapers: [],
  photoPapers: [],
  printedPapers: [],
  printedForms: [],
  printedRolls: [],
  packages: [],
  envelopes: [],
  allDetailProduct: [],
  allProductsPage: [],

  labels: [],
  documents: [],
  stamps: [],
  imports: [],
  exports: [],
  expresses: [],
  seaBills: [],
  airBills: [],
  atmBills: [],
  edcBills: [],
  paychecks: [],
  otherPrints: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STOCK_START:
      let copyState = { ...state };
      copyState.isLoadingStock = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_STOCK_SUCCESS:
      state.stocks = action.data;
      state.isLoadingStock = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_STOCK_FAILED:
      state.isLoadingStock = false;
      state.stocks = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
      state.products = action.products;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_PRODUCT_FAILED:
      state.products = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLL_PAPER_SUCCESS:
      state.rollPapers = action.dataRollPaper;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLL_PAPER_FAILED:
      state.rollPapers = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PHOTO_PAPER_SUCCESS:
      state.photoPapers = action.dataPhotoPaper;
      return {
        ...state,
      };

    case actionTypes.FETCH_PHOTO_PAPER_FAILED:
      state.photoPapers = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PERFORATED_PAPER_SUCCESS:
      state.perforatedPapers = action.dataPerforatedPaper;
      return {
        ...state,
      };

    case actionTypes.FETCH_PERFORATED_PAPER_FAILED:
      state.perforatedPapers = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_PAPER_SUCCESS:
      state.printedPapers = action.dataPrintedPaper;
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_PAPER_FAILED:
      state.printedPapers = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_FORM_SUCCESS:
      state.printedForms = action.dataPrintedForm;
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_FORM_FAILED:
      state.printedForms = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_ROLL_SUCCESS:
      state.printedRolls = action.dataPrintedRoll;
      return {
        ...state,
      };

    case actionTypes.FETCH_PRINTED_ROLL_FAILED:
      state.printedRolls = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_LABEL_STAMP_SUCCESS:
      state.labels = action.dataLabel;
      state.stamps = action.dataStamp;
      return {
        ...state,
      };

    case actionTypes.FETCH_LABEL_STAMP_FAILED:
      state.labels = [];
      state.stamps = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PACKAGE_SUCCESS:
      state.packages = action.dataPackage;
      return {
        ...state,
      };

    case actionTypes.FETCH_PACKAGE_FAILED:
      state.packages = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ENVELOPE_SUCCESS:
      state.envelopes = action.dataEnvelope;
      return {
        ...state,
      };

    case actionTypes.FETCH_ENVELOPE_FAILED:
      state.envelopes = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_PRODUCT_PAGE_SUCCESS:
      state.allProductsPage = action.dataAllProduct;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_PRODUCT_PAGE_FAILED:
      state.allProductsPage = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DETAIL_PRODUCT_SUCCESS:
      state.allDetailProduct = action.dataAllDetailProduct;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DETAIL_PRODUCT_FAILED:
      state.allDetailProduct = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_STAMP_SUCCESS:
      state.stamps = action.dataStamp;
      return {
        ...state,
      };

    case actionTypes.FETCH_STAMP_FAILED:
      state.stamps = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCUMENT_SUCCESS:
      state.documents = action.dataDocument;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCUMENT_FAILED:
      state.documents = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_IMPORT_EXPORT_SUCCESS:
      state.imports = action.dataImport;
      state.exports = action.dataExport;
      return {
        ...state,
      };

    case actionTypes.FETCH_IMPORT_EXPORT_FAILED:
      state.imports = [];
      state.exports = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_SEA_AIR_BILL_SUCCESS:
      state.seaBills = action.dataSeaBill;
      state.airBills = action.dataAirBill;
      return {
        ...state,
      };

    case actionTypes.FETCH_SEA_AIR_BILL_FAILED:
      state.seaBills = [];
      state.airBills = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ATM_BILL_SUCCESS:
      state.atmBills = action.dataAtmBill;
      return {
        ...state,
      };

    case actionTypes.FETCH_ATM_BILL_FAILED:
      state.atmBills = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_EDC_BILL_SUCCESS:
      state.edcBills = action.dataEdcBill;
      return {
        ...state,
      };

    case actionTypes.FETCH_EDC_BILL_FAILED:
      state.edcBills = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_EXPRESS_SUCCESS:
      state.expresses = action.dataExpress;
      return {
        ...state,
      };

    case actionTypes.FETCH_EXPRESS_FAILED:
      state.expresses = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PAYCHECK_SUCCESS:
      state.paychecks = action.dataPaycheck;
      return {
        ...state,
      };

    case actionTypes.FETCH_PAYCHECK_FAILED:
      state.paychecks = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_OTHER_PRINT_SUCCESS:
      state.otherPrints = action.dataOtherPrint;
      return {
        ...state,
      };

    case actionTypes.FETCH_OTHER_PRINT_FAILED:
      state.otherPrints = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default productReducer;
