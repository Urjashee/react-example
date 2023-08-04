import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import { Row } from 'react-bootstrap';
import cartContext from '../components/CartContext';

function Checkout() {
    const { items } = useContext(cartContext)
    console.log(items)
    return (
        <div className="">
            <Row>
                <NavBar />
                <h2>Checkout</h2>
                <Row>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-3'><h3><u>Image</u></h3></div>
                        <div className='col-3'><h3><u>Name</u></h3></div>
                        <div className='col-2'><h3><u>Price</u></h3></div>
                    </div>
                    {
                        items.map((item) => {
                            return (
                                <div className='row'>
                                    <div className='col-2'></div>
                                    <div className='col-3'><img src={item.image}
                                        className="d-block mb-3"
                                        alt="App"
                                        width="30%" /></div>
                                    <div className='col-3'>{item.name}</div>
                                    <div className='col-2'>{item.price}</div>
                                </div>
                            )
                        })
                    }
                </Row>
            </Row>
        </div>
    );
}

export default Checkout;
