'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    description: String,
    ingrediends: String
})

module.exports = mongoose.model('Food', ProductSchema)