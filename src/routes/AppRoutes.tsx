import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Notes from "../pages/Notes";

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path="/notes" element={<Notes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes