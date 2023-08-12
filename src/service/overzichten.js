const { getLogger } = require('../core/logging');


const overzichtRepository = require('../repository/overzicht');

const getAll = async () => {
  const overzichten= await overzichtRepository.getAll();
  return (overzichten);
  
}

const getById = async (id) => { 
  const overzicht = await overzichtRepository.getById(id);
  return overzicht;
}

module.exports = {  
  getAll,
  getById
}
