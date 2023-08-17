import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/tree_logo.png";
import axios from 'axios'

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

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

    const login = (e) => {
        e.preventDefault()
        history('/')
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
            "http://localhost:3002/api/users/",
            {
                'email': emailRef.current.value,
                'password': passwordRef.current.value,
                'first_name': firstNameRef.current.value,
                'last_name': lastNameRef.current.value,
                'address': addressRef.current.value,
                'phone_no': phoneRef.current.value,
            },
            config)
            .then((response) => {
                if(response.data.success == true) {
                window.location.href = '/login';
                } else {
                    alert("Failure")
                }
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
                        <Form.Group className='row-spacing'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                ref={firstNameRef}
                                type='text'
                                placeholder='Enter First Name'
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group className='row-spacing'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                ref={lastNameRef}
                                type='text'
                                placeholder='Enter Last Name'
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='row-spacing'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                ref={addressRef}
                                type='text'
                                placeholder='Enter Address'
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='row-spacing'>
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                                ref={phoneRef}
                                type='number'
                                placeholder='Enter Mobile No'
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button className='row-spacing login-button' onClick={submitHandler}>
                            Sign Up
                        </Button>

                    </Form>
                    <div className="d-grid mt-3 margin-top">
                        <p className='sign-up' onClick={login}>Login</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
