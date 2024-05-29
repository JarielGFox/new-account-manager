import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import EditInfo from "./views/EditInfo";
import { UserProvider } from './context/UserContext';

interface AppProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const App: React.FC<AppProps> = () => {
  //stato per il login
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  return (
    <UserProvider>
      <Router>
        <header className="App-header">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/main" element={<Main  />} />
              <Route path="/editBio" element={<EditInfo  />} />
            </Routes>
          </div>
        </header>
      </Router>
    </UserProvider>
  )
}

export default App;
