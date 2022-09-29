import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

//opting here to make a function for using movieContext instead of useContext, self explanitory
export function useAuthContext(){
    const context = useContext(AuthContext)
    if(!context){
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }
    return context
}