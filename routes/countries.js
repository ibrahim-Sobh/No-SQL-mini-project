const express =require('express');
const CountryModel = require('../models/Country');
const ContinentModel = require('../models/Continent');


const Router = express.Router();

module.exports = Router;

// connection  between file and this

    Router.get('/',async(request,response)=>{
    const countries = await CountryModel.find().populate('continent');
    return response.status(200).json(countries);
    });

    Router.get('/filter/:filter',async(request,response)=>{
        const tofind = request.params.filter
        const regex = new RegExp(tofind) // i for case insexiensitive
        const countries = await CountryModel.find( {name : regex}).populate('continent');
        return response.status(200).json(countries);
        });
   
    //Number of countries
    Router.get('/count',async(request,response)=>{
        const countries = await CountryModel.count()
        return response.status(200).json({msg: "we have " + countries+ " countries"});
        });

    Router.get('/population/',async(request,response)=>{
            const countries = await CountryModel.find().sort({'population': 1})
             return response.status(200).json(countries);
    });

    Router.get('/population100k/',async(request,response)=>{
        const regex = new RegExp("u") // i for case insexiensitive
        const countries = await CountryModel.find({name : regex}).where('population').gt("100000")
    
         return response.status(200).json(countries);ß
});
    
    Router.get('/:id',async(request,response)=>{
        const countryId= request.params.id;
        const country = await CountryModel.findOne(
            {
                _id: countryId
            }
        );
        return response.status(200).json(country);
        });
    
    Router.post('/', async (request,response)=>{
        const {name,isoCode,population,continent} = request.body
    
       const country= await CountryModel.create({
           name: name,
           isoCode: isoCode,
           population: population,
           continent : continent
       })
   
       // check if continent is not empty and then if exist before updating

        const continentId = continent
        await ContinentModel.update(
            {
                _id: continentId
            }
                ,
            {$push: {countries: country}
            },
            {
                upsert: true
            }
                );
        return response.status(200).json(country);
        

    });
    
    Router.delete('/:id',async(request,response)=>{
        const countryId= request.params.id;
        await CountryModel.findByIdAndDelete({
            _id: countryId
        })
         return response.status(200).json({msg: "Country deleted!"});
        });
    
    
    Router.put('/:id',async (request,response)=>{
        const countryId= request.params.id;
        const {name,isoCode,population} = request.body;
        if (name && isoCode && population){
            const country = await CountryModel.findByIdAndUpdate({
                _id: countryId // Filter
            },
            {
                name, //To be updated
                isoCode, //To be updated
                population
    
            },
            {
                new: true
            });
            return response.status(200).json(country);
        }
        else{return response.status(500).json({msg:"Not all pramateres are given to update!"});}
       
    });