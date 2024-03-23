import { useState } from "react";
import { LineChart, Line, Tooltip, YAxis } from 'recharts';

const CoinTable = ({ coins }) => {

    const handleSort = (e) => {
        const column = e.target.innerText.toLowerCase();
        const sortedCoins = [...coins].sort((a, b) => {
            if (column === 'name') {
                return a[column].localeCompare(b[column]);
            } else {
                return b[column] - a[column];
            }
        });
        setCoins(sortedCoins);
    }

    const CoinPricingCharts = coins.map((coin) => {
        const coinPricingData = coin.sparkline_in_7d.price.map(value => ({ "price": value.toFixed(5) }));
        return (
            <td key={coin.id}>
                <LineChart width={300} height={100} data={coinPricingData}>
                    <Line type="natural" dataKey="price" stroke="#82ca9d" dot={false} />
                    <Tooltip cursor={false} wrapperStyle={{ outline: 'none' }} />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart>
            </td>
        );
    });

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-screen-lg">
                <h1>Coins</h1>
                <table className="border text-center">
                    <thead className="bg-gray-500 border">
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24hr</th>
                            <th>Volume</th>
                            <th>Market Cap</th>
                            <th>Last 7 Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => {
                            const priceIncrease = coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] > coin.sparkline_in_7d.price[0];
                            return (
                            <tr key={coin.id}>
                                <td>{coin.market_cap_rank}</td>
                                <td className="underline hover:text-blue-500">
                                    <img className='h-6 mr-2 align-middle' src={coin.image} alt={coin.name} />{coin.name}
                                </td>
                                <td className="">${(coin.current_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="" style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className="">${coin.total_volume.toLocaleString()}</td>
                                <td className="">${coin.market_cap.toLocaleString()}</td>
                                <td className="">
                                    <LineChart width={300} height={100} data={coin.sparkline_in_7d.price.map(value => ({ "price": value.toFixed(5) }))}>
                                        <Line type="natural" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                                        <Tooltip cursor={false} wrapperStyle={{ outline: 'none' }} />
                                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                    </LineChart>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoinTable;
