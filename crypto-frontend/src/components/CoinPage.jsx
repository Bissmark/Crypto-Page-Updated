import { useEffect, useState } from "react";
import CustomTooltip from "./CustomTooltip";
import { useParams } from "react-router-dom";
import { Tooltip, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
import moment from 'moment';
import { useQuery } from "@tanstack/react-query"

const CoinPage = () => {
    const params = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['coin', params.coinName],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/' + params.coinName);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    if(isPending) return <h1>Loading...</h1>
    if(error) return <h1>Error: {error.message}</h1>
    if (!data) return null;

    const min = data.market_data.sparkline_7d.price[0];
    const max = data.market_data.sparkline_7d.price[data.market_data.sparkline_7d.price.length - 1];
    const priceIncrease = max > min ? true : false;
    
    return (
        <div className="flex justify-center mt-8 text-xl">
            {data && 
                <div>
                    <div className="flex items-center justify-center">
                        <h1 className="text-center text-3xl mr-2">{data.name}</h1>
                        <img src={ data.image.thumb} alt={ data.name } />
                    </div>
                    <div className="flex justify-evenly mt-8 mb-8 leading-10">
                        <div className="mr-8">
                            <p className="text-blue-500">Rank: <span className="text-white">{data.market_cap_rank}</span></p>
                            <p className="text-blue-500">Current Price: <span className="text-white">${data.market_data.current_price.usd.toLocaleString()}</span></p>
                            <div className="flex">
                                <p className="text-blue-500 mr-2">24hr change:</p> 
                                <p className={data.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
                                    { data.market_data.price_change_percentage_24h.toFixed(2) }%
                                </p>
                            </div>
                            <p className="text-blue-500">Market Cap: <span className="text-white">${data.market_data.market_cap.usd.toLocaleString()}</span></p>
                            <p className="text-blue-500">Circulating Supply: <span className="text-white">{data.market_data.circulating_supply.toLocaleString()}</span></p>
                            <p className="text-blue-500">Total Supply: <span className="text-white">{data.market_data.total_supply.toLocaleString()}</span></p>
                        </div>
                        <div className="mb-8">
                            <p className="text-blue-500">All-Time High: <span className="text-white">${data.market_data.ath.usd.toLocaleString()}</span></p>
                            <p className="text-blue-500">All-Time High Data: <span className="text-white">{moment(data.market_data.ath_date.usd).format('Do MMM YY') }</span></p>
                            <p className="text-blue-500">All-Time Low: <span className="text-white">${data.market_data.atl.usd.toLocaleString()}</span></p>
                            <p className="text-blue-500">All-Time Low Data: <span className="text-white">{moment(data.market_data.atl_date.usd).format('Do MMM YY')}</span></p>
                        </div>
                    </div>
                    <AreaChart width={960} height={300} data={data.market_data.sparkline_7d.price.map(value => ({ price: value.toFixed(5) }))}>
                        <Area type="monotone" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} fill={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                        <Tooltip content={ <CustomTooltip />} cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis style={{fontSize: '15px'}} width={80} type="number" tickFormatter={(value) => value.toFixed(2)} domain={['dataMin', 'auto']} />
                        <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                    </AreaChart> 
                </div>
            }
        </div>
    );
};

export default CoinPage;