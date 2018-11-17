var mysql = require('mysql');

var tableName = "";
var pool = mysql.createPool({                           //creates pool with given variables in mysql
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scribble'
});

exports.query = function(query) {                       //expects a valid mysql query in string format
  pool.getConnection(function (err, connection) {
    connection.query(query, function (err, rows) {
        connection.release();
        if (err) throw err;
        console.log('query ' + query + ' sent');
    });
  });
};
