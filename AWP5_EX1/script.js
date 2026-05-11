const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');

//Inicio de las funciones
//Linea de error (Solo cambia el color)
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Linea de Exito (solo cambia color)
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Verificador de email
function checkEmail(input){
const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//Verificador de celdas
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    });
}

//Mach de las contraseñas
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input2);
    }
}

//Para poner el nombre en el mansaje de error
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Varificador de Longitud
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be at less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}

function checkAge(input, min, max){
    const value = parseInt(input.value.trim()); //esto es necesario para pasar el texto a un numero entero,

    if(isNaN(value)){ //tambien es necesario para que marque error si no una letra dara success
        showError(input, 'Age must be a number');
    } else if(value < min || value > max){
        showError(input, `${getFieldName(input)} not valid`);
    } else {
        showSuccess(input);
    }
}

//validar caracteres de contraseña
//https://www.youtube.com/watch?v=2vP9pTSFp3A
function validarPassword(input){
    const longitudMinima = /^.{8,}$/;
    const tieneMayuscila = /[A-Z]/;
    const tieneMinuscula = /[a-z]/;
    const tieneNumero = /\d/;
    const tieneEspecial = /[`~!@#$%^&*()_+\-={}\[\]|\\:";'<>?,./]/; //Se ponen barritas para evitar problemas con los corchos []

    if(!longitudMinima.test(input)){
        showError(input, `The password must be at least 8 characters.`)
    }
    if(!tieneMayuscila.test(input)){
        showError(input, `The password must contain at least one uppercase letter.`)
    }
    if(!tieneMinuscula.test(input)){
        showError(input, `The password must contain at least one lowercase letter`)
    }
    if(!tieneNumero.test(input)){
        showError(input, `The password must contain at least one number`)
    }
    if(!tieneEspecial.test(input)){
        showError(input, `The password must contain at least one special character`)
    } else{
        showSuccess(input);
    }
}

//Fin de las Funciones
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2, age]);
    checkLength(username, 3, 15);
    validarPassword(password);
    checkAge(age, 1, 1000);
    checkEmail(email);
    checkPasswordsMatch(password, password2); //si no se pone nada en las contraseñas, y se presina el boton submit
/*                                              //la segunda contraseña se marcara como completa
    if(username.value.trim() === '') {
        showError(username,'El nombre de usuario es requerido');
    } else {
        showSuccess(username);
    }
    if(email.value.trim() === '') {
        showError(email,'Un email es requerido');
    } else if(!isValidEmail(email.value)){
        showError(email,'El email no es valido');
    } else {
        showSuccess(email);
    }
        if(password.value.trim() === '') {
        showError(password,'Ingrese una Contraseña');
    } else {
        showSuccess(password);
    }
            if(password2.value.trim() === '') {
        showError(password2,'Ingrese una Contraseña');
    } else {
        showSuccess(password2);
    }
*/
});

