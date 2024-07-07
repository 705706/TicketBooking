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
        id: 1   ,
        title: "Munjya",
        image: "https://th.bing.com/th/id/OIP.g2d3nTNwcA4gwrpYQFVOWAHaLH?rs=1&pid=ImgDetMain",
        gener: "Comedy/Horror",
    },
    {
        id: 2,
        title: "Kalki",
        image: "https://images.vcinema.com/attachments/00350f30-b11c-11ee-a079-0a5d32a9e154-untitled-1-2.jpg",
        gener: "Action/Sci-Fi/Thriller",
    },
    {
        id: 3,
        title: "Furosia",
        image: "https://th.bing.com/th/id/OIP.gEGRlPxExCIK2FVZG-3BQwHaK-?rs=1&pid=ImgDetMain",
        gener: "Action/Thriller",
    },
    {
        id: 4,
        title: "Inside Out 2",
        image: "https://media.wdwnt.com/2023/11/Inside-Out-2-poster.jpg",
        gener: "Drama/Comedy",
    },
    {
        id: 5,
        title: "Chandu Champion",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklWab2CIdBahXiMR-k40CbYqlK9DeqetPJA&s",
        gener: "Biography/Sports",
    },
    {
        id: 6,
        title: "Decpicable Me 4",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VcoH7lCbTj1uxRjs7UgF44EiHJhVR_szSw&s",
        gener: "Comedy/Drama",
    },
    {
        id: 7,
        title: "A Quiet Place Day One",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8PhVR1_LaYechw3qz2zv-Z_GTh4ioMiumA&s",
        gener: "Thriller/Horror",
    },
    {
        id: 8,
        title: "Alyad Palyad",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6ZjYc2kRQ6QB1s0RLqSXX7eI2Wu5cF6B-g&s",
        gener: "Thriller/Horror",
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


        
        <h2 className='title'>Recommended Movies</h2>
        <div className='movie-selection'>
            {
                MOVIES.map((movie) => (
                    <div className='movie' key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        <img className='movie-poster' src={movie.image} alt={movie.title} />
                        <div className='movie-title'>{movie.title}</div>
                        <p className='movie-gener'>{movie.gener}</p>
                        </div>
                ))
            }
        </div>
      {
        selectedMovie && (
            <>
            <h2 className='title'>Select Screen</h2>
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
        Pay Now
    </button>
    </div>
  );
}