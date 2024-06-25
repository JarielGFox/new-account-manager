import { ReactNode, useEffect } from "react";
import {createContext, useContext, useState } from "react";

// definiamo le props del context tramite interfaccia
interface UserContextProps {
    username: string;
    setUsername: (username: string) => void;
}

// inizializziamo il context
const UserContext = createContext<UserContextProps | undefined>(undefined)

// definiamo il provider
export const UserProvider: React.FC<({children: ReactNode})> = ({children}) => {
    //stato per l'username che dovrà essere passato a tutto il componente Login
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch('http://localhost:8000/php/includes/getUserName.inc.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok && data.status === 'loggedIn') {
                    setUsername(data.username);
                } else {
                    setUsername('');
                }

            } catch (error) {
                console.error('Error fetching user name:', error);
                setUsername('');
            }
        }
        fetchUserName();
    }, [])

    return (
        <UserContext.Provider value={{username, setUsername}}>
            {children}
        </UserContext.Provider>
    );
};

// definiamo il consumer
export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error ('useUser must be used within a UserProvider');
    }
    return context;
};

    