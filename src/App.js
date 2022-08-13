import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from 'component/Pages/HomePage';
import LoginPage from 'component/Pages/LoginPage';
import SignUpPage from 'component/Pages/SignUpPage';
import ListPage from 'component/Pages/ListPage';
import MainPage from 'component/Pages/MainPage';
import DetailPage from 'component/Pages/DetailPage';
import UserInfoPage from 'component/Pages/UserInfoPage';
import ReviewPage from 'component/Pages/ReviewPage';
import WriteReviewPage from 'component/Pages/ReviewWritePage';
import UserSettingPage from 'component/Pages/UserSettingPage';
import EditReviewPage from 'component/Pages/ReviewEditPage';
import GenreListPage from 'component/Pages/GenreListPage';

const App = () => {

  return (
    <Routes>
      {/* <Route element={<AuthLayout />}>
        <Route path="/*" element={<HomePage />} />
        <Route path="/logout" element={<LogoutComponent />} />
      </Route> */}
      <Route index element={<HomePage/>} />
      <Route path="/*" element={<HomePage/>} />
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/genre" element={<GenreListPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail/:movieid" element={<DetailPage />} />
      <Route path="/userinfo" element={<UserInfoPage />} />
      <Route path="/review/:movieid" element={<ReviewPage />} />
      <Route path="/review/write/:movieid" element={<WriteReviewPage />} />
      <Route path="/review/edit/:movieid/:reviewid" element={<EditReviewPage />} />
      <Route path="/usersetting" element={<UserSettingPage />} />
    </Routes>
  );
};

export default App;
