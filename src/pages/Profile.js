import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import AppLogo from "../assets/tree_logo.png";
import axios from 'axios'
import jwt_decode from "jwt-decode";

function Profile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    const history = useNavigate();
    let decoded

    const [profile, setProfile] = useState([])

    const [fieldIsValid, setFieldIsValid] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isSubmit: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        emailErrorMessage: "",
        passwordErrorMessage: "",
    });

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('access_token'))
        decoded = jwt_decode(localStorage.getItem('access_token'))
        console.log(decoded.resultCompare.first_name)
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = axios.get(
          `http://localhost:3002/api/users/${decoded.resultCompare.user_id}`,
          config)
          .then((response) => {
            setProfile(response.data.data[0])
          })
          .catch((error) => console.log(error));
    }, [])

    const submitHandler = (event) => {
        event.preventDefault();
        const token = JSON.parse(localStorage.getItem('access_token'))
        decoded = jwt_decode(localStorage.getItem('access_token'))
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = axios.put(
            "http://localhost:3002/api/users/",
            {
                'email': emailRef.current.value,
                'first_name': firstNameRef.current.value,
                'last_name': lastNameRef.current.value,
                'address': addressRef.current.value,
                'phone_no': phoneRef.current.value,
                'id':decoded.resultCompare.user_id,
            },
            config)
            .then((response) => {
                if (response.data.success == true) {
                    window.location.href = '/';
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
        <div className="">
            <Row>
                <NavBar />
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
                                    defaultValue={profile.email}
                                    readOnly
                                >
                                </Form.Control>
                                {!fieldIsValid.isEmailValid && <div className="error-input">
                                    <p className="d-inline ms-1">{errorMessages.emailErrorMessage}</p>
                                </div>}
                            </Form.Group>

                            <Form.Group className='row-spacing'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    ref={firstNameRef}
                                    type='text'
                                    placeholder='Enter First Name'
                                    defaultValue={profile.first_name}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group className='row-spacing'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    ref={lastNameRef}
                                    type='text'
                                    placeholder='Enter Last Name'
                                    defaultValue={profile.last_name}
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
                                    defaultValue={profile.address}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='row-spacing'>
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control
                                    ref={phoneRef}
                                    type='number'
                                    placeholder='Enter Mobile No'
                                    defaultValue={profile.phone_no}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button className='row-spacing login-button' onClick={submitHandler}>
                                Update
                            </Button>

                        </Form>
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default Profile;
