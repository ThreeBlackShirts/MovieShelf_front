import { Routes, Route } from 'react-router-dom';
import './App.css';

import FrontPage from './component/Pages/FrontPage';
import HomePage from 'component/Pages/HomePage';
import LoginPage from 'component/Pages/LoginPage';
import SignUpPage from 'component/Pages/SignUpPage';
import ListPage from 'component/Pages/ListPage';
import LogoutComponent from 'component/LogoutComponent';

const App = () => {

  return (
    <Routes>
      {/* <Route element={<AuthLayout />}>
        <Route path="/*" element={<HomePage />} />
        <Route path="/logout" element={<LogoutComponent />} />
      </Route> */}
      <Route index element={<HomePage/>} />
      <Route path="/*" element={<HomePage/>} />
      <Route path="/logout" element={<LogoutComponent/>} />
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/front" element={<FrontPage />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
};

export default App;
