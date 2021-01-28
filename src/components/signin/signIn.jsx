import React from "react";
import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import CustomButton from "../custom-button/customButton";
import FormInput from "../form-input/formInput";
import "./signIn.styles.scss";

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
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  };

  // цз функція приймає подію. Далі ми привязуємо ціль події до двох змінних. Де імя це наш ключ в стейті, а value - це те що ми ввели у формі
  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
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
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })), // ми передаємо в цю функцію дані емейла і пароля і вони стають ключами обєкта
});

export default connect(null, mapDispatchToProps)(SignIn);
