interface DashboardProps {
    user: string
}

const Dashboard: React.FC<DashboardProps> = ({user}) => {


    return (
        <>
            <h1>Benvenuto {user}</h1>
        </>
    )
}

export default Dashboard;