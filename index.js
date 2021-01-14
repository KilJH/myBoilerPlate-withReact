const express = require('express');
const http = require('http');
const app = express();
const port = 5000;

// DB
var db_config = require(__dirname + '/database.js');
var conn = db_config.init();

// bodyParser 설정
const bodyParser = require('body-parser');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('hello');
});

app.get('/api/users/signup', (req, res) => {
	console.log('왔어?');
	res.status(200).json({ text: 'Do you want to sign up?' });
});

app.post('/api/users/signup', (req, res) => {
	console.log('회원가입 요청');
	const body = req.body;
	console.log(body);

	const sql = `INSERT INTO PRACTICE.USER VALUES(0,?,?,?,?)`;
	const params = [body.firstName, body.lastName, body.email, body.password];
	console.log(sql);
	conn.query(sql, params, function (err) {
		if (err) {
			console.log('query is not excuted. insert fail...\n' + err);
			res.send(err);
		} else res.status(200).json({ signUpSuccess: true });
	});
});

app.post('/api/users/signin', (req, res) => {
	console.log('로그인', req.body);
	const body = req.body;

	const sql = `SELECT * FROM PRACTICE.USER WHERE email=?`;
	const params = [body.email];

	conn.query(sql, params, (err, [user]) => {
		if (err) {
			console.log('query is not excuted. insert fail...\n' + err);
			console.log(err);
			res.send(err);
		} else if (user) {
			// 암호화해서 비교해야 함. 일단은 테스트
			if (user.password === body.password) {
				res.status(200).json({ signInSuccess: true });
			} else {
				res.send({ signInSuccess: false, errorType: 'wrong password' });
			}
		} else {
			// 이메일이 없어
			res.send({ signInSuccess: false, errorType: 'unexist email' });
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
