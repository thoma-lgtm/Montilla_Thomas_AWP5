const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie')
const moneySelect = document.getElementById('money');

let ticketPrice = +movieSelect.value;
let currentCurrency = moneySelect.value; //Marca como base el dolar al momento de cambiar
let exchangeRate = 1;

populateUI();

//
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Actualizador de precios?
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    const convertedTotal = (selectedSeatsCount * ticketPrice * exchangeRate).toFixed(2);

    count.innerText = selectedSeatsCount;
    total.innerText = `${convertedTotal} ${currentCurrency}`;
}
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map (seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    const convertedTotal = (selectedSeatsCount * ticketPrice * exchangeRate).toFixed(2);

    count.innerText = selectedSeatsCount;
    total.innerText = `${convertedTotal} ${currentCurrency}`;
}

//populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(( seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');      
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = +movieSelect.value;
    }

     const selectedCurrency = localStorage.getItem('selectedCurrency');

    if (selectedCurrency) {
        moneySelect.value = selectedCurrency;
        currentCurrency = selectedCurrency;
    }
}

//selector de pelicula
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//clickear un asiento
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//moneyyyy 🤑

function getExchangeRate() {
    currentCurrency = moneySelect.value;

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(res => res.json())
        .then(data => {
            if (!data.rates[currentCurrency]) {
                console.error('Moneda no disponible');
                return;
            }

            exchangeRate = data.rates[currentCurrency];

            localStorage.setItem('selectedCurrency', currentCurrency);

            updateSelectedCount();
        })
        .catch(error => {
            console.error(error);
        });
}

moneySelect.addEventListener(
    'change',
    getExchangeRate
);



//Total set
getExchangeRate();