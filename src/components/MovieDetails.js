import React, { useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useMoviesContext} from '../hooks/useMoviesContext';
import {useAuthContext} from '../hooks/useAuthContext'

function MovieDetails() {
    const {dispatch} = useMoviesContext()
    const {user} = useAuthContext()
    const [movie, setMovie] = useState(null)
    const {id} = useParams();
    const [rating, setRating] = useState(0)

    useEffect(() => {
        function getStuff(){
            fetch(`https://reeldiary.herokuapp.com/movies/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(res => {
            return res.json()
            })
            .then(data => {
            setMovie(data)
            setRating(data.rating)
            })
            .catch(err => {
            console.log(err)
            })
        }
        if(user){
            getStuff()
        }
    }, [id, dispatch])

    async function handleDelete(){
        const navigate = useNavigate()
        if(!user){
            return
        }

        const response = await fetch(`https://reeldiary.herokuapp.com/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_MOVIE', payload: json})
            setMovie(null)
            navigate('/movies')
        }
    }

    return (
        <div className='whatwhat'>
        <div className='movie-details-container'>
            <div className='movie-info-container'>
                {movie &&
                <div className='photo'>
                    <img src={movie.url}></img>
                </div>}
                {movie && 
                <div className='movie-info'>
                    <h1>{movie.title} ({movie.year})</h1>
                    <span>Rated ({movie.rated}) | Duration ({movie.runtime})</span>
                    <span>Ratings: Rotten Tomatoes: {movie.rottenTomatoes} | IMDB: {movie.imdbRating}</span>
                    <h4>Director: {movie.directedBy}</h4>
                    <h3>Cast: {movie.castList}</h3>
                    <h4>{movie.description}</h4>
                </div>}
            </div>
        </div>
        <div className='bottomFeed'>
            {movie && 
            <div className="star-rating">
                <h2>Your Rating:</h2>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= rating ? "on" : "off"}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>}
            {movie && <div className='genre-button'>
                <Link to={`/categories/${movie.genre}`}><button>{movie.genre}</button></Link>
            </div>}
            <div className='genre-button'>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
    );
}

export default MovieDetails;