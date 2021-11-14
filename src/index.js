require('dotenv').config();
const config = require('config');
const logger = require('../config/logger');
const app = require('./server');
const port = process.env.PORT || 3000;

// MongoDB connection
if (!config.has('database')) {
    logger.error('No db config found');
    process.exit();
}


app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

//UvbyMewbVPwHC6KM