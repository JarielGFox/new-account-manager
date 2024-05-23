import { useState, useEffect } from "react";

interface ShowMessageProps {
    messageFromServer: string;
}

const ShowMessage: React.FC<ShowMessageProps> = ({ messageFromServer }) => {

    // Impostiamo lo stato del messaggio del server
    const [message, setMessage] = useState('');

    //determiniamo se il messaggio è in 'error' o in 'success'
    const [messageType, setMessageType] = useState('');

    // controlliamo con un useEffect se il messaggio è in 'error' o in 'success'
    useEffect(() => {
        if (messageFromServer) {
            const parsedMessage = JSON.parse(messageFromServer);
            if (parsedMessage.error) {
                setMessage(parsedMessage.error);
                setMessageType('error');
            } else if (parsedMessage.success) {
                setMessage(parsedMessage.success);
                setMessageType('success');
            }
        }
    }, [messageFromServer]);


    return (
        <>
            {message ? (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            ): null}
        </>
    );
}

export default ShowMessage;