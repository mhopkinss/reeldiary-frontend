import React, { useState } from 'react';
import {useLogin} from '../hooks/useLogin'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    async function handleSubmit(e){
        e.preventDefault()

        await login(email, password)
    }
    return (
        <div className='login-container'>
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <input 
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email@example.com'
            ></input>

            <input 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={`\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF`}
            ></input>

            <button disabled={isLoading}>Log in</button>
            {error && <div>{error}</div>}
        </form>
        </div>
    );
}

export default Login;