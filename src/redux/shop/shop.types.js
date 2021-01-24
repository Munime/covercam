// Схема роботи redux-thunk для асинхронних запитів програми
// Створюємо три типи дій (екшенів)
// Тип початку дії, Тип дії, яка завершилася успішно, тип дії, яка завершилася з помилкою
const shopActionTypes = {
  FETCH_COLLECTIONS_START: "FETCH_COLLECTION_START",
  FETCH_COLLECTIONS_SUCCESS: "FETCH_COLLECTIONS_SUCCESS",
  FETCH_COLLECTIONS_FAILURE: "FETCH_COLLECTIONS_FAILURE",
};

export default shopActionTypes;
