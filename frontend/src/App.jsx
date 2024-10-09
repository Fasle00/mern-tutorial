import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import SelectionPage from './pages/SelectionPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ViewProductPage from './pages/ViewProductPage';

import Navbar from './components/Navbar';

import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  /* if (user) {
    console.log("user",user)
    console.log("user access",user.accessLevel)
  } */

  return (
    <Box minH={"100vh"} bg={useColorModeValue("#E1F4FF", "#61737D")} >
      <Navbar user={ user } setUser={setUser}/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <LoginPage /> } />
        <Route path="/create" element={ user ? <CreatePage/> : <Navigate to="/login" />} />
        <Route path="/admin" element={ user && user.accessLevel==="admin" || user.accessLevel=="editor" ? <AdminPage /> : <Navigate to="/login" />}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product/:id" element={<ViewProductPage />} />
        <Route path="/:id" element={<SelectionPage />} />
        <Route path="/:id/:id" element={<SelectionPage />} />
      </Routes>
    </Box>
  )
}

export default App
