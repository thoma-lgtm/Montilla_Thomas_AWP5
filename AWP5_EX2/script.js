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

    fetch(`https://v6.exchangerate-api.com/v6/9711be5a77600ddbe4da450b/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Lista de eventos
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

calculate();