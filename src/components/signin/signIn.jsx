import React, { useState } from "react";
import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import CustomButton from "../custom-button/customButton";
import FormInput from "../form-input/formInput";
import "./signIn.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailSignInStart(email, password);
  };

  // цз функція приймає подію. Далі ми привязуємо ціль події до двох змінних. Де імя це наш ключ в стейті, а value - це те що ми ввели у формі
  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email} // сюди передаємо стейт
          handleChange={handleChange}
          label="Email"
        />
        <FormInput
          type="password"
          name="password"
          value={password} // сюди передаємо стейт
          handleChange={handleChange}
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
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })), // ми передаємо в цю функцію дані емейла і пароля і вони стають ключами обєкта
});

export default connect(null, mapDispatchToProps)(SignIn);
