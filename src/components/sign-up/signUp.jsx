import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/customButton";
import FormInput from "../form-input/formInput";

class SignUp extends React.Component {
  constructor() {
    super();
    // створюємо стейт, в якому будуть записуватися дані нового користувача
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state; // берем дані зі стейта для маніпуляцій я ними
    // провіряємо чи співпадають паролі
    if (password !== confirmPassword) {
      alert("Password dont match");
      return;
    }

    // створюємо обєкт нового кистувача з фаєрбейзівським методом і передаєм туди емейл і пароль
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // створюєм документ в firestore з допомогою нашої функції
      await createUserProfileDocument(user, { displayName });
      // очищаємо нашу форму від введених даних
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // фіксуємо наші дані введені у поля форми
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state; // деструктуризуємо(витягуємо  дані) зі стейта, які поміщаємо в розмітку, щоб відображати
    return (
      <div className="sign-up">
        <h2 className="title">NO ACCOUNT?</h2>
        <span>Sign up with email and password</span>
        <form type="submit" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
