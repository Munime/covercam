import React from "react";
import CustomButton from "../custom-button/customButton";
import FormInput from "../form-input/formInput";
import "./signIn.styles.scss";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    //  створюємо стейт з даними, які нам потрібні ( в даному випадку, мейл і пароль)
    this.state = {
      email: "",
      password: "",
    };
  }
  // приймає подію, захищає від дефолтної поведінки, очищає поля у нашій формі
  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // цз функція приймає подію. Далі ми привязуємо ціль події до двох змінних. Де імя це наш ключ в стейті, а value - це те що ми ввели у формі
  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email} // сюди передаємо стейт
            handleChange={this.handleChange}
            label="Email"
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password} // сюди передаємо стейт
            handleChange={this.handleChange}
            label="Password"
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
