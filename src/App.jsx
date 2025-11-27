import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Intro from './pages/intro/Intro';
// import Login from './pages/login/Login';
// import Register from './pages/register/Register';
import './App.scss';
import { Intro, Login, Register, Home } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

