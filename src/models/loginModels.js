const mongoose = require('mongoose');
const validator = require('validator');
const  bcryptjs = require('bcryptjs');

const loginScheme = new mongoose.Schema({
    email:{ type:String, required:true},
    password: {type:String, required:true}
});

const LoginModel = mongoose.model('Home', loginScheme);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null
    }

    async login(){
        this.verify();
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({email: this.body.email});
        if(!this.user){
            this.errors.push('E-mail inválido');
            return;
        }
        
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha invalida');
            this.user = null;
            return;
        }
        
    }

    async register(){
        this.verify();
        await this.userExist();
        if(this.errors.length > 0) return;
        
        const salt = bcryptjs.genSaltSync(10);
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    verify(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email))this.errors.push('E-mail inválido');

        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push('A senha tem que ter entre 3 e 50 caracteres')
        };
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

    async userExist(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.errors.push('Usuário ja existe');
    }

}

module.exports = Login;