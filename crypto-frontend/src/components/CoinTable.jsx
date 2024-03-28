import { useState } from "react";
import { LineChart, Line, Tooltip, YAxis } from 'recharts';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CoinTable = ({ searchQuery }) => {
    const [activeStates, setActiveStates] = useState({});

    const handleSort = (e) => {
        const column = e.target.innerText.toLowerCase();
        const sortedCoins = [...coinsData].sort((a, b) => {
            if (column === 'name') {
                return a[column].localeCompare(b[column]);
            } else {
                return b[column] - a[column];
            }
        });
        setCoins(sortedCoins);
    }

    const { isFetching, error, data } = useQuery({
        queryKey: ['coins'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/coins');
            console.log(data);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    if (isFetching) return <h1>Loading...</h1>;

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-fit">
                <table className="border text-center">
                    <thead className="bg-gray-500 border">
                        <tr>
                            <th><IoIosStarOutline /></th>
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
                        { data && data.filter(coin => coin.name.toLowerCase().includes(searchQuery.toLowerCase())).map((coin) => {
                            const priceIncrease = coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] > coin.sparkline_in_7d.price[0];
                            const isActive = activeStates[coin.id];
                            
                            return (
                                <tr key={coin.id}>
                                    <td onClick={() => setActiveStates({ ...activeStates, [coin.id]: !isActive })}>
                                        {isActive ? <IoMdStar className="text-yellow-500" /> : <IoIosStarOutline />}
                                    </td>
                                    <td>{coin.market_cap_rank}</td>
                                    <td className="underline hover:text-blue-500">
                                        <Link to={coin.id}><img className='h-6 align-middle' src={coin.image} alt={coin.name} />{coin.name}</Link>
                                    </td>
                                    <td className="">${(coin.current_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
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
