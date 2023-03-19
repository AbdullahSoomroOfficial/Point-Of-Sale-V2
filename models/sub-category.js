const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    'sub-category': {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const SubCategory = new mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;