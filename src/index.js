require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./config/logger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`,
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
app.use('/person', require('./controllers/person/route'));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

//UvbyMewbVPwHC6KM