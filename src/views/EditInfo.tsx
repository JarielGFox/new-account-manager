import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMessage from "../components/ShowMessage";

interface InfoData {
    name: string;
    surname: string;
    date_of_birth: string;
    address: string;
    profile_pic: string;
    biography: string;
}

const EditInfo: React.FC = () => {

    // State per i dati da modificare
    const [infoData, setInfoData] = useState<InfoData>({
        name: "",
        surname: "",
        date_of_birth: "",
        address: "",
        profile_pic: "",
        biography: "",
    });

    //Redirect automatico con Navigate
    const navigate = useNavigate();

    // Stato per il messaggio di errore
    const [messageFromServer, setMessageFromServer] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        event.preventDefault();
        const { name, value } = event.target;
        setInfoData((infoData) => ({
            ...infoData,
            [name]: value || "", // assicuriamo di non avere valori non definiti
        }));
    };

    //creiamo un useEffect con dentro funzione per fetchare i dati dell'utente
   useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/php/includes/getUserInfo.inc.php", {
                    method: "GET",
                    credentials: 'include',
                });

                const data = await response.json();
                if (data) {
                    const { name, surname, date_of_birth, address, profile_pic, biography } = data;
                    setInfoData({
                        name: name || "", // niente valori non definiti
                        surname: surname || "",
                        date_of_birth: date_of_birth || "",
                        address: address || "",
                        profile_pic: profile_pic || "",
                        biography: biography || ""
                    });
                }
            } catch (error: any) {
                setMessageFromServer(JSON.stringify({ error: error.message }));
            }
        };

        fetchData().catch(() => {
            setMessageFromServer(JSON.stringify({ error: "Error fetching data" }));
        });
    }, []);

    //creiamo funzione per fare il submit dei dati dell'utente al db
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/php/includes/updateInfo.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(infoData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            setMessageFromServer(JSON.stringify(data));
            setTimeout(() => {
                navigate('/main');
            }, 2500);
        } catch (error: any) {
            console.error('There was a problem with the update:', error.message);
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }
    }


 return (
        <>
            <ShowMessage messageFromServer={messageFromServer} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">
                    Nome
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={infoData.name}
                    placeholder="first name"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="surname" className="form-label">
                    Cognome
                </label>
                <input
                    type="text"
                    name="surname"
                    id="surname"
                    value={infoData.surname}
                    placeholder="surname"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="date_of_birth" className="form-label">
                    Data di nascita
                </label>
                <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    value={infoData.date_of_birth}
                    placeholder="date of birth"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="address" className="form-label">
                    Indirizzo
                </label>
                <textarea
                    name="address"
                    id="address"
                    value={infoData.address}
                    placeholder="your address"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="biography" className="form-label">
                    Biografia
                </label>
                <textarea
                    name="biography"
                    id="biography"
                    value={infoData.biography}
                    placeholder="a short biography"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="profile_pic" className="form-label">
                    Avatar
                </label>
                <input
                    type="text"
                    name="profile_pic"
                    id="profile_pic"
                    value={infoData.profile_pic}
                    placeholder="immagine profilo"
                    className="form-control"
                    onChange={handleChange}
                />

                <button type="submit" className="btn btn-primary">Aggiorna Info</button>
            </form>
        </>
    );
}

export default EditInfo;