const  mongoose = require("mongoose");
const validator = require('validator');

const contactScheme = new mongoose.Schema({
    nome: {type:String, required: true},
    sobrenome: {type:String},
    email: {type:String},
    telefone: {type:String},
    criadoEm:{type:Date, default:Date.now}
});

const ContactModel = mongoose.model('Contact', contactScheme);

class Contact{
    constructor(body){
        this.body = body;
        this.contact = null;
        this.errors = [];
    }

    async register(){
        this.verify();
        if(this.errors.length >  0) return;
        this.contact = await ContactModel.create(this.body);
    }

    verify(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email))this.errors.push('E-mail inválido');
        if(!this.body.nome) this.errors.push('Nome é um campo obrigátorio');
        if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser registrado');
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        };

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }

    static async buscaPorId(id){
        if (typeof id !== 'string') {
            return;
        }
        const user = await ContactModel.findById(id);
        return user;
    }


    static async listar(){
        const lista = await ContactModel.find()
            .sort({criadoEm: -1});
        return lista;
    }

    async edit(id){
        if(typeof id !== 'string')return;
        this.verify();
        if(this.errors.length > 0) return;
        await ContactModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    static async delete(id){
        if(typeof id !== 'string')return;
       const contato = await ContactModel.findByIdAndDelete(id);
       return contato;
    }
}

module.exports = Contact;
