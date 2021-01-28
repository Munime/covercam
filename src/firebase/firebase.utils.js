import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDQAQmqIePcpquH-ZY2Saee7NrRxRdgZyI",
  authDomain: "camcover-8f344.firebaseapp.com",
  projectId: "camcover-8f344",
  storageBucket: "camcover-8f344.appspot.com",
  messagingSenderId: "426448216056",
  appId: "1:426448216056:web:d6e5c46c67aa5db351400d",
};

// функція створює новий документ у Firebase колекції users
// userAuth - це обєкт, який нам прилетів після того як юзер верифікувався через Google
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); // snapshot просто представляє, показує Дані

  // створюємо документ в колекції, поміщаючи туди дані

  if (!snapShot.exists) {
    const { displayName, email } = userAuth; // ці дані ми берем з обєкта, який прилетів, коли юзер верифікувався
    const createdAt = new Date(); // час коли документ створено
    try {
      await userRef.set({
        // .set() метод відповідає за створення
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; // вертаємо дані юзера, щоб мати можливість використати їх десь у коді, програмі
};

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

// функція яка конвертує масив, який ми отримуємо з фаєрбейза в Обєкт
//
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // ця функція присвоює ключі нашим обєктам і вертає нові обєкти з ключами
  // імя ключа береться із title (все тільки з маленької букви)
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// утиліта, яка дозволє нам з допомогою Проміса, отримати обєкт юзера з фаєрбейзу
// щоб провірити через саги, чи юзер залогінений, чи ні
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
