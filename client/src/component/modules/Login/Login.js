import { useState } from "react";
import { memo } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { getMe, login } from "../../../utils/user.utils";
import Logo from "../../UI/Logo";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await login({email, password});
        if(res) {
            const me = await getMe();
            if(me.role === "admin") {
                navigate("/dashboard");
                window.location.reload();
            }
            else {
                navigate("/");
                window.location.reload();
            }
        }
        else {
            alert("Login failed");
        }
    }
    return (
        <div className="wall__login">
            {window.scrollTo(0, 0)}
            <div className="l__ctn">
                <div className="l__ctn_flex">
                    <Logo />
                    <Container className=" h-100">
                        <Row>
                            <Form className="mt-3" onSubmit={(e) => { handleLogin(e) }}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="btn__login">
                                    Đăng nhập
                                </Button>
                                <button className="btn___item">
                                    <Link to='/register' className="btn__txt">Tạo tài khoản mới</Link>
                                </button>
                            </Form>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default memo(Login)
