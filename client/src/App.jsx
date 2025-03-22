import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import About from "./pages/About";
import Upload from "./pages/Upload";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from './redux/slices/user-slice';
import api from './api';
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await api.get('/auth/me');
          dispatch(setUserData({ ...data, token }));
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
