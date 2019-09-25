
/* ***************************

*	puerto

/* ***************************/


process.env.PORT = process.env.PORT || 3000

/* *****************************************
*	Entorno
*	
/* *****************************************/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* *****************************************
*	Base de datos
*	
/* *****************************************/
let urlDB;
if(process.env.NODE_ENV === 'dev'){

    urlDB= 'mongodb://localhost:27017/cafe'
    
}else{
    urlDB= process.env.MONGO_URI
    
}


process.env.URLB = urlDB;

/* *****************************************
*	VenCimiento del TOKEN
*	60segundos
*   60minutos
*   24 horas
*   30 dias
/* *****************************************/

process.env.CADUCIDAD_TOKEN = 60*60*24*30


/* *****************************************
*	SEED de autenticacion
*	Se-cre*t-is-a-Se*cre-t
/* *****************************************/

process.env.SEED= process.env.SEED || 'se-cre*t'

// mongodb