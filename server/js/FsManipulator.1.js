
const fs = require('fs'); //file system

exports.getFolderContent = function(path, callback) {
    fs.readdir(path, function (err, items) {
        if (err) return callback(err);
        callback(null, items);
    });
};