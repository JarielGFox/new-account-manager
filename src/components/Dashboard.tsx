import React from 'react';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
    const { username } = useUser();
    console.log("Username utente:", { username });

    return (
        <>
            Benvenuto <span className="text-danger">{username}</span>!
        </>
    );
};

export default Dashboard;