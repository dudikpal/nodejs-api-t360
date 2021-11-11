const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
},
{
    timeStamp: true
});

// PersonSchema alapu modell Person neven
module.exports = mongoose.model('Person', PersonSchema);
