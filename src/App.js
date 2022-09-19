import { Toolbar } from "@mui/material";
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/Header";
import PrivateRoute from "./component/PrivateRoute";
import Shipping from "./pages/Shipping";
import Carts from "./pages/Carts";
import Home from './pages/Home';
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import PaymentMethodSelection from "./pages/PaymentMethodSelection";
import PreviewOrder from "./pages/PreviewOrder";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import AdminRoute from "./component/AdminRoute";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";
function App() {
  return (
    <>
      <Header/>
      <Toolbar/>
      <Toolbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='registration' element={<Register/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/product/:slug' element={<Product />} />
          <Route path='/carts' element={<Carts />} />
          
          {/* <---Protected Routes---> */}
          <Route path="/shipping" element={<PrivateRoute/>}>
            <Route path="/shipping" element={<Shipping/>}/>
          </Route>
          <Route path="/payment" element={<PrivateRoute/>}>
            <Route path="/payment" element={<PaymentMethodSelection/>}/>
          </Route>
          <Route path="/previewOrder" element={<PrivateRoute/>}>
            <Route path="/previewOrder" element={<PreviewOrder/>}/>
          </Route>
          <Route path="/order/:orderId" element={<PrivateRoute/>}>
            <Route path="/order/:orderId" element={<Order/>}/>
          </Route>
          <Route path="/OrderHistory" element={<PrivateRoute/>}>
            <Route path="/OrderHistory" element={<OrderHistory/>}/>
          </Route>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>

          {/* <---Admin Routes---> */}
          <Route path="/admin/dashboard" element={<PrivateRoute/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="/admin/orders" element={<PrivateRoute/>}>
            <Route path="/admin/orders" element={<Orders/>}/>
          </Route>
          <Route path="/admin/productlist" element={<PrivateRoute/>}>
            <Route path="/admin/productlist" element={<ProductsList/>}/>
          </Route>
          <Route path="/admin/product/:id" element={<PrivateRoute/>}>
            <Route path="/admin/product/:id" element={<EditProduct/>}/>
          </Route>
        </Routes>
    </>
  );
}

export default App;
