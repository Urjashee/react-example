import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/tree_logo.png";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useNavigate();

  const [fieldIsValid, setFieldIsValid] = useState({
        isEmailValid: true,
        isPasswordValid: true,
    });
    const [errorMessages, setErrorMessages] = useState({
        emailErrorMessage: "",
        passwordErrorMessage: "",
    });

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   history('/')
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(fieldIsValid.isEmailValid);
    console.log(fieldIsValid.isPasswordValid);

    if (!enteredEmail) {
        setFieldIsValid({
            ...fieldIsValid,
            isEmailValid: false,
        });
        setErrorMessages({
            ...errorMessages,
            emailErrorMessage: "Please enter an email",
        });
        return;
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredEmail)
    ) {
        setFieldIsValid({
            ...fieldIsValid,
            isEmailValid: false
        });
        setErrorMessages({
            ...errorMessages,
            emailErrorMessage: "Please enter a valid email"
        });
        return;
    } else {
        setFieldIsValid({
            ...fieldIsValid,
            isEmailValid: true
        });
    }

    if (!enteredPassword) {
        setFieldIsValid({
            ...fieldIsValid,
            isPasswordValid: false,
        });
        setErrorMessages({
            ...errorMessages,
            passwordErrorMessage: "Please enter a valid password",
        });
        return;
    } else if (
        !/^(?=.*[0-9])[a-zA-Z0-9]{8,15}$/.test(enteredPassword)
    ) {
        setFieldIsValid({
            ...fieldIsValid,
            isPasswordValid: false,
        });
        setErrorMessages({
            ...errorMessages,
            passwordErrorMessage: "Password must be 8 character long with a mix of alphanumeric characters",
        });
        return;
    } else {
        //initiate the http request
        history('/product')
        setFieldIsValid({
            ...fieldIsValid,
            isPasswordValid: true,
        });
    }

    setErrorMessages({
        emailErrorMessage: "",
        passwordErrorMessage: "",
    });
    //navigate('/sign-in');
    //call API here
    //props.onAddToCart(enteredAmountNumber);
};

  return (
    <div className="App login-body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <img
            src={AppLogo}
            className="mx-auto d-block mb-3"
            alt="Jam-Session"
            width="30%"
          />
          <p className="text-center font-75perc mb-4">
            Enter your Username & Password to continue with login.
          </p>
          <Form onSubmit={submitHandler}>

            <Form.Group className='row-spacing'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                ref={emailRef}
                type='email'
                placeholder='Enter Email'
              >
              </Form.Control>
              {!fieldIsValid.isEmailValid && <div className="error-input">
                            <p className="d-inline ms-1">{errorMessages.emailErrorMessage}</p>
                        </div>}
            </Form.Group>


            <Form.Group className='row-spacing'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type='password'
                placeholder='Enter Password'
              >
              </Form.Control>
              {!fieldIsValid.isPasswordValid && <div className="error-input">
                            <p className="d-inline ms-1">{errorMessages.passwordErrorMessage}</p></div>}
            </Form.Group>

            <Button type='submit' variant='primary' className='row-spacing login-button'>
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
