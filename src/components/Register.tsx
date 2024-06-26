import { useState } from "react";
import ShowMessage from "./ShowMessage";

interface FormData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const Register: React.FC = () => {

    //Stato per il messaggio di errore dal componente ShowMessage
    const [messageFromServer, setMessageFromServer] = useState<string>('');

    //Stato per mostrare o meno la psw:
    const [showPassword, setShowPassword] = useState(false);

    //Stato dati da compilare utente
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        //destrutturiamo nome dell'input field e valore di ciò che viene inserito nel field
        const { name, value } = event.target;

        setFormData((formData: any) => ({
            ...formData,
            [name]: value
        }))
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch ('http://localhost:8000/php/includes/register.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessageFromServer(JSON.stringify(data));

        } catch (error: any) {
            console.error('There was a problem with the registration:', error.message);
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }
    }

 return (
        <div>
            <ShowMessage messageFromServer={messageFromServer} />
            <form onSubmit={handleSubmit}>

                <label htmlFor="username" className="form-label">Username</label>
                <input type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.username}
                />

                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.email}
                />

                {/* //spazio per l'occhietto mostra psw */}
                <div>
                    <label htmlFor="password" className="form-label me-2">Password</label>
                    <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} onClick={handleShowPassword} role="button" title="Mostra password"></i>
                </div>

                <input type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password}    
                />

                {/* //spazio per l'occhietto mostra psw */}
                <div>
                    <label htmlFor="password_confirmation" className="form-label me-2">Confirm password</label>
                    <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} onClick={handleShowPassword} role="button" title="Mostra password"></i>
                </div>

                <input type={showPassword ? "text" : "password"}
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password_confirmation}
                />
                    
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;