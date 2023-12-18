import actionTypes from "./actionTypes";
import {
  deleteOrder,
  getDetailOrder,
  getOrder,
  getUserByOrderNumber,
  editOrderStatus,
  checkNewOrder,
} from "../../services/orderService";
import { toast } from "react-toastify";
import { getAllCodeService } from "../../services/productService";

export const fetchOrderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getOrder("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchOrderSuccess(res.orders));
      } else {
        toast.error("Lấy đơn hàng thất bại");
        dispatch(fetchOrderFailed());
      }
    } catch (e) {
      toast.error("Lấy đơn hàng thất bại");
      dispatch(fetchOrderFailed());
      console.log("fetchOrderFailed error:", e);
    }
  };
};

export const fetchOrderSuccess = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: data,
  });

  // Trigger a new order fetch immediately after successful order retrieval
  const isNewOrder = checkNewOrder(); // Assuming checkNewOrder returns a boolean
  // if (isNewOrder) {
  //   dispatch(handleCheckNewOrder());
  // }
};

export const fetchOrderFailed = () => ({
  type: actionTypes.FETCH_ORDER_FAILED,
});

export const deleteOrderStart = (orderInfo) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteOrder(orderInfo);
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(deleteOrderSuccess(res.orders));
        toast.success("Xóa thành công");
        dispatch(fetchOrderStart());
      } else {
        toast.error("Lấy đơn hàng thất bại");
        dispatch(deleteOrderFailed());
      }
    } catch (e) {
      toast.success("Lấy đơn hàng thất bại");
      dispatch(fetchOrderFailed());
      console.log("fetchOrderFailed error:", e);
    }
  };
};

export const deleteOrderSuccess = (data) => ({
  type: actionTypes.DELETE_ORDER_SUCCESS,
});

export const deleteOrderFailed = () => ({
  type: actionTypes.DELETE_ORDER_FAILED,
});

export const detailByNumber = (orderNumber) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailOrder(orderNumber);
      if (res && res.errCode === 0) {
        dispatch(detailByNumberSuccess(res.data));
      } else {
        toast.success("Lấy đơn hàng thất bại");
        dispatch(detailByNumberFailed());
      }
    } catch (e) {
      toast.success("Lấy đơn hàng thất bại");
      dispatch(detailByNumberFailed());
      console.log("fetchOrderFailed error:", e);
    }
  };
};

export const detailByNumberSuccess = (data) => ({
  type: actionTypes.DETAIL_BY_ORDER_SUCCESS,
  detail: data,
});

export const detailByNumberFailed = () => ({
  type: actionTypes.DETAIL_BY_ORDER_FAILED,
});

export const UserByNumberStart = (orderNumber) => {
  return async (dispatch, getState) => {
    try {
      let res = await getUserByOrderNumber(orderNumber);
      if (res && res.errCode === 0) {
        dispatch(userByNumberSuccess(res.user));
      } else {
        toast.success("Lấy đơn hàng thất bại");
        dispatch(userByNumberFailed());
      }
    } catch (e) {
      toast.success("Lấy đơn hàng thất bại");
      dispatch(userByNumberFailed());
      console.log("fetchOrderFailed error:", e);
    }
  };
};

export const userByNumberSuccess = (data) => ({
  type: actionTypes.USER_BY_NUM_SUCCESS,
  user: data,
});

export const userByNumberFailed = () => ({
  type: actionTypes.USER_BY_NUM_FAILED,
});

export const fetchStatusStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("STATUS");
      // console.log(res)
      if (res && res.errCode === 0) {
        dispatch(fetchStatusSuccess(res.data));
      } else {
        dispatch(fetchStatusFailed());
      }
    } catch (e) {
      dispatch(fetchStatusFailed());
      console.log("fetchStatusStart error", e);
    }
  };
};

export const fetchStatusSuccess = (statusData) => ({
  type: actionTypes.FETCH_STATUS_SUCCESS,
  data: statusData,
});

export const fetchStatusFailed = () => ({
  type: actionTypes.FETCH_STATUS_FAILED,
});

export const editOrderStatusFunc = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editOrderStatus(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật trạng thái thành công");
        dispatch(editOrderStatusSuccess(data));
        dispatch(fetchStatusStart());
      } else {
        toast.error("Cập nhật trạng thái thất bại");
        dispatch(editOrderStatusFailed());
      }
    } catch (e) {
      toast.error("Cập nhật trạng thái thất bại");
      dispatch(editOrderStatusFailed());
      console.log("editProductFailed error", e);
    }
  };
};

export const editOrderStatusSuccess = (data) => ({
  type: actionTypes.EDIT_ORDER_STATUS_SUCCESS,
  payload: data,
});

export const editOrderStatusFailed = () => ({
  type: actionTypes.EDIT_ORDER_STATUS_FAILED,
});

export const handleCheckNewOrder = () => {
  return async (dispatch, getState) => {
    try {
      let res = await checkNewOrder();
      if (res && res.errCode === 0) {
        dispatch(checkNewOrderSuccess(res.data));
      } else {
        dispatch(checkNewOrderFail());
      }
    } catch (e) {
      toast.error("Cập nhật trạng thái thất bại");
      dispatch(checkNewOrderFail());
      console.log("editProductFailed error", e);
    }
  };
};

export const checkNewOrderSuccess = (data) => ({
  type: actionTypes.CHECK_NEW_ORDER_SUCCESS,
  payload: data,
});

export const checkNewOrderFail = () => ({
  type: actionTypes.CHECK_NEW_ORDER_FAIL,
});
