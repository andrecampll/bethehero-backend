const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/conection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },

  async update(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const ong_id = request.headers.authorization;

    await connection('ongs').where('id', ong_id).update({
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({
      name,
      email,
      whatsapp,
      city,
      uf,
    })
  }
};
