import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    ); // створюємо юзер-референс з допомогою функції, яку ми створили в утілітах фаєрбезу
    const userSnapshot = yield userRef.get(); // беремо снепшот юзера з цього юзер-референса
    yield put(
      signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) // поміщаємо айді та інші дані юзера в редюсер. з допомогою екшена
    );
  } catch (error) {
    yield put(signInFailure({ error: error })); // виводимо і поміщаємо в редюсер помилку
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider); // отримуємо юзера з фаєрбейзового метода
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure({ error: error }));
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure({ error: error }));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure({ error: error.message }));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

// сага отримує Проміс відповідь з фаєрбейзової утиліти
// якщо обєкта юзера нема, ми покидаємо функцію
// якщо обєкт юзера є, тоді ми викликаємо функцію, яка поміщає обєкт юзера в редюсер
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// сага слухає на екшн, який приходить з компонента, для провірки юзера
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeEvery(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onEmailSignInStart() {
  yield takeEvery(UserActionTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onUserSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export default function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onUserSignOut),
    call(onUserSignUp),
    call(onSignUpSuccess),
  ]);
}
