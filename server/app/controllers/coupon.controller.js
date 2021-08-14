const Coupon = require('../models/coupon.model.js');



exports.getallCoupons = (req, res) => {
    Coupon.find().exec((err, coupons) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in sliders' });
        }

        return res.json({ 'success': true, 'message': 'Coupon fetched successfully', coupons });
    });
}

exports.getCouponbyId = (req, res) => {
    console.log(req.params.id)
    Coupon.find({ _id: req.params.id }).exec((err, coupons) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (coupons.length) {
            return res.json({ 'success': true, 'message': 'Coupon fetched by id successfully', coupons });
        } else {
            return res.json({ 'success': false, 'message': 'Coupon with the given id not found' });
        }
    })
}


exports.addCoupon = (req, res) => {
    const newCoupon = new Coupon(req.body);
    newCoupon.save((err, coupons) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error Found' });
        }

        return res.json({ 'success': true, 'message': 'Coupon added successfully', coupons });
    })
}





exports.verifyCoupon = (req, res) => {

    Coupon.find({ couponName: req.body.coupon }).exec((err, coupons) => {
        console.log(coupons)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (coupons.length) {

            return res.json({ 'success': true, 'message': 'Coupon fetched by id successfully', coupons });
        } else {
            return res.json({ 'success': false, 'message': 'Coupon with the given id not found' });
        }
    })
}

exports.updateCoupon = (req, res) => {
    Coupon.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, coupons) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'Coupon Updated Successfully', coupons });
    })
}

exports.deleteCoupon = (req, res) => {
    Coupon.findByIdAndRemove(req.params.id, (err, coupons) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }

        return res.json({ 'success': true, 'message': 'Coupon Deleted Successfully', coupons });
    })
}