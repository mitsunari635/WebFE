import actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  detailOrders: [],
  userName: [],
  statusList: [],
  newOrders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
      };

    case actionTypes.FETCH_ORDER_FAILED:
      state.orders = [];
      return {
        ...state,
      };
    case actionTypes.DETAIL_BY_ORDER_SUCCESS:
      state.detailOrders = action.detail;
      return {
        ...state,
      };
    case actionTypes.DETAIL_BY_ORDER_FAILED:
      state.detailOrders = [];
      return {
        ...state,
      };
    case actionTypes.USER_BY_NUM_SUCCESS:
      state.userName = action.user;
      console.log(state.userName);
      return {
        ...state,
      };
    case actionTypes.USER_BY_NUM_FAILED:
      state.userName = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_STATUS_START:
      let copyState = { ...state };
      copyState.isLoadingStatus = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_STATUS_SUCCESS:
      state.statusList = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_STATUS_FAILED:
      state.statusList = [];
      return {
        ...state,
      };
    case actionTypes.EDIT_ORDER_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id
          ? { ...order, statusID: action.payload.statusID }
          : order
      );
      return {
        ...state,
        orders: updatedOrders,
      };
    case actionTypes.CHECK_NEW_ORDER_SUCCESS:
      state.newOrders = action.data;
      return {
        ...state,
      };
    case actionTypes.CHECK_NEW_ORDER_FAIL:
      state.newOrders = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default orderReducer;
