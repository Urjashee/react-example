import React from 'react'
import { Card } from 'react-bootstrap'

function ProductCard({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
                <Card.Img src={product.image} className='mx-auto d-block mb-3 card-image'/>

            <Card.Body>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>

                <Card.Text as="h3">
                    {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
