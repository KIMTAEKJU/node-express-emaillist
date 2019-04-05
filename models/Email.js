
const mongoose = require( 'mongoose' );

mongoose.connect('mongodb://localhost:27017/webdb', {useNewUrlParser: true});

const email = new mongoose.Schema ({ // 스키마 정보를 담고있는애
    firstName: String,
    lastName: String,
    email: String
},{
    versionKey: false
});


module.exports = mongoose.model('Email', email); // 모듈 email 생성