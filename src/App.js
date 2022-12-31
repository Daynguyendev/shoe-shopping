//import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UserLayout from './components/Layout/UserLayout';

function App() {
  return (
  <Box>
    <Routes>
      <Route path="/" element={<UserLayout />}>
           <Route path="" element={<Home />}></Route>
           <Route path="/huhu" element={<Header />}></Route>


      </Route>
    </Routes>


  </Box>
  );
}
export default App;