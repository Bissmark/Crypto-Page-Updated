import { useState } from 'react';
import { login } from '../services/users-service';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

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
            <div className='flex justify-center items-center'>
                <div className='w-96 bg-purple-800 pl-12 m-5 rounded-lg shadow text-center'>
                    <h1 className='mb-4'>{showSignup ? 'Sign Up Page' : 'Login Page'}</h1>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <AiOutlineMail />
                            <input type="email" name="email" value={credentials.email} onChange={handleChange} required placeholder='Email'/>
                        </div>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <RiLockPasswordLine />
                            <input type="password" name="password" value={credentials.password} onChange={handleChange} required placeholder='Password' />
                        </div>
                        <button className='mt-8' type="submit">LOG IN</button>
                    </form>
                    <p>If you actually want to sign up for the website, click <Link onClick={() => setShowSignup(!showSignup)} className='hover:text-blue-500'>here</Link></p>
                </div>
                <p className="error-message">{error}</p>
            </div>
        </IconContext.Provider>
    );
}