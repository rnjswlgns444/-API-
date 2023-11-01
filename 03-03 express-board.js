import express from 'express' //default 값이 나옴.
import { checkPhone, getToken, sendTokenToSMS } from './phone.js'  //phone.js파일을 export 해줘야 함.
//import qqq, {checkPhone as zzz, getToken} from '/phone.js' // defualt값과 exports 동시에 쓰기, as는 이름 바꿀 때 사용

const app = express()
app.use(express.json())  //옛날: bodyParser 사용
// 제이슨 데이터를 읽을 수 있도록 해줌!

app.get('/boards', function(requ, res) {
  // 1.DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    { number:1, writer: '철수', title: '제목입니다.', contents: '내용이에요!' },
    { number:1, writer: '영희', title: '영희입니다.', contents: '영희에요!' },
    { number:1, writer: '훈이', title: '훈이입니다.', contents: '훈이에요!' }
  ]

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result)
})

app.post('/boards', function(requ, res) {
// 1.브라우저에서 보내준 데이터 확인하기
  console.log(req.body)
  console.log('=========')
  console.log(req.body)

  // 2. DB에 접속 후, 데이터를 저장 -> 데이터 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send('게시물 등록에 성공하였습니다.')
})

app.post('/tokens/phone', function (req, res) {
  const myphone = req.body.qqq

	// 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);

  res.send("인증완료!")
}

app.listen(3000)
