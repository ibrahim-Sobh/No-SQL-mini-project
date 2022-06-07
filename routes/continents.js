const { response } = require('express');
const express =require('express');

const ContinentModel = require('../models/Continent');
const CountryModel = require('../models/Country');


const Router = express.Router();

module.exports = Router;

Router.get('/',async (request,response)=>{
    const continent= await ContinentModel.find().populate('countries');
    return response.status(200).json(continent)
    
})

    //Number of continents
    Router.get('/count',async(request,response)=>{
        const continents = await ContinentModel.count()
        const countextend =continents.Keys(countries)
        return response.status(200).json({msg: "we have " + continents+ " continents"});
        });

    Router.get('/countriescountsergio',async(request,response)=>{
        const continents = await ContinentModel.aggregate(
            [{
                $addFields: { countryCount: {$size: '$countries'}}
            }]);
           return  response.status(200).json(continents);
    });

    //Number of continents
    Router.get('/countriescount',async(request,response)=>{
        const continents = await ContinentModel.find()
        const ContinetsWithCount=[]
            continents.forEach(c => {
                ContinetsWithCount.push({
                     key : c.name,
                     values : c.countries.length
                 }) 
                
             });
             response.status(200).json(ContinetsWithCount);
        });

    
     Router.get('/filter/:filter',async(request,response)=>{
            const tofind = request.params.filter
            const continents = await ContinentModel.find({name: tofind}).populate("countries")
             return response.status(200).json(continents);
            });
    
     //the first 4 countries in a continents alphabatically
     Router.get('/filterFirstfourCountries/',async(request,response)=>{
                const continents = await ContinentModel.find().populate({
                    path: 'countries',
                    options: { sort: { 'name': 1}, limit: 4}})
    
                 return response.status(200).json(continents);
        });

        //4th country in a continents alphabatically
    Router.get('/filterfourthCountry/:filter',async(request,response)=>{
        const tofind = request.params.filter
        const continents = await ContinentModel.findOne({name: tofind}).populate({
            path: 'countries',
            options: { sort: { 'name': 1} }})
        index=4
        console.log(continents)
        if (continents.countries.values.count<3){ index= continents.countries.length}
       
         return response.status(200).json(continents.countries[index]);
        });
    

    Router.get('/:id',async(request,response)=>{
        const continentId= request.params.id;
        const continent = await ContinentModel.findOne(
            {
                _id: continentId
            }
        );
        return response.status(200).json(continent);
        });
    
    Router.post('/', async (request,response)=>{
        const {name,countries} = request.body
    
       const continent= await ContinentModel.create({
           name: name,
           countries: countries
       })
       return response.status(200).json(continent)
    });
    
    Router.delete('/:id',async(request,response)=>{
        const continentId= request.params.id;
        await ContinentModel.findByIdAndDelete({
            _id: continentId
        })
         return response.status(200).json({msg: "Continent deleted!"});
        });
    
    
    Router.put('/:id',async (request,response)=>{
        const continentId= request.params.id;
        const {name,countries} = request.body;
        if (name && countries){
            const continent = await ContinentModel.findByIdAndUpdate({
                _id: continentId // Filter
            },
            {
                name, //To be updated
                countries  //To be updated
    
            },
            {
                new: true
            });
            return response.status(200).json(continent);
        }
        else{return response.status(500).json({msg:"Not all pramateres are given to update!"});}
       
    });