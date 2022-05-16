const { async } = require('regenerator-runtime');
const Contact = require('../models/contactModels');

exports.index = async (req, res, next) => {
  const lista = await Contact.listar();
  return res.render('index', {lista});
}