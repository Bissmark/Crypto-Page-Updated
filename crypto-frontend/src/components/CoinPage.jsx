import { useParams } from "react-router-dom";

const CoinPage = () => {
    const { coinId } = useParams();
    //const { data, error, isLoading } = useCoin(coinId);
    
    //if (isLoading) return <p>Loading...</p>;
    //if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div>
            <h1>Coin page coming soon</h1>
        </div>
    );
};

export default CoinPage;