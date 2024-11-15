import { useState } from 'react';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
const LandingPage=()=>{
    return (
        <>
            <div>Welcome to Landing Page</div>
            <Link to='/login'>Login</Link><>||</>
            <Link to='/register' id='landing-register'>Register</Link>
        </>
    )
}

export {LandingPage};