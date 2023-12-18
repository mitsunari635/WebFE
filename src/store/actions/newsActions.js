import actionTypes from "./actionTypes";
import {
  createNewNewsFunc,
  getAllNews,
  deleteNewsFunc,
  editNewsFunc,
  getAllDetailNews,
  saveDetailNewsService,
  getDetailInforNewsById,
} from "../../services/newsService";
import { toast } from "react-toastify";

export const createNewNews = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewNewsFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo tin tức thành công");
        dispatch(saveNewsSuccess());
        dispatch(fetchAllNewsStart());
      } else {
        dispatch(saveNewsFailed());
      }
    } catch (e) {
      dispatch(saveNewsFailed());
      console.log("saveNewsFailed error", e);
    }
  };
};

export const saveNewsSuccess = () => ({
  type: actionTypes.CREATE_NEWS_SUCCESS,
});

export const saveNewsFailed = () => ({
  type: actionTypes.CREATE_NEWS_FAILED,
});

export const fetchAllNewsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllNews("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllNewsSuccess(res.news));
      } else {
        toast.success("Lấy tin tức thất bại");
        dispatch(fetchAllNewsFailed());
      }
    } catch (e) {
      toast.success("Lấy tin tức thất bại");
      dispatch(fetchAllNewsFailed());
      console.log("fetchAllNewsFailed error", e);
    }
  };
};

export const fetchAllNewsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_NEWS_SUCCESS,
  news: data,
});

export const fetchAllNewsFailed = () => ({
  type: actionTypes.FETCH_ALL_NEWS_FAILED,
});

export const deleteNews = (newsId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteNewsFunc(newsId);
      if (res && res.errCode === 0) {
        toast.success("Xóa tin tức thành công");
        dispatch(deleteNewsSuccess());
        dispatch(fetchAllNewsStart());
      } else {
        toast.error("Xóa tin tức thất bại");
        dispatch(deleteNewsFailed());
      }
    } catch (e) {
      dispatch(deleteNewsFailed());
      console.log("deleteNewsFailed error", e);
    }
  };
};

export const deleteNewsSuccess = () => ({
  type: actionTypes.DELETE_NEWS_SUCCESS,
});

export const deleteNewsFailed = () => ({
  type: actionTypes.DELETE_NEWS_FAILED,
});

export const editNews = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editNewsFunc(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật tin tức thành công");
        dispatch(editNewsSuccess());
        dispatch(fetchAllNewsStart());
      } else {
        toast.error("Cập nhật tin tức thất bại");
        dispatch(editNewsFailed());
      }
    } catch (e) {
      toast.error("Cập nhật tin tức thất bại");
      dispatch(editNewsFailed());
      console.log("editNewsFailed error", e);
    }
  };
};

export const editNewsSuccess = () => ({
  type: actionTypes.EDIT_NEWS_SUCCESS,
});

export const editNewsFailed = () => ({
  type: actionTypes.EDIT_NEWS_FAILED,
});

export const fetchAllDetailNews = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDetailNews();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DETAIL_NEWS_SUCCESS,
          dataAllDetailNews: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DETAIL_NEWS_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch all detail News failed: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DETAIL_NEWS_FAILED,
      });
    }
  };
};

export const saveDetailNews = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailNewsService(data);
      if (res && res.errCode === 0) {
        toast.success("Save detail News success");
        dispatch({
          type: actionTypes.SAVE_DETAIL_NEWS_SUCCESS,
        });
      } else {
        toast.error("Save detail News fail");
        dispatch({
          type: actionTypes.SAVE_DETAIL_NEWS_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save detail News fail");
      dispatch({
        type: actionTypes.SAVE_DETAIL_NEWS_FAILED,
      });
    }
  };
};

export const fetchDetailsNewsById = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailInforNewsById();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_NEWS_SUCCESS,
          dataDetailPolicy: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_NEWS_FAILED,
        });
      }
    } catch (e) {
      console.log("Fetch all detail Policy failed: ", e);
      dispatch({
        type: actionTypes.FETCH_DETAIL_NEWS_FAILED,
      });
    }
  };
};
