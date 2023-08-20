import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Row, Col, Form, Button } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import ModalOrders from '../components/ModalOrders'

function OrderDetails() {
    let decoded = jwt_decode(localStorage.getItem('access_token'))
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('access_token'))
        decoded = jwt_decode(localStorage.getItem('access_token'))
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = axios.get(
            `http://localhost:3002/api/orders/${decoded.result.user_id}`,
            config)
            .then((response) => {
                setOrders(response.data.data)
            })
            .catch((error) => console.log(error));
    }, [])

    const showTable = (data) => {
        // try {
        return data.map((item, index) => {
            try {
                return (
                    <tr onClick={() => orderModal(item.order_id)}>
                        <td>
                            {item.order_id}
                        </td>
                        <td>{item.billing_address}</td>
                        <td>{item.amount}</td>
                        <td>{convertDateTime(item.created_at)}</td>
                    </tr>
                );
            } catch (e) {
                alert(e.message);
            }
        });
    }

    const orderModal = (order) => {
        setModalShow(true)
        const token = JSON.parse(localStorage.getItem('access_token'))
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = axios.get(
            `http://localhost:3002/api/order-details/${order}`,
            config)
            .then((response) => {
                setOrderDetails(response.data.data)
            })
            .catch((error) => console.log(error));
    }

    const convertDateTime = (data) => {
        const options = {hour: '2-digit', minute: '2-digit'};
        const date = new Date(data);
        return (date.toLocaleDateString('en-US') + " | " + date.toLocaleTimeString('en-US', options))
    }

    const modal = (data) => {
        setModalShow(false)
    }

    return (
        <div className="">
            {
                modalShow &&
                <ModalOrders orders={orderDetails} result={modal}/>
            }
            <Row>
                <NavBar />
                <h2>Order Details</h2>
                <Row style={{ marginRight: "0px", marginLeft: "10px" }}>
                    <table id="table"
                           className="table align-items-center justify-content-center mb-0">
                        <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Billing Address</th>
                            <th>Amount</th>
                            <th>Created Date & Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showTable(orders)}
                        </tbody>
                    </table>
                </Row>
            </Row>
        </div>
    );
}

export default OrderDetails;
