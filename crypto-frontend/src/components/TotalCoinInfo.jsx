import { useState, useEffect } from "react"

const TotalCoinInfo = () => {
    const [coins, setCoins] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/global');
            const data = await response.json();
            console.log(data);
            setCoins(data);
            setLoading(false);
        }
        fetchCoins();
    });

    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            <ul>
                <li>Amount of Coins: <span>{coins.data.active_cryptocurrencies}</span></li>
                <li>Total Market Cap: <span>${coins.data.total_market_cap.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></li>
                <li>Total 24hr Volume: <span>{coins.data.total_volume.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></li>
            </ul>
        </div>
    )
}

export default TotalCoinInfo