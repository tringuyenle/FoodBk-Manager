import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import './styles/user.utils.css';
import { CiReceipt, CiLogout } from 'react-icons/ci'
import {  logout } from "../../utils/user.utils";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

export default function UserAvt({ user }) {
    const navigate = useNavigate();
    const [showUser, setShowUser] = useState(false);
    const handleShow = () => {
        return setShowUser(!showUser);
    }
    const menu = () => {
        if (user.role === 'admin') {
            return (
                <Dropdown.Item onClick={
                    () => {
                        navigate('/dashboard');
                        handleShow();
                    }
                }>
                    <div className="dropdown__item">
                        <span className="dropdown__txt">Dashboard</span>
                        <div className="dropdown__icon"><FiUpload /></div>
                    </div>
                </Dropdown.Item>
            )
        }
        else {
            return (
                <Dropdown.Item href="/bill">
                    <div className="dropdown__item">
                        <span className="dropdown__txt">Đơn mua</span>
                        <div className="dropdown__icon"><CiReceipt /></div>
                    </div>
                </Dropdown.Item>
            );
        }
    }

    return (
        <div className="user___avt">
            <div className="user___avt-ctn">
                <img
                    src={user.avatarUrl}
                    alt='avt'
                    className="user___avt"
                    onClick={handleShow}
                />
                <Dropdown show={showUser} align="end">
                    <Dropdown.Menu>
                        {menu()}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={async () => {
                            await logout();
                            navigate('/');
                            window.location.reload();
                        }}>
                            <div className="dropdown__item">
                                <span
                                    className="dropdown__txt">
                                    Đăng xuất
                                </span>
                                <div className="dropdown__icon"><CiLogout /></div>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}