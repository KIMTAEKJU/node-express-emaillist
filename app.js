const http = require('http'); // 내장 http모듈
const path = require('path'); // 경로 자동 연결해줌
const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const emaillistRouter = require('./routes/emaillist');


const port = 3000;
const app = express(); // express 객체생성
const router = express.Router();

// parsing reqeust body (form data)
app.use(bodyParser.urlencoded({extended:false})); // 객체로 만들어줌 안쓰면 req.body에서 에러남

// view Engine setup
app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

// request router setup
//app.use('/', indexRouter);  // main 경로
app.use('/', emaillistRouter);  // sub url        localhost:3000/form

//app.use('/', indexRouter);
//app.use('/emaillist', emaillistRouter);         //localhost:3000/emaillist/form

//app.use('/', indexRouter);
//app.use('/', emaillistRouter);

console.log(typeof app);
const server = http.createServer(app); // express객체 사용

const onError = function (error) {

    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = function () {  // port 뒤에 써주던 function
    console.log("httpd starts..");
    const addr = server.address();

    // server가 어디에 바인드 되었는지 표시해주기위해
    const bind = (typeof addr === "string") ?  'pipe' + addr :
                                                'port' + addr.port;

    console.log('Listening on ' + bind);

};

server.on('error', onError) // 이벤트달아줌
server.on('listening', onListening); // 이벤트 달아줌
server.listen(port); // 뒤에 function을 뺴고 밖에다 만들어줌 깔끔

