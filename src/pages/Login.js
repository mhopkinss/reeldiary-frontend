import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useLogin} from '../hooks/useLogin';
import {useGuestLogin} from "../hooks/useGuestLogin"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const {guestLogin, errorGuest, isLoadingGuest} = useGuestLogin()

    async function handleSubmit(e){
        e.preventDefault()

        await login(email, password)
    }
    async function handleGuest(e){
        e.preventDefault()

        await guestLogin('guest@guest.com','Guest123!')
    }
    return (
        <div className='login-container'>
            <div className='login-modal'>
                <div className='form-header'>
                    <h1>Sign In <svg className='svg-book' xmlns="http://www.w3.org/2000/svg" width='40px' height='40px' fill='white' viewBox="0 0 448 512"><path d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z"/></svg></h1>
                    <span>New here? <Link to='/user/signup' style={{color: '#EC6A37'}}>Create an account!</Link></span>
                </div>
                <form className='login' onSubmit={handleSubmit}>
                    <input 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email Address'
                    ></input>

                    <input 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder={'Password'}
                    ></input>

                    <button disabled={isLoading}>Sign In</button>
                    {error && <div>{error}</div>}
                </form>
                <div className='login'>
                    <button onClick={handleGuest}>Guest Account</button>
                </div>
            </div>
        </div>
    );
}

export default Login;