var prop = require('./properties');

var mysql = require('mysql');

module.exports = {
    getConnection : ()=> {
        return mysql.createConnection(prop);
    }
}