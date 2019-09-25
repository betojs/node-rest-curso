
const express = require('express')
const app = express()
const bcrypt = require ('bcrypt');
const _ = require('underscore');
const {verificaToken, verificaAdmin_Role} =require('../middlewares/autenticacio_token');
const Usuario = require ('../models/usuario')

app.get('/usuario', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde=Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)
    Usuario.find({}, 'nombre email')
            .skip(desde)    
            .limit(limite)
            .exec((err, usuarios)=>{
                if (err) {
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                Usuario.count({},(err,conteo)=>{
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos:conteo
                    })

                })

            })







  })
  
  //post -- crear datos
  
app.post('/usuario',[verificaToken, verificaAdmin_Role],  (req, res) =>{
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        rol: body.rol
    });

    usuario.save((err, userdb) =>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        // userdb.password = null

        res.json({
            ok:true,
            usuario:userdb
        })
    })
 
})
// put -- actualizar datos
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res)=> {
    let id = req.params.id;
    let body = _.pick(req.body,['nombre', 'email', 'img', 'rol', 'estado']) ;

    
    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, usuariodb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            usuario: usuariodb
        })

    })


})

//delete -- borrar (pero no se borra se cambia el estado para no visualizarse)
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) =>{
    let id =  req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(!usuarioEliminado){
            return res.status(400).json({
                ok:false,
                error:'Usuario no encontrado'
            });
        }
        res.json({
            ok:true,
            usuario:usuarioEliminado
        })
    })


})

module.exports = app;

