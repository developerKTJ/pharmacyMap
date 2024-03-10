const mysql = require('mysql');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//db연결 설정
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'pass',
  database:'new_schema',
  port:'3306'
});

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(port + '번 포트 서버실행중');
  connection.connect();
});

//정적파일 기본경로 설정
app.use(express.static("static"));
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get("/", (_, res) => {
  res.redirect('/test2.html');
});

//https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=rSf%2FiRBd2ha%2Fj%2FovynIqpl3sRWXBAJUUNF%2BDdZIaQorjHeMBcu95jGcuPTt9wqZ0zqYmtlWKAzQCELwL253QtA%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10

//약국 API로 data 받아서 클라이언트로 res
app.get("/list", (req, res) => {
    console.log('list check');
    let api = async() => {
      let response = null
      try{
        response = await axios.get("https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
          params: {
            "serviceKey": "rSf/iRBd2ha/j/ovynIqpl3sRWXBAJUUNF+DdZIaQorjHeMBcu95jGcuPTt9wqZ0zqYmtlWKAzQCELwL253QtA==",
            //ajax로 부터 받은 파라미터 대입
            "Q0": req.query.Q0,
            "Q1": req.query.Q1,
            "QT": req.query.QT,
            "QN": req.query.QN,
            "ORD": req.query.ORD,
            "pageNo": req.query.pageNo,
            "numOfRows": req.query.numOfRows
          }
        })
      }
      catch(e){
        console.log(e);
      }
      // console.log(response);
      return response;
    }
    api().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      // 데이터 파싱 및 DB 저장
      if (response && response.data && response.data.response && response.data.response.body) {
        const items = response.data.response.body.items.item;

        items.forEach((item) => {
          const pharmacy = {
            hpid: item.hpid,
            dutyName: item.dutyName,
            dutyAddr: item.dutyAddr,
            dutyMapimg: item.dutyMapimg,
            dutyTel1: item.dutyTel1,
            dutyTime1s: item.dutyTime1s,
            dutyTime1c: item.dutyTime1c,
            dutyTime2s: item.dutyTime2s,
            dutyTime2c: item.dutyTime2c,
            dutyTime3s: item.dutyTime3s,
            dutyTime3c: item.dutyTime3c,
            dutyTime4s: item.dutyTime4s,
            dutyTime4c: item.dutyTime4c,
            dutyTime5s: item.dutyTime5s,
            dutyTime5c: item.dutyTime5c,
            dutyTime6s: item.dutyTime6s,
            dutyTime6c: item.dutyTime6c,
            dutyTime7s: item.dutyTime7s,
            dutyTime7c: item.dutyTime7c,
            dutyTime8s: item.dutyTime8s,
            dutyTime8c: item.dutyTime8c,
            wgs84Lat: item.wgs84Lat,
            wgs84Lon: item.wgs84Lon,
          };

          connection.query(
            "INSERT INTO pharmacy_list SET ?",pharmacy,
            (err, results) => {
              if (err) {
                //console.error("MySQL select error: " + err.stack);
                return;
              }
            }
          );
        });
      }

      res.json(response.data.response.body);
}).catch((error) => {
  console.log(error);
  res.status(500).send('Internal Server Error');
});
});
//검색결과 DB에 저장
app.post('/create', (requset, _) => { 
  console.log('create check');
  const body = requset.body;
  console.log(body);
  connection.query('insert into location (sido, gugun) value (?,?)',
    [body.sido, body.gugun], () => {
    });
});

//검색 목록
app.get('/searchList', (_, response) => {
  fs.readFile('./static/searchList.html', 'utf-8', (error, data) => {
    connection.query('select * from location ORDER BY writetime DESC;',(error,results,fields) => {
      if(error) throw error;
      response.send(ejs.render(data, {
        data: results,
      }));
    });
  });
});

//전체삭제
app.get('/deleteAll', (_, responese) => {
  connection.query('delete from location', [], () => {
    responese.redirect('/searchList');
  });
});

//삭제
app.get('/delete/:id', (request, responese) => {
  connection.query('delete from location where id=?', [request.params.id], () => {
    responese.redirect('/searchList');
  });
});

//메일링
app.post('/result', (req, res) => {
  
  const { name, email, contentString, sido, gugun } = req.body;
  console.log(req.body);
  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'guronodetest@gmail.com',
      pass: 'psxpamyzfxqsytzk', 
    },
  });

  // Email options
  const mailOptions = {
    from: 'guronodetest@gmail.com', // Sender address
    to: `${email}`,
    subject: `${name}님이 찾으신 약국 정보입니다.`,
    html: `${contentString}`,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.redirect(`/test2.html?sido=${sido}&gugun=${gugun}`);
    }

  // Close the transporter
    transporter.close();
  });
});