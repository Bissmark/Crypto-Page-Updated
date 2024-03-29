const Dashboard = ({ user }) => {
    console.log(user);

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-3xl mr-2 text-blue-500 mb-2">{user.name}</h1>
            <p className="text-blue-500 mb-5">Email: <span className="text-white">{user.email}</span></p>
            <h1 className="text-3xl mr-2 text-blue-500 mb-2">Portfolio</h1>
        </div>
    )
}

export default Dashboard;