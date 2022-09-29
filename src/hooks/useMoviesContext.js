import { MoviesContext} from '../context/MovieContext'
import {useContext} from 'react'

//opting here to make a function for using movieContext instead of useContext, self explanitory
export function useMoviesContext(){
    const context = useContext(MoviesContext)
    if(!context){
        throw Error('useMoviesContext must be used inside a MoviesContextProvider')
    }
    return context
}