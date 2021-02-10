import SignIn from "../../components/signin/signIn";
import SignUp from "../../components/sign-up/signUp";
import "./sign-in-and-sign-up.styles.scss";

const SignInAndOutPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndOutPage;
