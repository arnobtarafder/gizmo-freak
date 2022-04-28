import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Products from './components/Products/Products';
import UploadProduct from './components/UploadProduct/UploadProduct';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/productUpload' element={
          <PrivateRoute>
            <UploadProduct />
          </PrivateRoute>
        }></Route>
        <Route path='/orders' element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
