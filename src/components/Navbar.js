import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import {useAuthContext} from '../hooks/useAuthContext'

//very simple navbar with a link
function Navbar() {
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }
    
    return (
        <header className='header'>
            <div className='app-title'><h1>ReelDiary</h1></div>
            <div className='container'>
                {user &&
                <Link to='/movies/create'>
                    <h1>Add Movie</h1>
                </Link>}
                {user &&
                <Link to='/movies'>
                    <h1>Movies</h1>
                </Link>}
                {user &&
                <Link to='/categories'>
                    <h1>Categories</h1>
                </Link>}
                {user && (<div className='user-buttons'>
                    <h4>{user.email}</h4>
                    <button onClick={handleClick}>Log out</button>
                </div>)}
                {!user && (
                <div className='conditional'>
                <Link to='/user/login'>
                    <h1>Login</h1>
                </Link>
                <Link to='/user/signup'>
                    <h1>Sign up</h1>
                </Link>
            </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;