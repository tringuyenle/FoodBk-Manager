/**
 * Navbar component. Welcome to navbar.js
 * @author Hung, Ho Duc <https://github.com/iduchungho>
 * @Date 2022-10-29
 */


import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCart2, BsXLg } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './styles/Navbar.css';
import Logo from './Logo';
import Cart from '../modules/Cart/Cart';
import { CartState } from '../../context/CartContex';
import { useNavigate } from 'react-router-dom';
import UserAvt from '../utils/user.utils';
import {getMe} from '../../utils/user.utils';
import { formatCash } from '../modules/Cart/Item';


function UINavbar() {
    const [showCart, setShowCart] = useState(false);
    const {cart} = CartState();
    const handleShowCart = () => setShowCart(true);
    const handleCloseCart = () => setShowCart(false);
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    useEffect(() => {
        console.log("hello");
        getMe().then(data => setUser(data))
    },[])


    const cartInfo = () => {
        return (
            <>
                <BsCart2/>
                {cart.cartTotalQuantity ? <span className='ml__5px'>{formatCash(cart.cartTotalQuantity.toString())} đ</span> : <span></span>}
            </>
        )
    }
    // const handleRegister = () => {
    //     navigate('/register');
    // }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <Navbar collapseOnSelect expand="xl" bg="light" variant="light" sticky='top' key='sm'>
            <Container className='nv-container'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="/#home"><Logo /></Navbar.Brand>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-xl`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                            <Logo />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/#home">Trang chủ</Nav.Link>
                            {/* <Nav.Link href="#action2">Về Chúng tôi</Nav.Link> */}
                            <Nav.Link href="/#menu-section">Menu</Nav.Link>
                            {/* <NavDropdown
                                title="Danh mục"
                                id={`offcanvasNavbarDropdown-expand-xl`}
                            >
                                <NavDropdown.Item href="#Food">Đồ ăn</NavDropdown.Item>
                                <NavDropdown.Item href="#Drink">
                                    Đồ uống
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className='btn-gr'>
                    <Button className='cart-btn' variant={cart.cartTotalQuantity === 0 ? "light" : "success"} onClick={handleShowCart}>{cartInfo()}</Button>
                    <Offcanvas
                        show={showCart}
                        onHide={handleCloseCart}
                        placement='end'
                        backdrop='static'
                        className='offcanvas-size-xl'
                    >
                        <Offcanvas.Header>
                            <Offcanvas.Title>
                                <div className='title'>
                                    <BsXLg onClick={handleCloseCart} />
                                    <div className='cart-title'>Giỏ đồ ăn</div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='offcanvas-body1'>
                            <Cart />
                        </Offcanvas.Body>
                    </Offcanvas>
                    {/* <Button variant="secondary" onClick={handleRegister}>Đăng ký</Button> */}
                    {/* <Button variant="primary" onClick={handleLogin}>Đăng nhập</Button> */}
                    {
                        user ? <UserAvt user={user} /> : <Button variant="primary" onClick={handleLogin}>Đăng nhập</Button>
                    }
                    {/* {onLogin()} */}
                    {/* <UserAvt/> */}
                    {/* <Button>Đăng nhập</Button> */}
                </div>
            </Container>
        </Navbar>
    );
}

export default UINavbar;