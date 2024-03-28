import { useQuery } from "@tanstack/react-query"

const TotalCoinInfo = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['totalCoinInfo'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/totalCoinInfo');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData; // Return the data fetched from the API
        }
    })

    if (isPending) return <h1>Loading...</h1>

    if (error) return <h1>Error: {error.message}</h1>

    return (
        <div>
            <ul className="flex flex-row">
                <li className="text-blue-600 mr-4 text-xs">Amount of Coins: <span className="text-white">{data.data.active_cryptocurrencies}</span></li>
                <li className="text-blue-600 mr-4 text-xs">Total Market Cap: <span className="text-white">${data.data.total_market_cap.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></li>
                <li className="text-blue-600 text-xs">Total 24hr Volume: <span className="text-white">{data.data.total_volume.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></li>
            </ul>
        </div>
    )
}

export default TotalCoinInfo