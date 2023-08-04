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
                        <div className='col-4 mx-auto'><h3>Image</h3></div>
                        <div className='col-4 mb-3 mx-auto'><h3>Name</h3></div>
                        <div className='col-2 mb-3 mx-auto'><h3>Price</h3></div>
                    </div>
                    {
                        items.map((item) => {
                            return (
                                <div className='row'>
                                    <div className='col-4'><img src={item.image}
                                        className="mx-auto d-block mb-3"
                                        alt="App"
                                        width="30%" /></div>
                                    <div className='col-4 mb-3 mx-auto'>{item.name}</div>
                                    <div className='col-2 mb-3 mx-auto'>{item.price}</div>
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
