import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { Login, Signup } from '@/pages/Auth'
import Error from '@/_utils/Error'

const AuthRouter = () => {
    return (

        <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="*" element={<Error />} />

        </Routes>



    );
};

export default AuthRouter;