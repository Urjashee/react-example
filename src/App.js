import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Products';
import Checkout from "./pages/Checkout";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import { CartProvider } from './components/CartContext'

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Checkout/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/order-details" element={<OrderDetails/>}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
