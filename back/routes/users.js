const router = require('express').Router();
const { User } = require('../models');

router.route('/')
  .get((req, res) => {
    try {
      // console.log(req.session.user);
      if (req.session.user) {
        res.json({ user: req.session.user });
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
      req.session.user = { id, email, nickname };
      res.json({
        message: '로그인 성공',
        user: { id, email, nickname },
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
        user: { id, email, nickname },
      });
    } catch (error) {
      console.error(error);
    }
  });

router.route('/logout')
  .get(async (req, res) => {
    try {
      req.session.destroy();
      res.clearCookie('connect.sid');
      res.status(204).json({ message: '로그아웃 성공' });
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;