const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
    },
    'sub-category': {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    }
});

const Item = new mongoose.model('Item', itemSchema);

module.exports = Item;