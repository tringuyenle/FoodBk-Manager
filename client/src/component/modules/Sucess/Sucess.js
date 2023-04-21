import './Sucess.css'
function Sucess() {
    const id = localStorage.getItem("transID");
    // localStorage.removeItem("transID");
    return (
        <div className="Sucess" >
            <div className='sc__ctn'>
                <div className="txt1">Bạn đã Đặt hàng thành công</div>
                <div className="txt2">Cám ơn Quý khách đã mua sắm tại <span>BKFood.com</span>.
                    Đơn hàng của Quý khách đang được xử lý. Mã số đơn hàng của Quý khách là:
                </div>
                <div className="code">{id}</div>
                <div className="txt3">
                    <p>Nhân viên của chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm nhất.</p>

                    <p>Nếu Quý khách hàng có thắc mắc, xin vui lòng liên hệ với chúng tôi qua số <br></br>hotline <strong>(0252)36 88888</strong></p>
                </div>
            </div>
        </div>
    )
}
export default Sucess