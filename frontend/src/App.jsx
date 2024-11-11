import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {BrowserRouter,Route,Routes,} from "react-router-dom";
import { LandingPage } from './components/LandingPage';
import { RegisterForm } from './components/RegisterForm';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/register' element={<RegisterForm/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/dashboard' element={<DashboardPage/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
