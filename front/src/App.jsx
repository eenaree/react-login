import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usersAPI from './api/users';

const App = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))?.nickname;
  const [loggedUser, setLoggedUser] = useState(user || '');

  async function logoutUser() {
    try {
      await usersAPI.logout();
      sessionStorage.removeItem('user');
      setLoggedUser('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>React Login</h1>
      {loggedUser ? (
        <>
          <p>안녕하세요! {loggedUser}님</p>
          <button type="button" onClick={logoutUser}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link to="login">로그인</Link>
          <br />
          <Link to="signup">회원가입</Link>
        </>
      )}
    </>
  );
};

export default App;
