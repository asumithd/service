const Address = require('../models/address.model');

exports.create = (req, res, next) => {
    const address = new Address(req.body);

    address.save((err, data) => {
        if (err) {
            const error = new Error('Some Error in address');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'address added successfully', data });
    })
}

exports.findByUser = (req, res, next) => {
    Address.find({ userid: req.params.userid }).exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching address');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Address fetched successfully', 'data': data });
    });
}

exports.findAvailablelocationSlotByUser = (req, res, next) => {
    Address.find({ userid: req.params.userid }).exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching address');
            return next(error);
        } else {
            let locationtileOption = [
                { label: 'Home', value: 'HOME', active: true },
                { label: 'Office', value: 'OFFICE', active: true },
                { label: 'Other', value: 'OTHER', active: true }
            ];
            let options = [];

            locationtileOption.forEach((e1, index) => {
                data.forEach((e2) => {
                    if (e1.value === e2.addresstitle && e1.active === true) {
                        locationtileOption[index].active = false;
                    }
                })
            })
            return res.json({ 'success': true, 'message': 'add fetched successfully', 'data': locationtileOption });
        }
    });
}

exports.findDefaultByUser = (req, res, next) => {
    Address.findOne({ userid: req.params.userid, default: true }).exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching address');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Address fetched successfully', 'data': data });
    });
}

exports.findAll = (req, res, next) => {
    Address.find().populate('addresses').exec((err, data) => {
        if (err) {
            const error = new Error('Error in fetching address');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'Address fetched successfully', 'data': data });
    });
}

exports.update = (req, res, next) => {
    Address.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Error in fetching address');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'address Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Address.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'address Deleted Successfully', data });
    })

};