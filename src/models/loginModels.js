const res = require('express/lib/response');
const mongoose = require('mongoose');
const validator = require('validator');

const loginScheme = new mongoose.Schema({
    email:{ type:String, required:true},
    password: {type:String, required:true}
});

const loginModel = mongoose.model('Home', loginScheme);

class Login{
    constructor(body){
        this.body = body;
        this.erros = [];
        this.user = null
    }

    register(){
        this.verify();

    }

    verify(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email))this.erros.push('E-mail inválido');

        if(this.body.password < 3 || this.body.password > 50)this.erros.push('A senha tem que ter entre 3 e 50 caracteres');
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        };

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;