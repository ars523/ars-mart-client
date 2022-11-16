import { Toolbar } from "@mui/material";
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/Header";
import PrivateRoute from "./component/PrivateRoute";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import CartScreen from "./pages/CartScreen";
import HomeScreen from './pages/HomeScreen';
import LoginScreen from "./pages/LoginScreen";
import ProductDetailsScreen from "./pages/ProductDetailsScreen";
import RegisterScreen from "./pages/RegisterScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import OrderPreviewScreen from "./pages/OrderPreviewScreen";
import OrderDetailsScreen from "./pages/OrderDetailsScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AdminRoute from "./component/AdminRoute";
import DashboardScreen from "./pages/DashboardScreen";
import OrdersListScreen from "./pages/OrdersListScreen";
import ProductsListScreen from "./pages/ProductsListScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import UsersListScreen from "./pages/UsersListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <>
      <Header/>
      <Toolbar/>
      <Toolbar/>
        <Routes>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='registration' element={<RegisterScreen/>}/>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/product/:slug' element={<ProductDetailsScreen />} />
          <Route path='/carts' element={<CartScreen/>}/>
          
          {/* <---Protected Routes---> */}
          <Route path="/shipping" element={<PrivateRoute/>}>
            <Route path="/shipping" element={<ShippingAddressScreen/>}/>
          </Route>
          <Route path="/payment" element={<PrivateRoute/>}>
            <Route path="/payment" element={<PaymentMethodScreen/>}/>
          </Route>
          <Route path="/previewOrder" element={<PrivateRoute/>}>
            <Route path="/previewOrder" element={<OrderPreviewScreen/>}/>
          </Route>
          <Route path="/order/:orderId" element={<PrivateRoute/>}>
            <Route path="/order/:orderId" element={<OrderDetailsScreen/>}/>
          </Route>
          <Route path="/OrderHistory" element={<PrivateRoute/>}>
            <Route path="/OrderHistory" element={<OrderHistoryScreen/>}/>
          </Route>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<ProfileScreen/>}/>
          </Route>

          {/* <---Admin Routes---> */}
          <Route path="/admin/dashboard" element={<PrivateRoute/>}>
            <Route path="/admin/dashboard" element={<DashboardScreen/>}/>
          </Route>
          <Route path="/admin/users" element={<PrivateRoute/>}>
            <Route path="/admin/users" element={<UsersListScreen/>}/>
          </Route>
          <Route path="/admin/orders" element={<PrivateRoute/>}>
            <Route path="/admin/orders" element={<OrdersListScreen/>}/>
          </Route>
          <Route path="/admin/productlist" element={<PrivateRoute/>}>
            <Route path="/admin/productlist" element={<ProductsListScreen/>}/>
          </Route>
          <Route path="/admin/product/:id" element={<PrivateRoute/>}>
            <Route path="/admin/product/:id" element={<ProductEditScreen/>}/>
          </Route>
          <Route path="/admin/users/:id" element={<PrivateRoute/>}>
            <Route path="/admin/users/:id" element={<UserEditScreen/>}/>
          </Route>
        </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
