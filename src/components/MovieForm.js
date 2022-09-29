import React, { useState } from 'react';
import {useMoviesContext} from '../hooks/useMoviesContext';
import {useAuthContext} from '../hooks/useAuthContext'
import StarRating from './StarRating';


function MovieForm() {
    //destructuring dispatch from context import (with reducer)
    const {dispatch} = useMoviesContext()

    const {user} = useAuthContext()

    //model state
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [year, setYear] = useState('')
    const [directedBy, setDirectedBy] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [castList, setCastList] = useState('')
    const [rated, setRated] = useState('')
    const [rottenTomatoes, setRottenTomatoes] = useState('')
    const [runtime, setRuntime] = useState('')
    const [imdbRating, setImdbRating] = useState('')
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    
    const [movieTitle, setMovieTitle] = useState('')

    //error state
    const [error, setError] = useState('')

    //async function for getting movie (search for movie)
    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            return
        }
        const replaceSpaces = movieTitle.replaceAll(' ', '+')
        const response = await fetch(`/movies/getMovie/${replaceSpaces}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            if(json.Error){
                return setError(json.Error)
            }
            console.log(json)
            setError('')
            setTitle(json.Title)
            setUrl(json.Poster)
            setYear(json.Year)
            setDirectedBy(json.Director)
            setDescription(json.Plot)
            let getGenre = json.Genre.split(', ')
            let getSingleGenre = getGenre[0]
            setGenre(getSingleGenre)
            setCastList(json.Actors)
            setRated(json.Rated)
            setRottenTomatoes(json.Ratings[1].Value)
            setImdbRating(json.imdbRating)
            setRuntime(json.Runtime)
        }
    }

    //async function for creating a movie
    const createNewMovie = async () => {
        const movie = {title, url, year, directedBy, description, genre, castList, rated, rottenTomatoes, runtime, imdbRating, rating}

        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/movies/create', {
        method: 'POST', 
        body: JSON.stringify(movie),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
        }})

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
            
        if(response.ok){
            handleCancel()
            setError(null)
            dispatch({type: 'CREATE_MOVIE', payload: json})
        }
    }

    //for resetting state if cancel button is pressed
    const handleCancel = () => {
        setMovieTitle('')
        setTitle('')
        setUrl('')
        setYear('')
        setDirectedBy('')
        setDescription('')
        setGenre('')
        setCastList('')
        setRated('')
        setRottenTomatoes('')
        setRuntime('')
        setImdbRating('')
        setRating(0)
        setHover(0)
    }

    return (
        <div className='form-container'>
            {title === '' && <form onSubmit={handleSearchSubmit} className='formm'>
            <label>Search for a movie</label>
                <input
                type='text'
                value={movieTitle}
                onChange={e => setMovieTitle(e.target.value)}>
                </input>
                <button>Search</button>
            </form>}
            {title && <div className='info-container'>
                <div className='top'>
                    <div className='search-movie-image' style={{backgroundPosition:'center', backgroundSize: 'cover', backgroundImage: `url(${url})`}}>
                        <h1>{title}</h1>
                    </div>
                    <div className='info-bottom'>
                        <h2><u>Cast</u><br></br> {castList}</h2>
                        <h2><u>Plot</u><br></br> {description}</h2>
                        <h2><u>Duration</u><br></br> {runtime}</h2>
                        <h2><u>Rated</u><br></br> {rated}</h2>
                        <h2><u>Year</u><br></br> {year}</h2>
                        <h2><u>Genre</u><br></br> {genre}</h2>
                        <h2><u>Rotten Tomatoes</u><br></br>{rottenTomatoes}</h2>
                        <h2><u>IMDB Rating</u><br></br> {imdbRating}</h2>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='buttons-one'>
                    <StarRating setRate={setRating} setHove={setHover} rate={rating}/>
                    </div>
                    <div className='buttons-two'>
                    <button onClick={createNewMovie}>Add Movie</button>
                    <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>}
            {error && <div><h1>{error}</h1></div>}
        </div>
    );
}
export default MovieForm;