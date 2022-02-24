const mongoose = require('mongoose');

const Continent = mongoose.model('Continent',
{
    name: {type: String,
           required: true,
           unique: true },
           
    //list of countries
    countries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }]

});

module.exports =Continent;