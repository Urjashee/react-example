import React, {useState, useRef} from 'react';
import styles from '../assets/modal.css'
import {HiOutlineEye} from "react-icons/hi"
import {HiOutlineEyeOff} from "react-icons/hi"
import {useNavigate} from "react-router-dom";

function Modal(props) {
    function toggleYes() {
        props.result(0)
    }

    return (
        <>
            <div className="darkBG" data-backdrop="static">
                <div className="modal-content-code">
                    <div className="modal-body">
                        <p className="logout-span">
                            Order Details
                        </p>
                        <div className="code-spacing">
                            <table id=""
                                   className="table align-items-center justify-content-center mb-0">
                                <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    props.orders.map((prop) => {
                                        return (<tr>
                                            <td>
                                                {prop.order_id}
                                            </td>
                                            <td>
                                                {prop.name}
                                            </td>
                                            <td>
                                                {prop.price}
                                            </td>
                                            <td>
                                                <img src={prop.image} height={50} width={50}/>
                                            </td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="button-yes modal-button" onClick={toggleYes}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;