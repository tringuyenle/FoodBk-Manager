import React from "react";

import ItemInCart, { TotalConfirm } from "./Item";
import './styles/Cart.css';
import { CartState } from "../../../context/CartContex";
import CartNothing from "../../UI/CartNothing";


export default function Cart() {
    const { cart } = CartState();
    const cart__state = () => {
        if (cart.cartTotalAmount <= 0){
            return CartNothing();
        }
        else {
            return (
                <>
                    {cart.cartData.map((f) => ItemInCart(f))}
                    < TotalConfirm />
                </>
            )
        }
        
    }
    return (
        <>
            <div className="cart-container" id='cart-style1'>
                {cart__state()}
            </div>
        </>
    );
}