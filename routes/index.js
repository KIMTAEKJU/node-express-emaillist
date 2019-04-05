
const express = require( 'express' );
const router = express.Router();

router.get('/', function (req, res) { /* 실제 url*/

    res.send('Hello World'); // 응답
});


router.route('/').get(function (req, res) { /* 실제 url*/

    //res.send('Hello World'); // 응답
    res.redirect('/emaillist');
});

module.exports = router;