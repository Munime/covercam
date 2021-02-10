import { createSelector } from "reselect";

// функція, яка бере зі стейту, тільки його кусок.
// в даному випадку частину cart

const selectCart = (state) => state.cart; // input selector

// ця функція бере проперті з того куска стейту, який ми виділили
export const selectCartItems = createSelector(
  // вона приймає в себе два аргументи.
  // перший це масив, виділеного нами куска стейту (input selector)
  [selectCart],
  // другий - це функція, яка поверне нам значення, яке нам потрібно з input selector
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// селектимо частину стейту, i робим мемоізовану функцію, яка виводить загальну пораховану кількість айтемів в корзині
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
