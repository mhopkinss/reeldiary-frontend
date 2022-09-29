import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import '../index.css'

//importing workout context here
import {useMoviesContext} from '../hooks/useMoviesContext'
import {useAuthContext} from '../hooks/useAuthContext'

function Movies() {
    const {movies, dispatch} = useMoviesContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/movies', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_MOVIES', payload: json})
            }
        }

        if(user){
            fetchMovies()
        }
    }, [user, dispatch])

    return (
        <div className='home'>
            <div>
                <h1>Trending Now</h1>
                <br></br>
                <div className='most'>
                    <h2>Pulp Fiction</h2>
                </div>
            </div>
            <div className='movies'>
                <h1>Saved Movies</h1>
                <br></br>
                <div className='bottom'>
                {movies && movies.map(movie => {
                   return <Link to={`/movies/${movie._id}`}> <div className='movie-card' style={{backgroundPosition:'center', backgroundSize: 'cover', backgroundImage: `url(${movie.url})`}}>
                    <h1>{movie.title}</h1>
                   </div>
                   </Link>
                })}
                </div>
            </div>
        </div>
    );
}

export default Movies;