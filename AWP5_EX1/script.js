const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const edad = document.getElementById('age');

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
    }
}

function checkAge(input, min, max){
    if(input <= min && input >= max){
        showSuccess(input);
    } else{
        showSuccess(input, `${getFieldName(input)} not valid`);
    }
}

//Fin de las Funciones
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2, age]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkAge(age, 1, 1000);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
/*
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

