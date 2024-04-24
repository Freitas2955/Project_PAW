var path = require('path');
var fs = require("fs");

let fileUploaderController = {};

/* GET home page. */
fileUploaderController.getSingleFile = function(req, res, next) {
    var fileDestination = path.join(__dirname,"..","public","images",req.file.filename);

    fs.readFile( req.file.path, function (err, data) {
        fs.writeFile(fileDestination, data, function (err) {
            if( err ) {
                console.log( err );
            } else {
                response = {
                message:'File uploaded successfully',
                filename: req.file.name
                };
            }
            res.end( JSON.stringify( response ) );
        });
    });
};

/* GET home page. */
fileUploaderController.getFileAndRestData = function(req, res, next) {
    
    let data = req.body.title;
    
    let response = {};
    response.dataSubmitted = data;
    
    var fileDestination = path.join(__dirname,"..","public","images",req.file.filename);

    fs.readFile( req.file.path, function (err, data) {
        if (err){
            res.end( JSON.stringify( response ) );
        }
        fs.writeFile(fileDestination, data, function (err) {
            if( err ) {
                console.log( err );
            } else {
                response.message ='File uploaded successfully';
                response.filename = req.file.name
            }
            res.end( JSON.stringify( response ) );
        });
    });
};

module.exports = fileUploaderController;