const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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
function isValidEmail(email){
const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

//Fin de las Funciones
form.addEventListener('submit', function(e){
    e.preventDefault();
    
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
});

