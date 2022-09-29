import {useAuthContext} from './useAuthContext';
import { useMoviesContext } from './useMoviesContext';
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: moviesDispatch} = useMoviesContext()
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        moviesDispatch({type: 'SET_MOVIES', payload: null})
    }
    return {logout}
}