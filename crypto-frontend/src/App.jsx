import { useState, useEffect } from 'react'
import CoinTable from './components/CoinTable';
import Navbar from './components/Navbar';
import CoinPage from './components/CoinPage';
import * as coinAPI from './services/coins-api'
import { Routes, Route } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import './App.css'

function App() {
    const [coins, setCoins] = useState([]);

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

    const handleCreateCoin = async (coinData) => {
        const newcoin = await coinAPI.createCoin(coinData);
        setCoins([...coins, newcoin]);
    }

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true');
            const data = await response.json();
            setCoins(data);
            console.log(data);
        };
        fetchCoins();
    }, []);

  return (
    <div className='bg-gray-900 text-white'>
        <h1>coins</h1>
        <Navbar />
        <Routes>
            <Route path='/' element={<CoinTable coins={coins} />} />
            <Route path='/:coinName' element={<CoinPage />}/>
        </Routes>
    </div>
  )
}

export default App
