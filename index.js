const express = require('express');
const connect_DB = require('./config/dbconfig.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send({ statuscode: 200, message: "OK", data: "Home Page" });
});

app.listen(8080, () => {
    console.log('Server started');
});

connect_DB();