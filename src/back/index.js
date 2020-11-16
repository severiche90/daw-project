/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
//var datos = require('./datos.json');
var conexionMysql = require('./mysql-connector');

//=======[ Main module code ]==================================================


//=======[solicita informacion de todos los dispositivos desde datos.js]==============

/* app.get('/dispositivos',function(req, res, next){

   res.json(datos);

}); */

//=======[Solicita informacion de dispositivo segun el id desde datos.js]==========

/* app.get('/dispositivo/:id',function(req, res, next){

    let datosFiltrados = datos.filter((itemDeLaLista)=>{

    return itemDeLaLista.id==req.params.id;

    }); 

    res.json(datosFiltrados);
}); */

//====== [Solicita informacion de todos los dispositivos desde BD] ========== 

app.get('/dispositivos', function(req, res, next) {
    
   conexionMysql.query('select * from  Devices',function(err,respuesta){

       if(err){
          res.send(err).status(400); 
          return;
       }

       res.send(respuesta);
   }); 
});

//========== [Solicita informacion de dispositivo segun el Id desde BD] ==============

app.get('/dispositivos/:id', function(req, res, next) {
    
    conexionMysql.query('select * from Devices where id=?',[req.params.id],function(err,respuesta){

        if(err){
          res.send(err).status(400); 
           return;
        }
          res.send(respuesta);
    });  
});

//============[Modifica el parametro de state de los dispositivos de datos.js]==========

/* app.post('/dispositivos/',function(req,res){

  let datosFiltrados= datos.filter((itemDeLaLista)=>{
  return itemDeLaLista.id==req.body.id;
  });

  if(datosFiltrados.length>0){
   datosFiltrados[0].state=req.body.state;  
  }
  res.json(datosFiltrados);
}); */

//============[Modifica el parametro estado de determinado dispositivo]=================

// espero recibir algo del estilo {id:?,state:?} devuelve el dato modificado
app.post('/dispositivos/estado',function(req,res){

    conexionMysql.query('UPDATE Devices SET state=? WHERE id=?',[req.body.state,req.body.id],function(err,respuesta){

        if(err){
          res.send(err).status(400); 
           return;
        }
          //res.send('Se actualizo correctamente: '+ JSON.stringify(respuesta).state(200));
          res.send(respuestas);
    }); 
}); 

//========== Editar nombre, descripcion y tipo de dipositivo ============================= 

app.post('/dispositivos/editar',function(req,res){

    conexionMysql.query('UPDATE Devices SET name=?, description=?, type=? WHERE id=?',[req.body.name,req.body.description,req.body.type,req.body.id],function(err,respuesta){
    
      if(err){
      res.send(err).status(400);
      return;
      }
      res.send('update ok');

    });  
});

//========== Eliminar dispositivos de BD =============================

app.post('/dispositivos/eliminar',function(req,res){

    conexionMysql.query('DELETE FROM Devices WHERE id=?',[req.body.id],function(err,respuesta){
    
      if(err){
      res.send(err).status(400);
      return;
      }
      res.send('update ok');

    });
});  

//=========== Agregar Dispositivos a BD ==========================

app.post('/dispositivos/agregar',function(req,res){

    conexionMysql.query('INSERT INTO Devices (name, description, state, type) VALUES (?,?,?,?)',[req.body.name,req.body.description,req.body.state,req.body.type],function(err,respuesta){
  
      if(err){
      res.send(err).status(400);
      return;
      }
      res.send('update ok');
    
    });
});  

//================[Listener]=================

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]======================================================
