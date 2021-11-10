const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use('/person', require('./controllers/person/route'));

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

