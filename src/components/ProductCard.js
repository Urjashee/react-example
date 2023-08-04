import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { AiFillShopping } from 'react-icons/ai'
import cartContext from './CartContext'

function ProductCard({ image, name, price }) {
    const {addToCart} = useContext(cartContext);
    return (
        <Card className="my-3 p-3 rounded" onClick={() => addToCart(image,name,price)}>
            <Card.Img src={image} className='mx-auto d-block mb-3 card-image' />

            <Card.Body>
                <Card.Title as="div">
                    <strong>{name}</strong>
                </Card.Title>

                <Card.Text as="h3">
                    <div className='row'>
                        <div className='col-10'>{price}</div>
                        <div className='col-2'><AiFillShopping /></div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
