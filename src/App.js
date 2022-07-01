import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from 'component/Pages/HomePage';
import LoginPage from 'component/Pages/LoginPage';
import SignUpPage from 'component/Pages/SignUpPage';
import ListPage from 'component/Pages/ListPage';
import LogoutComponent from 'component/LogoutComponent';
import MainPage from 'component/Pages/MainPage';
import DetailPage from 'component/Pages/DetailPage';
import UserInfoPage from 'component/Pages/UserInfoPage';
import ReviewPage from 'component/Pages/ReviewPage';
import WriteReviewPage from 'component/Pages/WriteReviewPage';
import UserSettingPage from 'component/Pages/UserSettingPage';
import EditReviewPage from 'component/Pages/EditReviewPage';

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
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/userinfo" element={<UserInfoPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/writereview" element={<WriteReviewPage />} />
      <Route path="/usersetting" element={<UserSettingPage />} />
      <Route path="/editreview" element={<EditReviewPage />} />
    </Routes>
  );
};

export default App;
