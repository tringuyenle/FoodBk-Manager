import React from "react";
import './styles/Footer.css';
import Logo from "./Logo";
export default function Footer() {
    return (
        // <div className='footer'>
        //     <div className="footer-logo">
        //         <div className="footer-logo_icon"><Logo/></div>
        //     </div>
        //     <div className="footer-line"/>
        //     <div className="footer-text_container">
        //         <div className="footer-text-conpany">
        //             Về chúng tôi
        //         </div>
        //         <div className="footer-text-product">
        //             Đồ Ăn, đồ uống
        //         </div>
        //         <div className="footer-text-link">
        //             example.com
        //         </div>
        //         <div className="footer-text-contact">
        //             fb.com/iduchungho
        //         </div>
        //     </div>
        // </div>
        <footer className="bg-light text-dark text-center text-lg-start f___custom">

            <div className="container1 p-4">

                <div className="row">

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        {/* <h5 class="text-uppercase"><Logo/></h5> */}
                        <div className="f__logo"><Logo /></div>

                        {/* <p>
                            Tại Bách khoa, chúng tôi hiểu rằng một bữa ăn ngon có thể mang lại cho bạn sức khoẻ và tinh thần thoải mái nhất.
                            Vì vậy, BK cho ra mắt dịch vụ BKFood, nhằm kết nối các nhà hàng,
                            quán ăn tại địa phương với tất cả mọi người.
                        </p> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                        <span className="justmargin">268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh</span>
                        <br></br>
                        <div className="kk">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                            </svg>
                            <span className="justmargin">Mở cửa</span>
                        </div>
                    </div>





                </div>

            </div>

            <div className="text-center p-3 .bg-light.bg-gradient" >
                © 2022 Copyright: BKFoodCourtProject

            </div>

        </footer>
    );
}