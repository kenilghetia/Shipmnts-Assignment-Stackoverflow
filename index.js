const express = require('express');
const connect_DB = require('./config/dbconfig.js');
// const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send({ statuscode: 200, message: "OK", data: "Home Page" });
});

app.listen(8080, () => {
    console.log('Server started at localhost with port 8080');
});

connect_DB();