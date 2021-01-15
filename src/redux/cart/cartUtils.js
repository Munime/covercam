// функція як приймає в себе існуючий масив айтемів
// і новий айтем, який ми збираємося додати

export const addItemToCart = (cartItems, cartItemToAdd) => {
  // записуємо в змінну результат пошуку в масиві
  // чи айдійшка існуючого айтема співпадає з айдійшою айтема, який ми збираємося додати
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  // якщо айдішки співпадають (тобто це той самий айтем)
  // з допомогою функції map() ми створюємо новий масив
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? //цей масив повертає всі айтеми, які в ньому є
          // а айтеми, айдішки яких збігаються, ще отримують ключ quantity
          // значення, якого збільшується на один
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // якщо айдішки не збігаються, тоді ми вертаємо масив айтемів
  // додаємо до нього новий айтем, і створюємо йому ключ quantity із значення 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
