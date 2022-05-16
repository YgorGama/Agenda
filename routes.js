const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginControler = require('./src/controllers/loginControlers');
const contactController = require('./src/controllers/contactControllers');
const {loginRequired} = require('./src/middlewares/middleware');

route.get('/', homeController.index);

//Login
route.get('/login/index', loginControler.loginControler);
route.post('/login/login', loginControler.login);
route.post('/login/register', loginControler.register);
route.get('/login/logout', loginControler.logout);

//Contatos
route.get('/contact/index',loginRequired, contactController.index);
route.post('/contato/registro', loginRequired, contactController.register);
route.get('/contato/registro/:id', loginRequired, contactController.editIndex);
route.post('/contato/edit/:id', loginRequired, contactController.edit);
route.get('/contato/delete/:id', loginRequired, contactController.delete);

module.exports = route;
