const monk = require('monk');
const db = monk('localhost/assignment');


module.exports = db;