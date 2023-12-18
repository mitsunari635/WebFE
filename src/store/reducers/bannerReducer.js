import actionTypes from "../actions/actionTypes";

const initialState = {
  banners: [],
  allBannerPage: [],
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_BANNER_SUCCESS:
      state.banners = action.banners;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_BANNER_FAILED:
      state.banners = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_BANNER_PAGE_SUCCESS:
      state.allBannerPage = action.dataAllBanner;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_BANNER_PAGE_FAILED:
      state.allBannerPage = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default bannerReducer;
