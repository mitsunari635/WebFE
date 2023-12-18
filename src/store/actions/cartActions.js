import actionTypes from "./actionTypes";
import {
  AddCartFunc,
  deleteCartFunc,
  editCartFunc,
  SaveToOrderFunc,
} from "../../services/cartService";
import { toast } from "react-toastify";

export const AddCart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await AddCartFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm vào giỏ hàng thành công");
        dispatch(saveCartSuccess());
      } else {
        dispatch(saveCartFailed());
      }
    } catch (e) {
      dispatch(saveCartFailed());
      console.log("saveCartFailed error", e);
    }
  };
};

export const saveCartSuccess = () => ({
  type: actionTypes.CREATE_CART_SUCCESS,
});

export const saveCartFailed = () => ({
  type: actionTypes.CREATE_CART_FAILED,
});

export const deleteCart = (CartId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCartFunc(CartId);
      if (res && res.errCode === 0) {
        toast.success("Xóa sản phẩm thành công");
        dispatch(deleteCartSuccess());
      } else {
        toast.error("Xóa sản phẩm thất bại");
        dispatch(deleteCartFailed());
      }
    } catch (e) {
      dispatch(deleteCartFailed());
      console.log("deleteCartFailed error", e);
    }
  };
};

export const deleteCartSuccess = () => ({
  type: actionTypes.DELETE_CART_SUCCESS,
});

export const deleteCartFailed = () => ({
  type: actionTypes.DELETE_CART_FAILED,
});

export const editCart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editCartFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật sản phẩm thành công");
        dispatch(editCartSuccess());
      } else {
        toast.error("Cập nhật sản phẩm thất bại");
        dispatch(editCartFailed());
      }
    } catch (e) {
      toast.error("Cập nhật sản phẩm thất bại");
      dispatch(editCartFailed());
      console.log("editCartFailed error", e);
    }
  };
};

export const editCartSuccess = () => ({
  type: actionTypes.EDIT_CART_SUCCESS,
});

export const editCartFailed = () => ({
  type: actionTypes.EDIT_CART_FAILED,
});

export const addToCart = (cartItem) => {
  return (dispatch) => {
    try {
      dispatch(addToCartSuccess(cartItem));
      toast.success("Thêm vào giỏ hàng thành công");
    } catch (error) {
      dispatch(addToCartFailed());
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
};

export const addToCartSuccess = (cartItem) => ({
  type: actionTypes.ADD_TO_CART_SUCCESS,
  payload: cartItem,
});

export const addToCartFailed = (cartItem) => ({
  type: actionTypes.ADD_TO_CART_FAILED,
  payload: cartItem,
});

export const SaveToOrder = (cartItems) => {
  return async (dispatch) => {
    try {
      let res = await SaveToOrderFunc(cartItems);
      if (res && res.errCode === 0) {
        dispatch(SaveToOrderSuccess());
        toast.success("Cảm ơn quý khách đã đặt hàng");
      }
    } catch (error) {
      dispatch(SaveToOrderFailed());
      toast.error("Đặt hàng thất bại");
    }
  };
};

export const SaveToOrderSuccess = () => ({
  type: actionTypes.SAVE_TO_ORDER_SUCCESS,
});

export const SaveToOrderFailed = () => ({
  type: actionTypes.SAVE_TO_ORDER_FAILED,
});

export const addToOrder = (orderDetails) => {
  return (dispatch) => {
    try {
      dispatch(addToOrderSuccess(orderDetails));
      toast.success("Đặt hàng thành công");
    } catch (error) {
      dispatch(addToOrderFailed());
      toast.error("Đặt hàng thất bại");
    }
  };
};

export const addToOrderSuccess = (orderDetails) => ({
  type: actionTypes.ADD_TO_ORDER_SUCCESS,
  payload: orderDetails,
});

export const addToOrderFailed = () => ({
  type: actionTypes.ADD_TO_ORDER_FAILED,
});
