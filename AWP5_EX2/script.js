const currencyEl_one = document.getElementById
('currency-one');
const amountEl_two = document.getElementById
('amount-two');
const currencyEl_two = document.getElementById
('currency-two');
const amountEl_two = document.getElementById
('amount-two');

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

//Cambio de moneda extanjera?
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch (` https://v6.exchangerate-api.com/v6/9711be5a77600ddbe4da450b/latest/USD${currency_one}`)
    .then(res => res.json())
    .then(data => {
        //Console.log(data)
        const rate = data.rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currencyEl_two}`;

    });
}

// Lista de eventos
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

calculate();