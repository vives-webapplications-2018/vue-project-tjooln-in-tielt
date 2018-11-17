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

exports.insert = function(values) {                     //expects an object with key value pairs where each key corresponds to the name of the column
    var queryStart = 'INSERT INTO ' + tableName + ' (';
    var queryEnd =  ') VALUES (';
  
    for (let [key,value,index] of Object.entries(values)) {
  
      queryStart = queryStart.concat(key);
      if (typeof value == "string") {
        queryEnd = queryEnd.concat('"' + value + '"');
      } else {
        queryEnd = queryEnd.concat(value);
      }
  
      if (index != values.length) {
        queryStart = queryStart.concat(',');
        queryEnd = queryEnd.concat(',');
      } else {
        queryEnd = queryEnd.concat(')');
      }
    }
  
    var query = queryStart + queryEnd;
  
    exports.query(query);
  };
