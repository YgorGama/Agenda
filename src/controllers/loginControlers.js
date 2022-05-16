const { async } = require('regenerator-runtime');
const Login = require('../models/loginModels')

exports.loginControler = (req, res, next) =>{
    if(!req.session.user){
        return res.render('login');
    }else{
        return res.render('login-logado');
    }
};

exports.login = async (req,res, next) => {
    try {
        const login = new Login(req.body);
        await login.login();
       
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save( () =>{
                res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucess', 'Bem vindo!! ' +login.user.email);
        req.session.user = login.user;
        req.session.save( () =>{ return res.redirect('/login/index')});
        return;
        
        
    } catch (error) {
        console.log(err);
        return res.render('404');
    }
}

exports.register = async (req,res, next) => {
    try {
        const login = new Login(req.body);
        await login.register();
       
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save( () =>{
                res.redirect('/login/index');
            });
            return;
        }
        req.flash('sucess', 'Conta registrada com sucesso');
        req.session.save( () =>{ return res.redirect('/login/index')});
        return;      
    } catch (error) {
        console.log(err);
        return res.render('404');
    }

}

exports.logout = (req, res) =>{
    req.session.destroy();
    return res.redirect('/');
}