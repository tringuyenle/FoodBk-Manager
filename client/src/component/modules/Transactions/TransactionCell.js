import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateTransactionStatus } from "../../../utils/transaction.utils";
import { formatCash } from "../Cart/Item";
import FoodItem from "../Manage/FoodItem";

function TransactionCell({ transaction, index ,type }) {
    const [show, setShow] = useState({
        show: false,
        transaction: null,
    });

    const handleClose = () => setShow(false);
    const handleShow = (transaction) => setShow(
        {
            show: true,
            transaction: transaction,
        }
    );

    const handleToDelivered = async (transactionId) => {
        const result = await updateTransactionStatus(transactionId, "Delivered");
        if (result) {
            alert("Update success");
            window.location.reload(false);
        }
        else {
            alert("Update failed");
        }
    }
    return (
        <>
            <tr style = {{cursor:'pointer'}}onClick={()=> {handleShow(transaction)}}>
                <td>{index}</td>
                {
                    type !== "personal" ? 
                        <td>
                        <div>
                            {transaction.user.username}
                        </div>
                        <div className="text-muted">
                            {transaction.phone}
                        </div>
                    </td>
                : null
                }
                <td>{transaction.id}</td>
                <td>{transaction.status}</td>
                <td className="cash">{formatCash(transaction.total)}</td>
            </tr>
            <Modal show={show.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="transaction_detail_container">
                        <div>
                            <b>Mã đơn hàng</b> : {transaction.id}
                        </div>
                        <div>
                            <b>Tên khách hàng</b> : {transaction.user.username}
                        </div>
                        <div>
                            <b>Số điện thoại</b> : {transaction.phone}
                        </div>
                        <div>
                            <b>Địa chỉ</b> : {transaction.address}
                        </div>
                        <div>
                            <b>Tình trạng đơn hàng</b> : {transaction.status}
                        </div>
                        <div>
                            <b>Tổng tiền đơn hàng</b> : <span className="cash">{formatCash(transaction.total)}</span>
                        </div>
                        {
                            transaction.transactionItems.map((food) => {
                                return <FoodItem food={food.food} type = {"transaction"} quantity = {food.quantity}key = {food.id}/>
                            })
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        (transaction.status === "Delivered" || type === "personal" ) ? <></> :
                        <Button variant="warning" onClick={() => {handleToDelivered(transaction.id)}}>
                            Cập nhật tình trạng đơn hàng thành "Delivered"
                        </Button>
                    }
                </Modal.Footer>
            </Modal></>

    )
}

export default TransactionCell