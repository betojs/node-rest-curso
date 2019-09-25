
const express = require('express')
const app = express()
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const Usuario = require ('../models/usuario')

app.post('/login',(req, res) =>{

    let body = req.body;
    Usuario.findOne({email:body.email }, (err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(!usuarioDB){

            return res.status(400).json({
                ok:false,
                err:{mesage:'(Usuario) o contrasenia no se encontro'}
            });
        }
        
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{mesage:'Usuario o (contrasenia) no se encontro'}
            });
        }
        let token=jwt.sign({
            usuario:usuarioDB,
        },process.env.SEED , {expiresIn:process.env.CADUCIDAD_TOKEN })
        //                       SS*MM*HH*DD


        res.json({
            ok:true,
            usuarioDB,
            token
        })

    })
})

module.exports = app;
  