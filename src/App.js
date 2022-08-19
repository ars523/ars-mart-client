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
import Orders from "./pages/Orders";
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
          <Route path="/shipping" element={<PrivateRoute/>}>
            <Route path="/shipping" element={<Shipping/>}/>
          </Route>
          <Route path="/payment" element={<PrivateRoute/>}>
            <Route path="/payment" element={<PaymentMethodSelection/>}/>
          </Route>
          <Route path="/previewOrder" element={<PrivateRoute/>}>
            <Route path="/previewOrder" element={<PreviewOrder/>}/>
          </Route>
          <Route path="/order" element={<PrivateRoute/>}>
            <Route path="/order/:orderId" element={<Orders/>}/>
          </Route>
        </Routes>
    </>
  );
}

export default App;
