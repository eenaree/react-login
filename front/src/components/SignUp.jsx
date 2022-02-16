import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import usersAPI from '../api/users';
import useInput from '../hooks/useInput';

const SignUp = () => {
  const navigate = useNavigate();
  const initialUserInfo = { email: '', nickname: '', password: '' };
  const [userInfo, onChangeUserInfo] = useInput(initialUserInfo);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef([]);

  function setEmailInputRef(element) {
    inputRef.current[0] = element;
  }

  function setPasswordInputRef(element) {
    inputRef.current[1] = element;
  }

  function setNicknameInputRef(element) {
    inputRef.current[2] = element;
  }

  async function signupUser() {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (!inputRef.current[i].value) {
        inputRef.current[i].focus();
        return setErrorMessage('필수 입력 항목이 비어있습니다.');
      }
    }
    try {
      await usersAPI.signup(userInfo);
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  }

  const onSubmitForm = e => {
    e.preventDefault();
    signupUser();
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={onSubmitForm}>
        <p>
          <label htmlFor="user_email">이메일</label>
          <input
            type="text"
            id="user_email"
            name="email"
            value={userInfo.email}
            onChange={onChangeUserInfo}
            ref={setEmailInputRef}
          />
        </p>
        <p>
          <label htmlFor="user_nickname">닉네임</label>
          <input
            type="text"
            id="user_nickname"
            name="nickname"
            value={userInfo.nickname}
            onChange={onChangeUserInfo}
            ref={setNicknameInputRef}
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
          <button>회원가입</button>
          <Link to="/">홈으로</Link>
        </p>
        <p>{errorMessage}</p>
      </form>
    </>
  );
};

export default SignUp;
