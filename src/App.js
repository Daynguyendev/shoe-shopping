import './App.css';
import Home from './components/home';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
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
function App() {

  return (
    <Box >
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/account" element={<InforAccount />}></Route>
          <Route path="/account/:id" element={<InforAccount />}></Route>
          <Route path="/cart/:id/:id_khach_hang/:ten_mau_sac/:ten_kich_thuoc" element={<Cart />}></Route>
          <Route path="/colection/:id" element={<DetailPage />}></Route>
          <Route path="/importproduct" element={<Page />}></Route>
          <Route path="/detail" element={<AddDetail />}></Route>
          <Route path="/invoice/:name" element={<AddInvoiceInput />}></Route>
          <Route path="/checkout/:id" element={<Checkout />}></Route>
          <Route path="/status/:id_khach_hang" element={<Status />}></Route>
          <Route path="/status/:id_khach_hang/:id_hd_dat" element={<StatusNew />}></Route>
          <Route path="/Duyet" element={<OrderConfirmation />}></Route>
          <Route path="/colections/:name" element={<OverView />}></Route>




          <Route path="*" element={<NotFound />} />





        </Route>
      </Routes>


    </Box>
  );
}
export default App;