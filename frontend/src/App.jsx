import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {BrowserRouter,Route,Routes,} from "react-router-dom";
import { LandingPage } from './components/LandingPage';
import { RegisterForm } from './components/RegisterForm';
import { LoginPage } from './components/LoginPage';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/Register' element={<RegisterForm/>}></Route>
          <Route path='/Login' element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
