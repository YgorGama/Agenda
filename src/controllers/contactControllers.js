const { async } = require('regenerator-runtime');
const Contact = require('../models/contactModels');

exports.index = (req, res) =>{
   return res.render('contact', {contact:{}});
}

exports.register = async (req, res) =>{
   try {
      const contato = new Contact(req.body);
      await contato.register();
      if(contato.errors.length > 0){
         req.flash('errors', contato.errors);
         req.session.save( ()=>{
               res.redirect('/contact/index');
         });
         return;
      }

      req.flash('sucess', 'Contato cadastrado com sucesso');
      req.session.save( () =>{
          return res.redirect('/');
         });
      return;    
   } catch (err) {
      console.log(err);
      return res.render('404');
   }

}

exports.editIndex = async (req, res) =>{
   if(!req.params.id) return res.render('404');
   const contact = await Contact.buscaPorId(req.params.id);
   if(!contact)res.render('404');
      
   res.render('contact',{ contact});

}

exports.edit = async (req, res) =>{
   try{
      if(!req.params.id) return res.render('404');
      const contato = new Contact(req.body);
      await contato.edit(req.params.id);
      if(contato.errors.length > 0){
         req.flash('errors', contato.errors);
         req.session.save( ()=>{
               res.redirect('/contact/index');
         });
         return;
      }

      req.flash('sucess', 'Contato editado com sucesso');
      req.session.save( () =>{
          return res.redirect(`/contato/registro/${contato.contact._id}`);
         });
      return; 
   }catch(err){
      console.log(err);
      return res.render('404');
   }
}

exports.delete = async (req, res) =>{
   if(!req.params.id) return res.render('404');
   const contact = await Contact.delete(req.params.id);
   if(!contact)res.render('404');
      
   req.flash('sucess', 'Contato apagado com sucesso');
   req.session.save( () =>{
       return res.redirect('/');
      });
   return;    
}