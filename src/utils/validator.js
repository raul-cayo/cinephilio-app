import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function signupValidator(data){
    let errors = {};

    if(Validator.isEmpty(data.username)){
        errors.username = 'Nombre de Usuario faltante.';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Correo Electrónico faltante.';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Correo Electrónico inválido.';
    }

    if(Validator.isEmpty(data.birthdate)){
        errors.birthdate = 'Fecha de Nacimiento faltante.';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Contraseña faltante.';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function loginValidator(data){
    let errors = {};

    if(Validator.isEmpty(data.email)){
        errors.email = 'Correo Electrónico faltante.';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Correo Electrónico inválido.';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Contraseña faltante.';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}