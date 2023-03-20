import './App.css';
import Home from './components/home';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Layout/AdminLayout';
import SignIn from './components/features/account/SignIn';
import SignUp from './components/features/account/SignUp';
import InforAccount from './components/features/account/InforAccount';
import Cart from './components/features/cart'
import DetailPage from './components/pages/DetailPage';
import Page from './components/features/admin/Page';
import AddSize from './components/features/admin/components/AddSize';
import AddCategory from './components/features/admin/components/AddCategory';
import AddTrademark from './components/features/admin/components/AddTrademark';
import AddColor from './components/features/admin/components/AddColor';
import AddDiscount from './components/features/admin/components/AddDiscount';
import NotFound from './components/features/product/component/NotFound';
import AddProvider from './components/features/admin/components/AddProvider';
import AddDetailImage from './components/features/admin/components/AddDetailImage';
import AddInvoiceInput from './components/features/admin/components/AddInvoiceInput';
import AddInvoice from './components/features/admin/components/AddInvoice';
import Checkout from './components/features/cart/component/Checkout'
import Status from './components/features/cart/component/Status';
import StatusNew from './components/features/cart/component/StatusNew';
import OrderConfirmation from './components/features/admin/components/OrderConfirmation';
import OverView from './components/features/product/component/OverView';
import AddDetail from './components/features/admin/components/AddDetail';
import AddPromotion from './components/features/admin/components/AddPromotion';
import Adidas from './components/features/newhot/adidas';
import Jordan from './components/features/newhot/Jordan';
import ReturnPolicy from './components/Footer/ReturnPolicy';
import Guarantee from './components/Footer/Guarantee';
import PrivateRoute from './components/routers/PrivateRoute';
import AddStatus from './components/features/admin/components/AddStatus';
import AddPay from './components/features/admin/components/AddPay';
function App() {

  return (
    <Box >
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/colection/:id" element={<DetailPage />}></Route>
          <Route path="/colections/:name" element={<OverView />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route path="login" element={<SignIn />}></Route>
          <Route path="register" element={<SignUp />}></Route>
          <Route path="account" element={<InforAccount />}></Route>
          <Route path="account/:id" element={<InforAccount />}></Route>
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route path="/cart/:id/:id_khach_hang/:ten_mau_sac/:ten_kich_thuoc" element={<Cart />}></Route>
          <Route path="checkout/:id" element={<Checkout />}></Route>
        </Route>
        <Route path="/fotter" element={<UserLayout />}>
          <Route path="adidas" element={<Adidas />}></Route>
          <Route path="jordan" element={<Jordan />}></Route>
          <Route path="chinhsach" element={<ReturnPolicy />}></Route>
          <Route path="baohanh" element={<Guarantee />}></Route>
        </Route>
        <Route path="/status" element={<UserLayout />}>
          <Route path=":id_khach_hang" element={<Status />}></Route>
          <Route path=":id_khach_hang/:id_hd_dat" element={<StatusNew />}></Route>
        </Route>
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="category" element={<AddCategory />}></Route>
          <Route path="product" element={<Page />}></Route>
          <Route path="size" element={<AddSize />}></Route>
          <Route path="trademark" element={<AddTrademark />}></Route>
          <Route path="color" element={<AddColor />}></Route>
          <Route path="promotion" element={<AddDiscount />}></Route>
          <Route path="provider" element={<AddProvider />}></Route>
          <Route path="image" element={<AddDetailImage />}></Route>
          <Route path="invoice" element={<AddInvoice />}></Route>
          <Route path="invoice/:name" element={<AddInvoiceInput />}></Route>
          <Route path="accept" element={<OrderConfirmation />}></Route>
          <Route path="status" element={<AddStatus />}></Route>
          <Route path="checkout" element={<AddPay />}></Route>


          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>


    </Box>
  );
}
export default App;