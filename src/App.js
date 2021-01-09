import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop-page/shoppage";
import Header from "./components/header/header";
import SignInAndOut from "./pages/signinpage/signInAndOutPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null, // передаємо в стейт програми, що поки юзера немає
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // приймаєм обєкт повернутий із функції
        // розміщаємо дані юзера в стейті програми
        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id, // айдішка знаходиться завжди в снепшоті
                ...snapShot.data(), // всі інші дані можна побачити, викликавши метод data()
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // закриваєм підписку на провірку Фаєрбейсом наявності юзера
  }

  render() {
    return (
      <>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndOut} />
        </Switch>
      </>
    );
  }
}

export default App;
