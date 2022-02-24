require('dotenv').config()
const { response } = require('express');
const e = require('express');
const express = require('express'); /*import library */


const app = express();
app.use(express.json());

require('./config/database')
const CountriesRoutes = require('./routes/countries')
const ContinentsRoutes = require('./routes/continents');

app.use('/countries',CountriesRoutes);
app.use('/continents',ContinentsRoutes);


/* response is evrything we give to client request, request have all the information of the client*/
/* '/' is the root */
app.get('/',(request,response)=>{
    return response.status(200).json({"msg": "Hello World !"})
});



/* ()=> no data Type and No name*/
app.listen(3000, () => {
    console.log('Server running...')
})

/* Create another root for the same project !!  */