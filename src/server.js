const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('mongoose');
const config = require("config");
const logger = require("../config/logger");
mongoose.Promise = global.Promise;



const {username, password, host} = config.get('database');
mongoose.connect(
    `mongodb+srv://${username}:${password}@${host}`,
    {useNewUrlParser: true,
        useUnifiedTopology: true}
).then(() => logger.info('MongoDB connection has been established successful'))
    .catch(err => {
        logger.error(err);
        process.exit();
    })

app.use(morgan('combined', {stream: logger.stream}));

//app.use('/images', express.static('./public/images'));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/person', require('./controllers/person/person.routes'));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;