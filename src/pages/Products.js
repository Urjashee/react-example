import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar'
import product_data from '../json/Data.json'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Product() {
  const history = useNavigate();
  const [product, setProducts] = useState([]);
  let decoded

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('access_token')) == undefined) {
      history('/login')
    }
}, []);

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
              <ProductCard product_id={item.product_id} image={item.image} name={item.name} price={item.price} />
            </Col>
          )
        })}
      </Row>
    </div>
  );
}

export default Product;
