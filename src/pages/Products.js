import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar'
import product_data from '../json/Data.json'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

function Product() {
  const [product, setProducts] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('access_token'))
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = axios.get(
      "http://localhost:3002/api/products",
      config)
      .then((response) => {
        setProducts(response.data.data)
      })
      .catch((error) => console.log(error));
}, [])

  return (
    <div className="">
      <Row>
      <NavBar/>
        {product.map((item, index) => {
          return (
            <Col lg={4} md={4}>
              <ProductCard image={item.image} name={item.name} price={item.price} />
            </Col>
          )
        })}
      </Row>
    </div>
  );
}

export default Product;
