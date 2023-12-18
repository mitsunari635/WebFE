import actionTypes from "../actions/actionTypes";

const initialState = {
  news: [],
  allDetailNews: [],
  allNewsPage: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_NEWS_SUCCESS:
      state.news = action.news;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_NEWS_FAILED:
      state.news = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_NEWS_PAGE_SUCCESS:
      state.allNewsPage = action.dataAllNews;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_NEWS_PAGE_FAILED:
      state.allNewsPage = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DETAIL_NEWS_SUCCESS:
      state.allDetailNews = action.dataAllDetailNews;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DETAIL_NEWS_FAILED:
      state.allDetailNews = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default newsReducer;
