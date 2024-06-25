import React from 'react';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
    const { username } = useUser();

    //per dopo, se funziona tutto, reindirizzare l'utente al login se non autenticato

    return (
        <>
            <span className="text-danger">{username ? "Benvenuto " + username + "!" : "Accedi a stocazzo!"}</span>
        </>
    );
};

export default Dashboard;