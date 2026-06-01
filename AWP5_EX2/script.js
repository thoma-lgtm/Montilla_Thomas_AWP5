const currencyEl_one = document.getElementById('currency_one');
const amountEl_one = document.getElementById('amount_one');

const currencyEl_two = document.getElementById('currency_two');
const amountEl_two = document.getElementById('amount_two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Cambio de moneda extranjera
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

// Missatge d'espera
    rateEl.innerText = 'Carregant tipus de canvi...';

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
        .catch(error => {
            console.error(error);
            rateEl.innerText = 'Error en obtenir les dades'; //Como pruebo si esto funciona¿
        });
}

// Lista de eventos
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

//activar eventos
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
});

calculate();