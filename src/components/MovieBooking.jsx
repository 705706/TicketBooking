import React, { useState } from 'react'


let SCREENS = [
    {
        id: 1,
        time: "10.00am",
         seats: Array(30).fill(1),
    },
    {
        id: 2,
        time: "2.00pm",
         seats: Array(30).fill(1),
    },
    {
        id: 3,
        time: "8.00pm",
         seats: Array(30).fill(1),
    },
];

const MOVIES = [
    {
        id: 1,
        title: "Munjya 2024",
        image: "https://th.bing.com/th/id/OIP.g2d3nTNwcA4gwrpYQFVOWAHaLH?rs=1&pid=ImgDetMain",
    },
    {
        id: 2,
        title: "Kalki 2024",
        image: "https://images.vcinema.com/attachments/00350f30-b11c-11ee-a079-0a5d32a9e154-untitled-1-2.jpg",
    },
    {
        id: 3,
        title: "Furosia 2024",
        image: "https://th.bing.com/th/id/OIP.gEGRlPxExCIK2FVZG-3BQwHaK-?rs=1&pid=ImgDetMain",
    },
    {
        id: 4,
        title: "Inside Out 2 2024",
        image: "https://media.wdwnt.com/2023/11/Inside-Out-2-poster.jpg",
    },
];


  


export default function MovieBooking() {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect = (index, screen) => {
        if(screen?.id !== selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return
        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i) => i !== index));
            if(selectedSeats.filter((i) => i !== index).length < 1){
                setSelectedScreen(null)
            }
        }
        else {
           setSelectedSeats((seats) => [...seats, index])
        }
    }

    

    const handleBooking = () => {
        alert(`Seats ${selectedSeats.map((index) => index+1).join(",")}  booked for ${selectedScreen.movie.title} at ${selectedScreen.time}`)
        SCREENS = SCREENS.map(screen => {
            if(screen.id === selectedScreen?.id){
                let seats = screen.seats;
                selectedSeats.map((seat) => (seats[seat] = 0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen
        })
        setSelectedMovie(null)
        setSelectedScreen(null)
        setSelectedSeats([])
    }


  return (
    <div>
    <header> <h1>Movie Booking App</h1></header>
        
        <h2>Current Shows</h2>
        <div className='movie-selection'>
            {
                MOVIES.map((movie) => (
                    <div className='movie' key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        <img className='movie-poster' src={movie.image} alt={movie.title} />
                        <div className='movie-title'>{movie.title}</div>
                        </div>
                ))
            }
        </div>
      {
        selectedMovie && (
            <>
            <h2>Select Screen</h2>
            <div className='screen-selection'>
                { 
                    SCREENS.map((screen) => {
                        return (
                            <div
                            key={screen.id}
                            className={`screen ${
                                screen?.id === selectedScreen?.id ? "selected" : ""
                            } ${screen.seats.includes(1) ? "available" : ""} `}>
                              <div className='screen-number'>Screen {screen.id}</div>
                               <div className='screen-time'>{screen.time}</div>
                               <div className='movie-title'>{selectedMovie.title}</div>
                               <div className='screen-seats'> 
                                {screen.seats.map((seat, index) => {
                                        return (
                                            <div 
                                            key={index} 
                                            className={`seat ${
                                                seat ? "available": 'unavailable'
                                            } ${selectedSeats.includes(index) && selectedScreen?.id === screen.id ? 'selected' : '' }
                                            ${selectedSeats.includes(index) ? "booked" : ''}
                                            `}
                                            onClick={() => {
                                              if(seat){
                                                handleSeatSelect(index, {
                                                    ...screen,
                                                    movie: selectedMovie
                                                })
                                              }
                                            }}  
                                            >
                                                <div className='seat-number'>{index + 1}</div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                
                        );
                    })}
            </div>
            </>
        )}
<div className="booking-summary">
    <div className="selected-screen">
     {
        selectedScreen  && (
            <div>
                <h3>Selected Screen: {selectedScreen.id}</h3>
                <p>Time: {selectedScreen.time}</p>
                <p>Movie: {selectedScreen.movie.title}</p>
            </div>
        )
     }
    </div>
    <div className='selected-seat'>
        {
            selectedScreen && selectedSeats?.length > 0 && (
                <div>
                    <h3>Selected Seats: <>{selectedSeats.map(index => index+1).join(",")}</></h3>
                    <h3>No of tickets: {selectedSeats?.length}</h3>
                 </div>   
            )
        }
    </div>
    </div>
    <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>
        Book now
    </button>
    </div>
  );
}