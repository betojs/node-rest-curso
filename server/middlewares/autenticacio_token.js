/* *****************************************
*	Verificar 
*	        Token
/* *****************************************/   


const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next)=>{

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoder)=>{

        if(err){
            return res.status(401).json({
                ok:false,
                err:{message:'Token no valido'}
            })
        }
        req.usuario=decoder.usuario;
        next()


    })


}

let verificaAdmin_Role = (req, res, next)=>{

    let usuario= req.usuario;

    if(usuario.rol === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok:false,
            err:{message:'el usuario no es administrador '}
        })

    }


}
module.exports= {
    verificaToken,
    verificaAdmin_Role
}