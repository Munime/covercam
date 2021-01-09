import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop-page/shoppage";
import Header from "./components/header/header";
import SignInAndOut from "./pages/signinpage/signInAndOutPage";
import { auth } from "./firebase/firebase.utils";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null, // передаємо в стейт програми, що поки юзера немає
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      // якщо юзер автентифікувався з Firebase
      this.setState({ currentUser: user }); // ми поміщаємо юзера в наш стейт програми

      console.log(user);
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
