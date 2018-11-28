
const fs = require('fs');                                    // require file system

exports.getFilesInFolder = function(path, callback) {        //expects a path to the folder and a callback
    fs.readdir(path, function (err, items) {
        if (err) return callback(err);
        callback(null, items);                              //returns an array of the found files to the callback
    });
};