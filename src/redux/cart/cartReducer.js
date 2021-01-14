import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cartUtils";
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload), // функція бере в себе state з масивом айтемів, і payload, з айтемом, який плануємо додати
      };
    default:
      return state;
  }
};

export default cartReducer;
