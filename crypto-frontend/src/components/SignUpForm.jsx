import { useState } from 'react';
import { signUp } from '../services/users-service';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { RiLockPasswordFill } from 'react-icons/ri';
import { CgRename } from 'react-icons/cg';

const SignUpForm = ({ setUser, showSignup, setShowSignup }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
            error: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signUp(userData);
            setUser(user);
        } catch {
            setError('Sign Up Failed - Try Again');
        }
    }

    const disable = userData.password !== userData.confirm;

    return (
        <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
            <div className='flex justify-center items-center'>
                <div className='w-96 bg-purple-800 pl-12 m-5 rounded-lg shadow text-center'>
                    <h1 className='mb-4'>{showSignup ? 'Sign Up Page' : 'Log In Page'}</h1>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <CgRename />
                            <input className='rounded-lg text-black' type="text" name="name" value={userData.name} onChange={handleChange} required placeholder='Username' />
                        </div>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <AiOutlineMail />
                            <input className='rounded-lg text-black' type="email" name="email" value={userData.email} onChange={handleChange} required placeholder='Email' />
                        </div>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <RiLockPasswordLine />
                            <input className='rounded-lg text-black' type="password" name="password" value={userData.password} onChange={handleChange} required placeholder='Password' />
                        </div>
                        <div className='flex border mx-auto w-48 rounded-lg mb-8'>
                            <RiLockPasswordFill />
                            <input className='rounded-lg text-black' type="password" name="confirm" value={userData.confirm} onChange={handleChange} required placeholder='Password Confirm' />
                        </div>
                        <button className='mt-8' type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                    <p>Already have an account and want to login, click <Link onClick={() => setShowSignup(!showSignup)} className='hover:text-blue-500'>here</Link></p>
                </div>
                <p className="error-message">{error}</p>
            </div>
        </IconContext.Provider>
    );
}

export default SignUpForm;