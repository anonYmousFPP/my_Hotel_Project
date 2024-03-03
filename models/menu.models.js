const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    ingrediants:{
        type: String,
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }
})

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;