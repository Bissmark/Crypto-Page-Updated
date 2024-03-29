import { useState } from 'react';
import { login } from '../services/users-service';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaGoogle } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';

export default function LoginForm({ setUser, showSignup, setShowSignup }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ 
            ...credentials, 
            [e.target.name]: e.target.value,
            error: '' 
        });
        setError('');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const user = await login(credentials);
            setUser(user);
        } catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-fit bg-gray-500 p-5 rounded-lg shadow text-center'>
                    <h1 className='my-4 text-5xl font-extrabold dark:text-white'>{showSignup ? 'Sign Up Page' : 'Login Page'}</h1>
                    {/* <Link to='http://localhost:3001/auth/google' className='hover:text-blue-500'>
                        <FaGoogle />
                    </Link> */}
                    <div className='mb-5 flex justify-center'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                <Link to='/'></Link>
                            }}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className='flex border mx-auto w-48 rounded-lg mb-6'>
                            <AiOutlineMail />
                            <input className='text-black p-2 w-40 rounded-e-lg' type="email" name="email" value={credentials.email} onChange={handleChange} required placeholder='Email'/>
                        </div>
                        <div className='flex border mx-auto w-48 rounded-lg mb-4'>
                            <RiLockPasswordLine />
                            <input className='text-black p-2 w-40 rounded-e-lg' type="password" name="password" value={credentials.password} onChange={handleChange} required placeholder='Password' />
                        </div>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit">LOG IN</button>
                    </form>
                    <p className='text-center'>If you actually want to sign up for the website, click <Link onClick={() => setShowSignup(!showSignup)} className='hover:text-blue-500'>here</Link></p>
                </div>
                <p className="error-message">{error}</p>
            </div>
        </IconContext.Provider>
    );
}