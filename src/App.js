import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Products';
import Checkout from "./pages/Checkout";
import { CartProvider } from './components/CartContext'

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Checkout/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
