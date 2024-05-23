import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Login from "./components/Login";

interface AppProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const App: React.FC<AppProps> = () => {
  //stato per il login
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  return (
    <Router>
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
      </header>
    </Router>
  )
}

export default App;
