import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersAPI from '../api/users';

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const onChangeUserInfo = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  async function loginUser() {
    try {
      await usersAPI.login(userInfo);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  }

  const onSubmitForm = e => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={onSubmitForm}>
        <p>
          <label htmlFor="user_email">이메일</label>
          <input
            type="email"
            id="user_email"
            name="email"
            value={userInfo.email}
            onChange={onChangeUserInfo}
          />
        </p>
        <p>
          <label htmlFor="user_password">비밀번호</label>
          <input
            type="password"
            id="user_password"
            name="password"
            value={userInfo.password}
            onChange={onChangeUserInfo}
          />
        </p>
        <p>
          <button>로그인</button>
        </p>
        <p>{errorMessage}</p>
      </form>
    </>
  );
};

export default Login;
