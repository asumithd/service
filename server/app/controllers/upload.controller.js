var multer = require("multer");
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) { 
        cb(null, Date.now() + '.jpg')
    }
});

var carImageOption = multer({ storage: storage });

  


// Delete a rideType with the specified rideTypeId in the request
exports.carimage = (req, res) => { 
};

exports.deletefile = (req, res , next) => { 
    const files = req.body
    files.forEach(function(filePath) {
        fs.access(filePath, error => {
            if (!error) {
                fs.unlinkSync(filePath,function(error){ 
                });
            } else {
                console.log('outerror',error);
            }
        });
    });

    return res.json({ 'success': true, 'message': 'deleted sucessfully' });
    

};