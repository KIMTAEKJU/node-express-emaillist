
const express = require( 'express' );
const Email = require( '../models/Email' );
const router = express.Router();


// Controller 코드가 여기 다 있다
router.route('/form').get(function (req, res, next) {

   // res.send('form'); // 응답
    res.render('form', null);
});

router.route('/add').post(function (req, res, next) { // 에러를 처리하는게 express에 기본내장되어있다

    console.log(req.body); // 데이터를 객체로 모아줌 그냥 되는건아니고 모듈을 사용해야함
    Email.create( req.body);
    res.redirect('/');
    //res.send('add'); // 응답
    // next()를하면 에러가남 위에 이미 send 해서    에러가나면 next가 에러처리쪽으로 보냄
});

/*router.route('/list').get(function (req, res) {

    res.send('list'); // 응답
});*/

router.route(/.*/).get(function (req, res, next) {

    // res.send('list'); // 응답
    Email.find({

    }, [
      'firstName', 'lastName', 'email'
    ] /* null 전부다 가져옴*/, {
      sort: {
          _id: -1
      }
    }, function (err, emails) { // 항상 비동기라는걸 명심 이 함수부분은 나중에 실행될수있음 그런데 이함수밖에 render를 쓰면 데이터오기전에 render하기떄문에 안나올수있음

        if( err){
            next(err);
            return; // 리턴안해주면 렌더함
        }

        res.render('list', {
            emails: emails
           // title: "emaillist"
        });
    });

});

module.exports = router;