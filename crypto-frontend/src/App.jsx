import { useState, useEffect } from 'react'
import { getUser } from './services/users-service';
import CoinTable from './components/CoinTable';
import Navbar from './components/Navbar';
import CoinPage from './components/CoinPage';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import { Routes, Route } from 'react-router-dom'
import { getUserFavourites } from './services/users-api';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { GoogleOAuthProvider} from '@react-oauth/google'
import './App.css'

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState(getUser());
    const [searchQuery, setSearchQuery] = useState('');
    const [userFavouriteCoins, setUserFavouriteCoins] = useState([]);

    const fetchUserFavourites = async () => {
        try {
            const favorites = await getUserFavourites(user._id);
            setUserFavouriteCoins(favorites);
            return favorites;
        } catch (error) {
            console.error("Error fetching user favorites:", error);
            return [];
        }
    };

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            { user ?
                    <QueryClientProvider client={queryClient}>
                        <Navbar setSearchQuery={setSearchQuery} user={user} setUser={setUser}/>
                        <div className=''>
                            <Routes>
                                <Route path='/' element={<CoinTable searchQuery={searchQuery} setUser={setUser} user={user} userFavouriteCoins={userFavouriteCoins} setUserFavouriteCoins={setUserFavouriteCoins} fetchUserFavourites={fetchUserFavourites} />} />
                                <Route path='/:coinName' element={<CoinPage />}/>
                                <Route path='/dashboard' element={<Dashboard user={user} fetchUserFavourites={fetchUserFavourites} userFavouriteCoins={userFavouriteCoins} setUserFavouriteCoins={setUserFavouriteCoins} />} />
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
