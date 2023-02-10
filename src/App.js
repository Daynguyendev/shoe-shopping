import './App.css';
import Home from './components/home';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import SignIn from './components/features/account/SignIn';
import SignUp from './components/features/account/SignUp';
import InforAccount from './components/features/account/InforAccount';

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/account" element={<InforAccount />}></Route>



        </Route>
      </Routes>


    </Box>
  );
}
export default App;