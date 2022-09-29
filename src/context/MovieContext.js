import { createContext, useReducer } from "react";

//creating a new context
export const MoviesContext = createContext()

//reducer function that gets passed into new useReducer
export const moviesReducer = (state, action) => {
    console.log(state)
    switch(action.type){
        case 'SET_MOVIES':
            return{
                ...state.categories,
                movies: action.payload
            }
        case 'CREATE_MOVIE':
            return{
                ...state.categories,
                movies: [action.payload, ...state.movies]
            }
        case 'DELETE_MOVIE': 
        return {
           ...state.categories,
           movies: state.movies.filter(m => m._id !== action.payload._id)
        }
        case 'SET_CATEGORIES':
            return{
                ...state.movies,
                categories: action.payload
            }
        default: 
        return state
    }
}
//creating movie context provider
export const MoviesContextProvider = ( {children} ) => {
    //creating new useReducer here
    const [state, dispatch] = useReducer(moviesReducer, {
        movies: null,
        categories: null
    })

    //passing useReducer as props to everything inside our provider
    return (
        <MoviesContext.Provider value={{...state, dispatch}}>
            { children }
        </MoviesContext.Provider>
    )
}