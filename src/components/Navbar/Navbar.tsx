import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    // setForceUpdateKey: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar: React.FC<NavbarProps> = ({
    isLoggedIn, 
    setIsLoggedIn,
    // setForceUpdateKey,
    }) => {

    console.log("Props in Navbar:", { isLoggedIn, setIsLoggedIn});

    // creo stato per aprire e chiudere il menu
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    // creo stato per la dimensione del menu
    const [size, setSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    //use effect per il resize del menu    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        //facciamo unmount del listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //use effect per media query
    useEffect(() => {
        if (size.width > 768 && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [size.width, isMenuOpen]);
    

    // funzione per aprire e chiudere il menu
    const menuToggleHandler = () => {
        //impostiamo l'uso del prev per evitare il loop infinito
        setIsMenuOpen((prev) => !prev);
    };

    const navigate = useNavigate();

    //useEffect per fare Api call al BE per verificare se l'utente è loggato o meno
    const checkLoginStatus = async () => {
        try {
            const response = await fetch('http://localhost:8000/php/includes/checkLoginStatus.inc.php', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if(data.status === 'loggedIn' || data.status === '500') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error: any) {
            console.error('Failed to check login status', error.message);
        }
        console.log('Login status checked', isLoggedIn);
    }

    // funzione logout
    const handleLogOut = async () => {
         console.log('Before handleLogout:', isLoggedIn); // Log before calling the function
        try {
            const response  = await fetch('http://localhost:8000/php/includes/logout.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to log out, something went wrong');
            }

            console.log('Successfully logged out');
            setIsLoggedIn(false);
            //Forziamo il re-render
            // setForceUpdateKey((prevKey: any) => prevKey + 1);
            console.log('After handleLogOut', isLoggedIn); // console log dopo aver settato lo stato
            checkLoginStatus();
            navigate('/login');
        } catch (error: any) {
            console.error('There was a problem with the logout:', error.message);
        }
    };


    return (
        <header className="header">
            <div className="header__content">
                <Link to="/" className="header__content__logo">
                    Home
                </Link>
                <nav
                    className={`${"header__content__nav"} 
          ${isMenuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
                >
                    <ul>
                        <li>
                            <Link to="#">Sezione 1</Link>
                        </li>

                        <li>
                            <Link to="#">Sezione 2</Link>
                        </li>

                        <li>
                            <Link to="#">Sezione 3</Link>
                        </li>

                        {isLoggedIn ? (
                            <button className="btn btn__logout" onClick={handleLogOut}>Logout</button>
                        ) : (
                            <>
                                <Link to="/register">
                                    <button className="btn">Register</button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn btn__login">Login</button>
                                </Link>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="header__content__toggle">
                    {!isMenuOpen ? (
                        <button onClick={menuToggleHandler} />
                    ) : (
                        <button onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;