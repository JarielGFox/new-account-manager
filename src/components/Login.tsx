import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMessage from "../components/ShowMessage";
import { useUser } from "../context/UserContext";

interface LoginProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ isLoggedIn, setIsLoggedIn }) => {

    //Stato per il form del login
    const [formLogin, setFormLogin] = useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });

    //da togliere, solo per evitare che TS non si arrabbi
    console.log("Props in Login:", { isLoggedIn, setIsLoggedIn });

    //Stato per mostrare o meno la psw:
    const [showPassword, setShowPassword] = useState(false);

    //Stato per il messaggio di errore
    const [messageFromServer, setMessageFromServer] = useState("");

    //redirect automatico con Navigate
    const navigate = useNavigate();

    // manteniamo lo username inserito dall'utente nel contesto
    const {setUsername} = useUser();

    // funzione per il login del form, conserviamo col prev lo stato delle informazioni inserite
    const handleChange = (event: any) => {
       const {name, value} = event.target;
       setFormLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
       }))
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/php/includes/login.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                credentials: 'include',
                body: JSON.stringify(formLogin)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessageFromServer(JSON.stringify(data));
            setIsLoggedIn(true);
            setUsername(formLogin.username);
            navigate('/main');  // Navigate to the Main.js view
        } catch (error: any) {
            console.error('There was a problem with the login:', error.message);
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }

    };

    return (
        <>
         <ShowMessage messageFromServer={messageFromServer} />
         <form onSubmit={handleLogin}>
            <label htmlFor="username" className="form-label">
                    Username
                </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="form-control"
                    value={formLogin.username}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                 <i className="bi bi-eye-fill btn button" id="eyePassword" onClick={() => setShowPassword(!showPassword)}></i>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    value={formLogin.password}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">Login</button>
         </form>
        </>
    )
}

export default Login;