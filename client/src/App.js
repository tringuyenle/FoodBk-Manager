import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CartProvider from './context/CartContex';
import UINavbar from './component/UI/Navbar';
import Footer from './component/UI/Footer';
import Home from './component/modules/Home/Home';
import Cart from './component/modules/Cart/Cart';
import Login from './component/modules/Login/Login';
import Register from './component/modules/Register/Register';
import PayComponent from './component/modules/Payment/Pay';
import Sucess from './component/modules/Sucess/Sucess';
import Dashboard from './component/modules/Dashboard/Dashboard';
import Upload from './component/modules/Upload/Upload';
import Manage from './component/modules/Manage/Manage';
import FoodProvider from './context/FoodContext';
import Receipt from './component/modules/Cart/Reciept';
import Transactions from './component/modules/Transactions/Transactions';
import RegisterAdmin from './component/modules/RegisterAdmin/RegisterAdmin';

function App() {
    return (
        <>
            <FoodProvider>
                <CartProvider>
                    <Router>
                        <UINavbar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='dashboard' element={<Dashboard />}>
                                <Route path='upload' element={<Upload />} />
                                <Route path='manage' element={<Manage />} />
                                <Route path='transactions' element={<Transactions />} />
                                <Route path='registerAdmin' element={<RegisterAdmin />} />
                            </Route>
                            <Route path='pay' element={<PayComponent />} />
                            <Route path='pay/Sucess' element={<Sucess />} />
                            <Route path='bill' element={<Receipt />} />
                        </Routes>
                        <Footer />
                    </Router>
                </CartProvider>
            </FoodProvider>
        </>
    );
}

export default App;
