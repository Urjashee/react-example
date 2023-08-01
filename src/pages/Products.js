import React from 'react';
import ProductCard from '../components/ProductCard';
import product_data from '../json/Data.json'
import { Row, Col } from 'react-bootstrap'

function Product() {

  return (
    <div className="">
      <Row>

        {product_data.map((item, index) => {
          return (
            <Col lg={4} md={4}>
              <ProductCard product={item} />
            </Col>
          )
        })}
      </Row>
    </div>
  );
}

export default Product;
