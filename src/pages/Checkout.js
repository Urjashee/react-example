import React, { useContext, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Row, Col, Form, Button } from 'react-bootstrap';
import cartContext from '../components/CartContext';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Checkout() {
    const history = useNavigate();
    const addressRef = useRef()
    const { items } = useContext(cartContext)
    const sum = items.reduce((acc, current) => acc + current.price, 0);
    console.log(sum)
    let decoded = jwt_decode(localStorage.getItem('access_token'))

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
        const { data } = axios.post(
            "http://localhost:3002/api/orders",
            {
                "address": addressRef.current.value,
                "user_id": decoded.result.user_id,
                "amount": (sum * 0.18) + sum,
                "products":items
            },
            config)
            .then((response) => {
                // window.location.href = '/';
                history('/')
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="">
            <Row>
                <NavBar />
                <h2>Checkout</h2>
                <Row>
                    <Col lg={7} md={7} className='col-design' style={{ marginRight: "0px" }}>
                        <div className='row'>
                            {/* <div className='col-1'></div> */}
                            <div className='col-4'><h3><u>Image</u></h3></div>
                            <div className='col-4'><h3><u>Name</u></h3></div>
                            <div className='col-4'><h3><u>Price</u></h3></div>
                        </div>
                        {
                            items.map((item) => {
                                return (
                                    <div className='row'>
                                        {/* <div className='col-1'></div> */}
                                        <div className='col-4'><img src={item.image}
                                            className="d-block mb-3"
                                            alt="App"
                                            width="30%" /></div>
                                        <div className='col-4'>{item.name}</div>
                                        <div className='col-4'>{item.price}</div>
                                    </div>
                                )
                            })
                        }
                        <div className='row'>
                            {/* <div className='col-1'></div> */}
                            <div className='col-4'><h3><u></u></h3></div>
                            <div className='col-4'><h3>Sub-total:</h3></div>
                            <div className='col-4'><h3>{sum}</h3></div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} className='col-design'>
                        <Form.Group className='row-spacing'>
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                ref={addressRef}
                                type='text'
                                placeholder='Enter Billing Address'
                                defaultValue={decoded.result.address}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Row>
                            <div className='col-6'><h5>Sub-total:</h5></div>
                            <div className='col-6'>{sum}
                            </div>
                        </Row>
                        <Row>
                            <div className='col-6'><h5>Tax:</h5></div>
                            <div className='col-6'>
                                18%
                            </div>
                        </Row>
                        <Row>
                            <div className='col-6'><h3>Total:</h3></div>
                            <div className='col-6'>
                                 {(sum * 0.18) + sum}
                            </div>
                        </Row>
                        <Row>
                        <Button className='row-spacing login-button' onClick={submitHandler}>
                            Submit
                        </Button>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </div>
    );
}

export default Checkout;
