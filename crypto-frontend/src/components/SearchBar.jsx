const SearchBar = ({ setSearchQuery }) => {
    const handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <input
                className="p-2 bg-gray-800 text-white rounded-md"
                type="text"
                placeholder="Search..."
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;