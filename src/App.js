import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from 'component/Pages/HomePage';
import LoginPage from 'component/Pages/LoginPage';
import SignUpPage from 'component/Pages/SignUpPage';
import ListPage from 'component/Pages/ListPage';
import LogoutComponent from 'component/LogoutComponent';
import MainPage from 'component/Pages/MainPage';

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
      <Route path="/list" element={<ListPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default App;
