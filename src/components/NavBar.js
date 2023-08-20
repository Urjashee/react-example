import React, { useContext } from 'react'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BsFillCartFill } from 'react-icons/bs'
import cartContext from './CartContext'
import { useNavigate } from "react-router-dom";

function NavBar() {
    const history = useNavigate();

    const { items } = useContext(cartContext)
    const logout = () => {
        localStorage.removeItem("access_token")
        history('/login')
    }
    const profile = () => {
        history('/profile')
    }
    const orders = () => {
        history('/order-details')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>App</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto">
                            <NavDropdown title='Menu'>
                                <NavDropdown.Item onClick={orders}>
                                    Orders
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={profile}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            <LinkContainer to='/cart'>
                                <Nav.Link ><BsFillCartFill />
                                    <span>
                                        {items.length}
                                    </span>
                                </Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar