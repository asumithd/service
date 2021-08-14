const Product = require('../models/product.model.js');
const Maincata = require('../models/maincata.model.js');
const Subcata = require('../models/subcategory.model.js');
//Product
exports.getcategory = (req, res, next) => {
    Maincata.aggregate([
        {
            "$lookup": {
                "from": "subcatas",
                "localField": "_id",
                "foreignField": "category",
                "as": "subcats"
            }
        }
    ]).exec(function (err, list) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Something went wrong', err });
        } else {
            return res.json({ 'success': true, 'message': 'Categories listed Successfully', list });
        }
    })
}

exports.getproducts = (req, res, next) => {

    Maincata.aggregate([
        {
            "$lookup": {
                "from": "subcatas",
                "let": { "catId": "$_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$category", "$$catId"] } } },
                    {
                        "$lookup": {
                            "from": "products",
                            "let": { "subcatId": "$_id" },
                            "pipeline": [
                                { "$match": { "$expr": { "$eq": ["$subcategory", "$$subcatId"] } } }
                            ],
                            "as": "products"
                        }
                    }
                ],
                "as": "subcategories"
            }
        }
    ]).exec(function (err, list) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Something went wrong', err });
        } else {
            return res.json({ 'success': true, 'message': 'Categories listed Successfully', list });
        }
    })
}

exports.searchproducts = (req, res, next) => {

    Maincata.aggregate([
        {
            "$lookup": {
                "from": "subcatas",
                "let": { "catId": "$_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$category", "$$catId"] } } },
                    {
                        "$lookup": {
                            "from": "products",
                            "let": { "subcatId": "$_id" },
                            "pipeline": [
                                {                                   
                                    "$match": {
                                        "name": "egg noodles",
                                        "$expr": { "$eq": ["$subcategory", "$$subcatId"] }
                                    }
                                }
                            ],
                            "as": "products"
                        }
                    }
                ],
                "as": "subcategories"
            }
        }
    ]).exec(function (err, list) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Something went wrong', err });
        } else {
            return res.json({ 'success': true, 'message': 'Categories listed Successfully', list });
        }
    })
}

