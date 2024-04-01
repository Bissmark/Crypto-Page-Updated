import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Dashboard = ({ user }) => {
    const [coinsData, setCoinsData] = useState([]);
    const [userFavouriteCoins, setUserFavouriteCoins] = useState([]);

    const { isFetching, error, data } = useQuery({
        queryKey: ['coins'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/coins');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    useEffect(() => {
        if (data) {
            setCoinsData(data);
            if (user && user.favourites) {
                const favouriteCoins = data.filter(coin => user.favourites.includes(coin.name));
                setUserFavouriteCoins(favouriteCoins);
            }
        }
        console.log(data)
    }, [data, user]);

    if (isFetching) return <h1>Loading...</h1>;

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-3xl mr-2 text-blue-500 mb-2">{user.name}'s Portfolio</h1>
            <p className="text-blue-500 mb-5">Email: <span className="text-white">{user.email}</span></p>
            <div className="text-white bg-gray-700 rounded-lg p-4 mt-4">
                <p>Total Initial Investment: </p>
                <p>Total Current Investment: </p>
                <p>Total Gain / Loss: </p>
                <p>Percentage Gain / Loss: </p>
            </div>
            <div className="flex items-center gap-4 mt-6 max-w-fit mb-10">
                {userFavouriteCoins.map(coin => (
                    <div key={coin.id} className="text-white bg-gray-700 rounded-lg p-4 leading-8">
                        <div className="flex items-center">
                            <h1 className="text-blue-500 mr-2">Name: <span className="text-white">{coin.name}</span></h1>
                            <img className="h-6 mr-2" src={ coin.image} alt={ coin.name } />
                        </div>
                        <p className="text-blue-500">Market Cap: <span className="text-white">${coin.market_cap.toLocaleString()}</span></p>
                        <p className="text-blue-500">Current Price: <span className="text-white">{coin.current_price}</span></p>
                        <div className="flex">
                                <p className="text-blue-500 mr-2">24hr change:</p> 
                                <p className={coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
                                    { coin.price_change_percentage_24h.toFixed(2) }%
                                </p>
                            </div>
                        <p className="text-blue-500">Total Volume: <span className="text-white">${coin.total_volume.toLocaleString()}</span></p>
                        <p className="text-blue-500">Initial Investment: <span className="text-white"></span></p>
                        <p className="text-blue-500">Current Investment: <span className="text-white"></span></p>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />                        
                    <div className="flex justify-evenly">
                            <button className="bg-blue-500 text-white rounded-lg p-2 mt-2">Submit</button>
                            <button className="bg-red-500 text-white rounded-lg p-2 mt-2">Delete Coin</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
