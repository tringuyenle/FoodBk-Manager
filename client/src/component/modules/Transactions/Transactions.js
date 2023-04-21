import { useEffect } from "react";
import { useState } from "react"
import { Table } from "react-bootstrap"
import { getAllTransactions } from "../../../utils/transaction.utils";
import TransactionCell from "./TransactionCell";
import './style.css';
import { formatCash } from "../Cart/Item";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [turnover, setTurnover] = useState("");
    useEffect(() => {
        getAllTransactions().then((res) => {
            setTransactions(res);
            // calculate turnover
            let total = 0;
            res.forEach((item) => {
                total += parseInt(item.total);
            })
            setTurnover(formatCash(total.toString()));
        })
    },[])
    return (
        <>
            <h3 className="text-center">
                <b>Tổng doanh thu</b> : {turnover} VND, <b>Tổng số đơn hàng</b> : {transactions.length}
            </h3>
            <div className="trans__">
                <Table bordered hover>
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Thông tin khách hàng</th>
                            <th>Mã đơn hàng</th>
                            <th>Tình trạng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction, index) => {
                                return <TransactionCell transaction={transaction} index={index + 1} key={transaction.id} />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>

    )
}

export default Transactions