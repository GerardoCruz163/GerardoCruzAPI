let objeto = {
    id_Artista:2,
    nombre :"lenny",
    apellido : "tavarez",
    fecha_nacimiento : "1987-05-19T06:00:00.000Z",
    acerca_de :"CANTANTE PUERTORRIQUEÑO",
    pais :"PUERTO RICO"
  }
  
  let campo=Object.keys(objeto);
  let valores=Object.values(objeto);
  
  console.log(campo);
  console.log(campo);
  
  let sentenciasql="";
  let cadenaUpdate="update artistas";
  let cadenaSet = "";
  let cadenaWhere = "where"
  
  campo.foreach(campo=>{
    console.log(campo+ '='+objeto[campo])
  });