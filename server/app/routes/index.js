//need to remove
var multer = require("multer");
var jwt = require('express-jwt');

//dish image storage option

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/cars')
    },
    filename: function(req, file, cb) {
        console.log('File Name', file);
        cb(null, Date.now() + '.jpg')
    }
});
var carImageOption = multer({ storage: storage });

// other image storage

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
});
var ImageOption = multer({ storage: storage });

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    const driver = require('../controllers/driver.controller.js');
    const maincata = require('../controllers/maincata.controller.js');
    const subCategory = require('../controllers/subcategory.controller.js');
    const product = require('../controllers/product.controller.js');
    const coupon = require('../controllers/coupon.controller.js');
    const fareclasses = require('../controllers/fareclasses.controller.js');
    const farerates = require('../controllers/farerates.controller.js');
    const paymentmethod = require('../controllers/paymentmethod.controller.js');
    const order = require('../controllers/order.controller.js');
    const search = require('../controllers/search.controller.js');
    const sitesettings = require('../controllers/sitesetting.controller.js');
    const upload = require('../controllers/upload.controller.js');
    const banner = require('../controllers/banner.controller.js');
    const customer = require('../controllers/customer.controller.js');
    const address = require('../controllers/address.controller.js');
    const tracking = require('../controllers/tracking.controller.js');
    const customeraccount = require('../controllers/customeraccount.controller.js');
    const attributes = require('../controllers/attributes.controller.js');


    app.post('/api/register', user.register);
    app.post('/api/login', user.login);
    app.get('/api/users', user.findAll);
    app.get('/api/users/:id', user.findOne);
    app.put('/api/users/:id', user.update);

    app.delete('/api/users/:id', user.delete);

    app.post('/api/driver/register', driver.register);
    app.post('/api/driver/login', driver.login);
    app.get('/api/driver', driver.findAll);
    app.get('/api/driver/:id', driver.findOne);
    app.put('/api/driver/:id', driver.update);
    app.delete('/api/driver/:id', driver.delete);

    app.post('/api/maincatagery', maincata.create);
    app.get('/api/maincatagery', maincata.findAll);
    app.get('/api/maincatagery/:id', maincata.findOne);
    app.put('/api/maincatagery/:id', maincata.update);
    app.delete('/api/maincatagery/:id', maincata.delete);


    app.post('/api/subCategory', subCategory.create);
    app.get('/api/subCategory', subCategory.findAll);
    app.get('/api/subCategory/:id', subCategory.findOne);
    app.put('/api/subCategory/:id', subCategory.update);
    app.delete('/api/subCategory/:id', subCategory.delete);


    app.post('/api/product', product.create);
    app.get('/api/product', product.findAll);
    app.get('/api/product/:id', product.findOne);
    app.put('/api/product/:id', product.update);
    app.get('/api/product/category/:id', product.findbySubcategory);
    app.delete('/api/product/:id', product.delete);

    //Coupon
    app.post('/api/coupon', coupon.addCoupon);
    app.post('/api/coupon/verify', coupon.verifyCoupon);

    app.get('/api/coupon', coupon.getallCoupons);
    app.get('/api/coupon/:id', coupon.getCouponbyId);
    app.put('/api/coupon/:id', coupon.updateCoupon);
    app.delete('/api/coupon/:id', coupon.deleteCoupon);

    //fareclasses
    app.post('/api/fareclasses', fareclasses.create);
    app.get('/api/fareclasses', fareclasses.findAll);
    app.get('/api/fareclasses/:id', fareclasses.findOne);
    app.put('/api/fareclasses/:id', fareclasses.update);
    app.delete('/api/fareclasses/:id', fareclasses.delete);

    //farerates
    app.post('/api/farerates', farerates.create);
    app.get('/api/farerates', farerates.findAll);
    app.get('/api/farerates/:id', farerates.findOne);
    app.put('/api/farerates/:id', farerates.update);
    app.delete('/api/farerates/:id', farerates.delete);

    //paymentMethod
    app.post('/api/paymentmethod', paymentmethod.create);
    app.get('/api/paymentmethod', paymentmethod.findAll);
    app.get('/api/paymentmethod/:id', paymentmethod.findOne);
    app.put('/api/paymentmethod', paymentmethod.update);
    app.delete('/api/paymentmethod/:id', paymentmethod.delete);

    //order
    app.post('/api/order', order.create);
    app.get('/api/order', order.findAll);
    app.get('/api/order/driver/:id', order.driverorder);
    app.get('/api/order/:id', order.findOne);
    app.put('/api/order/:id', order.update);
    app.delete('/api/order/:id', order.delete);

    //stripe payment
    app.post('/api/makePayment', order.makePayment);
    app.post('/api/createOrder', order.createOrder);

    //Search 
    app.get('/api/listcategories', search.getcategory);
    app.get('/api/getproducts', search.getproducts);
    app.get('/api/searchproducts', search.searchproducts);

    //siteSetting 
    app.post('/api/sitesettings', sitesettings.create);
    app.get('/api/sitesettings', sitesettings.findAll);
    app.put('/api/sitesettings', sitesettings.update);

    //banner
    app.post('/api/banner', banner.create);
    app.get('/api/banner', banner.findAll);
    app.get('/api/banner/:id', banner.findOne);
    app.put('/api/banner/:id', banner.update);
    app.delete('/api/banner/:id', banner.delete);
    app.post('/api/deletefile', upload.deletefile);


    //attributes
    app.post('/api/attributes', attributes.create);
    app.get('/api/attributes', attributes.findAll);
    app.get('/api/attributes/:id', attributes.findOne);
    app.put('/api/attributes/:id', attributes.update);
    app.delete('/api/attributes/:id', attributes.delete);

    //customer
    app.post('/api/userregister', customer.userRegister);
    app.post('/api/userlogin', customer.userLogin);
    app.put('/api/customer/:id', customer.update);
    app.get('/api/customer', customer.getallCustomer);
    app.put('/api/updateotp/:mobile', customer.updateOTP);
    // app.get('/api/sendotp/:otp/:mobile', customer.sendOTP);

    //address
    app.post('/api/address', address.create);
    app.get('/api/address', address.findAll);
    app.get('/api/address/:userid', address.findByUser);
    app.get('/api/defaultaddress/:userid', address.findDefaultByUser);
    app.put('/api/address/:id', address.update);
    app.delete('/api/address/:id', address.delete);
    app.get('/api/address/findAvailablelocationSlotByUser/:userid', address.findAvailablelocationSlotByUser);

    //customeraccount 
    app.post('/api/customeraccount/:id', customeraccount.addCustomeraccount);
    app.get('/api/customeraccount', customeraccount.getallCustomeraccounts);
    app.get('/api/customeraccount/:id', customeraccount.getCustomeraccountbyId);
    app.put('/api/customeraccount/:id', customeraccount.updateCustomeraccount);
    app.delete('/api/customeraccount/:id', customeraccount.deleteCustomeraccount);

    //tracking
    app.post('/api/tracking', tracking.create);



    app.post('/api/upload/carimage', carImageOption.array("carimage[]", 12), function(req, res, next) {
        console.log(req.file)
        return res.send({
            success: true,
            file: req.files
        });
    });

    app.post('/api/upload', ImageOption.array("image[]", 12), function(req, res, next) {
        console.log(req.file)
        return res.send({
            success: true,
            file: req.files
        });
    });

    // app.get('/api/sendotp/:uniqueNumber/:mobile', function (req, res) {
    //     let dataUrl = "https://www.fast2sms.com/dev/bulk?authorization=GLsYtpcgzI4UmJZqe25xjv6S0CkndwTuByAr3bhEMV8ialFfP75jFiHZw7EtYfW4BQoXbsO9IadU8Nx1&sender_id=FSTSMS&language=english&route=qt&numbers=" + req.params.mobile + "&message=9506&variables={AA}&variables_values=" + req.params.uniqueNumber;
    //     https.get(dataUrl, (resp) => {
    //         console.log(resp);
    //       return resp;
    //     }).on("error", (err) => {
    //         console.log("Error: " + err.message);
    //         return err.message;
    //     });
    // });

    app.get('/api/sendotp/:uniqueNumber/:mobile', function(req, res) {
        let dataUrl = "https://www.fast2sms.com/dev/bulk?authorization=GLsYtpcgzI4UmJZqe25xjv6S0CkndwTuByAr3bhEMV8ialFfP75jFiHZw7EtYfW4BQoXbsO9IadU8Nx1&sender_id=FSTSMS&language=english&route=qt&numbers=" + req.params.mobile + "&message=9506&variables={AA}&variables_values=" + req.params.uniqueNumber;
        https.get(dataUrl, (resp) => {
            console.log(resp);
            return resp;
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            return err.message;
        });
    });


}