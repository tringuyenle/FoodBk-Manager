import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Pay.css'
import { createTransactions } from '../../../utils/transaction.utils';
import { formatCash } from '../Cart/Item';


export default function PayComponent() {
    const [items, setItems] = useState("");
    const [items2, setItems2] = useState("");
    useEffect(() => {
        setItems(formatCash(JSON.parse(localStorage.getItem('FOOD_TOTAL_QUANTITY')).toString()));
        setItems2(formatCash(JSON.parse(localStorage.getItem('FOOD_TOTAL_AMOUNT')).toString()));
    }, []);
    console.log(items);
    console.log(items2);

    const navigate = useNavigate()
    const [cash, setCash] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [shipping, setShipping] = useState(false);

    const handleSubmit = async () => {
        const typeOfTransaction = cash ? 'Tiền mặt' : 'Momo';
        const typeShipping = shipping ? 'Shipping' : 'Delivered'
        const transactionItem = JSON.parse(localStorage.getItem("FOOD_ITEM"));
        if (note === "") {
            setNote("None");
        }
        const temp = transactionItem.map((item) => {
            return {
                foodId : item.id,
                quantity: item.amount.toString(),
                itemNote : item.itemNote,
            }
        })
        const input = {
            typeOfTransaction: typeOfTransaction,
            status: typeShipping,
            phone: phone,
            address: address,
            note: note,
            total: JSON.parse(localStorage.getItem("FOOD_TOTAL_QUANTITY")).toString(),
            transactionItem: temp
        }
        const res = await createTransactions(input);
        // console.log(res);
        if(res){
            localStorage.setItem("transID", res.id);
            localStorage.removeItem("FOOD_ITEM");
            localStorage.removeItem("FOOD_TOTAL_AMOUNT");
            localStorage.removeItem("FOOD_TOTAL_QUANTITY");
            alert("Bạn đã đặt hàng thành công");
            navigate('/pay/Sucess');
            window.location.reload(false);
            
        }
        else{
            alert("Đặt hàng thất bại")
        }
    }
   
    return (

        <div className="box-container">
            <div className="BOX1">

                <div className="box1">
                    <Card variant='light' style={{ width: '50rem' }}>
                        <Card.Title  >
                            <span className="Phuongthucgiaohang">Phương thức giao hàng</span>
                        </Card.Title>
                        <Card.Body >
                            <div className="Box__checkbox">
                                <label class="pay-container container1">
                                    <span className="marginthing">Giao Hàng tận Nơi</span>
                                    <input type="radio" name="shipping" onChange={(e) => {setShipping(true)}}/>
                                    <span class="checkmark"></span>
                                </label>
                                <label class="pay-container container2">
                                    <span className="marginthing">Nhận tại cửa hàng</span>
                                    <input type="radio" name="shipping" onChange={(e) => {setShipping(false)}}/>
                                    <span class="checkmark"></span>
                                </label>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
                <div className="box2">
                    <Card variant='light' style={{ width: '50rem' }}>
                        <Card.Title >
                            <span className="thongtinlienhe">
                                Thông tin liên hệ
                            </span>
                        </Card.Title>
                        <Card.Body className="bandacotaikhoan">
                            Bạn đã có tài khoản?
                            <a className="dangnhap" href='/login'>  đăng nhập</a>
                        </Card.Body>
                        <Card.Body className="inputtt">
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Địa chỉ" class="form-control-lg" onChange={(e) => setAddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Số điện thoại" class="form-control-lg" onChange={(e) => setPhone(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </div>

                <div className="box3">
                    <Card variant='light' style={{ width: '50rem' }}>
                        <Card.Title>
                            <span className="phuongthucthanhtoan">
                                Phương thức thanh toán
                            </span>
                        </Card.Title>
                        <Card.Body className="inputtt">
                            <div className="Box__checkbox">
                                <label class="pay-container container1">
                                    <span className="marginthing">Tiền mặt</span>
                                    <input type="radio" name="radio" onChange={(e) => setCash(true)}/>
                                    <span class="checkmark"></span>
                                </label>
                                <label class="pay-container container2">
                                    <span className="marginthing">Momo</span>
                                    <input type="radio" name="radio" onChange={(e) => setCash(false)} />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

            </div>
            <div className="BOX2">

                <Card variant='light' style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><span className="giohang">Giỏ hàng</span></Card.Title>
                    </Card.Body>
                    <Card.Body className="dongdau">
                        <span className="Tamtinh"> Tạm tính ({items2} Món ) </span>
                        <span className="gia1"> {items} ₫ </span>
                    </Card.Body>
                    <Card.Body className="donghai">
                        <span className="giamgia"> Giảm giá </span>
                        <span className="gia2"> ₫0 </span>
                    </Card.Body>
                    <Card.Body className="dongba">
                        <div className="tongcong">
                            <span >Tổng cộng</span>
                            <span class="text-xs text-gray-500 mt-2 block">
                            Đã bao gồm thuế (nếu có)
                            </span>
                        </div>
                        <span className="gia3"> {items} ₫ </span>
                    </Card.Body>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="ghichu">Ghi Chú</Form.Label>
                            <Form.Control type='text' rows={3} onChange = {(e) => setNote(e.target.value)}/>
                        </Form.Group>
                    </Card.Body>
                    <div className="dong4">
                        <Card.Body onClick={() => handleSubmit()}>
                            <a  class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Thanh Toán</a>
                        </Card.Body>
                    </div>
                </Card>

            </div>
        </div>
    );
}
