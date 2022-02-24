const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology : true
},(error)=>{
     if (error) throw error;

     console.log('connected to databse !')
    });

