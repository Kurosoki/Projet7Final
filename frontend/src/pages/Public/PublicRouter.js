import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { Home, Addpost, Modifypost } from '@/pages/Public'
import Error from '@/_utils/Error'

const PublicRouter = () => {
    return (

        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="addpost" element={<Addpost />} />
            <Route path="modifypost/:id" element={<Modifypost />} />
            <Route path="*" element={<Error />} />
        </Routes>

    );
};

export default PublicRouter;