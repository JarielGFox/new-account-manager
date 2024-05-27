import Dashboard from "../components/Dashboard";

interface MainProps {
    user: string
}

const Main: React.FC<MainProps> = ({user}) => {

     return (
        <div className="dashboard">
            <Dashboard user={user} />
        </div>
    );
}

export default Main;