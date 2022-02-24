const mongoose = require('mongoose');

const Country = mongoose.model('Country',
{
    name: {type: String,
           required: true,
           unique: true },
    isoCode: String,
    population: Number,
    continent:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Continent'
    }

});

module.exports =Country;