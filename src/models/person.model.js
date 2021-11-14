const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
},
{
    timeStamps: true
});

// PersonSchema alapu modell Person neven
module.exports = mongoose.model('Person', PersonSchema);
