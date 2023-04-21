import React from "react";
// import {Link} from 'react-router-dom';

import './styles/CartNothing.css';
import CartIcon from '../../img/basket.svg';

export default function CartNothing(){
    return (
        <div className="cart__nothing">
            <div className="cart__nt-ctn">
                <div className="cart__icon">
                    <img
                        src={CartIcon}
                        alt = 'ico'
                        className="cart__ico"
                    />
                </div>
                <div className="cart__txt">
                    <span className="c___txt_title">Giỏ hàng của bạn hiện đang trống</span>
                    <span className="c___txt_caption">Thêm món ăn vào giỏ hàng và thanh toán tại đây</span>
                    {/* <button className="c___btn" type="button"><Link to='/'>Tiếp tục mua</Link></button> */}
                </div>
            </div>
        </div>
    );
}