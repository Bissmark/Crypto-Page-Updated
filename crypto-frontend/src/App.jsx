import { useState, useEffect } from 'react'
import { getUser } from './services/users-service';
import CoinTable from './components/CoinTable';
import Navbar from './components/Navbar';
import CoinPage from './components/CoinPage';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import { Routes, Route } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { GoogleOAuthProvider} from '@react-oauth/google'
import './App.css'

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState(getUser());
    const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='bg-gray-900 text-white'>
        { user ?
                <QueryClientProvider client={queryClient}>
                    <Navbar setSearchQuery={setSearchQuery} user={user} setUser={setUser} />
                    <div className=''>
                        <Routes>
                            <Route path='/' element={<CoinTable searchQuery={searchQuery} />} />
                            <Route path='/:coinName' element={<CoinPage />}/>
                            <Route path='/dashboard' element={<Dashboard />} />
                        </Routes>
                    </div>
                </QueryClientProvider>
            :
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <AuthPage setUser={setUser} />
            </GoogleOAuthProvider>
        }
    </div>
  )
}

export default App
