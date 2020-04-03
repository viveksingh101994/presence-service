import React from 'react';
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { emailSignInStart, resetError } from '../../redux/user/user.actions';
import {
  selectIsUserSessionAvailable,
  selectIsError
} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async (e) => {
    if (this.props.isLoading) {
      return false;
    }
    e.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  handleChange = (e) => {
    if (
      !(this.props.isError instanceof Error) &&
      this.props.isError instanceof Object
    ) {
      this.props.reinitializeError();
    }
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let error = false;
    let message = '';
    if (
      !(this.props.isError instanceof Error) &&
      this.props.isError instanceof Object
    ) {
      message = this.props.isError.message;
      error = true;
    }

    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span> Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            type="email"
            placeholder="Email"
            error={error}
            required
          />
          <FormInput
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            type="password"
            error={error}
            placeholder="Password"
            helperText={message}
            required
          />
          <ButtonsBarContainer>
            <CustomButton type="submit" disabled={this.props.isLoading}>
              Sign In
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsUserSessionAvailable,
  isError: selectIsError
});

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  reinitializeError: () => dispatch(resetError())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
