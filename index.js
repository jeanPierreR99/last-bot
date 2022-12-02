const express = require('express');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const request = require('request');
const { json } = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express().use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.json());
app.use( express.static(path.join(__dirname, 'public')) );

app.use(session({
    secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
    saveUninitialized: true,
    resave: true,
  }));

app.use('/admi', require('./router/router-admi'));
app.use('/login', require('./router/router-login'));
app.use('/', require('./router/router-cliente'));
app.use('/webhook', require('./router/router-webhook'));

const PORT =process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("servidor iniciado...");
});