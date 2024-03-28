import { useState, useEffect } from "react";
import { LineChart, Line, Tooltip, YAxis } from 'recharts';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Convert the string to a number by parsing it
    const value = parseFloat(payload[0].value);

    // Check if parsing was successful
    if (!isNaN(value)) {
      // Format the number with fixed decimal places and locale string
      const formattedValue = value.toFixed(2).toLocaleString();
      return (
        <div className="custom-tooltip">
          <p className="label">${formattedValue}</p>
        </div>
      );
    } else {
      // If parsing fails, use the original string
      return (
        <div className="custom-tooltip">
          <p className="label">${payload[0].value}</p>
        </div>
      );
    }
  }

  return null;
};


const CoinTable = ({ searchQuery }) => {
    const [activeStates, setActiveStates] = useState({});
    const [coinsData, setCoinsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState({
        rank: 'asc',
        name: 'asc',
        price: 'asc',
        '24hr': 'asc',
        volume: 'asc',
        marketCap: 'asc'
    });
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = coinsData.slice(indexOfFirstItem, indexOfLastItem);
    
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
        }
    }, [data]);

    const handleSort = (column) => {
        const sortOrderCopy = { ...sortOrder };

        // Toggle sort order
        sortOrderCopy[column] = sortOrderCopy[column] === 'asc' ? 'desc' : 'asc';

        const sortedHeads = [...data].sort((a, b) => {
            if (column === 'rank') {
                return sortOrderCopy[column] === 'asc' ? a.market_cap_rank - b.market_cap_rank : b.market_cap_rank - a.market_cap_rank;
            } else if (column === 'name') {
                return sortOrderCopy[column] === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (column === 'price') {
                return sortOrderCopy[column] === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price;
            } else if (column === '24hr') {
                return sortOrderCopy[column] === 'asc' ? a.price_change_percentage_24h - b.price_change_percentage_24h : b.price_change_percentage_24h - a.price_change_percentage_24h;
            } else if (column === 'volume') {
                return sortOrderCopy[column] === 'asc' ? a.total_volume - b.total_volume : b.total_volume - a.total_volume;
            } else if (column === 'marketCap') {
                return sortOrderCopy[column] === 'asc' ? a.market_cap - b.market_cap : b.market_cap - a.market_cap;
            }
        });

        setSortOrder(sortOrderCopy);
        setCoinsData(sortedHeads);
    }

    if (isFetching) return <h1>Loading...</h1>;

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-fit">
                <table className="border text-center">
                    <thead className="border">
                        <tr>
                            <th><IoIosStarOutline /></th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">Rank</span>
                                    <div onClick={() => handleSort('rank')}>
                                        {sortOrder.rank === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer"  /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">Name</span> 
                                    <div onClick={() => handleSort('name')}>
                                        {sortOrder.name === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">Price</span> 
                                    <div onClick={() => handleSort('price')}>
                                        {sortOrder.price === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">24hr</span> 
                                    <div onClick={() => handleSort('24hr')}>
                                        {sortOrder['24hr'] === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">Volume</span> 
                                    <div onClick={() => handleSort('volume')}>
                                        {sortOrder.volume === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span className="mr-3">Market Cap</span> 
                                    <div onClick={() => handleSort('marketCap')}>
                                        {sortOrder.marketCap === 'asc' ? <FaArrowUpLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" /> : <FaArrowDownLong className="opacity-0 hover:opacity-100 hover:text-blue-500 cursor-pointer" />}
                                    </div>
                                </div>
                            </th>
                            <th>
                                Last 7 Days
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { currentItems && currentItems.filter(coin => coin.name.toLowerCase().includes(searchQuery.toLowerCase())).map((coin) => {
                            const priceIncrease = coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] > coin.sparkline_in_7d.price[0];
                            const isActive = activeStates[coin.id];
                            
                            return (
                                <tr key={coin.id}>
                                    <td onClick={() => setActiveStates({ ...activeStates, [coin.id]: !isActive })}>
                                        {isActive ? <IoMdStar className="text-yellow-500" /> : <IoIosStarOutline />}
                                    </td>
                                    <td>{coin.market_cap_rank}</td>
                                    <td className="underline hover:text-blue-500 w-28">
                                        <Link to={coin.id} className="flex items-center justify-center">
                                            <img className='h-6 align-middle mr-2' src={coin.image} alt={coin.name} />
                                            <span>{coin.name}</span>
                                        </Link>
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
                                            <Tooltip content={ <CustomTooltip /> } cursor={false} wrapperStyle={{ outline: 'none' }} />
                                            <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                        </LineChart>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-end bg-gray-500 border p-2 pagination">
                    <button className={`${ currentPage === 1 ? 'opacity-0' : 'opacity-100'} hover:text-blue-500`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
                    <button className={`${ currentPage === 10 ? 'opacity-0' : 'opacity-100'} hover:text-blue-500 ml-5 mr-2`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(coinsData.length / itemsPerPage)}>Next Page</button>    
                </div> 
            </div>
        </div>
    );
};

export default CoinTable;
