import React from 'react';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
    const { username } = useUser();

    return (
        <>
            Benvenuto <span className="text-danger">{username}</span>!
        </>
    );
};

export default Dashboard;