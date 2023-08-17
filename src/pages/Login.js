import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/tree_logo.png";
import axios from 'axios'

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useNavigate();

  const [fieldIsValid, setFieldIsValid] = useState({
    isEmailValid: true,
    isPasswordValid: true,
    isSubmit: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });

  const sign_up = (e) => {
    e.preventDefault()
    history('/sign-up')
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    const { data } = axios.post(
      "http://localhost:3002/api/login",
      { 'email': emailRef.current.value, 'password': passwordRef.current.value },
      config)
      .then((response) => {
        localStorage.setItem('access_token', JSON.stringify(response.data.data))
        window.location.href = '/';
      })
      .catch((error) => console.log(error));
  };

  const emailKeyPress = (event) => {
    event.preventDefault();
    // const enteredEmail = emailRef.current.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailRef.current.value)) {
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
        isEmailValid: true,
        isSubmit: true
      });
      setErrorMessages({
        ...errorMessages,
        emailErrorMessage: "",
      });
    }
  }
  const passwordKeyPress = (event) => {
    event.preventDefault();
    if (!/^(?=.*[0-9])[a-zA-Z0-9]{8,15}$/.test(passwordRef.current.value)) {
      setFieldIsValid({
        ...fieldIsValid,
        isPasswordValid: false,
      });
      setErrorMessages({
        ...errorMessages,
        passwordErrorMessage: "Password must be 8-15 characters long",
      });
      return;
    } else {
      setFieldIsValid({
        ...fieldIsValid,
        isPasswordValid: true,
        isSubmit: true
      });
      setErrorMessages({
        ...errorMessages,
        passwordErrorMessage: "",
      });
    }
  }

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
          <Form>

            <Form.Group className='row-spacing'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                ref={emailRef}
                type='email'
                placeholder='Enter Email'
                onChange={emailKeyPress}
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
                onChange={passwordKeyPress}
              >
              </Form.Control>
              {!fieldIsValid.isPasswordValid && <div className="error-input">
                <p className="d-inline ms-1">{errorMessages.passwordErrorMessage}</p></div>}
            </Form.Group>

            {(!fieldIsValid.isEmailValid || !fieldIsValid.isSubmit ||
              !fieldIsValid.isPasswordValid) &&
              <Button className='row-spacing login-button'>
                Sign In
              </Button>
            }
            {(fieldIsValid.isEmailValid && fieldIsValid.isSubmit &&
              fieldIsValid.isPasswordValid) &&
              <Button type='submit' className='row-spacing login-button' onClick={submitHandler}>
                Sign In
              </Button>
            }
          </Form>
          <div className="d-grid mt-3 margin-top">
            <p className='sign-up' onClick={sign_up}>Sign-up</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
