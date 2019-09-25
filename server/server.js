require ('./config/config')


const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/index'));



//Conectar con BD

mongoose.connect(process.env.URLB, { useNewUrlParser: true, useCreateIndex:true } ,(err,res)=> {res
if(err) throw err;
console.log(`Base de datos Online!`);
});

app.listen(process.env.PORT,()=>{console.log(`escuchando puerto, ${process.env.PORT}`);})