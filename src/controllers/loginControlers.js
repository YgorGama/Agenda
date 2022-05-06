const Login = require('../models/loginModels')

exports.loginControler = (req, res, next) =>{
    return res.render('login')
};


exports.loginPost = (req,res, next) => {

}

exports.register = (req,res, next) => {
    const login = new Login(req.body);
    login.register();
    
}