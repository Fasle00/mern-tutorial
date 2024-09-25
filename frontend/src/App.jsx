import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

import Navbar from './components/Navbar';
import Login from './pages/Login';

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
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")} >
      <Navbar user={ user } />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login /> } />
        <Route path="/create" element={ user ? <CreatePage/> : <Navigate to="/login" />} />
        {<Route path="/users" element={ user ? ( user.accessLevel==="admin" ? <AdminPage />  : <Navigate to="/login"/>) : <Navigate to="/login"/> } />}
      </Routes>
    </Box>
  )
}

export default App
