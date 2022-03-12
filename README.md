# React Login
1. 서버
- nodejs 환경
- express, sequelize를 사용한 mySQL db 생성 및 구현
  + User 모델

2. 클라이언트
- 간단한 회원가입 및 로그인 페이지 구현: SignUp, Login 컴포넌트
- SessionStorage 사용
  + 로그인시 받아온 사용자 정보 데이터를 세션스토리지에 저장
  + 페이지 이동 및 새로고침시 로그인 정보를 유지하기 위한 목적
  + 서버측, 로그인 및 회원가입 라우터: 세션쿠키 (req.session.user)에 저장한 후, 다른 미들웨어나 라우터에서 변수에 담아 사용할 수 있도록 만듦