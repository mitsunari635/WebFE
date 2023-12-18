import actionTypes from "./actionTypes";
import {
  createNewBannerFunc,
  getAllBanner,
  deleteBannerFunc,
  editBannerFunc,
  getAllBannerPageService,
} from "../../services/bannerService";
import { toast } from "react-toastify";
import { update } from "lodash";

export const createNewBanner = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewBannerFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo banner thành công");
        dispatch(saveBannerSuccess());
        dispatch(fetchAllBannerStart());
      } else {
        dispatch(saveBannerFailed());
      }
    } catch (e) {
      dispatch(saveBannerFailed());
      console.log("saveBannerFailed error", e);
    }
  };
};

export const saveBannerSuccess = () => ({
  type: actionTypes.CREATE_BANNER_SUCCESS,
});

export const saveBannerFailed = () => ({
  type: actionTypes.CREATE_BANNER_FAILED,
});

export const fetchAllBannerStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBanner("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllBannerSuccess(res.banners));
      } else {
        toast.error("Lấy banner thất bại");
        dispatch(fetchAllBannerFailed());
      }
    } catch (e) {
      toast.error("Lấy banner thất bại");
      dispatch(fetchAllBannerFailed());
      console.log("fetchAllBannerFailed error", e);
    }
  };
};

export const fetchAllBannerSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_BANNER_SUCCESS,
  banners: data,
});

export const fetchAllBannerFailed = () => ({
  type: actionTypes.FETCH_ALL_BANNER_FAILED,
});

export const deleteBanner = (bannerId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteBannerFunc(bannerId);
      if (res && res.errCode === 0) {
        toast.success("Xóa banner thành công");
        dispatch(deleteBannerSuccess());
        dispatch(fetchAllBannerStart());
      } else {
        toast.error("Xóa banner thất bại");
        dispatch(deleteBannerFailed());
      }
    } catch (e) {
      dispatch(deleteBannerFailed());
      console.log("deleteBannerFailed error", e);
    }
  };
};

export const deleteBannerSuccess = () => ({
  type: actionTypes.DELETE_BANNER_SUCCESS,
});

export const deleteBannerFailed = () => ({
  type: actionTypes.DELETE_BANNER_FAILED,
});

export const editBanner = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editBannerFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật banner thành công");
        dispatch(editBannerSuccess());
        dispatch(fetchAllBannerStart());
      } else {
        toast.error("Cập nhật banner thất bại");
        dispatch(editBannerFailed());
      }
    } catch (e) {
      toast.error("Cập nhật banner thất bại");
      dispatch(editBannerFailed());
      console.log("editBannerFailed error", e);
    }
  };
};

export const editBannerSuccess = () => ({
  type: actionTypes.EDIT_BANNER_SUCCESS,
});

export const editBannerFailed = () => ({
  type: actionTypes.EDIT_BANNER_FAILED,
});

export const fetchAllBannerPage = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBannerPageService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_BANNER_PAGE_SUCCESS,
          dataAllBanner: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_BANNER_PAGE_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch all Banner failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_BANNER_PAGE_FAILED,
      });
    }
  };
};
