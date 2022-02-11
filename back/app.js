const express = require('express');
const { sequelize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 8080);

(async function () {
  try {
    await sequelize.sync();
    console.log('db 연결 성공!');
  } catch (error) {
    console.error(error);
    console.log('db 연결 실패...');
  }
})();

app.get('/', (req, res) => {});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('서버 오류 발생!!!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 대기 중...`);
});
