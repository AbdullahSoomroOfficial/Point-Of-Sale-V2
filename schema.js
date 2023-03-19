const joi = require('joi');

const categorySchema = joi.object({
                                    category: joi.string().required()
                                 }).required();

const subCategorySchema = joi.object({
                                        'sub-category': joi.string().required(),
                                        category: joi.string().required()
                                    }).required();

const itemSchema = joi.object({
                                item: joi.string().required(),
                                category: joi.string().required(),
                                'sub-category': joi.string().required(),
                                price: joi.number().min(1).required()
                             }).required();

module.exports = { 
                   categorySchema, 
                   subCategorySchema, 
                   itemSchema
                 }                             