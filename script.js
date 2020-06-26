const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value 

//Save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')


    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)) 

   
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem(`selectedSeats`))
    
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}


//Movie selected event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

//Seat click event
container.addEventListener('click', e => {
 
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected')
        
        updateSelectedCount()
    }
})

//Initial count and total set  
updateSelectedCount() 

/*
Notes:

+ before a string transforms it into a number

... spread operator

map is similar to foreach but returns an array

localStorage lets us store strings in the browser and retrieve it

JSON.stringfy() Wraps an array into a string 

e.target is the element clicked on

classList.contains check the existence of the classes

*/