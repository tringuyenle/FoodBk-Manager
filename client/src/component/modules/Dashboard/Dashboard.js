import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { Outlet, useNavigate } from "react-router-dom"
import SidebarItem from "./SidebarItem";
import './style.css'
function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col xs={3} className="col_3">
                    <div className="box d-flex flex-column align-items-center">
                        <div className="col_3_header">
                            <h4>Dashboard</h4>
                        </div>
                        <SidebarItem
                            title="Thêm món ăn"
                            onClick={() => navigate('/dashboard/upload')}
                        />
                        <SidebarItem
                            title="Quản lý món ăn"
                            onClick={() => navigate('/dashboard/manage')}
                        />
                        <SidebarItem
                            title="Xem đơn hàng"
                            onClick={() => navigate('/dashboard/transactions')}
                        />
                        <SidebarItem
                            title="Đăng ký admin"
                            onClick={() => navigate('/dashboard/registerAdmin')}
                        />
                    </div>
                </Col>
                <Col xs={9}>
                    <div className="box">
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard