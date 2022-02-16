import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersAPI from '../api/users';
import useInput from '../hooks/useInput';

const Login = () => {
  const navigate = useNavigate();
  const initialUserInfo = { email: '', password: '' };
  const [userInfo, onChangeUserInfo] = useInput(initialUserInfo);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef([]);

  function setEmailInputRef(element) {
    inputRef.current[0] = element;
  }

  function setPasswordInputRef(element) {
    inputRef.current[1] = element;
  }

  async function loginUser() {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (!inputRef.current[i].value) {
        inputRef.current[i].focus();
        return setErrorMessage('필수 입력 항목이 비어있습니다.');
      }
    }
    try {
      const { data } = await usersAPI.login(userInfo);
      sessionStorage.setItem('user', JSON.stringify(data.user));
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
            ref={setEmailInputRef}
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
            ref={setPasswordInputRef}
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
