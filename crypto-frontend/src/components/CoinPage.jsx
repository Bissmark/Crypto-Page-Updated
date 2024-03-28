import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tooltip, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
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

    // const coinPricingData = data.market_data.sparkline_7d.price.map(value => {
    //     return {"price": value.toFixed(5)}
    // })

    // const priceIncrease = data.sparkline_in_7d.price[data.sparkline_in_7d.price.length - 1] > data.sparkline_in_7d.price[0];
    // fill={data.sparkline_in_7d.price[data.sparkline_in_7d.price.length - 1] > data.sparkline_in_7d.price[0] ? "#82ca9d" : "red"}

    if(isPending) return <h1>Loading...</h1>

    if(error) return <h1>Error: {error.message}</h1>
    
    return (
        <div>
            {data && 
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.market_cap_rank}</p>
                    <AreaChart width = {300} height = {100} data={data.market_data.sparkline_7d.price.map(value => ({ price: value.toFixed(5) }))}>
                        <Area type="monotone" dataKey="price" dot={false} />
                        <Tooltip cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis style={{fontSize: '15px'}} width={80} type="number" tickFormatter={(value) => value.toFixed(2)} domain={['dataMin', 'auto']} />
                        <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                    </AreaChart> 
                </div>
            }
        </div>
    );
};

export default CoinPage;