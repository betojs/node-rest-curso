
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
    urlDB= 'mongodb+srv://betojs:1g0FFa3aMtDbzGN3@cluster0-xaalm.mongodb.net/cafe'
    
}


process.env.URLB = urlDB;


// mongodb