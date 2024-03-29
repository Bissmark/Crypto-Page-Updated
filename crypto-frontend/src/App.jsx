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
import './App.css'

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState(getUser());
    const [searchQuery, setSearchQuery] = useState('');

    // const generateSignature = (apiKey, nonce) => {
    //     const message = `nonce=${nonce}`;
    //     const secret = apiKey; // Replace with your actual secret key
    //     const signature = CryptoJS.HmacSHA512(message, secret).toString(CryptoJS.enc.Hex);
    //     return signature;
    // };

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiKey = import.meta.env.VITE_COINSPOT_API_KEY;
//       const apiSecret = import.meta.env.VITE_COINSPOT_SECRET_KEY;
//       const baseUrl = 'https://www.coinspot.com.au/api/v2/ro';
//       const endpoint = '/my/balances';
//       const signature = generateSignature(apiKey, Date.now());

//       const headers = {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'key': apiKey,
//         'sign': signature,
//         'nonce': Date.now(),
//       };

//       try {
//         const response = await fetch(baseUrl + endpoint, {
//           method: 'POST',
//           headers: headers,
//             body: new URLSearchParams({
//                 'nonce': Date.now()
//             })
//         });
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setBalances(data); // Update state with fetched data
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className='bg-gray-900 text-white max-h-full h-full'>
        { user ?
            <QueryClientProvider client={queryClient}>
                <Navbar setSearchQuery={setSearchQuery} user={user} setUser={setUser} />
                <Routes>
                    <Route path='/' element={<CoinTable searchQuery={searchQuery} />} />
                    <Route path='/:coinName' element={<CoinPage />}/>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </QueryClientProvider>
            :
            <AuthPage setUser={setUser} />
        }
    </div>
  )
}

export default App
