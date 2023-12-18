const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //Admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
  FETCH_ALL_USER_FAILED: "FETCH_ALL_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",

  //Product
  FETCH_STOCK_START: "FETCH_STOCK_START",
  FETCH_STOCK_SUCCESS: "FETCH_STOCK_SUCCESS",
  FETCH_STOCK_FAILED: "FETCH_STOCK_FAILED",

  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_FAILED: "CREATE_PRODUCT_FAILED",

  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILED: "EDIT_PRODUCT_FAILED",

  FETCH_ALL_PRODUCT_SUCCESS: "FETCH_ALL_PRODUCT_SUCCESS",
  FETCH_ALL_PRODUCT_FAILED: "FETCH_ALL_PRODUCT_FAILED",

  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILED: "DELETE_PRODUCT_FAILED",

  FETCH_ROLL_PAPER_SUCCESS: "FETCH_ROLL_PAPER_SUCCESS",
  FETCH_ROLL_PAPER_FAILED: "FETCH_ROLL_PAPER_FAILED",

  FETCH_PHOTO_PAPER_SUCCESS: "FETCH_PHOTO_PAPER_SUCCESS",
  FETCH_PHOTO_PAPER_FAILED: "FETCH_PHOTO_PAPER_FAILED",

  FETCH_PERFORATED_PAPER_SUCCESS: "FETCH_PERFORATED_PAPER_SUCCESS",
  FETCH_PERFORATED_PAPER_FAILED: "FETCH_PERFORATED_PAPER_FAILED",

  FETCH_PRINTED_PAPER_SUCCESS: "FETCH_PRINTED_PAPER_SUCCESS",
  FETCH_PRINTED_PAPER_FAILED: "FETCH_PRINTED_PAPER_FAILED",

  FETCH_PRINTED_FORM_SUCCESS: "FETCH_PRINTED_FORM_SUCCESS",
  FETCH_PRINTED_FORM_FAILED: "FETCH_PRINTED_FORM_FAILED",

  FETCH_PRINTED_ROLL_SUCCESS: "FETCH_PRINTED_ROLL_SUCCESS",
  FETCH_PRINTED_ROLL_FAILED: "FETCH_PRINTED_ROLL_FAILED",

  FETCH_PACKAGE_SUCCESS: "FETCH_PACKAGE_SUCCESS",
  FETCH_PACKAGE_FAILED: "FETCH_PACKAGE_FAILED",

  FETCH_ENVELOPE_SUCCESS: "FETCH_ENVELOPE_SUCCESS",
  FETCH_ENVELOPE_FAILED: "FETCH_ENVELOPE_FAILED",

  SAVE_DETAIL_PRODUCT_SUCCESS: "SAVE_DETAIL_PRODUCT_SUCCESS",
  SAVE_DETAIL_PRODUCT_FAILED: "SAVE_DETAIL_PRODUCT_FAILED",

  FETCH_ALL_DETAIL_PRODUCT_SUCCESS: "FETCH_ALL_DETAIL_PRODUCT_SUCCESS",
  FETCH_ALL_DETAIL_PRODUCT_FAILED: "FETCH_ALL_DETAIL_PRODUCT_FAILED",

  FETCH_ALL_PRODUCT_PAGE_SUCCESS: "FETCH_ALL_PRODUCT_PAGE_SUCCESS",
  FETCH_ALL_PRODUCT_PAGE_FAILED: "FETCH_ALL_PRODUCT_PAGE_FAILED",

  FETCH_LABEL_STAMP_SUCCESS: "FETCH_LABEL_STAMP_SUCCESS",
  FETCH_LABEL_STAMP_FAILED: "FETCH_LABEL_STAMP_FAILED",

  FETCH_DOCUMENT_SUCCESS: "FETCH_DOCUMENT_SUCCESS",
  FETCH_DOCUMENT_FAILED: "FETCH_DOCUMENT_FAILED",

  FETCH_IMPORT_EXPORT_SUCCESS: "FETCH_IMPORT_EXPORT_SUCCESS",
  FETCH_IMPORT_EXPORT_FAILED: "FETCH_IMPORT_EXPORT_FAILED",

  FETCH_EXPRESS_SUCCESS: "FETCH_EXPRESS_SUCCESS",
  FETCH_EXPRESS_FAILED: "FETCH_EXPRESS_FAILED",

  FETCH_SEA_AIR_BILL_SUCCESS: "FETCH_SEA_AIR_BILL_SUCCESS",
  FETCH_SEA_AIR_BILL_FAILED: "FETCH_SEA_AIR_BILL_FAILED",

  FETCH_PAYCHECK_SUCCESS: "FETCH_PAYCHECK_SUCCESS",
  FETCH_PAYCHECK_FAILED: "FETCH_PAYCHECK_FAILED",

  FETCH_ATM_BILL_SUCCESS: "FETCH_ATM_BILL_SUCCESS",
  FETCH_ATM_BILL_FAILED: "FETCH_ATM_BILL_FAILED",

  FETCH_EDC_BILL_SUCCESS: "FETCH_EDC_BILL_SUCCESS",
  FETCH_EDC_BILL_FAILED: "FETCH_EDC_BILL_FAILED",

  FETCH_OTHER_PRINT_SUCCESS: "FETCH_OTHER_PRINT_SUCCESS",
  FETCH_OTHER_PRINT_FAILED: "FETCH_OTHER_PRINT_FAILED",

  FETCH_STAMP_SUCCESS: "FETCH_STAMP_SUCCESS",
  FETCH_STAMP_FAILED: "FETCH_STAMP_FAILED",
  //Policy
  CREATE_POLICY_SUCCESS: "CREATE_POLICY_SUCCESS",
  CREATE_POLICY_FAILED: "CREATE_POLICY_FAILED",

  EDIT_POLICY_SUCCESS: "EDIT_POLICY_SUCCESS",
  EDIT_POLICY_FAILED: "EDIT_POLICY_FAILED",

  FETCH_ALL_POLICY_SUCCESS: "FETCH_ALL_POLICY_SUCCESS",
  FETCH_ALL_POLICY_FAILED: "FETCH_ALL_POLICY_FAILED",

  DELETE_POLICY_SUCCESS: "DELETE_POLICY_SUCCESS",
  DELETE_POLICY_FAILED: "DELETE_POLICY_FAILED",

  SAVE_DETAIL_POLICY_SUCCESS: "SAVE_DETAIL_POLICY_SUCCESS",
  SAVE_DETAIL_POLICY_FAILED: "SAVE_DETAIL_POLICY_FAILED",

  FETCH_ALL_DETAIL_POLICY_SUCCESS: "FETCH_ALL_DETAIL_POLICY_SUCCESS",
  FETCH_ALL_DETAIL_POLICY_FAILED: "FETCH_ALL_DETAIL_POLICY_FAILED",

  FETCH_ALL_POLICY_PAGE_SUCCESS: "FETCH_ALL_POLICY_PAGE_SUCCESS",
  FETCH_ALL_POLICY_PAGE_FAILED: "FETCH_ALL_POLICY_PAGE_FAILED",

  //Order
  SAVE_TO_ORDER: "SAVE_TO_ORDER",
  SAVE_TO_ORDER_SUCCESS: "SAVE_TO_ORDER_SUCCESS",
  SAVE_TO_ORDER_FAILED: "SAVE_TO_ORDER_FAILED",

  FETCH_ORDER: "FETCH_ORDER",
  FETCH_ORDER_SUCCESS: "FETCH_ORDER_SUCCESS",
  FETCH_ORDER_FAILED: "FETCH_ORDER_FAILED",

  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILED: "DELETE_ORDER_FAILED",

  ADD_TO_CART: "ADD_TO_CART",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILED: "ADD_TO_CART_FAILED",

  DELETE_CART_ITEM_SUCCESS: "DELETE_CART_ITEM_SUCCESS",
  DELETE_CART_ITEM_FAILED: "DELETE_CART_ITEM_FAILED",

  ADD_TO_ORDER: "ADD_TO_ORDER",
  ADD_TO_ORDER_SUCCESS: "ADD_TO_ORDER_SUCCESS",
  ADD_TO_ORDER_FAILED: "ADD_TO_ORDER_FAILED",

  DETAIL_BY_ORDER_SUCCESS: "DETAIL_BY_ORDER_SUCCESS",
  DETAIL_BY_ORDER_FAILED: "DETAIL_BY_ORDER_FAILED",

  USER_BY_NUM_SUCCESS: "USER_BY_NUM_SUCCESS",
  USER_BY_NUM_FAILED: "USER_BY_NUM_FAILED",

  FETCH_STATUS_START: "FETCH_STATUS_START",
  FETCH_STATUS_SUCCESS: "FETCH_STATUS_SUCCESS",
  FETCH_STATUS_FAILED: "FETCH_STATUS_FAILED",

  EDIT_ORDER_STATUS_SUCCESS: "EDIT_ORDER_STATUS_SUCCESS",
  EDIT_ORDER_STATUS_FAILED: "EDIT_ORDER_STATUS_FAILED",

  CHECK_NEW_ORDER_SUCCESS: "CHECK_NEW_ORDER_SUCCESS",
  CHECK_NEW_ORDER_FAIL: "CHECK_NEW_ORDER_FAIL",

  //banner
  FETCH_ALL_BANNER_SUCCESS: "FETCH_ALL_BANNER_SUCCESS",
  FETCH_ALL_BANNER_FAILED: "FETCH_ALL_BANNER_FAILED",

  FETCH_ALL_BANNER_PAGE_SUCCESS: "FETCH_ALL_BANNER_PAGE_SUCCESS",
  FETCH_ALL_BANNER_PAGE_FAILED: "FETCH_ALL_BANNER_PAGE_FAILED",

  CREATE_BANNER_SUCCESS: "CREATE_BANNER_SUCCESS",
  CREATE_BANNER_FAILED: "CREATE_BANNER_FAILED",

  DELETE_BANNER_SUCCESS: "DELETE_BANNER_SUCCESS",
  DELETE_BANNER_FAILED: "DELETE_BANNER_FAILED",

  EDIT_BANNER_SUCCESS: "EDIT_BANNER_SUCCESS",
  EDIT_BANNER_FAILED: "EDIT_BANNER_FAILED",

  //news
  FETCH_ALL_NEWS_SUCCESS: "FETCH_ALL_NEWS_SUCCESS",
  FETCH_ALL_NEWS_FAILED: "FETCH_ALL_NEWS_FAILED",

  CREATE_NEWS_SUCCESS: "CREATE_NEWS_SUCCESS",
  CREATE_NEWS_FAILED: "CREATE_NEWS_FAILED",

  DELETE_NEWS_SUCCESS: "DELETE_NEWS_SUCCESS",
  DELETE_NEWS_FAILED: "DELETE_NEWS_FAILED",

  EDIT_NEWS_SUCCESS: "EDIT_NEWS_SUCCESS",
  EDIT_NEWS_FAILED: "EDIT_NEWS_FAILED",

  FETCH_ALL_DETAIL_NEWS_SUCCESS: "FETCH_ALL_DETAIL_NEWS_SUCCESS",
  FETCH_ALL_DETAIL_NEWS_FAILED: "FETCH_ALL_DETAIL_NEWS_FAILED",

  SAVE_DETAIL_NEWS_SUCCESS: "SAVE_DETAIL_NEWS_SUCCESS",
  SAVE_DETAIL_NEWS_FAILED: "SAVE_DETAIL_NEWS_FAILED",

  FETCH_DETAIL_NEWS_SUCCESS: "FETCH_DETAIL_NEWS_SUCCESS",
  FETCH_DETAIL_NEWS_FAILED: "FETCH_DETAIL_NEWS_FAILED",
});

export default actionTypes;