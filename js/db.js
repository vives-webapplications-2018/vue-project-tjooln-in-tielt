var mysql = require('mysql');

var tableName = "";
var pool = mysql.createPool({                           //creates pool with given variables in mysql
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scribble'
});

exports.setTable = function(table) {                    //expects string table, changes the currently used table
    tableName = table;
  };

exports.query = function(query) {                       //expects a valid mysql query in string format
  pool.getConnection(function (err, connection) {
    connection.query(query, function (err, rows) {
        connection.release();
        if (err) throw err;
        console.log('query ' + query + ' sent');
        console.log(rows);
        return rows;
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

  exports.delete = function(id) {                       //expects an integer id that refers to the table entry that will be deleted
    exports.query("DELETE FROM " + tableName + " WHERE id = " + id);
    console.log('deleted entry ' + id + ' from ' + tableName); 
  };

  exports.wipe = function() {                           //wipes all the entries in the table
    exports.query("DELETE FROM " + tableName);
    console.log('wiped table ' + tableName); 
  };

  exports.getRecord = function(id) {                   //expects an integer id, will return the record from the currently selected table that corresponds to this id
    return exports.query("SELECT * FROM " + tableName + " WHERE id = " + id);
  };