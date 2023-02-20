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
function App() {

  return (
    <Box >
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/account" element={<InforAccount />}></Route>
          <Route path="/cart/:id" element={<Cart />}></Route>
          <Route path="/product/:id" element={<DetailPage />}></Route>
          <Route path="/importproduct" element={<Page />}></Route>
          <Route path="/importsize" element={<AddSize />}></Route>
          <Route path="/importcategory" element={<AddCategory />}></Route>
          <Route path="/importtrademark" element={<AddTrademark />}></Route>
          <Route path="/importcolor" element={<AddColor />}></Route>
          <Route path="/importdiscount" element={<AddDiscount />}></Route>
          <Route path="/importprovider" element={<AddProvider />}></Route>

          <Route path="*" element={<NotFound />} />





        </Route>
      </Routes>


    </Box>
  );
}
export default App;