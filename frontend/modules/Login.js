import e from "connect-flash";
import { query } from "express";

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init(){
        this.events();
    }

    events(){
        if(!this.form)return;
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault();
            alert('form não enviado');
        });
    }
}