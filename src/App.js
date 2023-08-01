import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Products';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Product/>}/>
      </Routes>
    </Router>
  );
}

export default App;
