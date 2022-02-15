import React from 'react';

const SignUp = () => {
  return (
    <form>
      <p>
        <label htmlFor="user_email">이메일</label>
        <input type="text" id="user_email" />
      </p>
      <p>
        <label htmlFor="user_nickname">닉네임</label>
        <input type="text" id="user_nickname" />
      </p>
      <p>
        <label htmlFor="user_password">비밀번호</label>
        <input type="password" id="user_password" />
      </p>
      <button>회원가입</button>
    </form>
  );
};

export default SignUp;
