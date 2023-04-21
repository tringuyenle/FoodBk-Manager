import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { BsXLg } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/OffCanvas';
import Form from 'react-bootstrap/Form';

import './styles/Item.css'
import { CartState } from "../../../context/CartContex";

export function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}

export default function ItemInCart(obj) {
    const { dispatchCart } = CartState();
    let cash = obj.amount * obj.price;
    let cashString = cash.toString();
    return (
        <div className="item-cart-ctn" key={`${obj.id}`}>
            <img
                className="i-img"
                src={obj.imageUrl}
                alt="img"
            />
            <div className="i-dec">
                <div className="i-name">
                    {obj.title}
                </div>
                <div className="i-price-count">
                    <span >Số lượng: <span className="fs__13px i-a__count">{`${obj.amount}`}</span></span>
                    <span className="i-a__price ">Thành tiền : <span className="cash">{formatCash(cashString)} đ</span></span>
                </div>
            </div>
            <div className="food-price">
                <button
                    className="btn-remove"
                    onClick={() => {
                        console.log(obj)
                        dispatchCart({
                            type: "REMOVE_FROM_CART",
                            payload: obj,
                            amount: obj.amount
                        })
                    }}>
                    Remove
                </button>
            </div>
        </div>
        // <div className="div-line" />
    );
}

export function TotalFoodItem() {
    const {cart} = CartState();
    return (
        <>
            <div className="div-line" />
            <div className="total-container">
                <div className="Summary">
                    Tổng
                </div>
                <h6 className="sum-price">
                    <span>{formatCash(cart.cartTotalQuantity.toString())}</span>
                </h6>
            </div>
        </>
    );
}

export function TotalConfirm() {
    const { cart } = CartState();
    return (
        <div className="TotalConfirm">
            <div className='cart-price-info'>
                <div>Tổng cộng</div>
                <div className="cart-total-price"><span className="cash">{formatCash(cart.cartTotalQuantity.toString())} đ</span></div>
            </div>
            <Button className="btn-payment" href="/pay">Thanh toán</Button>
        </div>
    );
}

export function FoodItem(obj) {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(1);
    const { dispatchCart } = CartState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [note, setNote] = useState("");
    const plus = () => {
        setCount(count + 1)
    };
    const minus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    };
    return (
        <div className="item" key={obj.id}>
            <div className="item-container" onClick={handleShow}>
                <img
                    className="item-img"
                    src={obj.imageUrl}
                    alt='img'
                />
                <div className="item-txt">
                    <span className="item-title">{obj.title}</span>
                    <div className="item-description">
                        {obj.description}
                    </div>
                    <div className="price_btn">
                        <h6 className="cash">{formatCash(obj.price)}đ</h6>    
                        <Button
                            className="add-btn"
                        >
                            <AiOutlinePlus />
                        </Button>
                    </div>
                </div>
            </div>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement='end'
                className='offcanvas-size-xl'
            >
                <Offcanvas.Header>
                    <Offcanvas.Title>
                        <div className='title'>
                            <BsXLg onClick={handleClose} />
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="no-padding">
                    <div>
                        <div className="food-container" key={`${obj.title}`}>
                            <div className="food-count">
                                <button className="btn-count" onClick={minus}><FiMinus /></button>
                                <span className="fs__13px">{count}</span>
                                <button className="btn-count" onClick={plus}><AiOutlinePlus /></button>
                            </div>
                            <img
                                className="food-img"
                                src={obj.imageUrl}
                                alt="img"
                            />
                            <div className="f__ctn">
                                <div className="food-name">
                                    {obj.title}
                                </div>
                                <div className="f-description">
                                    {obj.description}
                                </div>
                            </div>
                            <div className="food-price">
                                <span className="cash">{formatCash(obj.price)}đ</span>
                            </div>
                        </div>
                        <div className="form-ctn_top" />
                        <div className="form_ctn">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><h5>Ghi chú đặc biệt</h5></Form.Label>
                                <Form.Control type="text" rows={3} onChange={(e) => setNote(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="add_to_cart">
                            <div className="add_to_cart-ctn">
                                {/* <div>
                                    plus
                                </div> */}
                                <div className="add_to_cart-btn">
                                    <Button
                                        variant="primary"
                                        className="add_to_cart-btn-primary"
                                        onClick={() => {
                                            if (note === "") {
                                                setNote("None");
                                            }
                                            obj.itemNote = note;
                                            dispatchCart({
                                                type: "ADD_TO_CART",
                                                payload: obj,
                                                amount: count,
                                                // itemNote: note
                                            });
                                            handleClose();
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}