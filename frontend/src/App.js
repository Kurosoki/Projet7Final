import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from '@/pages/Public/PublicRouter';
import AuthGuard from '@/_helpers/AuthGuard'
import Layout from '@/pages/Layout'
import AuthRouter from './pages/Auth/AuthRouter';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<AuthRouter />} />
            <Route path="auth/*" element={<AuthRouter />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/*" element={
              <AuthGuard>
                <PublicRouter />
              </AuthGuard>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
