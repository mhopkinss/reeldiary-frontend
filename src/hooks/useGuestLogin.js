import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGuestLogin = () => {
    const [errorGuest, setErrorGuest] = useState(null)
    const [isLoadingGuest, setIsLoadingGuest] = useState(null)
    const {dispatch} = useAuthContext()

    const guestLogin = async (email, password) => {
        setIsLoadingGuest(true)
        setErrorGuest(null)

        const response = await fetch('https://reeldiary.herokuapp.com/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoadingGuest(false)
            setErrorGuest(json.error)
        }
        if(response.ok){
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoadingGuest(false)
        }

    }
    return {guestLogin, isLoadingGuest, errorGuest}
}