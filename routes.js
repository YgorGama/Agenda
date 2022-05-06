const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginControler = require('./src/controllers/loginControlers');

route.get('/', homeController.index);

route.get('/login/index', loginControler.loginControler);

route.post('/login/login', loginControler.loginPost);
route.post('/login/register', loginControler.register);
module.exports = route;
