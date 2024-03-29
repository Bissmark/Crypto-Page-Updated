const SearchBar = ({ setSearchQuery }) => {
    const handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <input
                className="p-2 bg-gray-800 text-white rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Search..."
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;