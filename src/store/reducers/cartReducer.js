import actionTypes from "../actions/actionTypes";

const initialState = {
  isEmpty: false,
  cartItems: [],
  orderDetails: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
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
    // case actionTypes.ADD_TO_CART_SUCCESS:
    //     return {
    //         ...state,
    //         cartItems: [...state.cartItems, action.payload],
    //     };
    case actionTypes.ADD_TO_CART_SUCCESS:
      const product = action.payload.detailProduct || action.payload.item;
      const existingProductIndex = state.cartItems.findIndex(
        (p) => (p.detailProduct?.id || p.item.id) === product.id
      );
      if (existingProductIndex === -1) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      } else {
        const newCart = state.cartItems.map((item, index) => {
          if (index === existingProductIndex) {
            if (item.amount === undefined) {
              item.amount = action.payload.amount;
            } else {
              item.amount += action.payload.amount;
            }
          }
          return item;
        });
        return { cartItems: newCart };
      }

    case actionTypes.ADD_TO_CART_FAILED:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case actionTypes.ADD_TO_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
      };

    case actionTypes.ADD_TO_ORDER_FAILED:
      return {
        ...state,
        orderDetails: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
