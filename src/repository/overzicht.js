const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const getAll = async () => {
  getLogger().info(`welke tabel: ${tables.rit}`);
  // const overzichten = await getKnex()
  //   .raw('SELECT t1.*, t2.*, t3.* FROM `ritten` as t1 join places as t2 on t2.id=t1.placeVanId join places as t3 on t3.id=t1.placeNaarId');
  // werkt in phpmyadmin...
  
  // const overzichten = await getKnex().select(`${tables.rit}.*`, `${tables.station}.*`, `${tables.trein}.*`).from(tables.rit)
  //    .join(tables.trein, 'treinNummer', '=', `${tables.trein}.nummer`)
  //    .join(tables.station, 'placeVanId', '=', `${tables.station}.id`)
  //   .join(tables.station, 'placeNaarId', '=', `${tables.station}.id`) 
  //  // .orderBy('rit.id', 'asc');

  //const overzicht = getKnex().select('placeVanId', 'placeNaarId', 'treinNummer').from(tables.rit).whereRaw(`${tables.rit}.id = 1`);

  // const [tempplaceVanId, tempplaceNaarId, temptreinNummer] = await Promise.all([  
  //   getKnex().select(`${tables.station}.naam`).from(tables.station).whereRaw(`${tables.station}.id = ${tables.rit}.placeVanId`),
  //   getKnex().select(`${tables.station}.naam`).from(tables.station).whereRaw(`${tables.station}.id = ${tables.rit}.placeNaarId`),
  //   getKnex().select(`${tables.trein}.naam`).from(tables.trein).whereRaw(`${tables.trein}.nummer = ${tables.rit}.treinNummer`)
  // ]);
  // const overzichten = await getKnex().select(`${tables.rit}.*`, `${tables.station}.*`, `${tables.trein}.*`).from(tables.rit)
  const overzichten = await getKnex()
  .raw('SELECT t1.*, t2.id as vanid, t2.naam as vannaam, t3.id as naarid, t3.naam as naarnaam, t4.* FROM `ritten` as t1 join places as t2 on t2.id=t1.placeVanId join places as t3 on t3.id=t1.placeNaarId join treinen as t4 on t4.nummer=t1.treinNummer');

  
  return {
    overzicht : overzichten[0].map((rit) => (formatGegevens(rit))),
    count: overzichten[0].length}
     //[0] gebruiken, anders krijg je een array met 2 arrays (2de is raw buffer)
}


  const formatGegevens = (tempOverzichten) => {
 //  tempOverzichten.map((tempOverzichten)  => {
       return {
         id: tempOverzichten.id,
         date: tempOverzichten.date,
         vertrek: {
           id: tempOverzichten.vanid,
           naam: tempOverzichten.vannaam
         },
         aankomst: {
           id: tempOverzichten.naarid,
           naam: tempOverzichten.naarnaam
         },
         trein: {
           nummer: tempOverzichten.treinNummer,
           typeNaam: tempOverzichten.Naam,
           aandrijving: tempOverzichten.aandrijving,
           type: tempOverzichten.type,
           eigenaar: tempOverzichten.eigenaar,
           huurder: tempOverzichten.huurder,
           rating: tempOverzichten.rating,
           foto: tempOverzichten.foto
         }
   
       } 
//       });
     //, `count: ${tempOverzichten.length}`  
  }


const getById = async (id) => {
  const overzicht = await getKnex().raw(`SELECT t1.*, t2.id as vanid, t2.naam as vannaam, t3.id as naarid, t3.naam as naarnaam, t4.* FROM ritten as t1 join places as t2 on t2.id=t1.placeVanId join places as t3 on t3.id=t1.placeNaarId join treinen as t4 on t4.nummer=t1.treinNummer WHERE t1.id=${id}`);
  return overzicht[0]&& formatGegevens(...overzicht[0]);
}

//SELECT t1.*, t2.*, t3.* FROM `ritten` as t1 join places as t2 on t2.id=t1.placeVanId join places as t3 on t3.id=t1.placeNaarId WHERE t1.id=1;
module.exports = {
  getAll,
  getById

}