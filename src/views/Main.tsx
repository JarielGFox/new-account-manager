import React from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from '../context/UserContext';

const Main: React.FC = () => {

    const { username } = useUser();

     return (
        <div className="dashboard">
            {username ? <Dashboard   /> : "Accedi a stocazzo!"}
        </div>
    );
}

export default Main;