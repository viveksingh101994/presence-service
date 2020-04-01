import React from "react";
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from "./sign-in.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { emailSignInStart } from "../../redux/user/user.actions";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span> Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            type="email"
            label="Email"
            required
          />
          <FormInput
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            type="password"
            label="Password"
            required
          />
          <ButtonsBarContainer>
            <CustomButton type="submit">Sign In</CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
