import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    async function handleSubmit(e){
        e.preventDefault()

        await signup(email, password)
    }
    return (
        <div className='login-container'>
        <form className='login' onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div>{error}</div>}
        </form>
        </div>
    );
}

export default Signup;