const CoinPage = () => {
    const { coinId } = useParams();
    const { data, error, isLoading } = useCoin(coinId);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        </div>
    );
};

export default CoinPage;