import digitalclochard from "../assets/img/digitalclochard.gif";

const Home: React.FC = () => {
    return (
        <>
            <p>
                Welcome to the Digital Clochard!
            </p>
            
            <img src={digitalclochard} alt="Digital Clochard" className="logo" />
    
            <p>
                Registrati ed inizia il tuo viaggio nella digital homelessness.
            </p>

        </>
    );
}

export default Home;