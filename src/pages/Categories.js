import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext'


//importing workout context here
import {useMoviesContext} from '../hooks/useMoviesContext'

function Categories() {
    const {categories, dispatch} = useMoviesContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://reeldiary.herokuapp.com/categories', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_CATEGORIES', payload: json})
            }
        }

        if(user){
            fetchCategories()
        }
    }, [user, dispatch])

    return (
        <div className='cat-home'>
            <div className='categories'>
                {categories && categories.map(category => {
                   return <Link to={`/categories/${category.genre}`}><h1 className='cat'>{category.genre}</h1></Link>
                })}
            </div>
        </div>
    );
}

export default Categories;