const router = require('express').Router();
const { User } = require('../models');

router.route('/')
  .get(async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.cookies.user }});
      const { id, email, nickname } = user;
      if (user) {
        res.json({ data: { id, email, nickname } });
      }
    } catch (error) {
      console.error(error);
    }
  });

router.route('/login')
  .post(async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email }});
      if (!user) {
        return res.status(400).json({ message: '존재하지 않는 계정입니다.' });
      }

      const comparePasswordResult = await user.getComparePasswordResult(req.body.password);
      if (!comparePasswordResult) {
        return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      const { id, email, nickname } = user;
      res.cookie('user', email, { MaxAge: 3600 });
      res.json({
        message: '로그인 성공',
        data: { id, email, nickname },
      });
    } catch (error) {
      console.error(error);
    }
  });

router.route('/signup')
  .post(async (req, res) => {
    try {
      const exUser = await User.findOne({ where: { email: req.body.email }});
      if (exUser) {
        return res.status(400).json({ message: '이미 존재하는 계정입니다.' });
      } 

      const newUser = await User.build({
        nickname: req.body.nickname,
        email: req.body.email,
      });
      const hashedPassword = await newUser.getHashedPassword(req.body.password);
      newUser.password = hashedPassword;
      await newUser.save();

      const { id, email, nickname } = newUser;
      res.cookie('user', email);
      res.json({
        message: '회원가입 성공',
        data: { id, email, nickname },
      });
    } catch (error) {
      console.error(error);
    }
  });

router.route('/logout')
  .get(async (req, res) => {
    try {
      res.clearCookie('user');
      res.status(204).json({ message: '로그아웃 성공' });
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;