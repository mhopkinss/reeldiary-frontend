import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext'

function MoviesInCategory() {
    const {genre} = useParams();
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(null)
    const [done, setDone] = useState('')
    const {user} = useAuthContext()

    useEffect(() => {
        async function getMovies(){
                const response = await fetch(`https://reeldiary.herokuapp.com/categories/${genre}`,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if(!response.ok){
                    setError(json.error)
                }
                if(response.ok){
                    setMovies(json)
                    setDone('done')
                }
            }
            if(user){
                getMovies()
            }
        
    },[])

    if(done){
        if(movies.length == 0){
            window.location.assign('https://reeldiary.herokuapp.com/movies')
        }
    }

    return (
        <div className='bottomCat'>
            {movies && <div className='bottomTitle'><h1>{movies[0].genre}</h1></div>}
            <div className='movs'>
            {movies && movies.map(movie => {
                   return <Link to={`https://reeldiary.herokuapp.com/movies/${movie._id}`}> <div className='movie-card' style={{backgroundPosition:'center', backgroundSize: 'cover', backgroundImage: `url(${movie.url})`}}>
                    <h1>{movie.title}</h1>
                   </div>
                   </Link>
                })}
            </div>
        </div>
    );
}

export default MoviesInCategory;