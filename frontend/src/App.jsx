import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {
  BrowserRouter,
  Route,Routes,
} from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>}></Route>
          <Route path='/Register' element={<RegisterForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
